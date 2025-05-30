import { supabase } from '@/integrations/supabase/client';

export const createPlanningSolarPlaybook = async (): Promise<string> => {
  console.log('Creating Planning - Solar Playbook...');

  // Create the playbook with properly ordered phases
  const playbookData = {
    name: 'planning-solar-playbook',
    title: 'Planning - Solar',
    description: 'Comprehensive solar project planning playbook',
    phases: {
      'Chapter 1': {
        name: 'Chapter 1 - Plan Integration Management',
        description: 'Comprehensive project planning and integration management'
      },
      'section-1.1': {
        name: 'Section 1.1 - Project Plan Preparation During Bidding',
        description: 'Project plan preparation and bidding processes',
        parent: 'Chapter 1'
      },
      'section-1.2': {
        name: 'Section 1.2 - Project Schedule and Execution Approach',
        description: 'Project scheduling and execution methodology',
        parent: 'Chapter 1'
      },
      'section-1.3': {
        name: 'Section 1.3 - Land Finalization Plan',
        description: 'Land acquisition and finalization processes',
        parent: 'Chapter 1'
      },
      'section-1.4': {
        name: 'Section 1.4 - Engineering Plan',
        description: 'Engineering planning and design processes',
        parent: 'Chapter 1'
      },
      'section-1.5': {
        name: 'Section 1.5 - Procurement Plan',
        description: 'Procurement planning and execution',
        parent: 'Chapter 1'
      },
      'section-1.6': {
        name: 'Section 1.6 - Construction Plan',
        description: 'Construction planning and execution',
        parent: 'Chapter 1'
      },
      'section-1.7': {
        name: 'Section 1.7 - Commissioning Plan',
        description: 'Commissioning planning and execution',
        parent: 'Chapter 1'
      },
      'section-1.8': {
        name: 'Section 1.8 - Plan Integration',
        description: 'Integration of all project plans',
        parent: 'Chapter 1'
      },
      'section-1.9': {
        name: 'Section 1.9 - Plan Update',
        description: 'Plan updates and change management',
        parent: 'Chapter 1'
      },
      'Chapter 2': {
        name: 'Chapter 2 - Scope Management Plan',
        description: 'Project scope definition and management'
      },
      'Chapter 3': {
        name: 'Chapter 3 - Cost Management Plan',
        description: 'Project cost planning and control'
      },
      'Chapter 4': {
        name: 'Chapter 4 - Quality Management Plan',
        description: 'Quality assurance and control planning'
      },
      'Chapter 5': {
        name: 'Chapter 5 - Statutory Approval Management Plan',
        description: 'Regulatory and statutory approval processes'
      },
      'Chapter 6': {
        name: 'Chapter 6 - Risk Management Plan',
        description: 'Risk identification, assessment and mitigation'
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

// Section 1.1 Data
export const seedSection11Data = async (playbookId: string) => {
  console.log('Seeding Section 1.1 data...');

  // Process Steps for Section 1.1
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'S',
      activity: 'Project Development Manager (PDM) directs the Engineering Head (EH) to initiate the Project Plan preparation during the bidding stage',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Development Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P1',
      activity: 'EH initiates the project plan preparation by reviewing the tender documents and identifying key project requirements',
      inputs: ['Tender Documents', 'Project Requirements'],
      outputs: [],
      timeline: '',
      responsible: 'Engineering Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P2',
      activity: 'EH coordinates with various departments to gather input for project planning',
      inputs: [],
      outputs: ['Department Inputs'],
      timeline: '',
      responsible: 'Engineering Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P3',
      activity: 'EH prepares preliminary project schedule and resource allocation plan',
      inputs: ['Department Inputs'],
      outputs: ['Preliminary Project Schedule', 'Resource Allocation Plan'],
      timeline: '',
      responsible: 'Engineering Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P4',
      activity: 'EH reviews and finalizes the project plan with PDM approval',
      inputs: ['Preliminary Project Schedule', 'Resource Allocation Plan'],
      outputs: ['Final Project Plan'],
      timeline: '',
      responsible: 'Engineering Head',
      comments: ''
    }
  ];

  // RACI Matrix for Section 1.1
  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'S',
      task: 'Direct Engineering Head to initiate Project Plan preparation',
      responsible: 'Project Development Manager',
      accountable: '',
      consulted: '',
      informed: 'Engineering Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P1',
      task: 'Review tender documents and identify project requirements',
      responsible: 'Engineering Head',
      accountable: '',
      consulted: 'Project Development Manager',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P2',
      task: 'Coordinate with departments for input gathering',
      responsible: 'Engineering Head',
      accountable: '',
      consulted: 'Various Departments',
      informed: 'Project Development Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P3',
      task: 'Prepare preliminary project schedule and resource plan',
      responsible: 'Engineering Head',
      accountable: '',
      consulted: '',
      informed: 'Project Development Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.1',
      step_id: 'P4',
      task: 'Review and finalize project plan',
      responsible: 'Engineering Head',
      accountable: 'Project Development Manager',
      consulted: '',
      informed: ''
    }
  ];

  try {
    // Insert process steps
    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(processSteps);

    if (stepsError) {
      console.error('Error inserting Section 1.1 process steps:', stepsError);
      throw stepsError;
    }

    // Insert RACI matrix
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciMatrix);

    if (raciError) {
      console.error('Error inserting Section 1.1 RACI matrix:', raciError);
      throw raciError;
    }

    console.log('Successfully seeded Section 1.1 data');
  } catch (error) {
    console.error('Error seeding Section 1.1 data:', error);
    throw error;
  }
};

