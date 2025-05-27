
import { supabase } from '@/integrations/supabase/client';

export const resetAndRecreateChapters = async (playbookId: string) => {
  console.log('Starting chapter data reset and recreation...');

  try {
    // Delete existing data for chapters 3.1, 3.2, and 5
    const chaptersToReset = ['Chapter 3.1', 'Chapter 3.2', 'Chapter 5'];
    
    for (const chapter of chaptersToReset) {
      console.log(`Deleting existing data for ${chapter}...`);
      
      // Delete process steps
      const { error: stepsError } = await supabase
        .from('process_steps')
        .delete()
        .eq('playbook_id', playbookId)
        .eq('phase_id', chapter);
      
      if (stepsError) {
        console.error(`Error deleting process steps for ${chapter}:`, stepsError);
      }

      // Delete RACI matrix
      const { error: raciError } = await supabase
        .from('raci_matrix')
        .delete()
        .eq('playbook_id', playbookId)
        .eq('phase_id', chapter);
      
      if (raciError) {
        console.error(`Error deleting RACI matrix for ${chapter}:`, raciError);
      }

      // Delete process map
      const { error: mapError } = await supabase
        .from('process_map')
        .delete()
        .eq('playbook_id', playbookId)
        .eq('phase_id', chapter);
      
      if (mapError) {
        console.error(`Error deleting process map for ${chapter}:`, mapError);
      }
    }

    // Now recreate Chapter 3.1 - RLDC User Registration
    await createChapter31Data(playbookId);
    
    // Create Chapter 3.2 - CEIG Approval & FTC Intimation
    await createChapter32Data(playbookId);
    
    // Create Chapter 5 - Performance Testing & HOTO
    await createChapter5Data(playbookId);

    console.log('Successfully reset and recreated all chapters');
    return true;
  } catch (error) {
    console.error('Error during chapter reset and recreation:', error);
    throw error;
  }
};

