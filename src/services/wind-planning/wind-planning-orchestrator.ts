
import { supabase } from '@/integrations/supabase/client';
import { section1_1Data } from './section-1-1-data';
import { section1_2Data } from './section-1-2-data';
import { section1_3Data } from './section-1-3-data';
import { section1_4Data } from './section-1-4-data';
import { section1_5Data } from './section-1-5-data';
import { section1_6Data } from './section-1-6-data';
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
    
    const playbookId = existingPlaybook.id;
    
    // Clear existing data for this playbook with more explicit deletion
    console.log('Deleting existing process steps...');
    const { error: deleteStepsError } = await supabase
      .from('process_steps')
      .delete()
      .eq('playbook_id', playbookId);
    
    if (deleteStepsError) {
      console.error('Error deleting process steps:', deleteStepsError);
    }

    console.log('Deleting existing RACI matrix...');
    const { error: deleteRaciError } = await supabase
      .from('raci_matrix')
      .delete()
      .eq('playbook_id', playbookId);
    
    if (deleteRaciError) {
      console.error('Error deleting RACI matrix:', deleteRaciError);
    }

    console.log('Deleting existing process map...');
    const { error: deleteMapError } = await supabase
      .from('process_map')
      .delete()
      .eq('playbook_id', playbookId);
    
    if (deleteMapError) {
      console.error('Error deleting process map:', deleteMapError);
    }
    
    // Wait a moment to ensure deletions are complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
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
      'section-1-3': {
        name: 'Section 1.3 - Land Finalization Plan',
        description: 'Plan to be created only if Land Parcel hasn\'t already been leased yet'
      },
      'section-1-4': {
        name: 'Section 1.4 - Engineering Plan',
        description: 'This section covers engineering execution planning and quality requirements'
      },
      'section-1-5': {
        name: 'Section 1.5 - Procurement Plan',
        description: 'This section covers procurement planning and package strategy development'
      },
      'section-1-6': {
        name: 'Section 1.6 - Construction Plan',
        description: 'This section covers construction management planning and execution approach'
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
  console.log('Starting to insert playbook data...');
  
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
    ...section1_3Data.processSteps.map(step => ({
      ...step,
      playbook_id: playbookId,
      phase_id: 'section-1-3'
    })),
    ...section1_4Data.processSteps.map(step => ({
      ...step,
      playbook_id: playbookId,
      phase_id: 'section-1-4'
    })),
    ...section1_5Data.processSteps.map(step => ({
      ...step,
      playbook_id: playbookId,
      phase_id: 'section-1-5'
    })),
    ...section1_6Data.processSteps.map(step => ({
      ...step,
      playbook_id: playbookId,
      phase_id: 'section-1-6'
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
    ...section1_3Data.raciMatrix.map(raci => ({
      ...raci,
      playbook_id: playbookId,
      phase_id: 'section-1-3'
    })),
    ...section1_4Data.raciMatrix.map(raci => ({
      ...raci,
      playbook_id: playbookId,
      phase_id: 'section-1-4'
    })),
    ...section1_5Data.raciMatrix.map(raci => ({
      ...raci,
      playbook_id: playbookId,
      phase_id: 'section-1-5'
    })),
    ...section1_6Data.raciMatrix.map(raci => ({
      ...raci,
      playbook_id: playbookId,
      phase_id: 'section-1-6'
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
    ...section1_3Data.processMap.map(map => ({
      ...map,
      playbook_id: playbookId,
      phase_id: 'section-1-3'
    })),
    ...section1_4Data.processMap.map(map => ({
      ...map,
      playbook_id: playbookId,
      phase_id: 'section-1-4'
    })),
    ...section1_5Data.processMap.map(map => ({
      ...map,
      playbook_id: playbookId,
      phase_id: 'section-1-5'
    })),
    ...section1_6Data.processMap.map(map => ({
      ...map,
      playbook_id: playbookId,
      phase_id: 'section-1-6'
    })),
    ...section2_1Data.processMap.map(map => ({
      ...map,
      playbook_id: playbookId,
      phase_id: 'section-2-1'
    }))
  ];

  console.log(`Prepared ${allProcessSteps.length} process steps for insertion`);
  console.log(`Prepared ${allRaciMatrix.length} RACI entries for insertion`);
  console.log(`Prepared ${allProcessMap.length} process map entries for insertion`);

  try {
    // Insert process steps in batches to avoid potential issues
    if (allProcessSteps.length > 0) {
      console.log('Inserting process steps...');
      const { error: stepsError } = await supabase
        .from('process_steps')
        .insert(allProcessSteps);

      if (stepsError) {
        console.error('Error inserting process steps:', stepsError);
        throw stepsError;
      }
      console.log(`Successfully inserted ${allProcessSteps.length} process steps`);
    }

    // Insert RACI matrix
    if (allRaciMatrix.length > 0) {
      console.log('Inserting RACI matrix...');
      const { error: raciError } = await supabase
        .from('raci_matrix')
        .insert(allRaciMatrix);

      if (raciError) {
        console.error('Error inserting RACI matrix:', raciError);
        throw raciError;
      }
      console.log(`Successfully inserted ${allRaciMatrix.length} RACI entries`);
    }

    // Insert process map
    if (allProcessMap.length > 0) {
      console.log('Inserting process map...');
      const { error: mapError } = await supabase
        .from('process_map')
        .insert(allProcessMap);

      if (mapError) {
        console.error('Error inserting process map:', mapError);
        throw mapError;
      }
      console.log(`Successfully inserted ${allProcessMap.length} process map entries`);
    }

    console.log('All playbook data inserted successfully');

  } catch (error) {
    console.error('Error inserting playbook data:', error);
    throw error;
  }
};
