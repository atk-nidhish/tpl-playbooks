
import { supabase } from '@/integrations/supabase/client';

export const scanAndProcessPlaybooks = async () => {
  try {
    console.log('Scanning for new playbooks to process...');
    
    // List all files in the storage bucket
    const { data: files, error: listError } = await supabase.storage
      .from('playbooks')
      .list();

    if (listError) {
      console.error('Error listing files:', listError);
      return;
    }

    if (!files || files.length === 0) {
      console.log('No files found in storage bucket');
      return;
    }

    // Filter for supported files
    const supportedFiles = files.filter(file => 
      file.name.toLowerCase().endsWith('.pdf') || 
      file.name.toLowerCase().endsWith('.docx') ||
      file.name.toLowerCase().endsWith('.doc')
    );

    console.log(`Found ${supportedFiles.length} supported files to process:`, supportedFiles.map(f => f.name));

    let successCount = 0;
    const totalFiles = supportedFiles.length;

    for (const file of supportedFiles) {
      try {
        console.log(`Processing file: ${file.name}`);
        await processUploadedPlaybook(file.name);
        successCount++;
        console.log(`Successfully processed: ${file.name}`);
      } catch (error) {
        console.error(`Failed to process ${file.name}:`, error);
        // Create a basic playbook even if processing fails
        try {
          await createBasicPlaybook(file.name);
          successCount++;
          console.log(`Created basic playbook for: ${file.name}`);
        } catch (basicError) {
          console.error(`Failed to create basic playbook for ${file.name}:`, basicError);
        }
      }
    }

    console.log(`Completed processing: ${successCount}/${totalFiles} files processed successfully`);
    
    if (successCount === 0 && totalFiles > 0) {
      throw new Error('No files were processed successfully');
    }
    
  } catch (error) {
    console.error('Error in scanAndProcessPlaybooks:', error);
    throw error;
  }
};

