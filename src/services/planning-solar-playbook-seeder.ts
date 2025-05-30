import { supabase } from '@/integrations/supabase/client';

export const createPlanningSolarPlaybook = async (): Promise<string> => {
  console.log('Creating Planning - Solar Playbook...');

  // Create the playbook with properly ordered phases
  const playbookData = {
    name: 'planning-solar-playbook',
    title: 'Planning - Solar',
    description: 'Comprehensive solar project planning playbook covering all phases from RFP to execution',
    phases: {
      'chapter-1': {
        name: 'Chapter 1 - Plan Integration Management',
        description: 'Planning for project phases from RFP participation to conceptualization up to execution & delivery'
      },
      'section-1.1': {
        name: 'Section 1.1 - Project Plan Preparation During Bidding',
        description: 'Process steps for project plan preparation during the bidding phase',
        parent: 'chapter-1'
      },
      'section-1.2': {
        name: 'Section 1.2 - Project Schedule and Execution Approach',
        description: 'Project schedule development and execution approach definition',
        parent: 'chapter-1'
      },
      'section-1.3': {
        name: 'Section 1.3 - Land Finalization Plan',
        description: 'Plan to be created only if Land Parcel hasn\'t already been leased yet',
        parent: 'chapter-1'
      },
      'section-1.4': {
        name: 'Section 1.4 - Engineering Plan',
        description: 'Engineering planning and design considerations',
        parent: 'chapter-1'
      },
      'section-1.5': {
        name: 'Section 1.5 - Procurement Plan',
        description: 'Procurement strategy and planning',
        parent: 'chapter-1'
      },
      'section-1.6': {
        name: 'Section 1.6 - Construction Plan',
        description: 'Construction planning and execution strategy',
        parent: 'chapter-1'
      },
      'section-1.7': {
        name: 'Section 1.7 - Commissioning Plan',
        description: 'Commissioning and testing plan',
        parent: 'chapter-1'
      },
      'section-1.8': {
        name: 'Section 1.8 - Plan Integration',
        description: 'Integration of all project plans',
        parent: 'chapter-1'
      },
      'section-1.9': {
        name: 'Section 1.9 - Plan Update',
        description: 'Plan update and maintenance procedures',
        parent: 'chapter-1'
      },
      'chapter-2': {
        name: 'Chapter 2 - Scope Management Plan',
        description: 'Scope definition and management procedures'
      },
      'chapter-3': {
        name: 'Chapter 3 - Cost Management Plan',
        description: 'Cost planning and control procedures'
      },
      'chapter-4': {
        name: 'Chapter 4 - Quality Management Plan',
        description: 'Quality assurance and control procedures'
      },
      'chapter-5': {
        name: 'Chapter 5 - Statutory Approval Management Plan',
        description: 'Statutory approvals and compliance management'
      },
      'chapter-6': {
        name: 'Chapter 6 - Risk Management Plan',
        description: 'Risk identification, assessment and mitigation procedures'
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
  console.log(`Created Planning - Solar playbook with ID: ${playbookId}`);
  return playbookId;
};

export const seedSection11Data = async (playbookId: string) => {
  console.log('Seeding Section 1.1 data...');

  // Process Steps for Section 1.1 - Project Plan Preparation During Bidding
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'S',
      activity: 'Bid Incharge appoints Bid Planner (BP) and shares the Bid Summary with BP for the development of Final L1 Plan',
      inputs: [],
      outputs: [],
      timeline: '-',
      responsible: 'Bid Incharge',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
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
      phase_id: 'section-1.1',
      step_id: 'P2',
      activity: 'BP develops the Preliminary L1 Plan by updating the Solar Project Master Plan to meet the delivery milestones and timelines for the project',
      inputs: ['Solar Project Master Plan'],
      outputs: ['Preliminary L1 Plan'],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P3',
      activity: 'BP updates the Preliminary L1 Plan based on the Preliminary (or Detailed) Feasibility Report shared by the Land Team to draft the Final L1 Plan',
      inputs: ['PFR/ DFR'],
      outputs: [],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P4',
      activity: 'BP shares the Final L1 Plan with functional leads for inputs',
      inputs: [],
      outputs: [],
      timeline: '2',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P5',
      activity: 'BP evaluates feedback from the functional teams and incorporates necessary modifications to the Final L1 Plan',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
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
      phase_id: 'section-1.1',
      step_id: 'P7',
      activity: 'BP seeks review and approval on the Final L1 Plan from COO',
      inputs: ['Final L1 Plan'],
      outputs: [],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P8',
      activity: 'BP incorporates any changes recommended by COO in the final L1 Plan',
      inputs: [],
      outputs: ['Final L1 Plan'],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'E',
      activity: 'BP shares the Final L1 Plan with Bid Incharge for bid submission',
      inputs: [],
      outputs: [],
      timeline: 'Total - 7-8 days',
      responsible: 'Bid Planner',
      comments: ''
    }
  ];

  // RACI Matrix for Section 1.1
  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'S',
      task: 'Appoint Bid Planner (BP) and share the Bid Summary for Final L1 Plan development',
      responsible: 'Bid Incharge',
      accountable: 'Bid Incharge',
      consulted: '',
      informed: 'Bid Planner'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P1',
      task: 'Analyze bid summary and develop delivery milestones and timeline for the project',
      responsible: 'Bid Planner',
      accountable: 'Bid Incharge',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P2',
      task: 'Prepare Preliminary L1 Plan by leveraging the Solar Project Master Plan and modifying it to align with project requirements',
      responsible: 'Bid Planner',
      accountable: 'Bid Incharge',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P3',
      task: 'Update the Preliminary L1 Plan based on the Preliminary (Detailed) Feasibility Report to draft the Final L1 Plan',
      responsible: 'Bid Planner',
      accountable: '',
      consulted: 'Land Manager',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P4',
      task: 'Share the Final L1 Plan with functional leads for inputs',
      responsible: 'Bid Planner',
      accountable: '',
      consulted: 'Functional Leads',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P5',
      task: 'Evaluate feedback from the functional leads and incorporate changes to Final L1 Plan',
      responsible: 'Bid Planner',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P6',
      task: 'Seek sign-off for Final L1 Plan from functional leads',
      responsible: 'Bid Planner',
      accountable: 'Bid Incharge',
      consulted: 'Functional Leads',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P7',
      task: 'Seek review and approval on the Final L1 Plan from COO',
      responsible: 'Bid Planner',
      accountable: 'Bid Planner',
      consulted: 'COO',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P8',
      task: 'Incorporate COO\'s recommendations in the final L1 Plan',
      responsible: 'Bid Planner',
      accountable: 'Bid Planner',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'E',
      task: 'Share the Final L1 Plan with Bid Incharge for bid submission',
      responsible: 'Bid Planner',
      accountable: '',
      consulted: '',
      informed: 'Bid Incharge'
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

    console.log('Successfully seeded Section 1.1 data');
  } catch (error) {
    console.error('Error seeding Section 1.1 data:', error);
    throw error;
  }
};

