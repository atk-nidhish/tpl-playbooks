
import { supabase } from '@/integrations/supabase/client';

export const reprocessExistingPlaybooks = async () => {
  try {
    console.log('Starting reprocessing of existing playbooks...');
    
    // Get all existing playbooks
    const { data: playbooks, error: playbooksError } = await supabase
      .from('playbooks')
      .select('*');

    if (playbooksError) {
      console.error('Error fetching playbooks:', playbooksError);
      throw playbooksError;
    }

    if (!playbooks || playbooks.length === 0) {
      console.log('No playbooks found to reprocess');
      return;
    }

    console.log(`Found ${playbooks.length} playbooks to reprocess`);

    for (const playbook of playbooks) {
      console.log(`Reprocessing playbook: ${playbook.title}`);
      
      try {
        await reprocessSinglePlaybook(playbook);
        console.log(`Successfully reprocessed: ${playbook.title}`);
      } catch (error) {
        console.error(`Failed to reprocess ${playbook.title}:`, error);
      }
    }

    console.log('Completed reprocessing all playbooks');
    
  } catch (error) {
    console.error('Error in reprocessExistingPlaybooks:', error);
    throw error;
  }
};

const reprocessSinglePlaybook = async (playbook: any) => {
  const { id: playbookId, phases, title, file_path } = playbook;
  
  if (!phases || Object.keys(phases).length === 0) {
    console.log(`Playbook ${title} has no phases, skipping`);
    return;
  }

  // Check if playbook already has process steps
  const { data: existingSteps } = await supabase
    .from('process_steps')
    .select('id')
    .eq('playbook_id', playbookId)
    .limit(1);

  const { data: existingRaci } = await supabase
    .from('raci_matrix')
    .select('id')
    .eq('playbook_id', playbookId)
    .limit(1);

  const { data: existingMap } = await supabase
    .from('process_map')
    .select('id')
    .eq('playbook_id', playbookId)
    .limit(1);

  // Only reprocess if missing content
  const needsProcessSteps = !existingSteps || existingSteps.length === 0;
  const needsRaci = !existingRaci || existingRaci.length === 0;
  const needsProcessMap = !existingMap || existingMap.length === 0;

  if (!needsProcessSteps && !needsRaci && !needsProcessMap) {
    console.log(`Playbook ${title} already has complete content`);
    return;
  }

  console.log(`Populating missing content for: ${title}`);
  
  // Determine document type from filename and phases
  const filename = file_path?.toLowerCase() || title.toLowerCase();
  let documentType = "procedure";
  
  if (filename.includes('commissioning') || 
      Object.keys(phases).some(key => phases[key].name?.toLowerCase().includes('commissioning'))) {
    documentType = "commissioning";
  } else if (filename.includes('installation') || 
             Object.keys(phases).some(key => phases[key].name?.toLowerCase().includes('installation'))) {
    documentType = "installation";
  } else if (filename.includes('maintenance') || 
             Object.keys(phases).some(key => phases[key].name?.toLowerCase().includes('maintenance'))) {
    documentType = "maintenance";
  } else if (filename.includes('test') || 
             Object.keys(phases).some(key => phases[key].name?.toLowerCase().includes('test'))) {
    documentType = "testing";
  }

  // Create enhanced process steps if needed
  if (needsProcessSteps) {
    const processStepsData = [];
    
    Object.keys(phases).forEach((phaseId, index) => {
      const stepNumber = index + 1;
      const phase = phases[phaseId];
      
      // Create 2-3 steps per phase for more detailed content
      for (let i = 1; i <= 2; i++) {
        processStepsData.push({
          playbook_id: playbookId,
          phase_id: phaseId,
          step_id: `${stepNumber}.${i}`,
          activity: i === 1 ? 
            `Initiate ${phase.name} Activities` : 
            `Complete ${phase.name} Deliverables`,
          inputs: i === 1 ? 
            [`${phase.name} requirements`, 'Previous phase outputs', 'Documentation templates'] :
            [`${phase.name} work products`, 'Quality checklists', 'Stakeholder feedback'],
          outputs: i === 1 ? 
            [`${phase.name} plan`, 'Resource assignments', 'Timeline updates'] :
            [`${phase.name} deliverables`, 'Quality reports', 'Phase completion sign-off'],
          timeline: `${stepNumber + (i-1) * 0.5}-${stepNumber + i * 0.5} days`,
          responsible: getResponsibleRole(documentType),
          comments: `Enhanced ${phase.name} activity. Document: ${file_path || title}. Step ${i} of ${phase.name} execution.`
        });
      }
    });

    if (processStepsData.length > 0) {
      const { error: stepsError } = await supabase
        .from('process_steps')
        .insert(processStepsData);

      if (stepsError) {
        console.error('Error inserting process steps:', stepsError);
      } else {
        console.log(`Inserted ${processStepsData.length} process steps for ${title}`);
      }
    }
  }

  // Create RACI matrix if needed
  if (needsRaci) {
    const raciData = [];
    
    Object.keys(phases).forEach((phaseId, index) => {
      const stepNumber = index + 1;
      const phase = phases[phaseId];
      
      for (let i = 1; i <= 2; i++) {
        raciData.push({
          playbook_id: playbookId,
          phase_id: phaseId,
          step_id: `${stepNumber}.${i}`,
          task: i === 1 ? `${phase.name} Initiation` : `${phase.name} Completion`,
          responsible: getResponsibleRole(documentType),
          accountable: 'Project Manager',
          consulted: getConsultedRole(documentType),
          informed: 'Stakeholders'
        });
      }
    });

    if (raciData.length > 0) {
      const { error: raciError } = await supabase
        .from('raci_matrix')
        .insert(raciData);

      if (raciError) {
        console.error('Error inserting RACI matrix:', raciError);
      } else {
        console.log(`Inserted ${raciData.length} RACI entries for ${title}`);
      }
    }
  }

  // Create process map if needed
  if (needsProcessMap) {
    const processMapData = [];
    
    Object.keys(phases).forEach((phaseId, index) => {
      const stepNumber = index + 1;
      const phase = phases[phaseId];
      const totalPhases = Object.keys(phases).length;
      
      processMapData.push({
        playbook_id: playbookId,
        phase_id: phaseId,
        step_id: `${stepNumber}.1`,
        step_type: index === 0 ? "start" : index === totalPhases - 1 ? "end" : "process",
        title: phase.name,
        description: phase.description || `Execute ${phase.name} activities and deliverables`,
        order_index: stepNumber
      });
    });

    if (processMapData.length > 0) {
      const { error: mapError } = await supabase
        .from('process_map')
        .insert(processMapData);

      if (mapError) {
        console.error('Error inserting process map:', mapError);
      } else {
        console.log(`Inserted ${processMapData.length} process map entries for ${title}`);
      }
    }
  }
};

const getResponsibleRole = (documentType: string): string => {
  switch (documentType) {
    case 'commissioning':
      return 'Commissioning Engineer';
    case 'installation':
      return 'Installation Technician';
    case 'maintenance':
      return 'Maintenance Technician';
    case 'testing':
      return 'Test Engineer';
    default:
      return 'Technical Lead';
  }
};

const getConsultedRole = (documentType: string): string => {
  switch (documentType) {
    case 'commissioning':
      return 'Design Engineer';
    case 'installation':
      return 'System Architect';
    case 'maintenance':
      return 'Operations Manager';
    case 'testing':
      return 'Quality Assurance';
    default:
      return 'Subject Matter Expert';
  }
};