const createChapter31Data = async (playbookId: string) => {
  console.log('Creating Chapter 3.1 data...');
  
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
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
      phase_id: 'Chapter 3.1',
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
      phase_id: 'Chapter 3.1',
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
      phase_id: 'Chapter 3.1',
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
      phase_id: 'Chapter 3.1',
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
      phase_id: 'Chapter 3.1',
      step_id: 'P5',
      activity: 'OEM SPOC shares the Grid Code Compliance Report with the RAH',
      inputs: ['Grid Code Compliance Report'],
      outputs: [],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P6',
      activity: 'RAH reviews the report and seeks clarifications if any',
      inputs: ['Grid Code Compliance Report'],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P7',
      activity: 'OEM SPOC provides answers to any clarifications from the RAH',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P8',
      activity: 'RAH requests Wind Engineering Head (WEH) to provide the necessary technical and modelling data, and shares the relevant annexure templates containing data requirements',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P9',
      activity: 'WEH prepares and submits the technical and modelling data as per the templates',
      inputs: ['Annexure Templates'],
      outputs: ['Technical and Modelling Data'],
      timeline: '',
      responsible: 'Wind Engineering Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P10',
      activity: 'RAH receives the requisite data from WEH and prepares the annexures required for user registration',
      inputs: ['Technical and Modelling Data'],
      outputs: ['User Registration Annexures'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P11',
      activity: 'RAH submits the RLDC User Registration application with all required documents',
      inputs: ['Grid Code Compliance Report', 'User Registration Annexures'],
      outputs: ['RLDC User Registration Application'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P12',
      activity: 'RLDC reviews the application and provides approval for user registration',
      inputs: ['RLDC User Registration Application'],
      outputs: ['RLDC User Registration Approval'],
      timeline: '',
      responsible: 'RLDC',
      comments: ''
    }
  ];

  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'S',
      task: 'Direct Regulatory Approvals Head (RAH) to initiate the RLDC approval process for First Time Charging (FTC)',
      responsible: 'Chief Regulatory',
      accountable: 'Chief Regulatory',
      consulted: '',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P1',
      task: 'Initiate collection of documents required for RLDC User Registration',
      responsible: 'Regulatory Approvals Head',
      accountable: 'Regulatory Approvals Head',
      consulted: '',
      informed: 'Chief Regulatory'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P2',
      task: 'Request the OEM SPOC to prepare the grid code compliance report',
      responsible: 'Regulatory Approvals Head',
      accountable: 'Regulatory Approvals Head',
      consulted: '',
      informed: 'OEM SPOC, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P3',
      task: 'Select and onboard a third-party consultant to prepare the grid code compliance report',
      responsible: 'OEM SPOC',
      accountable: 'OEM SPOC',
      consulted: 'Regulatory Approvals Head',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P4',
      task: 'Ensure the consultant conducts the required simulations and receives the grid code compliance report',
      responsible: 'OEM SPOC',
      accountable: 'OEM SPOC',
      consulted: 'Third-party Consultant',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P5',
      task: 'Share the Grid Code Compliance Report with the RAH',
      responsible: 'OEM SPOC',
      accountable: 'OEM SPOC',
      consulted: '',
      informed: 'Regulatory Approvals Head, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P6',
      task: 'Review the report and seek clarifications, if any',
      responsible: 'Regulatory Approvals Head',
      accountable: 'Regulatory Approvals Head',
      consulted: 'Technical Team',
      informed: 'OEM SPOC'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P7',
      task: 'Provide answers to any clarifications from the RAH',
      responsible: 'OEM SPOC',
      accountable: 'OEM SPOC',
      consulted: 'Third-party Consultant',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P8',
      task: 'Request Wind Engineering Head (WEH) to provide the necessary technical and modelling data',
      responsible: 'Regulatory Approvals Head',
      accountable: 'Regulatory Approvals Head',
      consulted: '',
      informed: 'Wind Engineering Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P9',
      task: 'Prepare and submit the technical and modelling data as per the templates',
      responsible: 'Wind Engineering Head',
      accountable: 'Wind Engineering Head',
      consulted: 'Technical Team',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P10',
      task: 'Receive the requisite data from WEH and prepare the annexures required for user registration',
      responsible: 'Regulatory Approvals Head',
      accountable: 'Regulatory Approvals Head',
      consulted: 'Wind Engineering Head',
      informed: 'Chief Regulatory'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P11',
      task: 'Submit the RLDC User Registration application with all required documents',
      responsible: 'Regulatory Approvals Head',
      accountable: 'Regulatory Approvals Head',
      consulted: '',
      informed: 'Chief Regulatory, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P12',
      task: 'Review the application and provide approval for user registration',
      responsible: 'RLDC',
      accountable: 'RLDC',
      consulted: '',
      informed: 'Regulatory Approvals Head'
    }
  ];

  const processMap = [
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'S',
      step_type: 'start',
      title: 'Initiate RLDC Approval Process',
      description: 'Chief Regulatory directs RAH to initiate the RLDC approval process for First Time Charging',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P1',
      step_type: 'process',
      title: 'Collect Required Documents',
      description: 'RAH initiates collection of documents required for RLDC User Registration',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P2',
      step_type: 'process',
      title: 'Request Grid Code Compliance Report',
      description: 'RAH requests the OEM SPOC to prepare the grid code compliance report',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P3',
      step_type: 'process',
      title: 'Onboard Third-party Consultant',
      description: 'OEM SPOC selects and onboards a third-party consultant',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P4',
      step_type: 'process',
      title: 'Conduct Simulations and Prepare Report',
      description: 'OEM SPOC ensures consultant conducts simulations and receives the report',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P5',
      step_type: 'process',
      title: 'Share Grid Code Compliance Report',
      description: 'OEM SPOC shares the Grid Code Compliance Report with the RAH',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P6',
      step_type: 'decision',
      title: 'Review Report and Seek Clarifications',
      description: 'RAH reviews the report and seeks clarifications if any',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P8',
      step_type: 'process',
      title: 'Request Technical Data',
      description: 'RAH requests Wind Engineering Head to provide technical and modelling data',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P10',
      step_type: 'process',
      title: 'Prepare User Registration Annexures',
      description: 'RAH prepares the annexures required for user registration',
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P11',
      step_type: 'process',
      title: 'Submit RLDC Application',
      description: 'RAH submits the RLDC User Registration application',
      order_index: 10
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.1',
      step_id: 'P12',
      step_type: 'end',
      title: 'Receive RLDC Approval',
      description: 'RLDC reviews and provides approval for user registration',
      order_index: 11
    }
  ];

  // Insert all data
  const { error: stepsError } = await supabase.from('process_steps').insert(processSteps);
  if (stepsError) throw stepsError;

  const { error: raciError } = await supabase.from('raci_matrix').insert(raciMatrix);
  if (raciError) throw raciError;

  const { error: mapError } = await supabase.from('process_map').insert(processMap);
  if (mapError) throw mapError;

  console.log('Chapter 3.1 data created successfully');
};

