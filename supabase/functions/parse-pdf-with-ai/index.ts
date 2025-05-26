
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

    // Use OpenAI to extract structured content
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are a PDF content extractor. Extract structured content from playbooks with this format:

1. Identify chapters from the table of contents (page 2)
2. For each chapter, extract:
   - Process Steps (with step_id, activity, inputs, outputs, timeline, responsible, comments)
   - RACI Matrix (with step_id, task, responsible, accountable, consulted, informed)
   - Process Map (with step_id, step_type, title, description, order_index)

Return JSON in this exact format:
{
  "title": "Playbook Title",
  "description": "Brief description",
  "phases": {
    "Chapter 1": {"name": "Chapter 1: Name", "description": "Description"},
    "Chapter 2": {"name": "Chapter 2: Name", "description": "Description"}
  },
  "processSteps": [
    {
      "phase_id": "Chapter 1",
      "step_id": "1.1",
      "activity": "Activity name",
      "inputs": ["Input 1", "Input 2"],
      "outputs": ["Output 1", "Output 2"],
      "timeline": "Week 1",
      "responsible": "Role name",
      "comments": "Additional comments"
    }
  ],
  "raciMatrix": [
    {
      "phase_id": "Chapter 1",
      "step_id": "1.1",
      "task": "Task name",
      "responsible": "Role",
      "accountable": "Role",
      "consulted": "Role",
      "informed": "Role"
    }
  ],
  "processMap": [
    {
      "phase_id": "Chapter 1",
      "step_id": "1.1",
      "step_type": "start|process|decision|milestone|end",
      "title": "Step title",
      "description": "Step description",
      "order_index": 1
    }
  ]
}`
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Extract structured content from this PDF: ${fileName}. Focus on chapters and ignore cover page, table of contents, KPIs, and glossary.`
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
        max_tokens: 4000
      }),
    })

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${openaiResponse.statusText}`)
    }

    const aiResult = await openaiResponse.json()
    const extractedContent = JSON.parse(aiResult.choices[0].message.content)

    // Store the extracted content in database
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: fileName.replace('.pdf', ''),
        title: extractedContent.title,
        description: extractedContent.description,
        file_path: `playbooks/${fileName}`,
        phases: extractedContent.phases
      })
      .select()
      .single()

    if (playbookError) throw playbookError

    // Insert process steps
    if (extractedContent.processSteps?.length > 0) {
      const processStepsWithPlaybookId = extractedContent.processSteps.map(step => ({
        ...step,
        playbook_id: playbook.id
      }))

      const { error: stepsError } = await supabase
        .from('process_steps')
        .insert(processStepsWithPlaybookId)

      if (stepsError) throw stepsError
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

      if (raciError) throw raciError
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

      if (mapError) throw mapError
    }

    return new Response(JSON.stringify({ success: true, playbook }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error processing PDF:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