export const seedSection12Data = async (playbookId: string) => {
  console.log('Seeding Section 1.2 data...');

  // Process Steps for Section 1.2 - Project Schedule and Execution Approach
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'S',
      activity: 'The Bid Incharge notifies the Chief Projects about any bid being won',
      inputs: [],
      outputs: [],
      timeline: '-',
      responsible: 'Bid Incharge',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
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
      phase_id: 'section-1.2',
      step_id: 'P2',
      activity: 'Bid Incharge shares the Final L1 Plan and Final Bid Report (FBR) with Chief Projects',
      inputs: [],
      outputs: [],
      timeline: '-',
      responsible: 'Bid Incharge',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P3',
      activity: 'Chief Projects shares the Final L1 Plan and Final Bid Report with Project Planner and Project Manager, to initiate the development of the Project Schedule (PS) and Project Execution Approach (PEA) respectively',
      inputs: ['Final L1 Plan', 'FBR'],
      outputs: [],
      timeline: '-',
      responsible: 'Chief Projects',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P4A',
      activity: 'Project Planner prepares the preliminary Project Schedule by leveraging the Solar Project Master Plan and modifying it to align with project requirements - To understand project requirements, Project Planner and Project Manager analyze key milestones, critical timelines, land availability, and other details by reviewing the Final L1 Plan and Final Bid Report - The project timeline is broken down into specific tasks with start and end dates, along with intermediate deadlines for key deliverables. - Each phase is detailed to account for task dependencies, and critical path activities. - The Plan includes float for potential risks or delays',
      inputs: ['Solar Project Master Plan'],
      outputs: ['Preliminary PS'],
      timeline: '2 (P4A and P4B to occur parallelly)',
      responsible: 'Project Planner',
      comments: 'PS must align with the L1 schedule submitted during bid stage. Any deviations must be communicated by the Project Planner to the Project Manager for review and necessary action'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P4B',
      activity: 'Project Manager leverages the Final Bid Report to develop Project Execution Approach, which provides a high-level overview of the entire project - Scope of the project (scope matrix) - Land availability and high-level requirements, specifying the type, size, and amount of land needed; if land parcel has already been identified for the project, details of the land parcel to also be a part of PEA (in consultation with Land Team) - Budgeting, including the value engineering target, to optimize cost-efficiency without compromising quality (in consultation with Commercial Team and Engineering Team) - Regulatory compliance requirements, necessary permits, environmental considerations, and safety regulations (in consultation with Regulatory Team)',
      inputs: [],
      outputs: ['Scope Matrix (Template Provided)'],
      timeline: '2 (P4A and P4B to occur parallelly)',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P5',
      activity: 'Project Planner reviews Project Schedule with Project Manager to ensure alignment. Any modifications identified during this review are incorporated. In case of any discrepancies between Project Manager and Project Planner, the Project Manager takes the final decision',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P6',
      activity: 'Project Planner and Project Manager circulate Project Schedule and Project Execution Approach respectively to functional leads for review, to seek alignment and address potential conflicts or gaps at an early stage',
      inputs: [],
      outputs: [],
      timeline: '2',
      responsible: 'Project Planner, Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P7A',
      activity: 'Project Planner, in consultation with Project Manager, assesses the feedback received from functional leads and adjusts the Project Schedule',
      inputs: [],
      outputs: [],
      timeline: '2 (P7A and P7B to occur parallelly)',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P7B',
      activity: 'Project Manager incorporates necessary changes in Project Execution Approach',
      inputs: [],
      outputs: ['PEA (includes scope matrix)'],
      timeline: '2 (P7A and P7B to occur parallelly)',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
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
      phase_id: 'section-1.2',
      step_id: 'E',
      activity: 'Project Planner retains finalized Project Schedule, and Project Manager shares Project Execution Approach with Project Planner for future cross-functional coordination',
      inputs: [],
      outputs: [],
      timeline: 'Total - 9-11 days',
      responsible: 'Project Planner',
      comments: ''
    }
  ];

  // RACI Matrix for Section 1.2
  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'S',
      task: 'Notify Chief Projects about any bid being won',
      responsible: 'Bid Incharge',
      accountable: '',
      consulted: '',
      informed: 'Chief Projects'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P1',
      task: 'Designate Project Planner (PP) and Project Manager (PM) for the project',
      responsible: 'Chief Projects',
      accountable: 'Chief Projects',
      consulted: '',
      informed: 'Project Planner & Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P2',
      task: 'Share Final L1 Plan and Final Bid Report with Chief Projects',
      responsible: 'Bid Incharge',
      accountable: '',
      consulted: '',
      informed: 'Chief Projects'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P3',
      task: 'Share Final L1 Plan and Final Bid Report with Project Planner and Project Manager',
      responsible: 'Chief Projects',
      accountable: '',
      consulted: '',
      informed: 'Project Planner & Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P4A',
      task: 'Prepare the draft Project Schedule (PS), leveraging the Solar Project Master Plan and insights from Final L1 Plan and Final Bid Report',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Chief Projects'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P4B',
      task: 'Develop Project Execution Approach (PEA) leveraging Final Bid Report',
      responsible: 'Project Manager',
      accountable: '',
      consulted: 'Chief Land Officer, Chief Procurement, Chief Regulatory and Chief Engineering',
      informed: 'Chief Projects'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P5',
      task: 'Review Project Schedule with Project Manager for alignment',
      responsible: 'Project Planner',
      accountable: '',
      consulted: 'Project Manager',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P6',
      task: 'Circulate Project Schedule and Project Execution Approach with functional leads for review',
      responsible: 'Project Planner, Project Manager',
      accountable: '',
      consulted: 'Functional Leads',
      informed: 'Chief Projects'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P7A',
      task: 'Assess feedback from functional leads and adjust Project Schedule accordingly',
      responsible: 'Project Planner',
      accountable: '',
      consulted: 'Project Manager',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P7B',
      task: 'Assess feedback from functional leads and finalize Project Execution Approach',
      responsible: 'Project Manager',
      accountable: 'Chief Projects',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P8',
      task: 'Seek sign-off on Project Schedule from functional leads to finalize it',
      responsible: 'Project Planner',
      accountable: 'Chief Projects',
      consulted: 'Functional Leads',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'E',
      task: 'Retain the finalized Project Schedule and Project Execution Approach for future cross-functional coordination',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
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

    console.log('Successfully seeded Section 1.2 data');
  } catch (error) {
    console.error('Error seeding Section 1.2 data:', error);
    throw error;
  }
};

