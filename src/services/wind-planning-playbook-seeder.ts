
import { supabase } from '@/integrations/supabase/client';

export const createWindPlanningPlaybook = async (): Promise<string> => {
  console.log('Creating Wind Planning Playbook...');

  // Create the playbook with properly ordered phases
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

  // Process Steps for Section 1.1 - ALL 7 STEPS (S, P1, P2, P3, P4, P5, P6, E)
  const processSteps_1_1 = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'S',
      activity: 'Bid Incharge¹ appoints Bid Planner² (BP) and shares the Bid Summary³ with BP for the development of Final L1 Plan',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Bid Incharge',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P1',
      activity: 'BP analyses the Bid Summary and develops the delivery milestones and timeline for the project',
      inputs: ['Bid Summary'],
      outputs: ['Delivery Milestones & Timeline (Template Provided)'],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P2',
      activity: 'BP develops the Preliminary L1 Plan by updating the Wind Project Master Plan to meet the delivery milestones and timelines for the project',
      inputs: ['Wind Project Master Plan'],
      outputs: ['Preliminary L1 Plan'],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P3',
      activity: 'BP updates the Preliminary L1 Plan based on the Preliminary Feasibility Report⁴ shared by the Land Team, to draft the Final L1 Plan',
      inputs: ['PFR'],
      outputs: [],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P4',
      activity: 'BP shares the Final L1 Plan with functional leads⁵ for inputs',
      inputs: [],
      outputs: [],
      timeline: '2',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P5',
      activity: 'BP evaluates feedback from the functional teams and incorporates necessary modifications to the Final L1 Plan',
      inputs: [],
      outputs: [],
      timeline: '2',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P6',
      activity: 'BP shares the Final L1 Plan for sign off by the functional leads',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'E',
      activity: 'BP seeks review and approval on the Final L1 Plan from COO and incorporates any changes recommended by COO in the final L1 Plan, then shares the Final L1 Plan with Bid Incharge for bid submission',
      inputs: ['Final L1 Plan'],
      outputs: ['Final L1 Plan (Template Provided)'],
      timeline: 'Total 7-8 days',
      responsible: 'Bid Planner',
      comments: ''
    }
  ];

  // Process Steps for Section 1.2
  const processSteps_1_2 = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'S',
      activity: 'The Bid Incharge notifies the Chief Projects about any bid being won',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Bid Incharge',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P1',
      activity: 'Chief Projects designates a Project Planner (PP) and Project Manager (PM) for the project',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Chief Projects',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P2',
      activity: 'Bid Incharge shares the Final L1 Plan and Final Bid Report¹ (FBR) with Chief Projects',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Bid Incharge',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P3',
      activity: 'Chief Projects shares the Final L1 Plan and Final Bid Report with Project Planner and Project Manager, to initiate the development of Project Schedule (PS) and Project Execution Approach (PEA) respectively',
      inputs: ['Final L1 Plan', 'FBR'],
      outputs: [],
      timeline: '',
      responsible: 'Chief Projects',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P4A',
      activity: 'Project Planner prepares the preliminary Project Schedule by leveraging the Wind Project Master Plan and modifying it to align with project requirements',
      inputs: ['Wind Project Master Plan'],
      outputs: ['Preliminary PS'],
      timeline: '2 (P4A to occur P4B to occur parallelly)',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P4B',
      activity: 'Project Manager leverages the Final Bid Report¹ to develop Project Execution Approach², which provides a high-level overview of the entire project',
      inputs: [],
      outputs: ['Scope Matrix (Template Provided)'],
      timeline: '2 (P4A and P4B to occur parallelly)',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P5',
      activity: 'Project Planner reviews Project Schedule with Project Manager to ensure alignment. Any modifications identified during this review are incorporated.',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P6',
      activity: 'Project Planner and Project Manager circulate Project Schedule and Project Execution Approach respectively to functional leads³ for review, to seek alignment and address potential conflicts or gaps at an early stage',
      inputs: [],
      outputs: [],
      timeline: '2',
      responsible: 'Project Planner, Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P7A',
      activity: 'Project Planner, in consultation with Project Manager, assesses the feedback received from functional leads and adjusts the Project Schedule accordingly',
      inputs: [],
      outputs: [],
      timeline: '2 (P7A and P7B to occur parallelly)',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P7B',
      activity: 'Project Manager incorporates necessary changes in Project Execution Approach',
      inputs: [],
      outputs: ['PEA (includes scope matrix) (Template Provided)'],
      timeline: '2 (P7A and P7B to occur parallelly)',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P8',
      activity: 'Project Planner seeks sign-off on Project Schedule from functional leads',
      inputs: [],
      outputs: ['PS (Template Provided)'],
      timeline: '1',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'E',
      activity: 'Project Planner retains finalized Project Schedule, and Project Manager shares Project Execution Approach with Project Planner for future cross-functional¹ coordination',
      inputs: [],
      outputs: [],
      timeline: 'Total – 9 – 11 days',
      responsible: 'Project Planner',
      comments: ''
    }
  ];

  // RACI Matrix for Section 1.1 - ALL 7 STEPS (S, P1, P2, P3, P4, P5, P6, E)
  const raciMatrix_1_1 = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'S',
      task: 'Appoint Bid Planner (BP) and share the Bid Summary for Final L1 Plan development',
      responsible: 'Bid Incharge',
      accountable: 'Bid Incharge',
      consulted: '',
      informed: 'Bid Planner'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P1',
      task: 'Analyze bid summary and develop delivery milestones and timeline for the project',
      responsible: 'Bid Planner',
      accountable: 'Bid Incharge',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P2',
      task: 'Prepare Preliminary L1 Plan by leveraging the Wind Project Master Plan and modifying it to align with project requirements',
      responsible: 'Bid Planner',
      accountable: 'Bid Incharge',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P3',
      task: 'Update the Preliminary L1 Plan, based on the Preliminary Feasibility Report¹ to draft the Final L1 Plan',
      responsible: 'Bid Planner',
      accountable: '',
      consulted: '',
      informed: 'Land Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P4',
      task: 'Share the Final L1 Plan with functional leads² for inputs',
      responsible: 'Bid Planner',
      accountable: '',
      consulted: '',
      informed: 'Functional Leads'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P5',
      task: 'Evaluate feedback from the functional leads and incorporate changes to Final L1 Plan',
      responsible: 'Bid Planner',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P6',
      task: 'Seek sign-off for Final L1 Plan from functional leads',
      responsible: 'Bid Planner',
      accountable: 'Bid Planner',
      consulted: '',
      informed: 'Functional Leads'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'E',
      task: 'Seek review and approval on the Final L1 Plan from COO, incorporate recommendations, and share with Bid Incharge for bid submission',
      responsible: 'Bid Planner',
      accountable: 'Bid Planner',
      consulted: '',
      informed: 'COO, Bid Incharge'
    }
  ];

  // RACI Matrix for Section 1.2
  const raciMatrix_1_2 = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'S',
      task: 'Notify Chief Projects about any bid being won',
      responsible: 'Bid Incharge',
      accountable: '',
      consulted: '',
      informed: 'Chief Projects'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P1',
      task: 'Designate Project Planner (PP) and Project Manager (PM) for the project',
      responsible: 'Chief Projects',
      accountable: 'Chief Projects',
      consulted: '',
      informed: 'Project Planner, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P2',
      task: 'Share Final L1 Plan and Final Bid Report with Chief Projects',
      responsible: 'Bid Incharge',
      accountable: '',
      consulted: '',
      informed: 'Chief Projects'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P3',
      task: 'Share Final L1 Plan and Final Bid Report with Project Planner and Project Manager',
      responsible: 'Chief Projects',
      accountable: '',
      consulted: '',
      informed: 'Project Planner, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P4A',
      task: 'Prepare the draft Project Schedule (PS), leveraging the Wind Project Master Plan and insights from Final L1 Plan and Final Bid Report',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Chief Projects'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P4B',
      task: 'Develop Project Execution Approach (PEA) leveraging Final Bid Report',
      responsible: 'Project Manager',
      accountable: '',
      consulted: 'Chief Land Officer, Chief Procurement Officer, Chief Engineering & Chief Regulatory',
      informed: 'Chief Projects'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P5',
      task: 'Review Project Schedule with Project Manager for alignment',
      responsible: 'Project Planner',
      accountable: '',
      consulted: 'Project Manager',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P6',
      task: 'Circulate Project Schedule and Project Execution Approach with functional leads¹ for review',
      responsible: 'Project Planner, Project Manager',
      accountable: '',
      consulted: 'Functional Leads',
      informed: 'Chief Projects'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P7A',
      task: 'Assess feedback from functional leads and adjust Project Schedule accordingly',
      responsible: 'Project Planner',
      accountable: '',
      consulted: 'Project Manager',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P7B',
      task: 'Assess feedback from functional leads and finalize Project Execution Approach',
      responsible: 'Project Manager',
      accountable: 'Chief Projects',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P8',
      task: 'Seek sign-off on Project Schedule from functional leads to finalize it',
      responsible: 'Project Planner',
      accountable: 'Chief Projects',
      consulted: 'Functional Leads',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'E',
      task: 'Retain the finalized Project Schedule and Project Execution Approach for future cross-functional coordination in future',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    }
  ];

  // Process Map for Section 1.1 (simplified representation)
  const processMap_1_1 = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'S',
      step_type: 'start',
      title: 'Appoint Bid Planner and share Bid Summary',
      description: 'Bid Incharge appoints Bid Planner and shares Bid Summary for Final L1 Plan development',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P1',
      step_type: 'process',
      title: 'Analyze Bid Summary and develop delivery milestones',
      description: 'BP analyses the Bid Summary and develops the delivery milestones and timeline',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P2',
      step_type: 'process',
      title: 'Develop Preliminary L1 Plan',
      description: 'BP develops the Preliminary L1 Plan by updating the Wind Project Master Plan',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P3',
      step_type: 'process',
      title: 'Update L1 Plan based on PFR',
      description: 'BP updates the Preliminary L1 Plan based on the Preliminary Feasibility Report',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P4',
      step_type: 'process',
      title: 'Share Final L1 Plan with functional leads',
      description: 'BP shares the Final L1 Plan with functional leads for inputs',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P5',
      step_type: 'process',
      title: 'Evaluate feedback and incorporate modifications',
      description: 'BP evaluates feedback from functional teams and incorporates necessary modifications',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'P6',
      step_type: 'process',
      title: 'Seek sign-off from functional leads',
      description: 'BP shares the Final L1 Plan for sign off by the functional leads',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-1',
      step_id: 'E',
      step_type: 'end',
      title: 'COO approval and final submission',
      description: 'BP seeks review and approval from COO and shares Final L1 Plan for bid submission',
      order_index: 8
    }
  ];

  // Process Map for Section 1.2 (simplified representation)
  const processMap_1_2 = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'S',
      step_type: 'start',
      title: 'Notify Chief Projects about bid won',
      description: 'The Bid Incharge notifies the Chief Projects about any bid being won',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P1',
      step_type: 'process',
      title: 'Designate Project Planner and Project Manager',
      description: 'Chief Projects designates a Project Planner and Project Manager for the project',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P4A',
      step_type: 'process',
      title: 'Prepare preliminary Project Schedule',
      description: 'Project Planner prepares the preliminary Project Schedule',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P4B',
      step_type: 'process',
      title: 'Develop Project Execution Approach',
      description: 'Project Manager develops Project Execution Approach',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'P6',
      step_type: 'decision',
      title: 'Functional leads review',
      description: 'Circulate Project Schedule and PEA to functional leads for review',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1-2',
      step_id: 'E',
      step_type: 'end',
      title: 'Finalize and retain documents',
      description: 'Retain finalized Project Schedule and Project Execution Approach',
      order_index: 6
    }
  ];

  try {
    // Insert process steps
    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert([...processSteps_1_1, ...processSteps_1_2]);

    if (stepsError) {
      console.error('Error inserting process steps:', stepsError);
      throw stepsError;
    }

    // Insert RACI matrix
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert([...raciMatrix_1_1, ...raciMatrix_1_2]);

    if (raciError) {
      console.error('Error inserting RACI matrix:', raciError);
      throw raciError;
    }

    // Insert process map
    const { error: mapError } = await supabase
      .from('process_map')
      .insert([...processMap_1_1, ...processMap_1_2]);

    if (mapError) {
      console.error('Error inserting process map:', mapError);
      throw mapError;
    }

    console.log('Successfully created Wind Planning Playbook with sections 1.1 and 1.2 data');
    return playbookId;
  } catch (error) {
    console.error('Error creating Wind Planning Playbook:', error);
    throw error;
  }
};