// Section 1.2 Data
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
      timeline: 'Total - 9 - 11 days',
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
      task: 'Retain the finalized Project Schedule and Project Execution Approach for future cross-functional coordination in future',
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
      console.error('Error inserting Section 1.2 process steps:', stepsError);
      throw stepsError;
    }

    // Insert RACI matrix
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciMatrix);

    if (raciError) {
      console.error('Error inserting Section 1.2 RACI matrix:', raciError);
      throw raciError;
    }

    console.log('Successfully seeded Section 1.2 data');
  } catch (error) {
    console.error('Error seeding Section 1.2 data:', error);
    throw error;
  }
};

// Section 1.3 Data
export const seedSection13Data = async (playbookId: string) => {
  console.log('Seeding Section 1.3 data...');

  // Process Steps for Section 1.3
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'S',
      activity: 'Project Manager (PM) directs Land Team Lead (LTL) to develop comprehensive land finalization plan',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P1',
      activity: 'LTL conducts land availability assessment and site evaluation',
      inputs: ['Project Requirements', 'Site Criteria'],
      outputs: [],
      timeline: '',
      responsible: 'Land Team Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P2',
      activity: 'LTL develops land acquisition strategy and timeline',
      inputs: [],
      outputs: ['Land Acquisition Strategy'],
      timeline: '',
      responsible: 'Land Team Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P3',
      activity: 'LTL coordinates with legal team for documentation and compliance',
      inputs: ['Land Acquisition Strategy'],
      outputs: [],
      timeline: '',
      responsible: 'Land Team Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P4',
      activity: 'LTL finalizes land finalization plan with stakeholder approval',
      inputs: [],
      outputs: ['Final Land Finalization Plan'],
      timeline: '',
      responsible: 'Land Team Lead',
      comments: ''
    }
  ];

  // RACI Matrix for Section 1.3
  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'S',
      task: 'Direct LTL to develop land finalization plan',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'Land Team Lead'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P1',
      task: 'Conduct land assessment and site evaluation',
      responsible: 'Land Team Lead',
      accountable: '',
      consulted: 'Technical Team',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P2',
      task: 'Develop acquisition strategy',
      responsible: 'Land Team Lead',
      accountable: '',
      consulted: 'Project Manager',
      informed: 'Legal Team'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P3',
      task: 'Coordinate legal documentation',
      responsible: 'Land Team Lead',
      accountable: '',
      consulted: 'Legal Team',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.3',
      step_id: 'P4',
      task: 'Finalize land plan',
      responsible: 'Land Team Lead',
      accountable: 'Project Manager',
      consulted: 'Stakeholders',
      informed: 'Project Team'
    }
  ];

  try {
    // Insert process steps
    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(processSteps);

    if (stepsError) {
      console.error('Error inserting Section 1.3 process steps:', stepsError);
      throw stepsError;
    }

    // Insert RACI matrix
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciMatrix);

    if (raciError) {
      console.error('Error inserting Section 1.3 RACI matrix:', raciError);
      throw raciError;
    }

    console.log('Successfully seeded Section 1.3 data');
  } catch (error) {
    console.error('Error seeding Section 1.3 data:', error);
    throw error;
  }
};