export const seedSection13Data = async (playbookId: string) => {
  console.log('Seeding Section 1.3 data...');

  // Process Steps for Section 1.3 - Land Finalization Plan
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'S',
      activity: 'Project Planner (PP) shares the Final Bid Report (FBR), Project Schedule (PS) and Project Execution Approach (PEA) with Land Team, and requests for Land Finalization Plan (LFP)',
      inputs: ['FBR', 'PS', 'PEA (includes scope matrix)'],
      outputs: [],
      timeline: '-',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P1',
      activity: 'Chief Land Officer appoints Land Manager (LM) on the project, for the development of LFP. Preferably appoints the same Land Manager who handled land identification during bid submission',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Chief Land Officer',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P2',
      activity: 'Chief Land Officer shares the inputs (Final Bid Report, Project Schedule and Project Execution Approach) received with appointed LM',
      inputs: [],
      outputs: [],
      timeline: '-',
      responsible: 'Chief Land Officer',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P3',
      activity: 'LM prepares the draft Land Finalization Plan by leveraging the Solar Project Master Plan and modifying it to align with project requirements. LM reviews Final Bid Report, Project Schedule and Project Execution Approach to evaluate detailed land requirement and timeline. Land Finalization Plan outlines process steps, timelines, milestones, and Point of Contact (PoC) responsible for each phase of land finalization. Timelines of LFP must align with Project Schedule. Any deviations must be communicated by the Land Manager to the Project Manager for review and necessary action',
      inputs: ['Solar Project Master Plan'],
      outputs: ['Preliminary LFP'],
      timeline: '1',
      responsible: 'Land Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P4',
      activity: 'LM shares the LFP with Chief Land Officer for review and approval (approval via formal sign-off)',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Land Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P5',
      activity: 'If changes are required, LM incorporates the feedback and reshares for approval. If no changes are required, LM finalizes the Land Finalization Plan',
      inputs: [],
      outputs: ['LFP (Template Provided)'],
      timeline: 'Total - 3-4 days',
      responsible: 'Land Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'E',
      activity: 'LM communicates the finalized LFP post approval to Project Planner for cross-team coordination',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Land Manager',
      comments: ''
    }
  ];

  // RACI Matrix for Section 1.3
  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'S',
      task: 'Share Final Bid Report (FBR), Project Schedule (PS) and Project Execution Approach (PEA) with Land Team',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Chief Land Officer'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P1',
      task: 'Appoint Land Manager (LM) for development of Land Finalization Plan (LFP)',
      responsible: 'Chief Land Officer',
      accountable: '',
      consulted: '',
      informed: 'Land Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P2',
      task: 'Share inputs (Final Bid Report, Project Schedule and Project Execution Approach) received with appointed LM',
      responsible: 'Chief Land Officer',
      accountable: '',
      consulted: '',
      informed: 'Land Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P3',
      task: 'Prepare draft Land Finalization Plan (LFP) by leveraging the Solar Project Master Plan and inputs received in P2',
      responsible: 'Land Manager',
      accountable: '',
      consulted: '',
      informed: 'Chief Land Officer'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P4',
      task: 'Share Land Finalization Plan with Chief Land Officer for review and approval (approval via formal sign-off)',
      responsible: 'Land Manager',
      accountable: '',
      consulted: '',
      informed: 'Chief Land Officer'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P5',
      task: 'Incorporate feedback and reshare for approval, if changes are required',
      responsible: 'Land Manager',
      accountable: '',
      consulted: 'Chief Land Officer',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'E',
      task: 'Communicate finalized Land Finalization Plan to Project Planner for cross-team coordination',
      responsible: 'Land Manager',
      accountable: '',
      consulted: '',
      informed: 'Project Planner'
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

    console.log('Successfully seeded Section 1.3 data');
  } catch (error) {
    console.error('Error seeding Section 1.3 data:', error);
    throw error;
  }
};

export const seedSection14Data = async (playbookId: string) => {
  console.log('Seeding Section 1.4 data...');

  // Process Steps for Section 1.4 - Engineering Plan
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'S',
      activity: 'Project Planner (PP) shares the following with the engineering team, and requests for Engineering Execution Plans (EEPs) - Project Schedule (PS) and - Project Execution Approach (PEA)',
      inputs: [],
      outputs: [],
      timeline: '-',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P1',
      activity: 'Solar Engineering Head appoints Project Engineering Managers (PEMs) for the project - PEMs can manage multiple projects simultaneously - PEMs are appointed separately for civil, electrical and plant design',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Solar Engineering Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P2',
      activity: 'Solar Engineering Head shares the inputs received (Project Schedule and Project Execution Approach) with PEMs',
      inputs: ['PS', 'PEA (includes scope matrix)'],
      outputs: [],
      timeline: '-',
      responsible: 'Solar Engineering Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P3',
      activity: 'PEMs, in collaboration with respective Quality Managers (QM), define the standard quality requirements to be implemented on the project (as detailed in quality management Plan) - These requirements are established in alignment with industry standards and the value engineering targets',
      inputs: [],
      outputs: ['Project Quality Requirements (Template Provided)'],
      timeline: '1',
      responsible: 'PEMs',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P4',
      activity: 'PEMs prepare the Basic Engineering Scope (BES), which is a list of all engineering deliverables to be executed throughout the project, along with its associated timelines',
      inputs: [],
      outputs: ['BES (Template Provided)'],
      timeline: '1',
      responsible: 'PEMs',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P5',
      activity: 'PEMs review Project Schedule and Project Execution Approach (including scope matrix) to identify engineering-related project requirements and timelines - Based on this review, PEM lists all engineering deliverables for the project - PEMs assess the criticality of each engineering deliverable and prioritize them according to the project\'s critical path to ensure alignment with the overall project timeline - PEMs develop Engineering Execution Plans (EEPs) by modifying the Solar Project Master Plan to align it with project requirements and timelines, as identified in BES - EEPs cover engineering milestones and timelines, and execution strategy for all engineering design-related activities - EEPs are drafted separately for civil, electrical and Plant design - EEPs are developed in consultation and alignment with Owner\'s Engineer and EPC Contractor',
      inputs: ['BES', 'Solar Project Master Plan'],
      outputs: ['Draft EEPs'],
      timeline: '1',
      responsible: 'PEMs',
      comments: 'Timelines of EEPs must align with Project Schedule. Any deviations must be communicated by PEM to the Project Manager for review and necessary action'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P6',
      activity: 'PEMs share EEPs with Solar Engineering Head for review and approval (approval via formal sign-off)',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'PEMs',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P7',
      activity: 'If changes are required, PEMs incorporate the feedback and reshares for approval. If no changes are required, PEMs finalize the EEPs',
      inputs: [],
      outputs: ['EEPs (Template Provided)'],
      timeline: '1',
      responsible: 'PEMs',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P8',
      activity: 'PEMs seek further approval from Chief Engineering (approval via formal sign-off) Required only for projects > 50 MW capacity',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'PEMs',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'E',
      activity: 'PEMs share EEPs with Project Planner for cross-functional coordination',
      inputs: [],
      outputs: [],
      timeline: 'Total - 6-8 days',
      responsible: 'PEMs',
      comments: ''
    }
  ];

  // RACI Matrix for Section 1.4
  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'S',
      task: 'Share Project Schedule (PS) and Project Execution Approach (PEA) with engineering team, and requests for Engineering Execution Plans (EEPs)',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Solar Engineering Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P1',
      task: 'Appoint Project Engineering Managers (PEMs) for the project',
      responsible: 'Solar Engineering Head',
      accountable: '',
      consulted: '',
      informed: 'PEMs'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P2',
      task: 'Share inputs received (Project Schedule and Project Execution Approach) with PEMs',
      responsible: 'Solar Engineering Head',
      accountable: '',
      consulted: '',
      informed: 'PEMs'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P3',
      task: 'Define standard quality requirements to be implemented on the project',
      responsible: 'PEMs',
      accountable: '',
      consulted: 'Quality Managers',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P4',
      task: 'Prepare the Basic Engineering Scope (BES) to list all engineering deliverables for the project, leveraging Project Schedule and Project Execution Approach',
      responsible: 'PEMs',
      accountable: 'PEMs',
      consulted: '',
      informed: 'Solar Engineering Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P5',
      task: 'Prepare the draft EEPs by leveraging the Solar Project Master Plan and aligning it with project requirements',
      responsible: 'PEMs',
      accountable: 'Solar Engineering Head',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P6',
      task: 'Seek approval from Solar Engineering Head for EEPs',
      responsible: 'PEMs',
      accountable: '',
      consulted: 'Solar Engineering Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P7',
      task: 'Incorporate feedback and reshare for approval, if changes are required',
      responsible: 'PEMs',
      accountable: '',
      consulted: 'Solar Engineering Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P8',
      task: 'Seek further approval from Chief Engineering (Required only for projects > 50 MW capacity)',
      responsible: 'PEMs',
      accountable: 'Solar Engineering Head',
      consulted: 'Chief Engineering',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'E',
      task: 'Circulate finalized EEPs with Project Planner',
      responsible: 'PEMs',
      accountable: '',
      consulted: '',
      informed: 'Project Planner'
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

    console.log('Successfully seeded Section 1.4 data');
  } catch (error) {
    console.error('Error seeding Section 1.4 data:', error);
    throw error;
  }
};

