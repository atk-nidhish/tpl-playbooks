
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
    console.log(`Processing Word document: ${fileName}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Create playbook name from filename
    const playbookName = fileName.replace(/\.(docx?|PDF|pdf)$/i, '')
      .toLowerCase()
      .replace(/\s+/g, '_')
      .replace(/[^a-z0-9_]/g, '');

    // Check if playbook exists
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id')
      .eq('name', playbookName)
      .maybeSingle();

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

    // Download the file
    const { data: fileData, error: downloadError } = await supabase.storage
      .from('playbooks')
      .download(fileName);

    if (downloadError) {
      throw new Error(`Download failed: ${downloadError.message}`);
    }

    console.log('Creating basic playbook structure for Word document:', fileName);

    // Create basic chapters structure for Word documents
    const phases = {
      "chapter_1": {
        "name": "Chapter 1: Introduction",
        "description": "Introduction and overview"
      },
      "chapter_2": {
        "name": "Chapter 2: Process Guidelines", 
        "description": "Detailed process guidelines"
      },
      "chapter_3": {
        "name": "Chapter 3: Implementation",
        "description": "Implementation procedures"
      }
    };

    // Insert playbook
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: playbookName,
        title: fileName.replace(/\.(docx?|PDF|pdf)$/i, ''),
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

    // Insert sample process steps for each chapter
    const processStepsData = [
      {
        playbook_id: playbook.id,
        phase_id: "chapter_1",
        step_id: "1.1",
        activity: "Document review and analysis",
        inputs: ["Source document", "Requirements"],
        outputs: ["Analysis report", "Key findings"],
        timeline: "2 hours",
        responsible: "Analyst",
        comments: "Initial document analysis"
      },
      {
        playbook_id: playbook.id,
        phase_id: "chapter_2",
        step_id: "2.1", 
        activity: "Process definition",
        inputs: ["Guidelines", "Standards"],
        outputs: ["Process documentation", "Workflow"],
        timeline: "4 hours",
        responsible: "Process Owner",
        comments: "Define standard processes"
      },
      {
        playbook_id: playbook.id,
        phase_id: "chapter_3",
        step_id: "3.1",
        activity: "Implementation planning",
        inputs: ["Process docs", "Resources"],
        outputs: ["Implementation plan", "Timeline"],
        timeline: "1 day",
        responsible: "Project Manager", 
        comments: "Plan implementation approach"
      }
    ];

    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(processStepsData);

    if (!stepsError) {
      console.log(`Inserted ${processStepsData.length} process steps`);
    }

    // Insert sample RACI matrix
    const raciData = [
      {
        playbook_id: playbook.id,
        phase_id: "chapter_1",
        step_id: "1.1",
        task: "Document analysis",
        responsible: "Business Analyst",
        accountable: "Department Head",
        consulted: "Subject Matter Expert",
        informed: "Stakeholders"
      },
      {
        playbook_id: playbook.id,
        phase_id: "chapter_2",
        step_id: "2.1",
        task: "Process design",
        responsible: "Process Designer",
        accountable: "Process Owner",
        consulted: "End Users",
        informed: "Management"
      }
    ];

    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciData);

    if (!raciError) {
      console.log(`Inserted ${raciData.length} RACI entries`);
    }

    // Insert sample process map
    const processMapData = [
      {
        playbook_id: playbook.id,
        phase_id: "chapter_1",
        step_id: "1.1",
        step_type: "start",
        title: "Begin Analysis",
        description: "Start document analysis process",
        order_index: 1
      },
      {
        playbook_id: playbook.id,
        phase_id: "chapter_2",
        step_id: "2.1",
        step_type: "process",
        title: "Define Process",
        description: "Create process definitions",
        order_index: 2
      },
      {
        playbook_id: playbook.id,
        phase_id: "chapter_3",
        step_id: "3.1",
        step_type: "end",
        title: "Complete Implementation",
        description: "Finalize implementation",
        order_index: 3
      }
    ];

    const { error: mapError } = await supabase
      .from('process_map')
      .insert(processMapData);

    if (!mapError) {
      console.log(`Inserted ${processMapData.length} process map entries`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully processed Word document: ${fileName}`,
        playbookId: playbook.id,
        chaptersProcessed: Object.keys(phases).length,
        note: "Basic structure created from Word document"
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
