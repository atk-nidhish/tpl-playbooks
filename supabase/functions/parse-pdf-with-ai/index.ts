
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { fileName } = await req.json()
    console.log(`Processing PDF with Groq AI: ${fileName}`)
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Download the PDF from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('playbooks')
      .download(fileName)

    if (downloadError) {
      throw new Error(`Failed to download PDF: ${downloadError.message}`)
    }

    // Convert PDF to base64 for AI processing
    const arrayBuffer = await fileData.arrayBuffer()
    const base64Pdf = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    // Use Groq to extract structured content
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('GROQ_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.2-90b-vision-preview',
        messages: [
          {
            role: 'system',
            content: `You are an expert PDF content extractor specializing in business playbooks. Extract structured content from playbooks and organize by chapters/phases.

CRITICAL INSTRUCTIONS:
1. Identify all chapters from the table of contents (usually page 2)
2. For each chapter, extract detailed information for process steps, RACI matrix, and process map
3. Focus on operational content - ignore cover pages, KPIs, and glossaries
4. Be comprehensive - extract ALL process steps, not just summaries

Return JSON in this EXACT format:
{
  "title": "Playbook Title",
  "description": "Brief description of the playbook",
  "phases": {
    "Chapter 1": {"name": "Chapter 1: Full Name", "description": "Chapter description"},
    "Chapter 2": {"name": "Chapter 2: Full Name", "description": "Chapter description"}
  },
  "processSteps": [
    {
      "phase_id": "Chapter 1",
      "step_id": "1.1",
      "activity": "Detailed activity description",
      "inputs": ["Specific input 1", "Specific input 2"],
      "outputs": ["Specific output 1", "Specific output 2"],
      "timeline": "Timeline information (e.g., Week 1, Day 1-3)",
      "responsible": "Role/person responsible",
      "comments": "Additional notes or details"
    }
  ],
  "raciMatrix": [
    {
      "phase_id": "Chapter 1",
      "step_id": "1.1",
      "task": "Specific task name",
      "responsible": "Role who executes",
      "accountable": "Role who owns outcome",
      "consulted": "Role who provides input",
      "informed": "Role who receives updates"
    }
  ],
  "processMap": [
    {
      "phase_id": "Chapter 1",
      "step_id": "1.1",
      "step_type": "start",
      "title": "Step title",
      "description": "Step description",
      "order_index": 1
    }
  ]
}

Step types: "start", "process", "decision", "milestone", "end"`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Extract ALL structured content from this PDF playbook: ${fileName}. 

REQUIREMENTS:
- Extract EVERY process step mentioned in each chapter
- Create comprehensive RACI matrices for all identified tasks
- Map out complete process flows with proper sequencing
- Ensure phase_id matches the chapter identifiers exactly
- Include realistic timelines and responsible parties
- Be thorough - this is for operational use`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:application/pdf;base64,${base64Pdf}`
                }
              }
            ]
          }
        ],
        max_tokens: 8000,
        temperature: 0.1
      }),
    })

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text()
      console.error('Groq API error:', errorText)
      throw new Error(`Groq API error: ${groqResponse.status} ${groqResponse.statusText}`)
    }

    const aiResult = await groqResponse.json()
    console.log('Groq response:', JSON.stringify(aiResult, null, 2))

    if (!aiResult.choices || !aiResult.choices[0]) {
      throw new Error('Invalid response from Groq API')
    }

    let extractedContent
    try {
      extractedContent = JSON.parse(aiResult.choices[0].message.content)
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResult.choices[0].message.content)
      throw new Error('Failed to parse structured content from AI response')
    }

    console.log('Extracted content:', JSON.stringify(extractedContent, null, 2))

    // Validate extracted content structure
    if (!extractedContent.title || !extractedContent.phases) {
      throw new Error('Invalid extracted content structure')
    }

    // Store the extracted content in database
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: fileName.replace('.pdf', ''),
        title: extractedContent.title,
        description: extractedContent.description || 'AI-extracted playbook',
        file_path: `playbooks/${fileName}`,
        phases: extractedContent.phases
      })
      .select()
      .single()

    if (playbookError) {
      console.error('Error inserting playbook:', playbookError)
      throw playbookError
    }

    console.log('Created playbook:', playbook.id)

    // Insert process steps
    if (extractedContent.processSteps?.length > 0) {
      const processStepsWithPlaybookId = extractedContent.processSteps.map(step => ({
        ...step,
        playbook_id: playbook.id,
        inputs: step.inputs || [],
        outputs: step.outputs || []
      }))

      const { error: stepsError } = await supabase
        .from('process_steps')
        .insert(processStepsWithPlaybookId)

      if (stepsError) {
        console.error('Error inserting process steps:', stepsError)
        throw stepsError
      }

      console.log(`Inserted ${processStepsWithPlaybookId.length} process steps`)
    }

    // Insert RACI matrix
    if (extractedContent.raciMatrix?.length > 0) {
      const raciWithPlaybookId = extractedContent.raciMatrix.map(raci => ({
        ...raci,
        playbook_id: playbook.id
      }))

      const { error: raciError } = await supabase
        .from('raci_matrix')
        .insert(raciWithPlaybookId)

      if (raciError) {
        console.error('Error inserting RACI matrix:', raciError)
        throw raciError
      }

      console.log(`Inserted ${raciWithPlaybookId.length} RACI matrix entries`)
    }

    // Insert process map
    if (extractedContent.processMap?.length > 0) {
      const mapWithPlaybookId = extractedContent.processMap.map(map => ({
        ...map,
        playbook_id: playbook.id
      }))

      const { error: mapError } = await supabase
        .from('process_map')
        .insert(mapWithPlaybookId)

      if (mapError) {
        console.error('Error inserting process map:', mapError)
        throw mapError
      }

      console.log(`Inserted ${mapWithPlaybookId.length} process map entries`)
    }

    return new Response(JSON.stringify({ 
      success: true, 
      playbook,
      stats: {
        processSteps: extractedContent.processSteps?.length || 0,
        raciEntries: extractedContent.raciMatrix?.length || 0,
        processMapEntries: extractedContent.processMap?.length || 0
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error processing PDF:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      stack: error.stack 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
