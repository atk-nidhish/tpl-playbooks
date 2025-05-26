
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
    console.log(`Processing document with Groq AI: ${fileName}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    if (!groqApiKey) {
      throw new Error('GROQ_API_KEY not found in environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Download the file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('playbooks')
      .download(fileName);

    if (downloadError) {
      console.error('Error downloading file:', downloadError);
      throw downloadError;
    }

    // Convert file to base64 for processing
    const arrayBuffer = await fileData.arrayBuffer();
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    // Determine file type
    const isWordDoc = fileName.toLowerCase().endsWith('.docx') || fileName.toLowerCase().endsWith('.doc');
    const fileType = isWordDoc ? 'Word document' : 'PDF';

    // Call Groq AI to process the document
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
          content: `You are an expert at extracting structured data from ${fileType} playbooks. 

Please analyze this ${fileType} file and extract:

1. **General Information:**
   - Title/Name of the playbook
   - Description
   - Project phases (if mentioned)

2. **Process Steps** for each phase:
   - Step ID/Number
   - Activity description
   - Inputs required
   - Outputs produced
   - Timeline/Duration
   - Responsible person/role
   - Additional comments

3. **RACI Matrix** for each phase:
   - Step ID
   - Task description
   - Responsible (who does the work)
   - Accountable (who signs off)
   - Consulted (who provides input)
   - Informed (who needs to know)

4. **Process Map** for each phase:
   - Step ID
   - Step type (start, process, decision, milestone, end)
   - Title
   - Description
   - Order/sequence

Please return the data in this exact JSON format:
{
  "title": "string",
  "description": "string", 
  "phases": {
    "phase_1": {"name": "string", "description": "string"},
    "phase_2": {"name": "string", "description": "string"}
  },
  "process_steps": [
    {
      "phase_id": "string",
      "step_id": "string", 
      "activity": "string",
      "inputs": ["string"],
      "outputs": ["string"],
      "timeline": "string",
      "responsible": "string",
      "comments": "string"
    }
  ],
  "raci_matrix": [
    {
      "phase_id": "string",
      "step_id": "string",
      "task": "string", 
      "responsible": "string",
      "accountable": "string",
      "consulted": "string",
      "informed": "string"
    }
  ],
  "process_map": [
    {
      "phase_id": "string",
      "step_id": "string",
      "step_type": "string",
      "title": "string", 
      "description": "string",
      "order_index": number
    }
  ]
}

The ${fileType} content is base64 encoded: ${base64}`
        }],
        temperature: 0.1,
        max_tokens: 4000
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('Groq AI API error:', errorText);
      throw new Error(`Groq AI API error: ${groqResponse.status} - ${errorText}`);
    }

    const groqData = await groqResponse.json();
    const content = groqData.choices[0].message.content;

    // Extract JSON from the response
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in Groq response');
    }

    const extractedData = JSON.parse(jsonMatch[0]);
    console.log('Extracted data:', extractedData);

    // Generate playbook name from filename
    const playbookName = fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, '').replace(/\s+/g, '_').toLowerCase();

    // Insert playbook data
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: playbookName,
        title: extractedData.title || fileName,
        description: extractedData.description || 'Playbook processed from uploaded document',
        phases: extractedData.phases || {},
        file_path: fileName
      })
      .select()
      .single();

    if (playbookError) {
      console.error('Error inserting playbook:', playbookError);
      throw playbookError;
    }

    console.log('Inserted playbook:', playbook);

    // Insert process steps
    if (extractedData.process_steps?.length > 0) {
      const processStepsData = extractedData.process_steps.map((step: any) => ({
        playbook_id: playbook.id,
        phase_id: step.phase_id,
        step_id: step.step_id,
        activity: step.activity,
        inputs: step.inputs || [],
        outputs: step.outputs || [],
        timeline: step.timeline,
        responsible: step.responsible,
        comments: step.comments
      }));

      const { error: stepsError } = await supabase
        .from('process_steps')
        .insert(processStepsData);

      if (stepsError) {
        console.error('Error inserting process steps:', stepsError);
      } else {
        console.log(`Inserted ${processStepsData.length} process steps`);
      }
    }

    // Insert RACI matrix
    if (extractedData.raci_matrix?.length > 0) {
      const raciData = extractedData.raci_matrix.map((item: any) => ({
        playbook_id: playbook.id,
        phase_id: item.phase_id,
        step_id: item.step_id,
        task: item.task,
        responsible: item.responsible,
        accountable: item.accountable,
        consulted: item.consulted,
        informed: item.informed
      }));

      const { error: raciError } = await supabase
        .from('raci_matrix')
        .insert(raciData);

      if (raciError) {
        console.error('Error inserting RACI matrix:', raciError);
      } else {
        console.log(`Inserted ${raciData.length} RACI entries`);
      }
    }

    // Insert process map
    if (extractedData.process_map?.length > 0) {
      const processMapData = extractedData.process_map.map((item: any) => ({
        playbook_id: playbook.id,
        phase_id: item.phase_id,
        step_id: item.step_id,
        step_type: item.step_type,
        title: item.title,
        description: item.description,
        order_index: item.order_index
      }));

      const { error: mapError } = await supabase
        .from('process_map')
        .insert(processMapData);

      if (mapError) {
        console.error('Error inserting process map:', mapError);
      } else {
        console.log(`Inserted ${processMapData.length} process map entries`);
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully processed ${fileType}: ${fileName}`,
        playbookId: playbook.id
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing document:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to process document with Groq AI'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