// Section 1.7 Data
export const seedSection17Data = async (playbookId: string) => {
  console.log('Seeding Section 1.7 data...');

  // Process Steps for Section 1.7
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.7',
      step_id: 'S',
      activity: 'Project Manager (PM) directs Commissioning Head (CH) to develop comprehensive commissioning plan',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.7',
      step_id: 'P1',
      activity: 'CH analyzes commissioning requirements and develops testing strategy',
      inputs: ['Engineering Plans', 'Technical Specifications'],
      outputs: [],
      timeline: '',
      responsible: 'Commissioning Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.7',
      step_id: 'P2',
      activity: 'CH develops commissioning procedures and test protocols',
      inputs: [],
      outputs: ['Commissioning Procedures'],
      timeline: '',
      responsible: 'Commissioning Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.7',
      step_id: 'P3',
      activity: 'CH coordinates with OEM and technical teams for commissioning preparation',
      inputs: ['Commissioning Procedures'],
      outputs: [],
      timeline: '',
      responsible: 'Commissioning Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.7',
      step_id: 'P4',
      activity: 'CH finalizes commissioning plan with timeline and resource allocation',
      inputs: [],
      outputs: ['Final Commissioning Plan'],
      timeline: '',
      responsible: 'Commissioning Head',
      comments: ''
    }
  ];

  // RACI Matrix for Section 1.7
  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.7',
      step_id: 'S',
      task: 'Direct CH to develop commissioning plan',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'Commissioning Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.7',
      step_id: 'P1',
      task: 'Analyze commissioning requirements',
      responsible: 'Commissioning Head',
      accountable: '',
      consulted: 'Engineering Team',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.7',
      step_id: 'P2',
      task: 'Develop procedures and protocols',
      responsible: 'Commissioning Head',
      accountable: '',
      consulted: 'Technical Team',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.7',
      step_id: 'P3',
      task: 'Coordinate with OEM and teams',
      responsible: 'Commissioning Head',
      accountable: '',
      consulted: 'OEM, Technical Teams',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.7',
      step_id: 'P4',
      task: 'Finalize commissioning plan',
      responsible: 'Commissioning Head',
      accountable: 'Project Manager',
      consulted: 'Stakeholders',
      informed: 'Project Team'
    }
  ];

  try {
    // Insert process steps
    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(processSteps);

    if (stepsError) {
      console.error('Error inserting Section 1.7 process steps:', stepsError);
      throw stepsError;
    }

    // Insert RACI matrix
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciMatrix);

    if (raciError) {
      console.error('Error inserting Section 1.7 RACI matrix:', raciError);
      throw raciError;
    }

    console.log('Successfully seeded Section 1.7 data');
  } catch (error) {
    console.error('Error seeding Section 1.7 data:', error);
    throw error;
  }
};

// Section 1.8 Data
export const seedSection18Data = async (playbookId: string) => {
  console.log('Seeding Section 1.8 data...');

  // Process Steps for Section 1.8
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.8',
      step_id: 'S',
      activity: 'Project Manager (PM) initiates plan integration process for all project components',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.8',
      step_id: 'P1',
      activity: 'PM consolidates all individual plans from different functional teams',
      inputs: ['Engineering Plan', 'Procurement Plan', 'Construction Plan', 'Commissioning Plan'],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.8',
      step_id: 'P2',
      activity: 'PM identifies interdependencies and potential conflicts between plans',
      inputs: [],
      outputs: ['Integration Analysis'],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.8',
      step_id: 'P3',
      activity: 'PM facilitates coordination meetings with all functional heads to resolve conflicts',
      inputs: ['Integration Analysis'],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.8',
      step_id: 'P4',
      activity: 'PM develops integrated master plan with aligned timelines and resources',
      inputs: [],
      outputs: ['Integrated Master Plan'],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    }
  ];

  // RACI Matrix for Section 1.8
  const raciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: 'section-1.8',
      step_id: 'S',
      task: 'Initiate plan integration process',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'All Functional Heads'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.8',
      step_id: 'P1',
      task: 'Consolidate individual plans',
      responsible: 'Project Manager',
      accountable: '',
      consulted: 'Functional Heads',
      informed: 'Project Team'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.8',
      step_id: 'P2',
      task: 'Identify interdependencies and conflicts',
      responsible: 'Project Manager',
      accountable: '',
      consulted: 'Planning Team',
      informed: 'Functional Heads'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.8',
      step_id: 'P3',
      task: 'Facilitate coordination meetings',
      responsible: 'Project Manager',
      accountable: '',
      consulted: 'All Functional Heads',
      informed: 'Project Team'
    },
    {
      playbook_id: playbookId,
      phase_id: 'section-1.8',
      step_id: 'P4',
      task: 'Develop integrated master plan',
      responsible: 'Project Manager',
      accountable: 'Project Manager',
      consulted: 'All Functional Heads',
      informed: 'Stakeholders'
    }
  ];

  try {
    // Insert process steps
    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(processSteps);

    if (stepsError) {
      console.error('Error inserting Section 1.8 process steps:', stepsError);
      throw stepsError;
    }

    // Insert RACI matrix
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciMatrix);

    if (raciError) {
      console.error('Error inserting Section 1.8 RACI matrix:', raciError);
      throw raciError;
    }

    console.log('Successfully seeded Section 1.8 data');
  } catch (error) {
    console.error('Error seeding Section 1.8 data:', error);
    throw error;
  }
};
