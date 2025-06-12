
export const section1_4Data = {
  processSteps: [
    {
      step_id: 'S',
      activity: 'Project Planner (PP) shares the following with the engineering team, and requests for Engineering Execution Plans (EEPs) - Project Schedule (PS) and - Project Execution Approach (PEA)',
      inputs: [],
      outputs: [],
      responsible: 'Project Planner',
      comments: ''
    },
    {
      step_id: 'P1',
      activity: 'Wind Engineering Head appoints Project Engineering Managers (PEMs) for the project - PEMs can manage multiple projects simultaneously - PEMs are appointed separately for civil, electrical and plant design',
      inputs: [],
      outputs: [],
      responsible: 'Wind Engineering Head',
      comments: ''
    },
    {
      step_id: 'P2',
      activity: 'Wind Engineering Head shares the inputs received (Project Schedule and Project Execution Approach) with PEMs',
      inputs: ['PS', 'PEA (includes scope matrix)'],
      outputs: [],
      responsible: 'Wind Engineering Head',
      comments: ''
    },
    {
      step_id: 'P3',
      activity: 'PEMs, in collaboration with respective Quality Managers¹ (QM), define the standard quality requirements to be implemented on the project (as detailed in Quality Management Plan) - These requirements are established in alignment with industry standards and the value engineering targets²',
      inputs: [],
      outputs: ['Project Quality Requirements (Template Provided)'],
      responsible: 'PEMs',
      comments: ''
    },
    {
      step_id: 'P4',
      activity: 'PEMs prepare the Basic Engineering Scope (BES), which is a list of all engineering deliverables to be executed throughout the project, along with its associated timelines - PEMs review Project Schedule and Project Execution Approach (including scope matrix) to identify engineering-related project requirements and timelines - Based on this review, PEM lists all engineering deliverables for the project - PEMs assess the criticality of each engineering deliverable and prioritize them according to the project\'s critical path to ensure alignment with the overall project timeline',
      inputs: [],
      outputs: ['BES (Template Provided)'],
      responsible: 'PEMs',
      comments: ''
    },
    {
      step_id: 'P5',
      activity: 'PEMs develop Engineering Execution Plans (EEPs) by modifying the Wind Project Master Plan to align it with project requirements and timelines, as identified in BES - EEPs cover engineering milestones and timelines, and execution strategy for all engineering design-related activities - EEPs are drafted separately for civil, electrical and plant design - EEPs are developed in consultation and alignment with Owners Engineer and EPC Contractor. Timelines of EEPs must align with Project Schedule. Any deviations must be communicated by PEM to the Project Manager for review and necessary action',
      inputs: ['BES', 'Wind Project Master Plan'],
      outputs: ['Draft EEPs'],
      responsible: 'PEMs',
      comments: ''
    },
    {
      step_id: 'P6',
      activity: 'PEMs share EEPs with Wind Engineering Head for review and approval (approval via formal sign-off)',
      inputs: [],
      outputs: [],
      responsible: 'PEMs',
      comments: ''
    },
    {
      step_id: 'P7',
      activity: 'If changes are required, PEMs incorporate the feedback and reshares for approval. If no changes are required, PEMs finalize the EEPs',
      inputs: [],
      outputs: ['EEPs (Template Provided)'],
      responsible: 'PEMs',
      comments: ''
    },
    {
      step_id: 'P8',
      activity: 'PEMs seek further approval from Chief Engineering. Required only for projects > 50 MW capacity',
      inputs: [],
      outputs: [],
      responsible: 'PEMs',
      comments: ''
    },
    {
      step_id: 'E',
      activity: 'PEMs share EEPs with Project Planner for cross-functional coordination',
      inputs: [],
      outputs: [],
      responsible: 'PEMs',
      comments: ''
    }
  ],

  raciMatrix: [
    {
      step_id: 'S',
      task: 'Share Project Schedule (PS) and Project Execution Approach (PEA) with engineering team, and requests for Engineering Execution Plans (EEPs)',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Wind Engineering Head'
    },
    {
      step_id: 'P1',
      task: 'Appoint Project Engineering Managers (PEMs) for the project',
      responsible: 'Wind Engineering Head',
      accountable: '',
      consulted: '',
      informed: 'PEMs'
    },
    {
      step_id: 'P2',
      task: 'Share inputs received (Project Schedule and Project Execution Approach) with PEMs',
      responsible: 'Wind Engineering Head',
      accountable: '',
      consulted: '',
      informed: 'PEMs'
    },
    {
      step_id: 'P3',
      task: 'Define standard quality requirements to be implemented on the project',
      responsible: 'PEMs',
      accountable: '',
      consulted: 'Quality Managers',
      informed: ''
    },
    {
      step_id: 'P4',
      task: 'Prepare the Basic Engineering Scope (BES) to list all engineering deliverables for the project, leveraging Project Schedule and Project Execution Approach',
      responsible: 'PEMs',
      accountable: 'PEMs',
      consulted: '',
      informed: 'Wind Engineering Head'
    },
    {
      step_id: 'P5',
      task: 'Prepare the draft EEPs by leveraging the Wind Project Master Plan and aligning it with project requirements',
      responsible: 'PEMs',
      accountable: 'Wind Engineering Head',
      consulted: '',
      informed: ''
    },
    {
      step_id: 'P6',
      task: 'Seek approval from Wind Engineering Head for EEPs',
      responsible: 'PEMs',
      accountable: '',
      consulted: '',
      informed: 'Wind Engineering Head'
    },
    {
      step_id: 'P7',
      task: 'Incorporate feedback and reshare for approval, if changes are required',
      responsible: 'PEMs',
      accountable: '',
      consulted: 'Wind Engineering Head',
      informed: ''
    },
    {
      step_id: 'P8',
      task: 'Seek further approval from Chief Engineering (Required only for projects > 50 MW capacity)',
      responsible: 'PEMs',
      accountable: 'Wind Engineering Head',
      consulted: 'Chief Engineering',
      informed: ''
    },
    {
      step_id: 'E',
      task: 'Circulate finalized EEPs with Project Planner',
      responsible: 'PEMs',
      accountable: '',
      consulted: '',
      informed: 'Project Planner'
    }
  ],

  processMap: [
    {
      step_id: 'S',
      step_type: 'start',
      title: 'Share PS and PEA with engineering team',
      description: 'Project Planner shares Project Schedule and Project Execution Approach with engineering team',
      order_index: 1
    },
    {
      step_id: 'P1',
      step_type: 'process',
      title: 'Appoint Project Engineering Managers',
      description: 'Wind Engineering Head appoints Project Engineering Managers for the project',
      order_index: 2
    },
    {
      step_id: 'P2',
      step_type: 'process',
      title: 'Share inputs with PEMs',
      description: 'Wind Engineering Head shares inputs received with PEMs',
      order_index: 3
    },
    {
      step_id: 'P3',
      step_type: 'process',
      title: 'Define standard quality requirements',
      description: 'PEMs define standard quality requirements in collaboration with Quality Managers',
      order_index: 4
    },
    {
      step_id: 'P4',
      step_type: 'process',
      title: 'Prepare Basic Engineering Scope',
      description: 'PEMs prepare BES listing all engineering deliverables and timelines',
      order_index: 5
    },
    {
      step_id: 'P5',
      step_type: 'process',
      title: 'Develop Engineering Execution Plans',
      description: 'PEMs develop EEPs by modifying Wind Project Master Plan',
      order_index: 6
    },
    {
      step_id: 'P6',
      step_type: 'process',
      title: 'Seek approval from Wind Engineering Head',
      description: 'PEMs share EEPs with Wind Engineering Head for review and approval',
      order_index: 7
    },
    {
      step_id: 'P7',
      step_type: 'process',
      title: 'Incorporate feedback and finalize',
      description: 'PEMs incorporate feedback and finalize EEPs if changes required',
      order_index: 8
    },
    {
      step_id: 'P8',
      step_type: 'process',
      title: 'Seek Chief Engineering approval',
      description: 'PEMs seek further approval from Chief Engineering for projects > 50 MW',
      order_index: 9
    },
    {
      step_id: 'E',
      step_type: 'end',
      title: 'Share EEPs with Project Planner',
      description: 'PEMs share finalized EEPs with Project Planner for coordination',
      order_index: 10
    }
  ]
};