export const seedSection15Data = async (playbookId: string) => {
  console.log('Seeding Section 1.5 data...');

  // Process Steps for Section 1.5 - Procurement Plan
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'S',
      activity: 'Project Planner (PP) requests the procurement team for Project Procurement Plan and shares the following to Solar Procurement Head (SPH) - Project Schedule (PS), Project Execution Approach (PEA), and Engineering Execution Plans (EEPs) as they are progressively prepared, enabling procurement Planning to commence concurrently. Chief Procurement appoints Solar Procurement Head (SPH) to oversee the preparation of Project Procurement Plan and shares the inputs received',
      inputs: [],
      outputs: [],
      timeline: '-',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P1',
      activity: 'SPH reviews the Project Schedule, Project Execution Approach and Engineering Execution Plans to identify the items for procurement, technical requirements and timelines across the project lifecycle. Items to be procured encompass materials, components and services. If needed, SPH seeks clarifications from Project Engineering Managers',
      inputs: ['PS', 'PEA (includes scope matrix)', 'EEPs'],
      outputs: ['Procurement Requirement List (Template Provided)'],
      timeline: '1',
      responsible: 'Solar Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P2',
      activity: 'SPH designs the contracting packages for materials and services, leveraging Execution Strategy Framework (ESF) to identify the right package strategy for the project. SPH may consult functional leads¹ in drafting the contracting packages for the project',
      inputs: ['ESF'],
      outputs: ['Procurement Package Strategy (draft)'],
      timeline: '0.5',
      responsible: 'Solar Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P3',
      activity: 'SPH shares the package strategy with Functional Leads¹ for review and sign-off',
      inputs: ['Procurement Package Strategy (draft)'],
      outputs: [],
      timeline: '1',
      responsible: 'Solar Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P4',
      activity: 'SPH incorporates any modifications suggested by Functional Leads¹',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Solar Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P5',
      activity: 'SPH shares the package strategy with Chief procurement for review and approval (approval via formal sign-off). Required only for projects > 50 MW capacity',
      inputs: [],
      outputs: [],
      timeline: '0.5',
      responsible: 'Solar Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P6',
      activity: 'If required, SPH modifies the package strategy basis inputs from Chief Procurement and seeks re-approval to finalize the strategy',
      inputs: [],
      outputs: ['Procurement Package Strategy (Template Provided)'],
      timeline: '0.5',
      responsible: 'Solar Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P7',
      activity: 'SPH assigns the procurement packages to the respective Procurement Leads. Procurement Leads further notify the vendors¹ about the procurement Plan',
      inputs: [],
      outputs: [],
      timeline: '-',
      responsible: 'Solar Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P8',
      activity: 'Procurement Leads prepare their draft Procurement Schedules by modifying the Solar Project Master Plan based on inputs from: Analysis of items to be procured and timelines in P1, Inputs from vendors. Further refinements to the draft Plan are made based on subsequent rounds of alignment with vendors',
      inputs: ['Solar Project Master Plan'],
      outputs: ['Draft Procurement Schedules'],
      timeline: '1',
      responsible: 'Procurement Leads',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P9',
      activity: 'Procurement Leads share procurement schedule with SPH for review and approval (approval via formal sign-off)',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Procurement Leads',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P10',
      activity: 'If SPH recommends changes to the procurement schedule, Procurement Leads incorporate the changes and reshare for approval',
      inputs: [],
      outputs: ['Procurement Schedules (Template Provided)'],
      timeline: '1',
      responsible: 'Procurement Leads',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P11',
      activity: 'SPH shares the finalized procurement schedules with Project Planner',
      inputs: [],
      outputs: [],
      timeline: '-',
      responsible: 'Solar Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P12',
      activity: 'Project Planner compiles all the procurement schedules to create consolidated Project Procurement Plan (PPP) and shares it with SPH. Timelines of PPP must align with Project Schedule. Any deviations must be communicated by Project Planner to the Project Manager for review and necessary action',
      inputs: ['Procurement Schedules'],
      outputs: [],
      timeline: '0.5',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P13',
      activity: 'SPH seeks further approval for Project Procurement Plan from Chief Procurement. Required only for projects > 50 MW capacity',
      inputs: [],
      outputs: ['Project Procurement Plan'],
      timeline: '0.5',
      responsible: 'Solar Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'E',
      activity: 'SPH communicates finalized Project Procurement Plan to Project Planner for cross-functional coordination',
      inputs: [],
      outputs: [],
      timeline: 'Total – 7 – 9 days',
      responsible: 'Solar Procurement Head',
      comments: ''
    }
  ];

  // RACI Matrix for Section 1.5
  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'S',
      task: 'Request the procurement team for procurement Plan and share Project Schedule (PS), Project Execution Approach (PEA), and Engineering Execution Plans (EEPs)',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Chief Procurement'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'S',
      task: 'Appoint Solar Procurement Head (SPH) for the project',
      responsible: 'Chief Procurement',
      accountable: '',
      consulted: '',
      informed: 'Solar Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P1',
      task: 'Review Project Schedule, Project Execution Approach, and Engineering Execution Plans to identify procurement items, requirements, and timelines',
      responsible: 'Solar Procurement Head',
      accountable: '',
      consulted: 'Project Engineering Managers',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P2',
      task: 'Leverage Execution Strategy Framework (ESF) to package procurement activities',
      responsible: 'Solar Procurement Head',
      accountable: '',
      consulted: 'Land Manager, Project Manager, Project Engineering Manager',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P3',
      task: 'Share the package strategy with Functional Leads for review and sign-off',
      responsible: 'Solar Procurement Head',
      accountable: 'Solar Procurement Head',
      consulted: 'Land Manager, Project Manager, Project Engineering Manager',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P4',
      task: 'Incorporate any modifications suggested by Functional Leads',
      responsible: 'Solar Procurement Head',
      accountable: 'Solar Procurement Head',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P5',
      task: 'Seek sign-off on procurement package allocation from Chief Procurement',
      responsible: 'Solar Procurement Head',
      accountable: '',
      consulted: 'Chief Procurement',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P6',
      task: 'Modify procurement package basis inputs from Chief Procurement, if required, and seek re-approval to finalize the strategy',
      responsible: 'Solar Procurement Head',
      accountable: '',
      consulted: 'Chief Procurement',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P7',
      task: 'Assign procurement packages to respective Procurement Leads',
      responsible: 'Solar Procurement Head',
      accountable: '',
      consulted: '',
      informed: 'Procurement Leads'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P7',
      task: 'Notify EPC contractor about components to be procured by them',
      responsible: 'Procurement Leads',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P8',
      task: 'Prepare draft Procurement Schedule by leveraging the Solar Project Master Plan and aligning it with project requirements and timelines',
      responsible: 'Procurement Leads',
      accountable: 'Solar Procurement Head',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P9',
      task: 'Share procurement schedule with SPH for review and approval (approval via formal sign-off)',
      responsible: 'Procurement Leads',
      accountable: '',
      consulted: 'Solar Procurement Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P10',
      task: 'Incorporate changes to procurement schedule based on SPH feedback',
      responsible: 'Procurement Leads',
      accountable: '',
      consulted: 'Solar Procurement Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P11',
      task: 'Share finalized procurement schedules with Project Planner',
      responsible: 'Solar Procurement Head',
      accountable: '',
      consulted: '',
      informed: 'Project Planner'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P12',
      task: 'Compile all procurement schedules to create consolidated Project Procurement Plan (PPP) and share it with SPH',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Solar Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P13',
      task: 'Seek further approval for PPP from Chief Procurement',
      responsible: 'Solar Procurement Head',
      accountable: '',
      consulted: 'Chief Procurement',
      informed: 'Project Planner'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'E',
      task: 'Communicate final PPP to Project Planner for future cross functional coordination',
      responsible: 'Solar Procurement Head',
      accountable: '',
      consulted: '',
      informed: 'Project Planner'
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

    console.log('Successfully seeded Section 1.5 data');
  } catch (error) {
    console.error('Error seeding Section 1.5 data:', error);
    throw error;
  }
};

