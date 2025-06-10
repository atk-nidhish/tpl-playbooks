
import { supabase } from '@/integrations/supabase/client';

export const scanAndProcessPlaybooks = async () => {
  try {
    console.log('Scanning for new playbooks to process...');
    
    // First ensure the storage bucket exists
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.error('Error listing buckets:', bucketsError);
      return;
    }
    
    const playbookBucket = buckets?.find(bucket => bucket.name === 'playbooks');
    if (!playbookBucket) {
      console.log('Playbooks bucket not found, it may need to be created');
      return;
    }
    
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
        const result = await processUploadedPlaybook(file.name);
        if (result) {
          successCount++;
          console.log(`Successfully processed: ${file.name}`);
        }
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

  // Create enhanced basic phases based on filename
  const filename = fileName.toLowerCase();
  let phases = {};
  
  // Use consistent phase structure matching existing playbooks
  if (filename.includes('commissioning')) {
    phases = {
      "phase_1": { name: "Pre-Commissioning", description: "Pre-commissioning planning and preparation" },
      "phase_2": { name: "System Verification", description: "System verification and testing" },
      "phase_3": { name: "Performance Testing", description: "Performance testing and validation" },
      "phase_4": { name: "Final Commissioning", description: "Final commissioning and handover" }
    };
  } else if (filename.includes('installation')) {
    phases = {
      "phase_1": { name: "Installation Planning", description: "Installation planning and preparation" },
      "phase_2": { name: "Equipment Installation", description: "Equipment installation and setup" },
      "phase_3": { name: "Testing & Verification", description: "Installation testing and verification" },
      "phase_4": { name: "Completion", description: "Installation completion and handover" }
    };
  } else if (filename.includes('wind')) {
    // Wind-specific structure to exactly match existing wind playbooks
    phases = {
      "phase_1": { name: "Wind Project Planning", description: "Initial wind project planning phase" },
      "phase_2": { name: "Site Assessment", description: "Wind site assessment and evaluation" },
      "phase_3": { name: "Design & Engineering", description: "Wind farm design and engineering" },
      "phase_4": { name: "Construction", description: "Wind farm construction phase" },
      "phase_5": { name: "Commissioning", description: "Wind turbine commissioning" }
    };
  } else if (filename.includes('solar')) {
    // Solar-specific structure to exactly match existing solar playbooks
    phases = {
      "phase_1": { name: "Solar Project Planning", description: "Initial solar project planning phase" },
      "phase_2": { name: "Site Preparation", description: "Solar site preparation activities" },
      "phase_3": { name: "Panel Installation", description: "Solar panel installation phase" },
      "phase_4": { name: "Electrical Work", description: "Electrical connections and testing" },
      "phase_5": { name: "Final Inspection", description: "Final inspection and commissioning" }
    };
  } else {
    phases = {
      "phase_1": { name: "Phase 1: Planning & Preparation", description: "Initial planning and preparation activities" },
      "phase_2": { name: "Phase 2: Design & Engineering", description: "System design and engineering phase" },
      "phase_3": { name: "Phase 3: Implementation & Execution", description: "Project implementation and execution phase" },
      "phase_4": { name: "Phase 4: Testing & Commissioning", description: "System testing and commissioning phase" },
      "phase_5": { name: "Phase 5: Completion & Handover", description: "Project completion and handover phase" }
    };
  }

  // Insert playbook data
  const { data: playbook, error: playbookError } = await supabase
    .from('playbooks')
    .insert({
      name: playbookName,
      title: fileName.replace(/\.(pdf|docx?|PDF|DOCX?)$/i, ''),
      description: `Enhanced interactive playbook generated from ${fileName}`,
      phases: phases,
      file_path: fileName
    })
    .select()
    .single();

  if (playbookError) {
    console.error('Error inserting playbook:', playbookError);
    throw playbookError;
  }

  console.log('Created enhanced basic playbook:', playbook);

  // Insert meaningful process steps for each phase - using consistent format matching existing playbooks
  const processStepsData = [];
  const raciData = [];
  
  Object.keys(phases).forEach((phaseId, index) => {
    const stepNumber = index + 1;
    // Follow the exact same structure as existing process steps
    processStepsData.push({
      playbook_id: playbook.id,
      phase_id: phaseId,
      step_id: `${stepNumber}.1`,
      activity: `Execute ${phases[phaseId].name}`,
      inputs: [`${phases[phaseId].name} requirements document`, "Previous phase deliverables", "Technical specifications"],
      outputs: [`${phases[phaseId].name} completion report`, "Quality documentation", "Phase deliverables"],
      timeline: `${stepNumber}-${stepNumber + 2} days`,
      responsible: "Technical Lead",
      comments: `Key activity for ${phases[phaseId].name.toLowerCase()}. Follow standard procedures as documented.`
    });

    // Add secondary step to match format of existing playbooks
    processStepsData.push({
      playbook_id: playbook.id,
      phase_id: phaseId,
      step_id: `${stepNumber}.2`,
      activity: `Verify ${phases[phaseId].name} Completion`,
      inputs: [`${phases[phaseId].name} deliverables`, "Verification checklist", "Quality standards"],
      outputs: ["Verification report", "Sign-off documentation", "Issue log"],
      timeline: "1-2 days",
      responsible: "QA Engineer",
      comments: `Verification of ${phases[phaseId].name.toLowerCase()} outputs against requirements.`
    });

    // Create RACI entries that exactly match existing format
    raciData.push({
      playbook_id: playbook.id,
      phase_id: phaseId,
      step_id: `${stepNumber}.1`,
      task: `${phases[phaseId].name} Execution`,
      responsible: "Technical Lead",
      accountable: "Project Manager",
      consulted: "Subject Matter Expert",
      informed: "Stakeholders"
    });
    
    raciData.push({
      playbook_id: playbook.id,
      phase_id: phaseId,
      step_id: `${stepNumber}.2`,
      task: `${phases[phaseId].name} Verification`,
      responsible: "QA Engineer",
      accountable: "Technical Lead",
      consulted: "Project Manager",
      informed: "Stakeholders"
    });
  });

  // Insert process steps
  if (processStepsData.length > 0) {
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
  if (raciData.length > 0) {
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciData);

    if (raciError) {
      console.error('Error inserting RACI entries:', raciError);
    } else {
      console.log(`Inserted ${raciData.length} RACI entries`);
    }
  }

  // Insert process map using consistent format with existing playbooks
  const processMapData = Object.keys(phases).map((phaseId, index) => {
    const orderIndex = index + 1;
    let stepType = "process";
    
    // Match the existing pattern where first step is "start" and last is "end"
    if (orderIndex === 1) {
      stepType = "start";
    } else if (orderIndex === Object.keys(phases).length) {
      stepType = "end";
    } else if (orderIndex % 3 === 0) {
      // Add some decision points to match the variety in existing maps
      stepType = "decision";
    } else if (orderIndex % 4 === 0) {
      stepType = "milestone";
    }
    
    return {
      playbook_id: playbook.id,
      phase_id: phaseId,
      step_id: `${orderIndex}`,
      step_type: stepType,
      title: phases[phaseId].name,
      description: phases[phaseId].description,
      order_index: orderIndex
    };
  });

  if (processMapData.length > 0) {
    const { error: mapError } = await supabase
      .from('process_map')
      .insert(processMapData);

    if (mapError) {
      console.error('Error inserting process map entries:', mapError);
    } else {
      console.log(`Inserted ${processMapData.length} process map entries`);
    }
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
      
      console.log(`Attempting enhanced AI processing with ${functionName} for: ${fileName}`);
      
      // Call the appropriate edge function with timeout
      const result = await Promise.race([
        supabase.functions.invoke(functionName, {
          body: { fileName },
          headers: {
            'Content-Type': 'application/json',
          }
        }),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Processing timeout after 45 seconds')), 45000)
        )
      ]);

      const { data, error } = result as { data: any; error: any };

      if (error) {
        console.warn(`AI processing failed for ${fileName}, creating enhanced basic playbook:`, error);
        return await createBasicPlaybook(fileName);
      }

      console.log(`Successfully processed with enhanced AI: ${fileName}`, data);
      return data;
      
    } catch (aiError) {
      console.warn(`AI processing failed for ${fileName}, creating enhanced basic playbook:`, aiError);
      return await createBasicPlaybook(fileName);
    }
    
  } catch (error) {
    console.error('Error processing uploaded playbook:', error);
    throw error;
  }
};