const createChapter32Data = async (playbookId: string) => {
  console.log('Creating Chapter 3.2 data...');
  
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'S',
      activity: 'RAH initiates CEIG approval process and FTC intimation to RLDC',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P1',
      activity: 'RAH collects required documents for CEIG approval including electrical drawings, protection settings, and compliance certificates',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P2',
      activity: 'RAH submits CEIG approval application with all required documentation',
      inputs: ['Electrical Drawings', 'Protection Settings', 'Compliance Certificates'],
      outputs: ['CEIG Application'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P3',
      activity: 'CEIG reviews the application and conducts site inspection if required',
      inputs: ['CEIG Application'],
      outputs: [],
      timeline: '',
      responsible: 'CEIG Authority',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P4',
      activity: 'CEIG provides approval certificate for first time charging',
      inputs: [],
      outputs: ['CEIG Approval Certificate'],
      timeline: '',
      responsible: 'CEIG Authority',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P5',
      activity: 'RAH prepares FTC intimation letter to RLDC with all supporting documents',
      inputs: ['CEIG Approval Certificate', 'RLDC User Registration Approval'],
      outputs: ['FTC Intimation Letter'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P6',
      activity: 'RAH submits FTC intimation to RLDC and requests approval for first time charging',
      inputs: ['FTC Intimation Letter'],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P7',
      activity: 'RLDC reviews the FTC intimation and provides approval for first time charging',
      inputs: ['FTC Intimation Letter'],
      outputs: ['RLDC FTC Approval'],
      timeline: '',
      responsible: 'RLDC',
      comments: ''
    }
  ];

  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'S',
      task: 'Initiate CEIG approval process and FTC intimation to RLDC',
      responsible: 'Regulatory Approvals Head',
      accountable: 'Regulatory Approvals Head',
      consulted: 'Chief Regulatory',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P1',
      task: 'Collect required documents for CEIG approval',
      responsible: 'Regulatory Approvals Head',
      accountable: 'Regulatory Approvals Head',
      consulted: 'Electrical Engineering Team',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P2',
      task: 'Submit CEIG approval application with all required documentation',
      responsible: 'Regulatory Approvals Head',
      accountable: 'Regulatory Approvals Head',
      consulted: '',
      informed: 'Chief Regulatory, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P3',
      task: 'Review the application and conduct site inspection if required',
      responsible: 'CEIG Authority',
      accountable: 'CEIG Authority',
      consulted: 'Site Team',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P4',
      task: 'Provide approval certificate for first time charging',
      responsible: 'CEIG Authority',
      accountable: 'CEIG Authority',
      consulted: '',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P5',
      task: 'Prepare FTC intimation letter to RLDC with all supporting documents',
      responsible: 'Regulatory Approvals Head',
      accountable: 'Regulatory Approvals Head',
      consulted: 'Legal Team',
      informed: 'Chief Regulatory'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P6',
      task: 'Submit FTC intimation to RLDC and request approval for first time charging',
      responsible: 'Regulatory Approvals Head',
      accountable: 'Regulatory Approvals Head',
      consulted: '',
      informed: 'Chief Regulatory, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P7',
      task: 'Review the FTC intimation and provide approval for first time charging',
      responsible: 'RLDC',
      accountable: 'RLDC',
      consulted: '',
      informed: 'Regulatory Approvals Head'
    }
  ];

  const processMap = [
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'S',
      step_type: 'start',
      title: 'Initiate CEIG & FTC Process',
      description: 'RAH initiates CEIG approval process and FTC intimation to RLDC',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P1',
      step_type: 'process',
      title: 'Collect CEIG Documents',
      description: 'RAH collects required documents for CEIG approval',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P2',
      step_type: 'process',
      title: 'Submit CEIG Application',
      description: 'RAH submits CEIG approval application with documentation',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P3',
      step_type: 'decision',
      title: 'CEIG Review & Inspection',
      description: 'CEIG reviews application and conducts site inspection if required',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P4',
      step_type: 'milestone',
      title: 'Receive CEIG Approval',
      description: 'CEIG provides approval certificate for first time charging',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P5',
      step_type: 'process',
      title: 'Prepare FTC Intimation',
      description: 'RAH prepares FTC intimation letter to RLDC with supporting documents',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P6',
      step_type: 'process',
      title: 'Submit FTC Intimation',
      description: 'RAH submits FTC intimation to RLDC',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 3.2',
      step_id: 'P7',
      step_type: 'end',
      title: 'Receive RLDC FTC Approval',
      description: 'RLDC reviews and provides approval for first time charging',
      order_index: 8
    }
  ];

  // Insert all data
  const { error: stepsError } = await supabase.from('process_steps').insert(processSteps);
  if (stepsError) throw stepsError;

  const { error: raciError } = await supabase.from('raci_matrix').insert(raciMatrix);
  if (raciError) throw raciError;

  const { error: mapError } = await supabase.from('process_map').insert(processMap);
  if (mapError) throw mapError;

  console.log('Chapter 3.2 data created successfully');
};