export const seedSection16Data = async (playbookId: string) => {
  console.log('Seeding Section 1.6 data...');

  // Process Steps for Section 1.6 - Construction Plan
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'S',
      activity: 'Project Planner (PP) shares the following schedules and Plans with Project Manager (PM) and requests the Construction Management Plan (CMP) – Project Schedule (PS), Project Execution Approach (PEA), Engineering Execution Plans (EEPs), and Project Procurement Plan (PPP), Statutory Approval Management Plan (SAMP)¹',
      inputs: [],
      outputs: [],
      timeline: '-',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P1',
      activity: 'Project Manager reviews the inputs received to identify – Timeline of activities impacting construction, Constraints that may impact the construction – regulatory, financial, time-based, resource-based limitations.',
      inputs: ['PS', 'PEA (includes scope matrix)', 'EEPs', 'PPP', 'SAMP'],
      outputs: [],
      timeline: '0.5',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P2',
      activity: 'Project Manager prepares draft CMP by leveraging the Solar Project Master Plan and modifying it to align with project milestones, timelines and constraints as analyzed in P1. CMP includes activities, milestones and timelines for all construction related activities, including: Early Works Schedule (EWS), Mobilization Checklist, Construction Schedule, Logistics Planning. Timelines of CMP must align with Project Schedule.',
      inputs: ['Solar Project Master Plan'],
      outputs: ['Draft CMP'],
      timeline: '1',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P3',
      activity: 'Project Manager discusses the draft CMP with EPC contractor to seek inputs and any required modifications, under their scope of execution. While the Project Manager incorporates EPC contractor inputs, ownership of the plan remains with the Project Manager. This step may be bypassed if the EPC contractor for the project has not been selected finalized',
      inputs: [],
      outputs: [],
      timeline: '2',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P4',
      activity: 'Project Manager incorporates changes suggested by EPC contractor, if required',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P5',
      activity: 'Project Manager shares CMP with Chief Solar for review and approval (approval via formal sign-off)',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P6',
      activity: 'If changes are needed, Project Manager updates the Plan and reshares for approval with Chief Solar',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P7',
      activity: 'Project Manager shares the CMP with Chief Projects for approval. Required only for projects > 50 MW capacity',
      inputs: [],
      outputs: ['CMP (Template Provided)'],
      timeline: '0.5',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'E',
      activity: 'Project Manager shares the CMP with Project Planner for cross-functional coordination',
      inputs: [],
      outputs: [],
      timeline: 'Total – 5 – 6 days',
      responsible: 'Project Manager',
      comments: ''
    }
  ];

  // RACI Matrix for Section 1.6
  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'S',
      task: 'Share Project Schedule (PS), Project Execution Approach (PEA), Engineering Execution Plans (EEPs), Project Procurement Plan (PPP) and Statutory Approval Management Plan (SAMP), and request for the development of Construction Management Plan',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P1',
      task: 'Review the received inputs to identify timeline of construction-related activities and identify any constraints that may impact the construction',
      responsible: 'Project Manager',
      accountable: 'Project Manager',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P2',
      task: 'Prepare draft CMP by leveraging the Solar Project Master Plan and modifying it to align with project requirements',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'Chief Solar'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P3',
      task: 'Share draft CMP with EPC contractor to seek inputs and any necessary modifications, under their scope of execution',
      responsible: 'Project Manager',
      accountable: 'Project Manager',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P4',
      task: 'Incorporate changes suggested by EPC contractor, if required',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P5',
      task: 'Seek sign-off on CMP from Chief Solar',
      responsible: 'Project Manager',
      accountable: '',
      consulted: 'Chief Solar',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P6',
      task: 'If changes are needed, update CMP and seek re-approval to finalize CMP',
      responsible: 'Project Manager',
      accountable: '',
      consulted: 'Chief Solar',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P7',
      task: 'Seek further approval from Chief Projects',
      responsible: 'Project Manager',
      accountable: 'Chief Solar',
      consulted: 'Chief Projects',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'E',
      task: 'Share CMP with Project Planner for cross-functional coordination',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'Project Planner'
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

    console.log('Successfully seeded Section 1.6 data');
  } catch (error) {
    console.error('Error seeding Section 1.6 data:', error);
    throw error;
  }
};

