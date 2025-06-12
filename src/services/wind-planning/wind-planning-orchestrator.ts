
import { supabase } from '@/integrations/supabase/client';
import { section1_1Data } from './section-1-1-data';
import { section1_2Data } from './section-1-2-data';
import { section2_1Data } from './section-2-1-data';

export const createWindPlanningPlaybook = async (): Promise<string> => {
  console.log('Creating Wind Planning Playbook...');

  // First, check if playbook already exists
  const { data: existingPlaybook } = await supabase
    .from('playbooks')
    .select('id')
    .eq('name', 'wind-planning')
    .single();

  if (existingPlaybook) {
    console.log('Wind Planning Playbook already exists, clearing existing data...');
    
    // Clear existing data for this playbook
    await supabase.from('process_steps').delete().eq('playbook_id', existingPlaybook.id);
    await supabase.from('raci_matrix').delete().eq('playbook_id', existingPlaybook.id);
    await supabase.from('process_map').delete().eq('playbook_id', existingPlaybook.id);
    
    const playbookId = existingPlaybook.id;
    
    // Insert fresh data
    await insertPlaybookData(playbookId);
    
    console.log('Successfully updated Wind Planning Playbook data');
    return playbookId;
  }

  // Create new playbook if it doesn't exist
  const playbookData = {
    name: 'wind-planning',
    title: 'Wind - Planning',
    description: 'Wind Project Planning Playbook',
    phases: {
      'section-1-1': {
        name: 'Section 1.1 - Project Plan Preparation During Bidding',
        description: 'This section covers Planning for project phases from RFP participation to conceptualization up to execution & delivery'
      },
      'section-1-2': {
        name: 'Section 1.2 - Project Schedule and Execution Approach',
        description: 'This section covers project schedule development and execution approach planning'
      },
      'section-2-1': {
        name: 'Section 2.1 - Scope Management Plan',
        description: 'This section covers the development of Work Breakdown Structure (WBS) and project scope management'
      }
    }
  };

  const { data: playbook, error: playbookError } = await supabase
    .from('playbooks')
    .insert(playbookData)
    .select('id')
    .single();

  if (playbookError) {
    console.error('Error creating playbook:', playbookError);
    throw playbookError;
  }

  const playbookId = playbook.id;
  console.log(`Created playbook with ID: ${playbookId}`);

  await insertPlaybookData(playbookId);

  console.log('Successfully created Wind Planning Playbook with all data');
  return playbookId;
};

const insertPlaybookData = async (playbookId: string) => {
  // Prepare all process steps with playbook_id and phase_id
  const allProcessSteps = [
    ...section1_1Data.processSteps.map(step => ({
      ...step,
      playbook_id: playbookId,
      phase_id: 'section-1-1'
    })),
    ...section1_2Data.processSteps.map(step => ({
      ...step,
      playbook_id: playbookId,
      phase_id: 'section-1-2'
    })),
    ...section2_1Data.processSteps.map(step => ({
      ...step,
      playbook_id: playbookId,
      phase_id: 'section-2-1'
    }))
  ];

  // Prepare all RACI matrix entries with playbook_id and phase_id
  const allRaciMatrix = [
    ...section1_1Data.raciMatrix.map(raci => ({
      ...raci,
      playbook_id: playbookId,
      phase_id: 'section-1-1'
    })),
    ...section1_2Data.raciMatrix.map(raci => ({
      ...raci,
      playbook_id: playbookId,
      phase_id: 'section-1-2'
    })),
    ...section2_1Data.raciMatrix.map(raci => ({
      ...raci,
      playbook_id: playbookId,
      phase_id: 'section-2-1'
    }))
  ];

  // Prepare all process map entries with playbook_id and phase_id
  const allProcessMap = [
    ...section1_1Data.processMap.map(map => ({
      ...map,
      playbook_id: playbookId,
      phase_id: 'section-1-1'
    })),
    ...section1_2Data.processMap.map(map => ({
      ...map,
      playbook_id: playbookId,
      phase_id: 'section-1-2'
    })),
    ...section2_1Data.processMap.map(map => ({
      ...map,
      playbook_id: playbookId,
      phase_id: 'section-2-1'
    }))
  ];

  console.log(`Inserting ${allProcessSteps.length} process steps...`);
  console.log(`Inserting ${allRaciMatrix.length} RACI entries...`);
  console.log(`Inserting ${allProcessMap.length} process map entries...`);

  try {
    // Insert process steps
    if (allProcessSteps.length > 0) {
      const { error: stepsError } = await supabase
        .from('process_steps')
        .insert(allProcessSteps);

      if (stepsError) {
        console.error('Error inserting process steps:', stepsError);
        throw stepsError;
      }
      console.log('Successfully inserted process steps');
    }

    // Insert RACI matrix
    if (allRaciMatrix.length > 0) {
      const { error: raciError } = await supabase
        .from('raci_matrix')
        .insert(allRaciMatrix);

      if (raciError) {
        console.error('Error inserting RACI matrix:', raciError);
        throw raciError;
      }
      console.log('Successfully inserted RACI matrix');
    }

    // Insert process map
    if (allProcessMap.length > 0) {
      const { error: mapError } = await supabase
        .from('process_map')
        .insert(allProcessMap);

      if (mapError) {
        console.error('Error inserting process map:', mapError);
        throw mapError;
      }
      console.log('Successfully inserted process map');
    }

  } catch (error) {
    console.error('Error inserting playbook data:', error);
    throw error;
  }
};
