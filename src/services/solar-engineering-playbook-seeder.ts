
import { supabase } from '@/integrations/supabase/client';

export const seedSolarEngineeringData = async (): Promise<string> => {
  console.log('Creating Solar Engineering Playbook...');

  const playbookId = "solar-engineering-playbook-2024";

  // First, check if playbook already exists
  const { data: existingPlaybook } = await supabase
    .from('playbooks')
    .select('id')
    .eq('name', 'solar-engineering')
    .single();

  if (existingPlaybook) {
    console.log('Solar Engineering Playbook already exists, clearing existing data...');
    
    // Clear existing data for this playbook
    console.log('Deleting existing process steps...');
    await supabase
      .from('process_steps')
      .delete()
      .eq('playbook_id', playbookId);

    console.log('Deleting existing RACI matrix...');
    await supabase
      .from('raci_matrix')
      .delete()
      .eq('playbook_id', playbookId);

    console.log('Deleting existing process map...');
    await supabase
      .from('process_map')
      .delete()
      .eq('playbook_id', playbookId);
    
    // Wait a moment to ensure deletions are complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Insert fresh data
    await insertPlaybookData(playbookId);
    
    console.log('Successfully updated Solar Engineering Playbook data');
    return playbookId;
  }

  // Create new playbook if it doesn't exist
  const playbookData = {
    name: 'solar-engineering',
    title: 'Engineering - Solar',
    description: 'Solar Engineering Execution Playbook',
    phases: {
      'chapter-1': {
        name: 'Chapter 1 - Basic Engineering Design Preparation',
        description: 'This chapter covers the preparation of basic engineering design for solar projects'
      },
      'chapter-2-1': {
        name: 'Chapter 2.1 - Owner\'s Engineer Finalization',
        description: 'This chapter covers the finalization of owner\'s engineer for solar projects'
      },
      'chapter-2-2a': {
        name: 'Chapter 2.2A - Site Survey Consultant Finalization',
        description: 'This chapter covers the finalization of site survey consultant'
      },
      'chapter-2-2b': {
        name: 'Chapter 2.2B - Preliminary Works Execution',
        description: 'This chapter covers the execution of preliminary engineering works'
      },
      'chapter-3': {
        name: 'Chapter 3 - Detailed Engineering Design Preparation',
        description: 'This chapter covers the preparation of detailed engineering design'
      },
      'chapter-4': {
        name: 'Chapter 4 - Sign-Off for Detailed Engineering Design',
        description: 'This chapter covers the sign-off process for detailed engineering design'
      },
      'chapter-5': {
        name: 'Chapter 5 - Issue Resolution for Detailed Engineering Design',
        description: 'This chapter covers issue resolution for detailed engineering design'
      },
      'chapter-6': {
        name: 'Chapter 6 - Assessment of OE Empanelment Requirements',
        description: 'This chapter covers the assessment of owner\'s engineer empanelment requirements'
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

  await insertPlaybookData(playbookId);

  console.log('Successfully created Solar Engineering Playbook with all data');
  return playbookId;
};

const insertPlaybookData = async (playbookId: string) => {
  console.log('Starting to insert Solar Engineering playbook data...');
  
  // Sample process steps for each chapter (placeholder data - would need actual content)
  const allProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P1',
      activity: 'Define basic engineering design requirements for solar project',
      inputs: ['Project specifications', 'Site survey data'],
      outputs: ['Basic engineering design document'],
      timeline: '2 weeks',
      responsible: 'Engineering Manager',
      comments: 'Initial preparation phase'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2-1',
      step_id: 'P1',
      activity: 'Identify and evaluate potential owner\'s engineers',
      inputs: ['OE empanelment criteria', 'Project requirements'],
      outputs: ['OE evaluation report'],
      timeline: '1 week',
      responsible: 'Chief Engineering',
      comments: 'Owner\'s engineer selection process'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2-2a',
      step_id: 'P1',
      activity: 'Identify and select site survey consultant',
      inputs: ['Site survey requirements', 'Consultant database'],
      outputs: ['Selected consultant', 'Contract agreement'],
      timeline: '1 week',
      responsible: 'Project Engineering Manager',
      comments: 'Site survey consultant finalization'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2-2b',
      step_id: 'P1',
      activity: 'Execute preliminary engineering works',
      inputs: ['Site survey report', 'Basic design requirements'],
      outputs: ['Preliminary engineering report'],
      timeline: '3 weeks',
      responsible: 'Engineering Team',
      comments: 'Preliminary works execution'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3',
      step_id: 'P1',
      activity: 'Prepare detailed engineering design specifications',
      inputs: ['Preliminary engineering report', 'Project requirements'],
      outputs: ['Detailed engineering specifications'],
      timeline: '4 weeks',
      responsible: 'Senior Engineering Manager',
      comments: 'Detailed engineering preparation'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P1',
      activity: 'Review and approve detailed engineering design',
      inputs: ['Detailed engineering design', 'Review checklist'],
      outputs: ['Approved design', 'Sign-off document'],
      timeline: '1 week',
      responsible: 'Chief Engineering',
      comments: 'Design sign-off process'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P1',
      activity: 'Identify and resolve engineering design issues',
      inputs: ['Design review feedback', 'Issue log'],
      outputs: ['Resolved issues', 'Updated design'],
      timeline: '2 weeks',
      responsible: 'Engineering Team',
      comments: 'Issue resolution process'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-6',
      step_id: 'P1',
      activity: 'Assess OE empanelment requirements and compliance',
      inputs: ['OE performance data', 'Empanelment criteria'],
      outputs: ['OE assessment report'],
      timeline: '1 week',
      responsible: 'Quality Manager',
      comments: 'OE empanelment assessment'
    }
  ];

  // Sample RACI matrix entries
  const allRaciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P1',
      task: 'Define basic engineering design requirements',
      responsible: 'Engineering Manager',
      accountable: 'Chief Engineering',
      consulted: 'Project Manager',
      informed: 'Stakeholders'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2-1',
      step_id: 'P1',
      task: 'Evaluate potential owner\'s engineers',
      responsible: 'Chief Engineering',
      accountable: 'Project Director',
      consulted: 'Technical Team',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2-2a',
      step_id: 'P1',
      task: 'Select site survey consultant',
      responsible: 'Project Engineering Manager',
      accountable: 'Chief Engineering',
      consulted: 'Procurement Team',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2-2b',
      step_id: 'P1',
      task: 'Execute preliminary engineering works',
      responsible: 'Engineering Team',
      accountable: 'Senior Engineering Manager',
      consulted: 'Site Survey Consultant',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3',
      step_id: 'P1',
      task: 'Prepare detailed engineering specifications',
      responsible: 'Senior Engineering Manager',
      accountable: 'Chief Engineering',
      consulted: 'Technical Specialists',
      informed: 'Project Team'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P1',
      task: 'Review and approve detailed design',
      responsible: 'Chief Engineering',
      accountable: 'Project Director',
      consulted: 'Owner\'s Engineer',
      informed: 'All Stakeholders'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P1',
      task: 'Resolve engineering design issues',
      responsible: 'Engineering Team',
      accountable: 'Senior Engineering Manager',
      consulted: 'Technical Experts',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-6',
      step_id: 'P1',
      task: 'Assess OE empanelment requirements',
      responsible: 'Quality Manager',
      accountable: 'Chief Engineering',
      consulted: 'Procurement Team',
      informed: 'Management'
    }
  ];

  // Sample process map entries
  const allProcessMap = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P1',
      step_type: 'process',
      title: 'Basic Engineering Design Preparation',
      description: 'Prepare basic engineering design requirements',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2-1',
      step_id: 'P1',
      step_type: 'process',
      title: 'Owner\'s Engineer Finalization',
      description: 'Finalize owner\'s engineer selection',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2-2a',
      step_id: 'P1',
      step_type: 'process',
      title: 'Site Survey Consultant Finalization',
      description: 'Finalize site survey consultant',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2-2b',
      step_id: 'P1',
      step_type: 'process',
      title: 'Preliminary Works Execution',
      description: 'Execute preliminary engineering works',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3',
      step_id: 'P1',
      step_type: 'process',
      title: 'Detailed Engineering Design Preparation',
      description: 'Prepare detailed engineering design',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P1',
      step_type: 'decision',
      title: 'Sign-Off for Detailed Engineering Design',
      description: 'Review and approve detailed engineering design',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P1',
      step_type: 'process',
      title: 'Issue Resolution',
      description: 'Resolve engineering design issues',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-6',
      step_id: 'P1',
      step_type: 'process',
      title: 'OE Empanelment Assessment',
      description: 'Assess OE empanelment requirements',
      order_index: 1
    }
  ];

  console.log(`Prepared ${allProcessSteps.length} process steps for insertion`);
  console.log(`Prepared ${allRaciMatrix.length} RACI entries for insertion`);
  console.log(`Prepared ${allProcessMap.length} process map entries for insertion`);

  try {
    // Insert process steps
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

    console.log('All Solar Engineering playbook data inserted successfully');

  } catch (error) {
    console.error('Error inserting Solar Engineering playbook data:', error);
    throw error;
  }
};