export const seedSection17Data = async (playbookId: string) => {
  console.log('Seeding Section 1.7 data for Planning - Solar playbook...');
  
  // Section 1.7 Process Steps
  const section17ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "S",
      activity: "Project Planner (PP) shares the following schedules with Project Manager (PM), and requests for Commissioning Plan – Project Schedule (PS), Project Execution Approach (PEA), Construction Management Plan (CMP), Statutory Approval Management Plan (SAMP)",
      inputs: [],
      outputs: [],
      timeline: "-",
      responsible: "Project Planner",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P1",
      activity: "Project Manager identifies the project activities and dependencies related to pre-commissioning and commissioning activities – For this, Project Manager leverages the inputs (Project Schedule, Project Execution Approach, Construction Management Plan and SAMP) received",
      inputs: ["PS", "PEA (includes scope matrix)", "CMP", "SAMP"],
      outputs: ["Turnover Systems List & Completion Criteria (Template Provided)"],
      timeline: "1",
      responsible: "Project Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P2",
      activity: "Project Manager defines the Turn-over Systems (TOS) and its completion criteria based on high level pre-commissioning and commissioning activities and package dependencies",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "Project Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P3",
      activity: "Project Manager defines the responsibility matrix for TOS, assigning a Point of Contact (PoC) accountable for the completion of each activity – Project Manager may consult Site Manager for creation of TOS and responsibility matrix",
      inputs: [],
      outputs: ["Responsibility Matrix (Template Provided)"],
      timeline: "",
      responsible: "Project Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P4",
      activity: "Project Manager prepare draft Pre-Commissioning Plan (PCP) by leveraging the Solar Project Master Plan and modifying it to align with project requirements",
      inputs: ["Solar Project Master Plan"],
      outputs: ["Draft PCP"],
      timeline: "1",
      responsible: "Project Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P5",
      activity: "After preparation of PCP and Statutory Approval Management Plan (SAMP), Project Manager begins drafting the Commissioning Plan (CP) by leveraging the Solar Project Master Plan and modifying it to align with project requirements – Key commissioning activities, milestones and timelines as mentioned in Project Schedule, Project Execution Approach and Construction Management Plan – Pre-requisites of commissioning activities and their details as mentioned in TOS & completion criteria and Responsibility Matrix – Regulatory timeline as mentioned in SAMP",
      inputs: ["SAMP", "Solar Project Master Plan"],
      outputs: ["Draft CP"],
      timeline: "1",
      responsible: "Project Manager",
      comments: "Project Manager drafts CP in consultation with Chief O&M. Timelines of CP must align with Project Schedule"
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P6",
      activity: "Project Manager seeks review and approval (approval via formal sign-off) on draft PCP and CP from Chief Solar",
      inputs: ["Draft PCP"],
      outputs: [],
      timeline: "1",
      responsible: "Project Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P7",
      activity: "If changes are needed, Project Manager updates the Plan and reshares for approval – If no changes are needed, Project Manager finalizes the PCP and CP",
      inputs: [],
      outputs: ["PCP", "CP (Template Provided)"],
      timeline: "",
      responsible: "Project Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "E",
      activity: "Project Manager shares the Plans with Project Planner for future cross-functional coordination",
      inputs: [],
      outputs: [],
      timeline: "Total – 4 – 5 days",
      responsible: "Project Manager",
      comments: ""
    }
  ];

  // Section 1.7 RACI Matrix
  const section17RaciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "S",
      task: "Share Project Schedule (PS), Project Execution Approach (PEA), Construction Management Plan (CMP) and Statutory Approval Management Plan (SAMP), and request for the development of Commissioning Plan",
      responsible: "Project Planner",
      accountable: "",
      consulted: "",
      informed: "Project Manager"
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P1",
      task: "Identify project activities and dependencies related to pre-commissioning and commissioning activities by leveraging Project Schedule, Project Execution Approach and Construction Management Plan",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P2",
      task: "Define the Turn-over Systems (TOS) and its completion criteria based on high level pre-commissioning and commissioning activities, and package dependencies",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P3",
      task: "Define the responsibility matrix for TOS, assigning POCs accountable for completion of each activity",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Cross-Functional Heads",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P4",
      task: "Prepare draft Pre-Commissioning Plan (PCP) by leveraging the Solar Project Master Plan and modifying it to align with project requirements and timelines",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Chief Solar"
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P5",
      task: "Prepare draft Commissioning Plan (CP) by leveraging the Solar Project Master Plan and modifying it to align with project requirements and timelines",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Chief Solar"
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P6",
      task: "Seek review and approval (approval via formal sign-off) on PCP and CP from Chief Solar",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Chief Solar",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P7",
      task: "If changes are needed, update the Plan and seek re-approval to finalize PCP and CP",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Chief Solar",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "E",
      task: "Share the Plans with Project Planner for cross-functional coordination",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Project Planner"
    }
  ];

  // Section 1.7 Process Map
  const section17ProcessMap = [
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "S",
      step_type: "start",
      title: "Share inputs (PS, PEA, CMP, SAMP) and request Commissioning Plan development",
      description: "Project Planner shares schedules and plans with Project Manager",
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P1",
      step_type: "process",
      title: "Identify project activities and dependencies for commissioning",
      description: "Project Manager analyzes inputs to identify pre-commissioning and commissioning activities",
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P2",
      step_type: "process",
      title: "Define Turn-over Systems and completion criteria",
      description: "Project Manager defines TOS based on commissioning activities and dependencies",
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P3",
      step_type: "process",
      title: "Define responsibility matrix for TOS",
      description: "Project Manager creates responsibility matrix assigning PoCs for each activity",
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P4",
      step_type: "process",
      title: "Prepare draft Pre-Commissioning Plan",
      description: "Project Manager creates draft PCP using Solar Project Master Plan",
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P5",
      step_type: "process",
      title: "Prepare draft Commissioning Plan",
      description: "Project Manager creates draft CP incorporating all requirements and timelines",
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P6",
      step_type: "decision",
      title: "Seek review and approval from Chief Solar",
      description: "Project Manager submits draft plans for formal review and sign-off",
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "P7",
      step_type: "process",
      title: "Update plans if needed and finalize",
      description: "Project Manager incorporates feedback and finalizes PCP and CP",
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.7",
      step_id: "E",
      step_type: "end",
      title: "Share finalized plans with Project Planner",
      description: "Project Manager shares completed plans for cross-functional coordination",
      order_index: 9
    }
  ];

  // Insert all section 1.7 data
  const { error: processStepsError } = await supabase
    .from('process_steps')
    .insert(section17ProcessSteps);

  if (processStepsError) {
    console.error('Error inserting section 1.7 process steps:', processStepsError);
    throw processStepsError;
  }

  const { error: raciError } = await supabase
    .from('raci_matrix')
    .insert(section17RaciMatrix);

  if (raciError) {
    console.error('Error inserting section 1.7 RACI matrix:', raciError);
    throw raciError;
  }

  const { error: processMapError } = await supabase
    .from('process_map')
    .insert(section17ProcessMap);

  if (processMapError) {
    console.error('Error inserting section 1.7 process map:', processMapError);
    throw processMapError;
  }

  console.log('Section 1.7 data seeded successfully');
};

