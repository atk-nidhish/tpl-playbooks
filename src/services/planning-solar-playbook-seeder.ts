import { supabase } from "@/integrations/supabase/client";

export const createPlanningSolarPlaybook = async () => {
  console.log('Creating Planning - Solar playbook...');

  const { data, error } = await supabase
    .from('playbooks')
    .insert({
      name: 'planning-solar',
      title: 'Planning - Solar',
      description: 'Solar Project Planning Playbook'
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating Planning - Solar playbook:', error);
    throw error;
  }

  console.log('Planning - Solar playbook created successfully:', data);
  return data.id;
};

export const seedPlanningSolarData = async () => {
  console.log('Starting to seed Planning - Solar playbook data...');

  try {
    const playbookId = await createPlanningSolarPlaybook();

    // Define sections with their phases
    const sections = [
      {
        id: 'section-1.1',
        title: 'Project Initiation',
        description: 'Initial project setup and requirements gathering',
        processMapImage: '/lovable-uploads/2289e97c-b60f-4e79-b555-017b1a434121.png'
      },
      {
        id: 'section-1.2',
        title: 'Planning Scope',
        description: 'Define project scope and planning requirements',
        processMapImage: '/lovable-uploads/e636eada-e8c6-4f53-9c93-b0409b936e03.png'
      },
      {
        id: 'section-1.3',
        title: 'Land Plan',
        description: 'Land acquisition and development planning',
        processMapImage: '/lovable-uploads/3d9ebbef-27ff-4dc6-89d0-ec7cc752027e.png'
      },
      {
        id: 'section-1.4',
        title: 'Engineering Plan',
        description: 'Engineering design and execution planning',
        processMapImage: '/lovable-uploads/dbb9feef-9d7f-4850-8177-22dca61ec0d7.png'
      },
      {
        id: 'section-1.5',
        title: 'Procurement Plan',
        description: 'Procurement strategy and execution planning',
        processMapImage: '/lovable-uploads/7850b53b-86d8-44eb-8325-17ac3366fc82.png'
      },
      {
        id: 'section-1.6',
        title: 'Construction Plan',
        description: 'Construction management and execution planning',
        processMapImage: '/lovable-uploads/612ac02b-ad2d-414a-a2db-6fbbd09d360d.png'
      },
      {
        id: 'section-1.7',
        title: 'Commissioning Plan',
        description: 'Commissioning strategy and execution planning',
        processMapImage: '/lovable-uploads/b8a0d568-9703-4696-bb00-ea27bca372f1.png'
      },
      {
        id: 'section-1.8',
        title: 'Plan Integration',
        description: 'Integration of all detailed plans into comprehensive project schedule',
        processMapImage: '/lovable-uploads/0b8675aa-99ea-47ba-9261-2092b1d93024.png'
      },
      {
        id: 'section-1.9',
        title: 'Plan Update',
        description: 'Plan revision and schedule management throughout project lifecycle',
        processMapImage: '/lovable-uploads/d2969666-1f4c-4539-bd93-f744a481fd27.png'
      }
    ];

    // Section 1.1 - Project Initiation Process Steps
    const section11ProcessSteps = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.1',
        step_id: 'S',
        activity: 'Project Kickoff and Initial Setup',
        inputs: [],
        outputs: ['Project Charter'],
        timeline: '1',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.1',
        step_id: 'P1',
        activity: 'Identify key stakeholders and establish communication plan',
        inputs: ['Project Charter'],
        outputs: ['Stakeholder Register', 'Communication Plan'],
        timeline: '2',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.1',
        step_id: 'E',
        activity: 'Complete project initiation documentation and approvals',
        inputs: ['Stakeholder Register', 'Communication Plan'],
        outputs: ['Approved Project Initiation Document'],
        timeline: '3',
        responsible: 'Project Manager',
        comments: ''
      }
    ];

    // Section 1.2 - Planning Scope Process Steps
    const section12ProcessSteps = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.2',
        step_id: 'S',
        activity: 'Define project scope and objectives',
        inputs: ['Approved Project Initiation Document'],
        outputs: ['Project Scope Statement'],
        timeline: '1',
        responsible: 'Project Planner',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.2',
        step_id: 'P1',
        activity: 'Identify deliverables and acceptance criteria',
        inputs: ['Project Scope Statement'],
        outputs: ['Deliverables List', 'Acceptance Criteria'],
        timeline: '2',
        responsible: 'Project Planner',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.2',
        step_id: 'P2',
        activity: 'Develop Work Breakdown Structure (WBS)',
        inputs: ['Deliverables List'],
        outputs: ['WBS Document'],
        timeline: '3',
        responsible: 'Project Planner',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.2',
        step_id: 'E',
        activity: 'Review and approve project scope and WBS',
        inputs: ['WBS Document', 'Acceptance Criteria'],
        outputs: ['Approved Project Scope'],
        timeline: '4',
        responsible: 'Project Manager',
        comments: ''
      }
    ];

    // Section 1.3 - Land Plan Process Steps
    const section13ProcessSteps = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.3',
        step_id: 'S',
        activity: 'Identify land acquisition requirements',
        inputs: ['Approved Project Scope'],
        outputs: ['Land Acquisition Plan'],
        timeline: '1',
        responsible: 'Land Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.3',
        step_id: 'P1',
        activity: 'Conduct land surveys and assessments',
        inputs: ['Land Acquisition Plan'],
        outputs: ['Survey Reports'],
        timeline: '2',
        responsible: 'Land Surveyor',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.3',
        step_id: 'E',
        activity: 'Finalize land acquisition and development plan',
        inputs: ['Survey Reports'],
        outputs: ['Final Land Plan'],
        timeline: '3',
        responsible: 'Land Manager',
        comments: ''
      }
    ];

    // Section 1.4 - Engineering Plan Process Steps
    const section14ProcessSteps = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.4',
        step_id: 'S',
        activity: 'Develop preliminary engineering designs',
        inputs: ['Final Land Plan'],
        outputs: ['Preliminary Engineering Designs'],
        timeline: '1',
        responsible: 'Engineering Lead',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.4',
        step_id: 'P1',
        activity: 'Review and refine engineering designs',
        inputs: ['Preliminary Engineering Designs'],
        outputs: ['Refined Engineering Designs'],
        timeline: '2',
        responsible: 'Engineering Lead',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.4',
        step_id: 'P2',
        activity: 'Coordinate with procurement and construction teams for design inputs',
        inputs: ['Refined Engineering Designs'],
        outputs: ['Final Engineering Plan'],
        timeline: '3',
        responsible: 'Engineering Lead',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.4',
        step_id: 'E',
        activity: 'Approve final engineering plan',
        inputs: ['Final Engineering Plan'],
        outputs: ['Approved Engineering Plan'],
        timeline: '4',
        responsible: 'Project Manager',
        comments: ''
      }
    ];

    // Section 1.5 - Procurement Plan Process Steps
    const section15ProcessSteps = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.5',
        step_id: 'S',
        activity: 'Develop procurement strategy',
        inputs: ['Approved Engineering Plan'],
        outputs: ['Procurement Strategy Document'],
        timeline: '1',
        responsible: 'Procurement Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.5',
        step_id: 'P1',
        activity: 'Identify suppliers and vendors',
        inputs: ['Procurement Strategy Document'],
        outputs: ['Supplier List'],
        timeline: '2',
        responsible: 'Procurement Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.5',
        step_id: 'E',
        activity: 'Finalize procurement plan and contracts',
        inputs: ['Supplier List'],
        outputs: ['Procurement Plan'],
        timeline: '3',
        responsible: 'Procurement Manager',
        comments: ''
      }
    ];

    // Section 1.6 - Construction Plan Process Steps
    const section16ProcessSteps = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.6',
        step_id: 'S',
        activity: 'Develop construction schedule and resource plan',
        inputs: ['Procurement Plan'],
        outputs: ['Construction Schedule'],
        timeline: '1',
        responsible: 'Construction Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.6',
        step_id: 'P1',
        activity: 'Coordinate with procurement for material delivery',
        inputs: ['Construction Schedule'],
        outputs: ['Material Delivery Plan'],
        timeline: '2',
        responsible: 'Construction Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.6',
        step_id: 'E',
        activity: 'Approve final construction plan',
        inputs: ['Material Delivery Plan'],
        outputs: ['Approved Construction Plan'],
        timeline: '3',
        responsible: 'Project Manager',
        comments: ''
      }
    ];

    // Section 1.7 - Commissioning Plan Process Steps
    const section17ProcessSteps = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.7',
        step_id: 'S',
        activity: 'Develop commissioning strategy',
        inputs: ['Approved Construction Plan'],
        outputs: ['Commissioning Strategy Document'],
        timeline: '1',
        responsible: 'Commissioning Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.7',
        step_id: 'P1',
        activity: 'Plan commissioning tests and inspections',
        inputs: ['Commissioning Strategy Document'],
        outputs: ['Test and Inspection Plan'],
        timeline: '2',
        responsible: 'Commissioning Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.7',
        step_id: 'E',
        activity: 'Approve commissioning plan',
        inputs: ['Test and Inspection Plan'],
        outputs: ['Approved Commissioning Plan'],
        timeline: '3',
        responsible: 'Project Manager',
        comments: ''
      }
    ];

    // Section 1.8 - Plan Integration Process Steps
    const section18ProcessSteps = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'S',
        activity: 'Project Planner receives detailed plans from across the functional teams (Land, Engineering, Procurement, and Projects)',
        inputs: [],
        outputs: [],
        timeline: '-',
        responsible: 'Project Planner',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P1',
        activity: 'Project Planner integrates all detailed plans received from functional departments (Land, Engineering, Procurement, Projects) to create Detailed Project Schedule',
        inputs: ['PS', 'LFP', 'EEPs', 'PPP', 'CMP', 'RCP', 'CP'],
        outputs: ['Detailed Project Schedule (draft)'],
        timeline: '1',
        responsible: 'Project Planner',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P2',
        activity: 'Project Planner shares the Detailed Project Schedule with Chief Projects for sign off',
        inputs: ['Detailed Project Schedule (draft)'],
        outputs: [],
        timeline: '1',
        responsible: 'Project Planner',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P3',
        activity: 'If Chief Projects recommends any changes, Project Planner incorporates the modifications suggested and resubmits the revised Plan to Chief Projects',
        inputs: [],
        outputs: [],
        timeline: '1',
        responsible: 'Project Planner',
        comments: 'Project Planner modifies the plan in consultation with respective functional lead'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P4',
        activity: 'Chief Projects shares the Detailed Project Schedule with COO to seek final sign-off',
        inputs: [],
        outputs: ['Detailed Project Schedule (Final)'],
        timeline: '1',
        responsible: 'Chief Projects',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P5',
        activity: 'If COO recommends any modifications, Chief Projects notifies the same to Project Planner',
        inputs: [],
        outputs: [],
        timeline: '-',
        responsible: 'Chief Projects',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P6',
        activity: 'Project Planner incorporates COO\'s recommended modifications and resubmits the revised Plan to Chief Projects',
        inputs: [],
        outputs: [],
        timeline: '1',
        responsible: 'Project Planner',
        comments: 'Project Planner modifies the plan in consultation with respective functional lead'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P7',
        activity: 'Project Planner reshares the Detailed Project Schedule with Chief Projects for seeking approval from COO',
        inputs: [],
        outputs: [],
        timeline: '1',
        responsible: 'Project Planner',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P8',
        activity: 'Chief Projects shares the signed-off Detailed Project Schedule with Project Planner',
        inputs: [],
        outputs: [],
        timeline: '1',
        responsible: 'Chief Projects',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'E',
        activity: 'Project Planner publishes the Detailed Project Schedule to notify functional teams',
        inputs: [],
        outputs: [],
        timeline: 'Total 4-8 days',
        responsible: 'Project Planner',
        comments: ''
      }
    ];

    // Section 1.9 - Plan Update Process Steps
    const section19ProcessSteps = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'S',
        activity: 'The Schedule Head (SH) or Site Planner (SP) identifies a delay in project execution that necessitates an update to the project Plan',
        inputs: [],
        outputs: [],
        timeline: '-',
        responsible: 'Schedule Head / Site Planner',
        comments: 'If delay is identified by SH, SH informs SP about the delay'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P1',
        activity: 'SP informs the PM about the identified delay',
        inputs: [],
        outputs: [],
        timeline: '-',
        responsible: 'Schedule Planner',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P2',
        activity: 'PM collaborates with the functional lead, responsible for the delayed activity, to assess the impact and define corrective actions, including timeline adjustments and re-sequencing activities across the project',
        inputs: [],
        outputs: ['Corrective Action Plan (Template Provided)'],
        timeline: '3',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P3',
        activity: 'PM revises the schedules, considering the discussed changes with functional lead and realigns dependent activities',
        inputs: ['Corrective Action Plan'],
        outputs: [],
        timeline: '1',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P4',
        activity: 'PM submits the revised Plan to Chief Solar for review and approval (approval via formal sign-off)',
        inputs: [],
        outputs: [],
        timeline: '3',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P5',
        activity: 'PM incorporates any feedback from the Chief Solar and resubmits the revised Plan to Chief Solar for approval, if needed',
        inputs: [],
        outputs: ['Draft Revised Plan'],
        timeline: '',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P6',
        activity: 'For a revision of more than 5% delay in the overall timeline, PM also seeks approval from Chief Project',
        inputs: [],
        outputs: ['Final Revised Plan'],
        timeline: '2',
        responsible: 'Project Manager',
        comments: '5% delay will be assessed on a rolling basis against the updated plan, and not on the original plan'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'E',
        activity: 'PM publishes the updated Plan to notify functional leads, and Project Planner of the revised schedule',
        inputs: [],
        outputs: [],
        timeline: 'Total 9-10 days',
        responsible: 'Project Manager',
        comments: 'The process of Plan revision and schedule management continues throughout the project lifecycle'
      }
    ];

    // Insert all process steps
    const allProcessSteps = [
      ...section11ProcessSteps,
      ...section12ProcessSteps,
      ...section13ProcessSteps,
      ...section14ProcessSteps,
      ...section15ProcessSteps,
      ...section16ProcessSteps,
      ...section17ProcessSteps,
      ...section18ProcessSteps,
      ...section19ProcessSteps
    ];

    for (const step of allProcessSteps) {
      await supabase.from('process_steps').insert(step);
    }

    // Section 1.1 - Project Initiation RACI Matrix
    const section11RACIData = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.1',
        step_id: 'S',
        task: 'Project Kickoff and Initial Setup',
        responsible: 'Project Manager',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.1',
        step_id: 'P1',
        task: 'Identify key stakeholders and establish communication plan',
        responsible: 'Project Manager',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.1',
        step_id: 'E',
        task: 'Complete project initiation documentation and approvals',
        responsible: 'Project Manager',
        accountable: 'Project Sponsor',
        consulted: '',
        informed: ''
      }
    ];

    // Section 1.2 - Planning Scope RACI Matrix
    const section12RACIData = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.2',
        step_id: 'S',
        task: 'Define project scope and objectives',
        responsible: 'Project Planner',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.2',
        step_id: 'P1',
        task: 'Identify deliverables and acceptance criteria',
        responsible: 'Project Planner',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.2',
        step_id: 'P2',
        task: 'Develop Work Breakdown Structure (WBS)',
        responsible: 'Project Planner',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.2',
        step_id: 'E',
        task: 'Review and approve project scope and WBS',
        responsible: 'Project Manager',
        accountable: 'Project Sponsor',
        consulted: '',
        informed: ''
      }
    ];

    // Section 1.3 - Land Plan RACI Matrix
    const section13RACIData = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.3',
        step_id: 'S',
        task: 'Identify land acquisition requirements',
        responsible: 'Land Manager',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.3',
        step_id: 'P1',
        task: 'Conduct land surveys and assessments',
        responsible: 'Land Surveyor',
        accountable: 'Land Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.3',
        step_id: 'E',
        task: 'Finalize land acquisition and development plan',
        responsible: 'Land Manager',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      }
    ];

    // Section 1.4 - Engineering Plan RACI Matrix
    const section14RACIData = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.4',
        step_id: 'S',
        task: 'Develop preliminary engineering designs',
        responsible: 'Engineering Lead',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.4',
        step_id: 'P1',
        task: 'Review and refine engineering designs',
        responsible: 'Engineering Lead',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.4',
        step_id: 'P2',
        task: 'Coordinate with procurement and construction teams for design inputs',
        responsible: 'Engineering Lead',
        accountable: 'Project Manager',
        consulted: 'Procurement Manager, Construction Manager',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.4',
        step_id: 'E',
        task: 'Approve final engineering plan',
        responsible: 'Project Manager',
        accountable: 'Project Sponsor',
        consulted: '',
        informed: ''
      }
    ];

    // Section 1.5 - Procurement Plan RACI Matrix
    const section15RACIData = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.5',
        step_id: 'S',
        task: 'Develop procurement strategy',
        responsible: 'Procurement Manager',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.5',
        step_id: 'P1',
        task: 'Identify suppliers and vendors',
        responsible: 'Procurement Manager',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.5',
        step_id: 'E',
        task: 'Finalize procurement plan and contracts',
        responsible: 'Procurement Manager',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      }
    ];

    // Section 1.6 - Construction Plan RACI Matrix
    const section16RACIData = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.6',
        step_id: 'S',
        task: 'Develop construction schedule and resource plan',
        responsible: 'Construction Manager',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.6',
        step_id: 'P1',
        task: 'Coordinate with procurement for material delivery',
        responsible: 'Construction Manager',
        accountable: 'Project Manager',
        consulted: 'Procurement Manager',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.6',
        step_id: 'E',
        task: 'Approve final construction plan',
        responsible: 'Project Manager',
        accountable: 'Project Sponsor',
        consulted: '',
        informed: ''
      }
    ];

    // Section 1.7 - Commissioning Plan RACI Matrix
    const section17RACIData = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.7',
        step_id: 'S',
        task: 'Develop commissioning strategy',
        responsible: 'Commissioning Manager',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.7',
        step_id: 'P1',
        task: 'Plan commissioning tests and inspections',
        responsible: 'Commissioning Manager',
        accountable: 'Project Manager',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.7',
        step_id: 'E',
        task: 'Approve commissioning plan',
        responsible: 'Project Manager',
        accountable: 'Project Sponsor',
        consulted: '',
        informed: ''
      }
    ];

    // Section 1.8 - Plan Integration RACI Matrix
    const section18RACIData = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'S',
        task: 'Receive plans from across cross-functional teams',
        responsible: 'Project Planner',
        accountable: 'Project Planner',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P1',
        task: 'Integrate all detailed plans received from functional departments (Land, Engineering, Procurement, Projects) to create Detailed Project Schedule',
        responsible: 'Project Planner',
        accountable: 'Project Planner',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P2',
        task: 'Share the Detailed Project Schedule with Chief Projects for sign off',
        responsible: 'Project Planner',
        accountable: 'Project Planner',
        consulted: '',
        informed: 'Chief Projects'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P3',
        task: 'Share the Detailed Project Schedule with COO for final sign-off',
        responsible: 'Chief Projects',
        accountable: 'Chief Projects',
        consulted: '',
        informed: 'COO'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P4',
        task: 'If COO recommends any modifications, discuss the required modification with the respective functional department',
        responsible: 'Chief Projects',
        accountable: 'Chief Projects',
        consulted: 'Functional Leads',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P5',
        task: 'Update the respective plan, and share the same to Project Planner',
        responsible: 'Functional Leads',
        accountable: 'Functional Leads',
        consulted: '',
        informed: 'Project Planner'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P6',
        task: 'Integrate the updated functional plan into the Detailed Project Schedule',
        responsible: 'Project Planner',
        accountable: 'Project Planner',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P7',
        task: 'Share the Detailed Project Schedule with Chief Projects for seeking approval from COO',
        responsible: 'Project Planner',
        accountable: 'Project Planner',
        consulted: '',
        informed: 'Chief Projects'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'P8',
        task: 'Share the signed-off Detailed Project Schedule with Project Planner',
        responsible: 'Chief Projects',
        accountable: 'Chief Projects',
        consulted: '',
        informed: 'Project Planner'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'E',
        task: 'Publish the Detailed Project Schedule to notify functional teams',
        responsible: 'Project Planner',
        accountable: '',
        consulted: '',
        informed: 'Functional Leads'
      }
    ];

    // Section 1.9 - Plan Update RACI Matrix
    const section19RACIData = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'S',
        task: 'Identify a delay in project execution that necessitates an update to the project Plan',
        responsible: 'Schedule Head / Site Planner',
        accountable: '',
        consulted: '',
        informed: 'Site Planner, Chief PMO'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P1',
        task: 'Inform the PM about the identified delay',
        responsible: 'Schedule Planner',
        accountable: '',
        consulted: '',
        informed: 'Project Manager'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P2',
        task: 'Collaborate with the functional lead, responsible for the delayed activity, to assess the impact and define corrective actions',
        responsible: 'Project Manager',
        accountable: '',
        consulted: 'Functional Lead',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P3',
        task: 'Revise the schedules, considering the discussed changes with functional lead and realigning dependent activities',
        responsible: 'Project Manager',
        accountable: 'Project Manager',
        consulted: 'Functional Heads',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P4',
        task: 'Submit the revised Plan to Chief Solar for review and approval (approval via formal sign-off)',
        responsible: 'Project Manager',
        accountable: '',
        consulted: 'Chief Solar',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P5',
        task: 'Incorporate any feedback from the Chief Solar and resubmit the revised Plan to Chief Solar for approval, if needed',
        responsible: 'Project Manager',
        accountable: '',
        consulted: 'Chief Solar',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'P6',
        task: 'Any delay beyond 5%, seek approval from Chief Projects',
        responsible: 'Project Manager',
        accountable: '',
        consulted: 'Chief Projects',
        informed: 'Chief Solar'
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'E',
        task: 'Publish the updated Plan to notify functional leads and Project Planner of the revised schedule - The process of Plan revision and schedule management continues throughout the project lifecycle',
        responsible: 'Project Manager',
        accountable: '',
        consulted: '',
        informed: 'Functional Heads & Project Planner'
      }
    ];

    // Insert all RACI data
    const allRACIData = [
      ...section11RACIData,
      ...section12RACIData,
      ...section13RACIData,
      ...section14RACIData,
      ...section15RACIData,
      ...section16RACIData,
      ...section17RACIData,
      ...section18RACIData,
      ...section19RACIData
    ];

    for (const raci of allRACIData) {
      await supabase.from('raci_matrix').insert(raci);
    }

    // Update process map data with correct images
    const processMapData = [
      {
        playbook_id: playbookId,
        phase_id: 'section-1.1',
        step_id: 'START',
        step_type: 'start',
        title: 'Project Initiation Start',
        description: 'Beginning of project initiation process',
        order_index: 1
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.2',
        step_id: 'START',
        step_type: 'start',
        title: 'Planning Scope Start',
        description: 'Beginning of planning scope definition',
        order_index: 1
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.3',
        step_id: 'START',
        step_type: 'start',
        title: 'Land Plan Start',
        description: 'Beginning of land planning process',
        order_index: 1
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.4',
        step_id: 'START',
        step_type: 'start',
        title: 'Engineering Plan Start',
        description: 'Beginning of engineering planning process',
        order_index: 1
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.5',
        step_id: 'START',
        step_type: 'start',
        title: 'Procurement Plan Start',
        description: 'Beginning of procurement planning process',
        order_index: 1
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.6',
        step_id: 'START',
        step_type: 'start',
        title: 'Construction Plan Start',
        description: 'Beginning of construction planning process',
        order_index: 1
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.7',
        step_id: 'START',
        step_type: 'start',
        title: 'Commissioning Plan Start',
        description: 'Beginning of commissioning planning process',
        order_index: 1
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.8',
        step_id: 'START',
        step_type: 'start',
        title: 'Plan Integration Start',
        description: 'Beginning of plan integration process',
        order_index: 1
      },
      {
        playbook_id: playbookId,
        phase_id: 'section-1.9',
        step_id: 'START',
        step_type: 'start',
        title: 'Plan Update Start',
        description: 'Beginning of plan update process',
        order_index: 1
      }
    ];

    for (const mapStep of processMapData) {
      await supabase.from('process_map').insert(mapStep);
    }

    console.log('Planning - Solar playbook data seeded successfully!');
    return playbookId;

  } catch (error) {
    console.error('Error seeding Planning - Solar playbook data:', error);
    throw error;
  }
};
