
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
    console.log(`Processing Word document with specialized parser: ${fileName}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    if (!groqApiKey) {
      throw new Error('GROQ_API_KEY not found in environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Download the Word document
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('playbooks')
      .download(fileName);

    if (downloadError) {
      console.error('Error downloading file:', downloadError);
      throw downloadError;
    }

    // Convert file to base64
    const arrayBuffer = await fileData.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    console.log('Calling Groq AI with specialized Word document prompt...');

    // Use Groq AI with a specialized prompt for this document structure
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
          content: `You are an expert at parsing structured Word documents. This document has a specific structure:

1st page: Cover page with the dashboard/playbook name
2nd page onwards: Chapter names followed by their respective:
- Process steps
- RACI matrices 
- Process maps

Please extract and structure this data exactly as follows:

{
  "dashboard_name": "extracted from cover page",
  "chapters": [
    {
      "chapter_name": "name of the chapter",
      "process_steps": [
        {
          "step_id": "unique identifier",
          "activity": "description of the activity",
          "inputs": ["list", "of", "inputs"],
          "outputs": ["list", "of", "outputs"],
          "timeline": "duration or timeline",
          "responsible": "person or role responsible",
          "comments": "additional notes"
        }
      ],
      "raci_matrix": [
        {
          "step_id": "step identifier",
          "task": "task description",
          "responsible": "who does the work",
          "accountable": "who signs off",
          "consulted": "who provides input", 
          "informed": "who needs to know"
        }
      ],
      "process_map": [
        {
          "step_id": "step identifier",
          "step_type": "start|process|decision|milestone|end",
          "title": "step title",
          "description": "step description",
          "order_index": number
        }
      ]
    }
  ]
}

Focus on extracting the dashboard name from the first page, then identify each chapter and its associated content. Be precise about chapter boundaries and ensure all process steps, RACI entries, and process map items are correctly associated with their respective chapters.

The Word document content (base64): ${base64}`
        }],
        temperature: 0.1,
        max_tokens: 8000
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('Groq AI API error:', errorText);
      throw new Error(`Groq AI API error: ${groqResponse.status} - ${errorText}`);
    }

    const groqData = await groqResponse.json();
    const content = groqData.choices[0].message.content;
    console.log('Groq AI response received, extracting JSON...');

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in Groq response');
    }

    const extractedData = JSON.parse(jsonMatch[0]);
    console.log('Successfully parsed extracted data:', extractedData);

    // Generate playbook name from filename or use dashboard name
    const playbookName = extractedData.dashboard_name?.toLowerCase().replace(/\s+/g, '_') || 
                        fileName.replace(/\.(docx?|PDF|pdf)$/i, '').replace(/\s+/g, '_').toLowerCase();

    // Create phases object from chapters
    const phases: any = {};
    extractedData.chapters?.forEach((chapter: any, index: number) => {
      const phaseId = `phase_${index + 1}`;
      phases[phaseId] = {
        name: chapter.chapter_name || `Chapter ${index + 1}`,
        description: `Chapter ${index + 1}: ${chapter.chapter_name || 'Unnamed Chapter'}`
      };
    });

    // Insert playbook data
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: playbookName,
        title: extractedData.dashboard_name || fileName,
        description: `Dashboard created from Word document: ${fileName}`,
        phases: phases,
        file_path: fileName
      })
      .select()
      .single();

    if (playbookError) {
      console.error('Error inserting playbook:', playbookError);
      throw playbookError;
    }

    console.log('Successfully inserted playbook:', playbook);

    // Process each chapter and insert data
    let totalSteps = 0;
    let totalRaci = 0;
    let totalProcessMap = 0;

    for (let chapterIndex = 0; chapterIndex < (extractedData.chapters?.length || 0); chapterIndex++) {
      const chapter = extractedData.chapters[chapterIndex];
      const phaseId = `phase_${chapterIndex + 1}`;

      // Insert process steps for this chapter
      if (chapter.process_steps?.length > 0) {
        const processStepsData = chapter.process_steps.map((step: any) => ({
          playbook_id: playbook.id,
          phase_id: phaseId,
          step_id: step.step_id || `step_${Math.random().toString(36).substr(2, 9)}`,
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

        if (stepsError) {
          console.error(`Error inserting process steps for ${chapter.chapter_name}:`, stepsError);
        } else {
          totalSteps += processStepsData.length;
          console.log(`Inserted ${processStepsData.length} process steps for ${chapter.chapter_name}`);
        }
      }

      // Insert RACI matrix for this chapter
      if (chapter.raci_matrix?.length > 0) {
        const raciData = chapter.raci_matrix.map((item: any) => ({
          playbook_id: playbook.id,
          phase_id: phaseId,
          step_id: item.step_id || `step_${Math.random().toString(36).substr(2, 9)}`,
          task: item.task || 'No task description',
          responsible: item.responsible || '',
          accountable: item.accountable || '',
          consulted: item.consulted || '',
          informed: item.informed || ''
        }));

        const { error: raciError } = await supabase
          .from('raci_matrix')
          .insert(raciData);

        if (raciError) {
          console.error(`Error inserting RACI matrix for ${chapter.chapter_name}:`, raciError);
        } else {
          totalRaci += raciData.length;
          console.log(`Inserted ${raciData.length} RACI entries for ${chapter.chapter_name}`);
        }
      }

      // Insert process map for this chapter
      if (chapter.process_map?.length > 0) {
        const processMapData = chapter.process_map.map((item: any) => ({
          playbook_id: playbook.id,
          phase_id: phaseId,
          step_id: item.step_id || `step_${Math.random().toString(36).substr(2, 9)}`,
          step_type: item.step_type || 'process',
          title: item.title || 'Untitled step',
          description: item.description || '',
          order_index: item.order_index || 0
        }));

        const { error: mapError } = await supabase
          .from('process_map')
          .insert(processMapData);

        if (mapError) {
          console.error(`Error inserting process map for ${chapter.chapter_name}:`, mapError);
        } else {
          totalProcessMap += processMapData.length;
          console.log(`Inserted ${processMapData.length} process map entries for ${chapter.chapter_name}`);
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
        totalProcessSteps: totalSteps,
        totalRaciEntries: totalRaci,
        totalProcessMapEntries: totalProcessMap
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing Word document:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to process Word document with specialized parser'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