export const seedSection18Data = async (playbookId: string) => {
  console.log('Seeding Section 1.8 data for Planning - Solar playbook...');
  
  // Section 1.8 Process Steps
  const section18ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "S",
      activity: "Project Planner receives detailed plans from across the functional teams (Land, Engineering, Procurement, and Projects)",
      inputs: [],
      outputs: [],
      timeline: "-",
      responsible: "Project Planner",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P1",
      activity: "Project Planner integrates all detailed plans received from functional departments (Land, Engineering, Procurement, Projects) to create Detailed Project Schedule",
      inputs: ["PS", "LFP", "EEPs", "PPP", "CMP", "PCP", "CP"],
      outputs: ["Detailed Project Schedule (draft)"],
      timeline: "1",
      responsible: "Project Planner",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P2",
      activity: "Project Planner shares the Detailed Project Schedule with Chief Projects for sign off",
      inputs: ["Detailed Project Schedule (draft)"],
      outputs: [],
      timeline: "1",
      responsible: "Project Planner",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P3",
      activity: "If Chief Projects recommends any changes, Project Planner incorporates the modifications suggested and resubmits the revised Plan to Chief Projects",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "Project Planner",
      comments: "Project Planner modifies the plan in consultation with respective functional lead"
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P4",
      activity: "Chief Projects shares the Detailed Project Schedule with COO to seek final sign-off",
      inputs: [],
      outputs: ["Detailed Project Schedule (Final)"],
      timeline: "1",
      responsible: "Chief Projects",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P5",
      activity: "If COO recommends any modifications, Chief Projects notifies the same to Project Planner",
      inputs: [],
      outputs: [],
      timeline: "-",
      responsible: "Chief Projects",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P6",
      activity: "Project Planner incorporates COO's recommended modifications and resubmits the revised Plan to Chief Projects",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "Project Planner",
      comments: "Project Planner modifies the plan in consultation with respective functional lead"
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P7",
      activity: "Project Planner reshares the Detailed Project Schedule with Chief Projects for seeking approval from COO",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "Project Planner",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P8",
      activity: "Chief Projects shares the signed-off Detailed Project Schedule with Project Planner",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "Chief Projects",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "E",
      activity: "Project Planner publishes the Detailed Project Schedule to notify functional teams",
      inputs: [],
      outputs: [],
      timeline: "Total 4 – 8 days",
      responsible: "Project Planner",
      comments: ""
    }
  ];

  // Section 1.8 RACI Matrix
  const section18RaciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "S",
      task: "Receive plans from across cross-functional teams",
      responsible: "Project Planner",
      accountable: "Project Planner",
      consulted: "",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P1",
      task: "Integrate all detailed plans received from functional departments (Land, Engineering, Procurement, Projects) to create Detailed Project Schedule",
      responsible: "Project Planner",
      accountable: "Project Planner",
      consulted: "",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P2",
      task: "Share the Detailed Project Schedule with Chief Projects for sign off",
      responsible: "Project Planner",
      accountable: "Project Planner",
      consulted: "",
      informed: "Chief Projects"
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P3",
      task: "Share the Detailed Project Schedule with COO for final sign-off",
      responsible: "Chief Projects",
      accountable: "Chief Projects",
      consulted: "",
      informed: "COO"
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P4",
      task: "If COO recommends any modifications, discuss the required modification with the respective functional department",
      responsible: "Chief Projects",
      accountable: "Chief Projects",
      consulted: "Functional Leads",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P5",
      task: "Update the respective plan, and share the same to Project Planner",
      responsible: "Functional Leads",
      accountable: "Functional Leads",
      consulted: "",
      informed: "Project Planner"
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P6",
      task: "Integrate the updated functional plan into the Detailed Project Schedule",
      responsible: "Project Planner",
      accountable: "Project Planner",
      consulted: "",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P7",
      task: "Share the Detailed Project Schedule with Chief Projects for seeking approval from COO",
      responsible: "Project Planner",
      accountable: "Project Planner",
      consulted: "",
      informed: "Chief Projects"
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P8",
      task: "Share the signed-off Detailed Project Schedule with Project Planner",
      responsible: "Chief Projects",
      accountable: "Chief Projects",
      consulted: "",
      informed: "Project Planner"
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "E",
      task: "Publish the Detailed Project Schedule to notify functional teams",
      responsible: "Project Planner",
      accountable: "",
      consulted: "",
      informed: "Functional Leads"
    }
  ];

  // Section 1.8 Process Map
  const section18ProcessMap = [
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "S",
      step_type: "start",
      title: "Receive detailed plans from functional teams",
      description: "Project Planner receives plans from Land, Engineering, Procurement, and Projects teams",
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P1",
      step_type: "process",
      title: "Integrate all plans into Detailed Project Schedule",
      description: "Project Planner consolidates all functional plans into comprehensive schedule",
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P2",
      step_type: "process",
      title: "Share with Chief Projects for sign-off",
      description: "Project Planner submits draft schedule for initial approval",
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P3",
      step_type: "decision",
      title: "Chief Projects review and modification request",
      description: "Chief Projects reviews schedule and may request modifications",
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P4",
      step_type: "process",
      title: "Share with COO for final sign-off",
      description: "Chief Projects submits schedule to COO for final approval",
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P5",
      step_type: "decision",
      title: "COO review and potential modifications",
      description: "COO reviews and may recommend changes to the schedule",
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P6",
      step_type: "process",
      title: "Incorporate modifications and update",
      description: "Project Planner updates schedule based on feedback",
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P7",
      step_type: "process",
      title: "Resubmit for final approval",
      description: "Project Planner resubmits updated schedule for approval",
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "P8",
      step_type: "process",
      title: "Receive signed-off schedule",
      description: "Chief Projects shares final approved schedule with Project Planner",
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: "section-1.8",
      step_id: "E",
      step_type: "end",
      title: "Publish final schedule to teams",
      description: "Project Planner distributes final schedule to all functional teams",
      order_index: 10
    }
  ];

  // Insert all section 1.8 data
  const { error: processStepsError } = await supabase
    .from('process_steps')
    .insert(section18ProcessSteps);

  if (processStepsError) {
    console.error('Error inserting section 1.8 process steps:', processStepsError);
    throw processStepsError;
  }

  const { error: raciError } = await supabase
    .from('raci_matrix')
    .insert(section18RaciMatrix);

  if (raciError) {
    console.error('Error inserting section 1.8 RACI matrix:', raciError);
    throw raciError;
  }

  const { error: processMapError } = await supabase
    .from('process_map')
    .insert(section18ProcessMap);

  if (processMapError) {
    console.error('Error inserting section 1.8 process map:', processMapError);
    throw processMapError;
  }

  console.log('Section 1.8 data seeded successfully');
};

