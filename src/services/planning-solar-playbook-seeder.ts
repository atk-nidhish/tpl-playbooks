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

    // Chapter 1 - Planning Process Steps (existing data)
    const chapter1ProcessSteps = [
      // Section 1.1 - Project Initiation Process Steps
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
      },
      // Section 1.2 - Planning Scope Process Steps
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
      },
      // Section 1.3 - Land Plan Process Steps
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
      },
      // Section 1.4 - Engineering Plan Process Steps
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
      },
      // Section 1.5 - Procurement Plan Process Steps
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
      },
      // Section 1.6 - Construction Plan Process Steps
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
      },
      // Section 1.7 - Commissioning Plan Process Steps
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
      },
      // Section 1.8 - Plan Integration Process Steps
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
      },
      // Section 1.9 - Plan Update Process Steps
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

    // Chapter 2 - Scope Management Plan Process Steps (Updated from images)
    const chapter2ProcessSteps = [
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'S',
        activity: 'Project Planner (PP) requests Chief PMO to develop Work Breakdown structure (WBS) and shares the following inputs',
        inputs: ['Project Execution Approach (PEA)', 'Project Schedule (PS)', 'Scope Matrix'],
        outputs: [],
        timeline: '-',
        responsible: 'Project Planner',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P1',
        activity: 'Chief PMO reviews the inputs and project scope definition to finalizes project control philosophy i.e., required level of monitoring and control on the project at each level',
        inputs: ['PEA (includes scope matrix)', 'PS', 'Scope Matrix'],
        outputs: ['Project Control Philosophy'],
        timeline: '0.5',
        responsible: 'Chief PMO',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P2',
        activity: 'Chief PMO shares the scope matrix and project control philosophy with Schedule Head',
        inputs: [],
        outputs: [],
        timeline: '-',
        responsible: 'Chief PMO',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P3',
        activity: 'Schedule Head defines WBS elements, based on the approved control philosophy. For defining the elements, Schedule Head leverages the Master WBS Solar and makes necessary changes to ensure alignment with project scope and schedule. The WBS reflects the project level classification as listed below: L1-1 Solar Power Plant System, L2-1.1 Electrical System, L3-1.1.1 Sub-system, L4-1.1.1.1 Component, L5-1.1.1.1.1 Functional Element',
        inputs: ['Scope Matrix'],
        outputs: ['Preliminary WBS'],
        timeline: '1',
        responsible: 'Schedule Head',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P4',
        activity: 'Schedule Head develops the codes for WBS, based on the project level WBS classification to be adopted',
        inputs: ['Project Control Philosophy', 'Master WBS Solar'],
        outputs: [],
        timeline: '',
        responsible: 'Schedule Head',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P5',
        activity: 'Schedule Head checks for consistency in alignment between the defined project WBS and Cost Breakdown Structure (CBS) based on the project CBS. In case of a lack of consistency between the WBS and CBS structures, the CBS elements and codes are revised to achieve consistency with WBS',
        inputs: ['CBS'],
        outputs: [],
        timeline: '1',
        responsible: 'Schedule Head',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P6',
        activity: 'Schedule Head prepares the WBS for the project using a bottom-up approach, which involves preparing WBS elements at package level which are collated at the project level to form the Project WBS',
        inputs: [],
        outputs: [],
        timeline: '1',
        responsible: 'Schedule Head',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P7',
        activity: 'Schedule Head seeks approval from Chief PMO on the WBS and incorporates any necessary changes',
        inputs: [],
        outputs: ['WBS (Template Provided)'],
        timeline: '0.5',
        responsible: 'Schedule Head',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'E',
        activity: 'Schedule Head publishes the project WBS which forms the basis for project monitoring and control. Schedule Head share the project WBS with Project Planner for cross-functional coordination',
        inputs: [],
        outputs: [],
        timeline: 'Total - 4-5 days',
        responsible: 'Schedule Head',
        comments: ''
      }
    ];

    // Chapter 3 - Cost Management Plan Process Steps (Updated from images)
    const chapter3ProcessSteps = [
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'S',
        activity: 'Project Planner (PP) requests for Cost Breakdown Structure (CBS) and shares the following Plans/schedules with Chief PMO',
        inputs: ['Project Schedule (PS)', 'Project Execution Approach (PEA)', 'Project Procurement Plan (PPP)', 'Project Budget (submitted during bid submission)', 'Work Breakdown Structure (WBS)'],
        outputs: [],
        timeline: '-',
        responsible: 'Project Planner',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P1',
        activity: 'Chief PMO asks the Cost Controller to start the development of CBS and shares the inputs (Project Schedule, Project Execution Approach, Project Procurement Plan, Project Budget and Work Breakdown Structure)',
        inputs: ['PS', 'PEA (includes scope matrix)', 'PPP', 'Project Budget', 'WBS'],
        outputs: [],
        timeline: '-',
        responsible: 'Chief PMO',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P2',
        activity: 'CC defines/ realigns the coding structure for CBS in line with the Work Breakdown Structure coding structure',
        inputs: [],
        outputs: [],
        timeline: '0.5',
        responsible: 'Cost Controller',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P3',
        activity: 'CC defines the elements of CBS leveraging the Project Work Breakdown Structure and Master CBS Solar. CC makes modifications to master CBS Solar to ensure alignment with project scope and schedule.',
        inputs: ['Master CBS Solar'],
        outputs: ['Preliminary CBS'],
        timeline: '1',
        responsible: 'Cost Controller',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P4',
        activity: 'CC assigns the scope to all elements defined in CBS using the Scope Matrix',
        inputs: ['Scope Matrix'],
        outputs: [],
        timeline: '',
        responsible: 'Cost Controller',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P5',
        activity: 'CC checks for consistency between Work Breakdown Structure and CBS up to package level based on project control philosophy',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Cost Controller',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P6',
        activity: 'In case of consistency between Work Breakdown Structure and CBS, process P7 is followed and In case of inconsistency between Work Breakdown Structure and CBS, CBS is realigned through process P2',
        inputs: [],
        outputs: [],
        timeline: '0.5',
        responsible: 'Cost Controller',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P7',
        activity: 'CC assigns the budget cost to the CBS elements based on the project budget',
        inputs: ['Project Budget'],
        outputs: [],
        timeline: '1',
        responsible: 'Cost Controller',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P8',
        activity: 'CC allocates specific cost estimates (in INR) to each element. CC uses vendor quotes, historical data, and expert judgment to estimate cost for each item. CC consults Solar Procurement Head, if needed. CC seeks sign off from Chief PMO for CBS',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Cost Controller',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P9',
        activity: 'If changes are required, CC makes necessary revisions and reshares for approval. If no changes are required, CC finalizes CBS',
        inputs: [],
        outputs: ['CBS (Template Provided)'],
        timeline: '1',
        responsible: 'Cost Controller',
        comments: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'E',
        activity: 'Cost Controller publishes the project CBS, which forms the basis for project cost monitoring and control. CC shares the project CBS with Project Planner for cross-functional coordination',
        inputs: [],
        outputs: [],
        timeline: 'Total - 4-5 days',
        responsible: 'Cost Controller',
        comments: ''
      }
    ];

    // Insert all process steps
    const allProcessSteps = [
      ...chapter1ProcessSteps,
      ...chapter2ProcessSteps,
      ...chapter3ProcessSteps
    ];

    for (const step of allProcessSteps) {
      await supabase.from('process_steps').insert(step);
    }

    // Chapter 2 - Scope Management Plan RACI Matrix (Updated from images)
    const chapter2RACIData = [
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'S',
        task: 'Request for Work Breakdown Structure (WBS) and share the required inputs (Project Execution Approach, Project Schedule, and Scope Matrix)',
        responsible: 'Project Planner',
        accountable: '',
        consulted: '',
        informed: 'Chief PMO'
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P1',
        task: 'Review project scope definition and approve the project control philosophy, i.e., required level of monitoring and control on the project, at each level',
        responsible: 'Chief PMO',
        accountable: '',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P2',
        task: 'Share the scope matrix and project control philosophy',
        responsible: 'Chief PMO',
        accountable: '',
        consulted: '',
        informed: 'Schedule Head'
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P3',
        task: 'Define WBS elements based on the approved control philosophy, leveraging the Master WBS Solar and making necessary changes to align with project scope and schedule',
        responsible: 'Schedule Head',
        accountable: '',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P4',
        task: 'Define the WBS codes for the project',
        responsible: 'Schedule Head',
        accountable: 'Schedule Head',
        consulted: '',
        informed: 'Chief PMO'
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P5',
        task: 'Check for consistency between the defined project WBS and Cost Breakdown Structure (CBS); revise CBS codes if needed',
        responsible: 'Schedule Head',
        accountable: '',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P6',
        task: 'Prepare the WBS for the project using a bottom-up approach, collating package-level WBS elements at the project level',
        responsible: 'Schedule Head',
        accountable: '',
        consulted: '',
        informed: 'Chief PMO'
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'P7',
        task: 'Seek approval from Chief PMO on the WBS and incorporate necessary changes',
        responsible: 'Schedule Head',
        accountable: '',
        consulted: 'Chief PMO',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'E',
        task: 'Publish and share project WBS',
        responsible: 'Schedule Head',
        accountable: '',
        consulted: '',
        informed: 'Project Planner'
      }
    ];

    // Chapter 3 - Cost Management Plan RACI Matrix (Updated from images)
    const chapter3RACIData = [
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'S',
        task: 'Request for Cost Breakdown Structure (CBS) and share the required Plans/schedules with Chief PMO',
        responsible: 'Project Planner',
        accountable: '',
        consulted: '',
        informed: 'Chief PMO'
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P1',
        task: 'Ask the Cost Controller (CC) to commence the development of CBS and share the required inputs with CC',
        responsible: 'Chief PMO',
        accountable: '',
        consulted: '',
        informed: 'Cost Controller'
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P2',
        task: 'Define/realign the coding structure for CBS to align with Work Breakdown Structure (WBS) coding structure',
        responsible: 'Cost Controller',
        accountable: '',
        consulted: 'Schedule Head',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P3',
        task: 'Define the elements of the CBS, leveraging the WBS and Master CBS Solar, and make the necessary modifications to ensure alignment with the project\'s scope and requirements',
        responsible: 'Cost Controller',
        accountable: '',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P4',
        task: 'Assign the scope to all CBS elements using the Scope Matrix',
        responsible: 'Cost Controller',
        accountable: '',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P5',
        task: 'Check for consistency between Work Breakdown Structure and CBS up to the package level',
        responsible: 'Cost Controller',
        accountable: '',
        consulted: '',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P6',
        task: 'If Work Breakdown Structure and CBS are inconsistent, realign CBS to make it consistent with WBS',
        responsible: 'Cost Controller',
        accountable: '',
        consulted: 'Schedule Head',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P7',
        task: 'Assign the budget cost (in INR) to the CBS elements based on the project budget',
        responsible: 'Cost Controller',
        accountable: '',
        consulted: 'Solar Procurement Head',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P8',
        task: 'Seek sign-off from Chief PMO for CBS',
        responsible: 'Cost Controller',
        accountable: 'Cost Controller',
        consulted: 'Chief PMO',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'P9',
        task: 'If changes are required, make necessary revisions and reshare for approval, to finalize CBS',
        responsible: 'Cost Controller',
        accountable: 'Cost Controller',
        consulted: 'Chief PMO',
        informed: ''
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'E',
        task: 'Publish the project CBS, which forms the basis for project cost monitoring and control. Share the project CBS with Project Planner for cross-functional coordination',
        responsible: 'Cost Controller',
        accountable: '',
        consulted: 'Chief PMO',
        informed: 'Project Planner'
      }
    ];

    // Insert all RACI data
    const allRACIData = [
      ...chapter2RACIData,
      ...chapter3RACIData
    ];

    for (const raci of allRACIData) {
      await supabase.from('raci_matrix').insert(raci);
    }

    // Process map data for new sections
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
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-2',
        step_id: 'START',
        step_type: 'start',
        title: 'Scope Management Start',
        description: 'Beginning of scope management process',
        order_index: 1
      },
      {
        playbook_id: playbookId,
        phase_id: 'chapter-3',
        step_id: 'START',
        step_type: 'start',
        title: 'Cost Management Start',
        description: 'Beginning of cost management process',
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
