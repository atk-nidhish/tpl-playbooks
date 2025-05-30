
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

export const seedProcessMapData = async (playbookId: string) => {
  console.log('Seeding Process Map data...');

  // Process Maps for Section 1.2 and 1.4
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
      step_id: 'P7',
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