const createChapter5Data = async (playbookId: string) => {
  console.log('Creating Chapter 5 data...');
  
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'S',
      activity: 'Commissioning Head initiates performance testing and handover to O&M process',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Commissioning Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P1',
      activity: 'Commissioning team conducts comprehensive performance testing of wind turbines',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Commissioning Team',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P2',
      activity: 'Performance testing includes power curve verification, noise level testing, and grid compliance verification',
      inputs: [],
      outputs: ['Performance Test Results'],
      timeline: '',
      responsible: 'Commissioning Team',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P3',
      activity: 'OEM conducts final inspection and provides warranty certificate',
      inputs: ['Performance Test Results'],
      outputs: ['Warranty Certificate'],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P4',
      activity: 'Commissioning team prepares handover documentation package',
      inputs: ['Performance Test Results', 'Warranty Certificate'],
      outputs: ['Handover Documentation'],
      timeline: '',
      responsible: 'Commissioning Team',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P5',
      activity: 'O&M team reviews handover documentation and conducts site familiarization',
      inputs: ['Handover Documentation'],
      outputs: [],
      timeline: '',
      responsible: 'O&M Team',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P6',
      activity: 'Knowledge transfer sessions conducted between commissioning and O&M teams',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Commissioning Team, O&M Team',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P7',
      activity: 'O&M team confirms readiness to take over operations and maintenance',
      inputs: [],
      outputs: ['O&M Readiness Confirmation'],
      timeline: '',
      responsible: 'O&M Team',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P8',
      activity: 'Formal handover ceremony conducted and HOTO certificate issued',
      inputs: ['O&M Readiness Confirmation'],
      outputs: ['HOTO Certificate'],
      timeline: '',
      responsible: 'Commissioning Head, O&M Head',
      comments: ''
    }
  ];

  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'S',
      task: 'Initiate performance testing and handover to O&M process',
      responsible: 'Commissioning Head',
      accountable: 'Commissioning Head',
      consulted: 'Project Manager',
      informed: 'O&M Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P1',
      task: 'Conduct comprehensive performance testing of wind turbines',
      responsible: 'Commissioning Team',
      accountable: 'Commissioning Head',
      consulted: 'OEM SPOC',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P2',
      task: 'Perform power curve verification, noise level testing, and grid compliance verification',
      responsible: 'Commissioning Team',
      accountable: 'Commissioning Head',
      consulted: 'Technical Team',
      informed: 'Project Manager, OEM SPOC'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P3',
      task: 'Conduct final inspection and provide warranty certificate',
      responsible: 'OEM SPOC',
      accountable: 'OEM SPOC',
      consulted: 'Commissioning Team',
      informed: 'Commissioning Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P4',
      task: 'Prepare handover documentation package',
      responsible: 'Commissioning Team',
      accountable: 'Commissioning Head',
      consulted: 'Technical Team',
      informed: 'O&M Team'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P5',
      task: 'Review handover documentation and conduct site familiarization',
      responsible: 'O&M Team',
      accountable: 'O&M Head',
      consulted: 'Commissioning Team',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P6',
      task: 'Conduct knowledge transfer sessions between commissioning and O&M teams',
      responsible: 'Commissioning Team, O&M Team',
      accountable: 'Commissioning Head, O&M Head',
      consulted: 'Technical Team',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P7',
      task: 'Confirm readiness to take over operations and maintenance',
      responsible: 'O&M Team',
      accountable: 'O&M Head',
      consulted: 'Commissioning Head',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P8',
      task: 'Conduct formal handover ceremony and issue HOTO certificate',
      responsible: 'Commissioning Head, O&M Head',
      accountable: 'Commissioning Head, O&M Head',
      consulted: 'Project Manager',
      informed: 'Senior Management'
    }
  ];

  const processMap = [
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'S',
      step_type: 'start',
      title: 'Initiate Performance Testing & HOTO',
      description: 'Commissioning Head initiates performance testing and handover to O&M process',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P1',
      step_type: 'process',
      title: 'Conduct Performance Testing',
      description: 'Commissioning team conducts comprehensive performance testing',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P2',
      step_type: 'process',
      title: 'Verify Performance Parameters',
      description: 'Performance testing includes power curve, noise level, and grid compliance verification',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P3',
      step_type: 'milestone',
      title: 'OEM Final Inspection',
      description: 'OEM conducts final inspection and provides warranty certificate',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P4',
      step_type: 'process',
      title: 'Prepare Handover Documentation',
      description: 'Commissioning team prepares handover documentation package',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P5',
      step_type: 'process',
      title: 'O&M Documentation Review',
      description: 'O&M team reviews handover documentation and conducts site familiarization',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P6',
      step_type: 'process',
      title: 'Knowledge Transfer Sessions',
      description: 'Knowledge transfer sessions conducted between commissioning and O&M teams',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P7',
      step_type: 'decision',
      title: 'O&M Readiness Confirmation',
      description: 'O&M team confirms readiness to take over operations and maintenance',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: 'Chapter 5',
      step_id: 'P8',
      step_type: 'end',
      title: 'Formal Handover Ceremony',
      description: 'Formal handover ceremony conducted and HOTO certificate issued',
      order_index: 9
    }
  ];

  // Insert all data
  const { error: stepsError } = await supabase.from('process_steps').insert(processSteps);
  if (stepsError) throw stepsError;

  const { error: raciError } = await supabase.from('raci_matrix').insert(raciMatrix);
  if (raciError) throw raciError;

  const { error: mapError } = await supabase.from('process_map').insert(processMap);
  if (mapError) throw mapError;

  console.log('Chapter 5 data created successfully');
};