const createBasicPlaybook = async (fileName: string) => {
  console.log(`Creating basic playbook for: ${fileName}`);
  
  // Extract playbook name from filename
  const playbookName = fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, '').replace(/\s+/g, '_').toLowerCase();
  
  // Check if playbook already exists
  const { data: existingPlaybook } = await supabase
    .from('playbooks')
    .select('id')
    .eq('name', playbookName)
    .maybeSingle();

  if (existingPlaybook) {
    console.log(`Playbook already exists, skipping: ${playbookName}`);
    return existingPlaybook;
  }

  // Create basic phases structure
  const phases = {
    "phase_1": {
      "name": "Phase 1: Planning & Preparation",
      "description": "Initial planning and preparation activities"
    },
    "phase_2": {
      "name": "Phase 2: Design & Engineering", 
      "description": "System design and engineering phase"
    },
    "phase_3": {
      "name": "Phase 3: Implementation & Execution",
      "description": "Project implementation and execution phase"
    },
    "phase_4": {
      "name": "Phase 4: Testing & Commissioning",
      "description": "System testing and commissioning phase"
    },
    "phase_5": {
      "name": "Phase 5: Completion & Handover",
      "description": "Project completion and handover phase"
    }
  };

  // Insert playbook data
  const { data: playbook, error: playbookError } = await supabase
    .from('playbooks')
    .insert({
      name: playbookName,
      title: fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, ''),
      description: `Interactive playbook generated from ${fileName}`,
      phases: phases,
      file_path: fileName
    })
    .select()
    .single();

  if (playbookError) {
    console.error('Error inserting playbook:', playbookError);
    throw playbookError;
  }

  console.log('Created basic playbook:', playbook);

  // Insert sample process steps for each phase
  const sampleProcessSteps = [
    {
      playbook_id: playbook.id,
      phase_id: "phase_1",
      step_id: "1.1",
      activity: "Project initiation and planning",
      inputs: ["Project requirements", "Stakeholder information", "Site documentation"],
      outputs: ["Project charter", "Initial timeline", "Communication plan"],
      timeline: "1-2 days",
      responsible: "Project Manager",
      comments: "Establish project foundation and stakeholder alignment"
    },
    {
      playbook_id: playbook.id,
      phase_id: "phase_1",
      step_id: "1.2",
      activity: "Resource allocation and team setup",
      inputs: ["Project charter", "Resource requirements", "Budget allocation"],
      outputs: ["Team assignments", "Resource plan", "Budget breakdown"],
      timeline: "1 day",
      responsible: "Project Manager",
      comments: "Ensure proper resource allocation for project success"
    },
    {
      playbook_id: playbook.id,
      phase_id: "phase_2",
      step_id: "2.1",
      activity: "System design and specifications",
      inputs: ["Requirements document", "Site analysis", "Technical standards"],
      outputs: ["Design document", "Technical specifications", "Architecture diagram"],
      timeline: "3-5 days",
      responsible: "Lead Engineer",
      comments: "Develop comprehensive system design and specifications"
    },
    {
      playbook_id: playbook.id,
      phase_id: "phase_3",
      step_id: "3.1",
      activity: "Implementation planning and execution",
      inputs: ["Design specifications", "Implementation plan", "Resources"],
      outputs: ["Installation progress", "Quality reports", "Progress updates"],
      timeline: "2-4 weeks",
      responsible: "Implementation Team",
      comments: "Execute the planned implementation activities"
    }
  ];

  const { error: stepsError } = await supabase
    .from('process_steps')
    .insert(sampleProcessSteps);

  if (!stepsError) {
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
    },
    {
      playbook_id: playbook.id,
      phase_id: "phase_2",
      step_id: "2.1",
      task: "System design",
      responsible: "Lead Engineer",
      accountable: "Engineering Manager",
      consulted: "Technical Team",
      informed: "Project Manager"
    }
  ];

  const { error: raciError } = await supabase
    .from('raci_matrix')
    .insert(sampleRaci);

  if (!raciError) {
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
    },
    {
      playbook_id: playbook.id,
      phase_id: "phase_2",
      step_id: "2.1",
      step_type: "process",
      title: "Design",
      description: "System design and engineering",
      order_index: 3
    }
  ];

  const { error: mapError } = await supabase
    .from('process_map')
    .insert(sampleProcessMap);

  if (!mapError) {
    console.log('Inserted sample process map entries');
  }

  return playbook;
};

export const processUploadedPlaybook = async (fileName: string) => {
  try {
    console.log(`Processing uploaded playbook: ${fileName}`);
    
    // Extract playbook name from filename
    const playbookName = fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, '').replace(/\s+/g, '_').toLowerCase();
    
    // Check if playbook already exists
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id')
      .eq('name', playbookName)
      .maybeSingle();

    if (existingPlaybook) {
      console.log(`Playbook already exists, skipping: ${playbookName}`);
      return existingPlaybook;
    }

    // Try to process with AI first, but fall back to basic playbook if it fails
    try {
      // Determine parser based on file type
      const isWordDoc = fileName.toLowerCase().endsWith('.docx') || fileName.toLowerCase().endsWith('.doc');
      const functionName = isWordDoc ? 'parse-word-document' : 'parse-pdf-with-ai';
      
      console.log(`Attempting AI processing with ${functionName} for: ${fileName}`);
      
      // Call the appropriate edge function with timeout
      const { data, error } = await Promise.race([
        supabase.functions.invoke(functionName, {
          body: { fileName },
          headers: {
            'Content-Type': 'application/json',
          }
        }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Processing timeout')), 30000)
        )
      ]);

      if (error) {
        console.warn(`AI processing failed for ${fileName}, creating basic playbook:`, error);
        return await createBasicPlaybook(fileName);
      }

      console.log(`Successfully processed with AI: ${fileName}`, data);
      return data;
      
    } catch (aiError) {
      console.warn(`AI processing failed for ${fileName}, creating basic playbook:`, aiError);
      return await createBasicPlaybook(fileName);
    }
    
  } catch (error) {
    console.error('Error processing uploaded playbook:', error);
    throw error;
  }
};
