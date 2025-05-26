
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { fileName } = await req.json();
    console.log(`Processing Word document: ${fileName}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    if (!groqApiKey) {
      throw new Error('GROQ_API_KEY not found');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Download the file
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('playbooks')
      .download(fileName);

    if (downloadError) {
      throw new Error(`Download failed: ${downloadError.message}`);
    }

    // Convert to base64 for Groq
    const arrayBuffer = await fileData.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);
    const base64 = btoa(String.fromCharCode.apply(null, Array.from(bytes)));

    console.log('Calling Groq AI for Word document processing...');

    // Simple, focused prompt for your specific document structure
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-70b-versatile',
        messages: [{
          role: 'user',
          content: `Parse this Word document and extract data in JSON format:

1. Page 1 (cover): Extract the dashboard/playbook name
2. Following pages: Extract chapters with their process steps, RACI matrix, and process maps

Return ONLY valid JSON in this exact format:
{
  "dashboard_name": "name from cover page",
  "chapters": [
    {
      "chapter_name": "chapter title",
      "process_steps": [
        {
          "step_id": "1",
          "activity": "activity description",
          "inputs": ["input1", "input2"],
          "outputs": ["output1", "output2"],
          "timeline": "duration",
          "responsible": "person/role",
          "comments": "notes"
        }
      ],
      "raci_matrix": [
        {
          "step_id": "1",
          "task": "task name",
          "responsible": "R person",
          "accountable": "A person",
          "consulted": "C person",
          "informed": "I person"
        }
      ],
      "process_map": [
        {
          "step_id": "1",
          "step_type": "process",
          "title": "step title",
          "description": "step description",
          "order_index": 1
        }
      ]
    }
  ]
}

Document content (base64): ${base64.substring(0, 50000)}`
        }],
        temperature: 0.1,
        max_tokens: 4000
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      throw new Error(`Groq API error: ${groqResponse.status} - ${errorText}`);
    }

    const groqData = await groqResponse.json();
    const content = groqData.choices[0].message.content;
    
    console.log('Raw Groq response:', content);

    // Extract JSON more safely
    let extractedData;
    try {
      // Try to find JSON in the response
      const jsonStart = content.indexOf('{');
      const jsonEnd = content.lastIndexOf('}') + 1;
      
      if (jsonStart !== -1 && jsonEnd > jsonStart) {
        const jsonString = content.substring(jsonStart, jsonEnd);
        extractedData = JSON.parse(jsonString);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      throw new Error(`Failed to parse Groq response: ${parseError.message}`);
    }

    console.log('Parsed data:', extractedData);

    // Create playbook name
    const playbookName = (extractedData.dashboard_name || fileName.replace(/\.(docx?|PDF|pdf)$/i, ''))
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');

    // Check if playbook exists
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id')
      .eq('name', playbookName)
      .single();

    if (existingPlaybook) {
      console.log(`Playbook ${playbookName} already exists, skipping`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Playbook ${playbookName} already exists`,
          playbookId: existingPlaybook.id
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create phases from chapters
    const phases = {};
    if (extractedData.chapters && Array.isArray(extractedData.chapters)) {
      extractedData.chapters.forEach((chapter, index) => {
        const phaseId = `phase_${index + 1}`;
        phases[phaseId] = {
          name: chapter.chapter_name || `Chapter ${index + 1}`,
          description: `Chapter ${index + 1}: ${chapter.chapter_name || 'Unnamed Chapter'}`
        };
      });
    }

    // Insert playbook
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: playbookName,
        title: extractedData.dashboard_name || fileName,
        description: `Generated from Word document: ${fileName}`,
        phases: phases,
        file_path: fileName
      })
      .select()
      .single();

    if (playbookError) {
      throw new Error(`Failed to create playbook: ${playbookError.message}`);
    }

    console.log('Created playbook:', playbook);

    let totalProcessed = 0;

    // Process each chapter
    if (extractedData.chapters && Array.isArray(extractedData.chapters)) {
      for (let i = 0; i < extractedData.chapters.length; i++) {
        const chapter = extractedData.chapters[i];
        const phaseId = `phase_${i + 1}`;

        // Insert process steps
        if (chapter.process_steps && Array.isArray(chapter.process_steps)) {
          const processStepsData = chapter.process_steps.map((step, stepIndex) => ({
            playbook_id: playbook.id,
            phase_id: phaseId,
            step_id: step.step_id || `${i + 1}.${stepIndex + 1}`,
            activity: step.activity || 'No activity description',
            inputs: Array.isArray(step.inputs) ? step.inputs : [],
            outputs: Array.isArray(step.outputs) ? step.outputs : [],
            timeline: step.timeline || '',
            responsible: step.responsible || '',
            comments: step.comments || ''
          }));

          const { error: stepsError } = await supabase
            .from('process_steps')
            .insert(processStepsData);

          if (!stepsError) {
            totalProcessed += processStepsData.length;
            console.log(`Inserted ${processStepsData.length} process steps for ${chapter.chapter_name}`);
          }
        }

        // Insert RACI matrix
        if (chapter.raci_matrix && Array.isArray(chapter.raci_matrix)) {
          const raciData = chapter.raci_matrix.map((item, raciIndex) => ({
            playbook_id: playbook.id,
            phase_id: phaseId,
            step_id: item.step_id || `${i + 1}.${raciIndex + 1}`,
            task: item.task || 'No task description',
            responsible: item.responsible || '',
            accountable: item.accountable || '',
            consulted: item.consulted || '',
            informed: item.informed || ''
          }));

          const { error: raciError } = await supabase
            .from('raci_matrix')
            .insert(raciData);

          if (!raciError) {
            console.log(`Inserted ${raciData.length} RACI entries for ${chapter.chapter_name}`);
          }
        }

        // Insert process map
        if (chapter.process_map && Array.isArray(chapter.process_map)) {
          const processMapData = chapter.process_map.map((item, mapIndex) => ({
            playbook_id: playbook.id,
            phase_id: phaseId,
            step_id: item.step_id || `${i + 1}.${mapIndex + 1}`,
            step_type: item.step_type || 'process',
            title: item.title || 'Untitled step',
            description: item.description || '',
            order_index: item.order_index || mapIndex + 1
          }));

          const { error: mapError } = await supabase
            .from('process_map')
            .insert(processMapData);

          if (!mapError) {
            console.log(`Inserted ${processMapData.length} process map entries for ${chapter.chapter_name}`);
          }
        }
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully processed Word document: ${fileName}`,
        playbookId: playbook.id,
        dashboardName: extractedData.dashboard_name,
        chaptersProcessed: extractedData.chapters?.length || 0,
        totalItemsProcessed: totalProcessed
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing Word document:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Word document processing failed'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
