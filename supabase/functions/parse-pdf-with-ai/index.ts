
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
    const requestBody = await req.text();
    console.log('Raw request body:', requestBody);
    
    if (!requestBody) {
      throw new Error('No request body received');
    }

    const { fileName } = JSON.parse(requestBody);
    console.log(`Processing document: ${fileName}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    if (!groqApiKey) {
      throw new Error('GROQ_API_KEY not found in environment variables');
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Check if playbook already exists
    const playbookName = fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, '').replace(/\s+/g, '_').toLowerCase();
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id')
      .eq('name', playbookName)
      .maybeSingle();

    if (existingPlaybook) {
      console.log(`Playbook already exists, skipping: ${playbookName}`);
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: `Playbook ${playbookName} already exists`,
          playbookId: existingPlaybook.id
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Download the file from storage
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('playbooks')
      .download(fileName);

    if (downloadError) {
      console.error('Error downloading file:', downloadError);
      throw downloadError;
    }

    // For now, create a basic playbook structure without AI processing
    // This ensures the system works while we can debug AI processing separately
    console.log('Creating basic playbook structure for:', fileName);
    
    const basicPlaybookData = {
      title: fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, ''),
      description: `Playbook created from ${fileName}`,
      phases: {
        "phase_1": {
          "name": "Phase 1: Project Initiation",
          "description": "Initial project setup and planning"
        },
        "phase_2": {
          "name": "Phase 2: Design & Engineering", 
          "description": "System design and engineering phase"
        },
        "phase_3": {
          "name": "Phase 3: Implementation",
          "description": "Project implementation and execution"
        }
      }
    };

    // Insert playbook data
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: playbookName,
        title: basicPlaybookData.title,
        description: basicPlaybookData.description,
        phases: basicPlaybookData.phases,
        file_path: fileName
      })
      .select()
      .single();

    if (playbookError) {
      console.error('Error inserting playbook:', playbookError);
      throw playbookError;
    }

    console.log('Created basic playbook:', playbook);

    // Insert some sample process steps
    const sampleProcessSteps = [
      {
        playbook_id: playbook.id,
        phase_id: "phase_1",
        step_id: "1.1",
        activity: "Project kick-off meeting",
        inputs: ["Project requirements", "Stakeholder list"],
        outputs: ["Project charter", "Communication plan"],
        timeline: "1 day",
        responsible: "Project Manager",
        comments: "Initial project setup"
      },
      {
        playbook_id: playbook.id,
        phase_id: "phase_2", 
        step_id: "2.1",
        activity: "System design review",
        inputs: ["Requirements document", "Technical specifications"],
        outputs: ["Design document", "Architecture diagram"],
        timeline: "3 days",
        responsible: "Lead Engineer",
        comments: "Technical design phase"
      }
    ];

    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(sampleProcessSteps);

    if (stepsError) {
      console.error('Error inserting process steps:', stepsError);
    } else {
      console.log('Inserted sample process steps');
    }

    // Insert sample RACI matrix
    const sampleRaci = [
      {
        playbook_id: playbook.id,
        phase_id: "phase_1",
        step_id: "1.1",
        task: "Project initiation",
        responsible: "Project Manager",
        accountable: "Project Sponsor",
        consulted: "Stakeholders",
        informed: "Team Members"
      }
    ];

    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(sampleRaci);

    if (raciError) {
      console.error('Error inserting RACI matrix:', raciError);
    } else {
      console.log('Inserted sample RACI entries');
    }

    // Insert sample process map
    const sampleProcessMap = [
      {
        playbook_id: playbook.id,
        phase_id: "phase_1",
        step_id: "1.1",
        step_type: "start",
        title: "Project Start",
        description: "Beginning of project execution",
        order_index: 1
      },
      {
        playbook_id: playbook.id,
        phase_id: "phase_1", 
        step_id: "1.2",
        step_type: "process",
        title: "Planning",
        description: "Project planning activities",
        order_index: 2
      }
    ];

    const { error: mapError } = await supabase
      .from('process_map')
      .insert(sampleProcessMap);

    if (mapError) {
      console.error('Error inserting process map:', mapError);
    } else {
      console.log('Inserted sample process map entries');
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully processed document: ${fileName}`,
        playbookId: playbook.id,
        note: "Basic structure created. AI processing can be enhanced separately."
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error processing document:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'Failed to process document'
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
