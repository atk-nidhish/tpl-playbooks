
export const section2_1Data = {
  processSteps: [
    {
      step_id: 'S',
      activity: 'Project Planner (PP) requests Chief PMO to develop Work Breakdown structure (WBS) and shares the following inputs - Project Execution Approach (PEA), Project Schedule (PS), Scope Matrix',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Planner',
      comments: ''
    },
    {
      step_id: 'P1',
      activity: 'Chief PMO reviews the inputs and project scope definition to finalizes project control philosophy i.e., required level of monitoring and control on the project at each level',
      inputs: ['PEA (includes scope matrix)', 'PS', 'Scope Matrix'],
      outputs: ['Project Control Philosophy'],
      timeline: '0.5',
      responsible: 'Chief PMO',
      comments: ''
    },
    {
      step_id: 'P2',
      activity: 'Chief PMO shares the scope matrix and Project Control Philosophy with Schedule Head',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Chief PMO',
      comments: ''
    },
    {
      step_id: 'P3',
      activity: 'Schedule Head defines WBS elements, based on the approved control philosophy - For defining the elements, Schedule Head leverages the Master WBS Wind and makes necessary changes to ensure alignment with project scope and schedule - The WBS reflects the project level classification to be adopted as listed below: L1 Wind Power Plant System (Turbine System, Electrical System, Monitoring System), L2 Sub-system (Rotor Assembly, Nacelle, Tower, Foundation), L3 Component (Blades, Hub, Gearbox, Generator, Yaw System, Power Converter, Transformer), L4 Master WBS Wind',
      inputs: ['Scope Matrix'],
      outputs: ['Preliminary WBS'],
      timeline: '1',
      responsible: 'Schedule Head',
      comments: ''
    },
    {
      step_id: 'P4',
      activity: 'Schedule Head develops the codes for WBS, based on the project level WBS classification to be adopted',
      inputs: ['Project Control Philosophy'],
      outputs: [],
      timeline: '',
      responsible: 'Schedule Head',
      comments: ''
    },
    {
      step_id: 'P5',
      activity: 'Schedule Head checks for consistency in alignment between the defined project WBS and Cost Breakdown Structure (CBS) based on the project CBS - In case of a lack of consistency between the WBS and CBS structures, the CBS elements and codes are revised to achieve consistency with WBS',
      inputs: ['CBS'],
      outputs: [],
      timeline: '1',
      responsible: 'Schedule Head',
      comments: ''
    },
    {
      step_id: 'P6',
      activity: 'Schedule Head prepares the WBS for the project using a bottom-up approach, which involves mapping WBS elements at package level which are collated at the project level to form the Project WBS',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Schedule Head',
      comments: ''
    },
    {
      step_id: 'P7',
      activity: 'Schedule Head seeks approval from Chief PMO on the WBS and incorporates any necessary changes',
      inputs: [],
      outputs: ['WBS (Template Provided)'],
      timeline: '0.5',
      responsible: 'Schedule Head',
      comments: ''
    },
    {
      step_id: 'E',
      activity: 'Schedule Head publishes the project WBS which forms the basis for project monitoring and control - Schedule Head shares the project WBS with Project Planner for cross-functional coordination',
      inputs: [],
      outputs: [],
      timeline: 'Total – 4 – 5 days',
      responsible: 'Schedule Head',
      comments: ''
    }
  ],

  raciMatrix: [
    {
      step_id: 'S',
      task: 'Request for Work Breakdown Structure (WBS) and share the required inputs (Project Execution Approach, Project Schedule, and Scope Matrix)',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Chief PMO'
    },
    {
      step_id: 'P1',
      task: 'Review project scope definition and approve the project control philosophy, i.e., required level of monitoring and control on the project, at each level',
      responsible: 'Chief PMO',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      step_id: 'P2',
      task: 'Share the scope matrix and project control philosophy',
      responsible: 'Chief PMO',
      accountable: '',
      consulted: '',
      informed: 'Schedule Head'
    },
    {
      step_id: 'P3',
      task: 'Define WBS elements based on the approved control philosophy, leveraging the Master WBS Wind and making necessary changes to align with project scope and schedule',
      responsible: 'Schedule Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      step_id: 'P4',
      task: 'Define the WBS codes for the project',
      responsible: 'Schedule Head',
      accountable: 'Schedule Head',
      consulted: '',
      informed: 'Chief PMO'
    },
    {
      step_id: 'P5',
      task: 'Check for consistency between the defined project WBS and Cost Breakdown Structure (CBS); revise CBS codes if needed',
      responsible: 'Schedule Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      step_id: 'P6',
      task: 'Prepare WBS for the project using a bottom-up approach, collating package-level WBS elements at the project level',
      responsible: 'Schedule Head',
      accountable: '',
      consulted: '',
      informed: 'Chief PMO'
    },
    {
      step_id: 'P7',
      task: 'Seek approval from Chief PMO on the WBS and incorporate necessary changes',
      responsible: 'Schedule Head',
      accountable: '',
      consulted: '',
      informed: 'Chief PMO'
    },
    {
      step_id: 'E',
      task: 'Publish and share project WBS',
      responsible: 'Schedule Head',
      accountable: '',
      consulted: '',
      informed: 'Project Planner'
    }
  ],

  processMap: [
    {
      step_id: 'S',
      step_type: 'start',
      title: 'Request WBS Development',
      description: 'Project Planner requests Chief PMO to develop Work Breakdown Structure',
      order_index: 1
    },
    {
      step_id: 'P1',
      step_type: 'process',
      title: 'Review and finalize project control philosophy',
      description: 'Chief PMO reviews inputs and finalizes project control philosophy',
      order_index: 2
    },
    {
      step_id: 'P2',
      step_type: 'process',
      title: 'Share scope matrix and control philosophy',
      description: 'Chief PMO shares scope matrix and Project Control Philosophy with Schedule Head',
      order_index: 3
    },
    {
      step_id: 'P3',
      step_type: 'process',
      title: 'Define WBS elements',
      description: 'Schedule Head defines WBS elements based on approved control philosophy',
      order_index: 4
    },
    {
      step_id: 'P5',
      step_type: 'decision',
      title: 'Check WBS and CBS consistency',
      description: 'Schedule Head checks for consistency between WBS and CBS structures',
      order_index: 5
    },
    {
      step_id: 'P6',
      step_type: 'process',
      title: 'Prepare project WBS',
      description: 'Schedule Head prepares WBS using bottom-up approach',
      order_index: 6
    },
    {
      step_id: 'P7',
      step_type: 'milestone',
      title: 'Seek Chief PMO approval',
      description: 'Schedule Head seeks approval from Chief PMO on the WBS',
      order_index: 7
    },
    {
      step_id: 'E',
      step_type: 'end',
      title: 'Publish and share project WBS',
      description: 'Schedule Head publishes project WBS for monitoring and control',
      order_index: 8
    }
  ]
};
