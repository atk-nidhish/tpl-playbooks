
import { supabase } from '@/integrations/supabase/client';

export const createWindCommissioningPlaybook = async (): Promise<string> => {
  console.log('Creating Wind Commissioning Playbook...');

  // Create the playbook with properly ordered phases
  const playbookData = {
    name: 'wind-commissioning-playbook',
    title: 'Wind Commissioning',
    description: 'Comprehensive wind project commissioning and approvals playbook',
    phases: {
      'chapter-1': {
        name: 'Chapter 1 - Project Initialization',
        description: 'Initial project setup and planning phase'
      },
      'chapter-2': {
        name: 'Chapter 2 - Pre-Commissioning',
        description: 'Pre-commissioning activities and preparations'
      },
      'chapter-3': {
        name: 'Chapter 3 - Approvals for First Time Charging',
        description: 'This chapter covers the approvals required for first-time charging of the blocks'
      },
      'chapter-3-1': {
        name: 'Chapter 3.1 - RLDC User Registration',
        description: 'This chapter covers the process for RLDC user registration',
        parent: 'chapter-3'
      },
      'chapter-3-2': {
        name: 'Chapter 3.2 - CEIG Approval & FTC Intimation to RLDC',
        description: 'This chapter covers the process for intimating the RLDC for FTC and receiving approval for the same',
        parent: 'chapter-3'
      },
      'chapter-4': {
        name: 'Chapter 4 - First Time Charging (FTC) & Commercial Operation',
        description: 'This chapter covers the first-time charging process, trial run and initiation of commercial operations'
      },
      'chapter-5': {
        name: 'Chapter 5 - Final Documentation',
        description: 'Final project documentation and handover'
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

  // Process Steps for Chapter 3.1
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'S',
      activity: 'Chief Regulatory directs Regulatory Approvals Head (RAH) to initiate the RLDC approval process for First Time Charging (FTC)',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Chief Regulatory',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P1',
      activity: 'RAH initiates collection of documents required for RLDC User Registration. RLDC User Registration requires (i) grid compliance report and (ii) technical and modelling data',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P2',
      activity: 'RAH requests the OEM SPOC to prepare the grid code compliance report',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P3',
      activity: 'OEM SPOC selects and onboards a third-party consultant to prepare the grid code compliance report',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P4',
      activity: 'OEM SPOC ensures the consultant conducts the required simulations. OEM SPOC receives the grid code compliance report from the consultant',
      inputs: [],
      outputs: ['Grid Code Compliance Report'],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P5',
      activity: 'OEM SPOC shares the Grid Code Compliance Report with the RAH',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P6',
      activity: 'RAH reviews the report and seeks clarifications if any',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    }
  ];

  // RACI Matrix for Chapter 3.1
  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'S',
      task: 'Direct Regulatory Approvals Head (RAH) to initiate the RLDC approval process for First Time Charging (FTC)',
      responsible: 'Chief Regulatory',
      accountable: '',
      consulted: '',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P1',
      task: 'Initiate collection of documents required for RLDC User Registration',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P2',
      task: 'Request the OEM SPOC to prepare the grid code compliance report',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: 'OEM SPOC, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P3',
      task: 'Select and onboard a third-party consultant to prepare the grid code compliance report',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P4',
      task: 'Ensure the consultant conducts the required simulations and receives the grid code compliance report',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P5',
      task: 'Share the Grid Code Compliance Report with the RAH',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: '',
      informed: 'Regulatory Approvals Head, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P6',
      task: 'Review the report and seek clarifications, if any',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P7',
      task: 'Provide answers to any clarifications from the RAH',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: '',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P8',
      task: 'Request Wind Engineering Head (WEH) to provide the necessary technical and modelling data, and share the relevant annexure templates containing data requirements',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: 'Wind Engineering Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P9',
      task: 'Receive the requisite data from WEH and prepare the annexures required for user registration',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    }
  ];

  // Process Map for Chapter 3.1
  const processMap = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'S',
      step_type: 'start',
      title: 'Direct Regulatory Approvals Head',
      description: 'Chief Regulatory directs RAH to initiate the RLDC approval process for First Time Charging',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P2',
      step_type: 'process',
      title: 'Request the OEM SPOC to prepare grid code compliance report',
      description: 'RAH requests the OEM SPOC to prepare the grid code compliance report',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P4',
      step_type: 'process',
      title: 'Ensure consultant conducts simulations and receives report',
      description: 'OEM SPOC ensures the consultant conducts the required simulations and receives the grid code compliance report',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P5',
      step_type: 'process',
      title: 'Share the Grid Code Compliance Report with the RAH',
      description: 'OEM SPOC shares the Grid Code Compliance Report with the RAH',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P6',
      step_type: 'decision',
      title: 'Review the report and seek clarifications if any',
      description: 'RAH reviews the report and seeks clarifications if any',
      order_index: 7
    }
  ];

  try {
    // Insert process steps
    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(processSteps);

    if (stepsError) {
      console.error('Error inserting process steps:', stepsError);
      throw stepsError;
    }

    // Insert RACI matrix
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciMatrix);

    if (raciError) {
      console.error('Error inserting RACI matrix:', raciError);
      throw raciError;
    }

    // Insert process map
    const { error: mapError } = await supabase
      .from('process_map')
      .insert(processMap);

    if (mapError) {
      console.error('Error inserting process map:', mapError);
      throw mapError;
    }

    console.log('Successfully created Wind Commissioning Playbook with all data');
    return playbookId;
  } catch (error) {
    console.error('Error creating Wind Commissioning Playbook:', error);
    throw error;
  }
};