export const seedProcessMapData = async (playbookId: string) => {
  console.log('Seeding Process Map data...');

  // Process Maps for all sections
  const processMaps = [
    // Section 1.2 Process Map
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'S',
      step_type: 'start',
      title: 'Notify Chief Projects about any bid being won',
      description: 'Bid Incharge notifies Chief Projects about won bid',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P1',
      step_type: 'process',
      title: 'Designate Project Planner and Project Manager',
      description: 'Chief Projects appoints PP and PM for the project',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P2',
      step_type: 'process',
      title: 'Share Final L1 Plan and FBR',
      description: 'Bid Incharge shares documents with Chief Projects',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P3',
      step_type: 'process',
      title: 'Share Plans with PP and PM',
      description: 'Chief Projects initiates PS and PEA development',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P4A',
      step_type: 'process',
      title: 'Prepare Preliminary Project Schedule',
      description: 'Project Planner develops preliminary PS using Solar Master Plan',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P4B',
      step_type: 'process',
      title: 'Develop Project Execution Approach',
      description: 'Project Manager creates PEA with scope matrix',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P5',
      step_type: 'process',
      title: 'Review PS with PM',
      description: 'Project Planner ensures alignment with PM',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P6',
      step_type: 'process',
      title: 'Circulate PS and PEA to Functional Leads',
      description: 'Seek review and feedback from functional teams',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P7A',
      step_type: 'decision',
      title: 'Assess Feedback and Adjust',
      description: 'Incorporate feedback from functional leads',
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'P8',
      step_type: 'milestone',
      title: 'Seek Sign-off on PS',
      description: 'Project Planner gets formal approval on schedule',
      order_index: 10
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.2',
      step_id: 'E',
      step_type: 'end',
      title: 'Finalize and Share for Cross-functional Coordination',
      description: 'Retain PS and share PEA for coordination',
      order_index: 11
    },

    // Section 1.4 Process Map
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'S',
      step_type: 'start',
      title: 'Share PS and PEA with Engineering Team',
      description: 'Project Planner requests Engineering Execution Plans',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P1',
      step_type: 'process',
      title: 'Appoint Project Engineering Managers',
      description: 'Solar Engineering Head assigns PEMs for civil, electrical, and plant design',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P2',
      step_type: 'process',
      title: 'Share PS and PEA with PEMs',
      description: 'Solar Engineering Head provides inputs to PEMs',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P3',
      step_type: 'process',
      title: 'Define Quality Requirements',
      description: 'PEMs collaborate with QMs to establish standards',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P4',
      step_type: 'process',
      title: 'Prepare Basic Engineering Scope',
      description: 'PEMs list all engineering deliverables and timelines',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P5',
      step_type: 'process',
      title: 'Develop Engineering Execution Plans',
      description: 'PEMs create EEPs using Solar Master Plan and BES',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P6',
      step_type: 'milestone',
      title: 'Seek Approval from Solar Engineering Head',
      description: 'PEMs get formal sign-off on EEPs',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P7',
      step_type: 'decision',
      title: 'Incorporate Feedback if Required',
      description: 'Revise EEPs based on review comments',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'P8',
      step_type: 'milestone',
      title: 'Seek Chief Engineering Approval',
      description: 'Additional approval for projects > 50 MW',
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.4',
      step_id: 'E',
      step_type: 'end',
      title: 'Share EEPs with Project Planner',
      description: 'Finalize and coordinate across functions',
      order_index: 10
    },

    // Section 1.5 Process Map
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'S',
      step_type: 'start',
      title: 'Request Procurement Plan from Team',
      description: 'Project Planner shares PS, PEA, and EEPs with Solar Procurement Head',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P1',
      step_type: 'process',
      title: 'Review and Identify Procurement Requirements',
      description: 'SPH analyzes inputs to create procurement requirement list',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P2',
      step_type: 'process',
      title: 'Design Contracting Packages',
      description: 'SPH leverages ESF to create procurement package strategy',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P3',
      step_type: 'milestone',
      title: 'Share Strategy with Functional Leads',
      description: 'Seek review and sign-off from functional leads',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P4',
      step_type: 'decision',
      title: 'Incorporate Modifications',
      description: 'SPH updates strategy based on feedback',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P5',
      step_type: 'milestone',
      title: 'Seek Chief Procurement Approval',
      description: 'Additional approval for projects > 50 MW',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P6',
      step_type: 'decision',
      title: 'Finalize Strategy',
      description: 'SPH modifies and finalizes procurement strategy',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P7',
      step_type: 'process',
      title: 'Assign Packages to Procurement Leads',
      description: 'SPH assigns packages and notifies vendors',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P8',
      step_type: 'process',
      title: 'Prepare Draft Procurement Schedules',
      description: 'Procurement Leads create schedules using Solar Master Plan',
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P9',
      step_type: 'milestone',
      title: 'Share Schedules for Review',
      description: 'Procurement Leads seek SPH approval',
      order_index: 10
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P10',
      step_type: 'decision',
      title: 'Incorporate Schedule Changes',
      description: 'Update schedules based on SPH feedback',
      order_index: 11
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P11',
      step_type: 'process',
      title: 'Share Finalized Schedules',
      description: 'SPH shares schedules with Project Planner',
      order_index: 12
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P12',
      step_type: 'process',
      title: 'Compile Project Procurement Plan',
      description: 'Project Planner creates consolidated PPP',
      order_index: 13
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'P13',
      step_type: 'milestone',
      title: 'Seek Final Approval',
      description: 'SPH gets Chief Procurement approval for PPP',
      order_index: 14
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.5',
      step_id: 'E',
      step_type: 'end',
      title: 'Communicate Final PPP',
      description: 'Share finalized plan for cross-functional coordination',
      order_index: 15
    },

    // Section 1.6 Process Map
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'S',
      step_type: 'start',
      title: 'Share Plans with Project Manager',
      description: 'Project Planner shares PS, PEA, EEPs, PPP, and SAMP',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P1',
      step_type: 'process',
      title: 'Review Inputs and Identify Constraints',
      description: 'Project Manager analyzes construction timelines and constraints',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P2',
      step_type: 'process',
      title: 'Prepare Draft Construction Management Plan',
      description: 'Project Manager creates CMP using Solar Master Plan',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P3',
      step_type: 'process',
      title: 'Discuss with EPC Contractor',
      description: 'Project Manager seeks inputs from EPC contractor',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P4',
      step_type: 'decision',
      title: 'Incorporate EPC Changes',
      description: 'Update CMP based on EPC contractor feedback',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P5',
      step_type: 'milestone',
      title: 'Seek Chief Solar Approval',
      description: 'Project Manager gets formal sign-off on CMP',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P6',
      step_type: 'decision',
      title: 'Update Plan if Required',
      description: 'Incorporate changes from Chief Solar review',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'P7',
      step_type: 'milestone',
      title: 'Seek Chief Projects Approval',
      description: 'Additional approval for projects > 50 MW',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.6',
      step_id: 'E',
      step_type: 'end',
      title: 'Share CMP for Cross-functional Coordination',
      description: 'Finalize and coordinate across functions',
      order_index: 9
    }
  ];

  try {
    // Insert process maps
    const { error: processMapError } = await supabase
      .from('process_map')
      .insert(processMaps);

    if (processMapError) {
      console.error('Error inserting process maps:', processMapError);
      throw processMapError;
    }

    console.log('Successfully seeded Process Map data');
  } catch (error) {
    console.error('Error seeding Process Map data:', error);
    throw error;
  }
};

export const createPlanningSolarPlaybook = async () => {
  try {
    const playbook = {
      name: "planning-solar",
      title: "Planning - Solar",
      description: "Comprehensive solar project planning playbook covering all phases from initial planning to commissioning",
      phases: {
        "chapter-1": {
          name: "Chapter 1 - Plan Integration Management",
          subChapters: [
            "section-1.1",
            "section-1.2", 
            "section-1.3",
            "section-1.4",
            "section-1.5",
            "section-1.6",
            "section-1.7",
            "section-1.8",
            "section-1.9"
          ]
        },
        "chapter-2": { name: "Chapter 2 - Scope Management Plan" },
        "chapter-3": { name: "Chapter 3 - Cost Management Plan" },
        "chapter-4": { name: "Chapter 4 - Quality Management Plan" },
        "chapter-5": { name: "Chapter 5 - Statutory Approval Management Plan" },
        "chapter-6": { name: "Chapter 6 - Risk Management Plan" }
      }
    };

    const { data, error } = await supabase
      .from('playbooks')
      .insert(playbook)
      .select()
      .single();

    if (error) {
      console.error('Error creating playbook:', error);
      throw error;
    }

    console.log('Planning - Solar playbook created successfully:', data.id);
    return data.id;
  } catch (error) {
    console.error('Error in createPlanningSolarPlaybook:', error);
    throw error;
  }
};
