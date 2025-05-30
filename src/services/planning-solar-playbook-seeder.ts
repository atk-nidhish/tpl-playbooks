
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
