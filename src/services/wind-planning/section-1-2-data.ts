
export const section1_2Data = {
  processSteps: [
    {
      step_id: 'S',
      activity: 'The Bid Incharge notifies the Chief Projects about any bid being won',
      inputs: [],
      outputs: [],
      responsible: 'Bid Incharge',
      comments: ''
    },
    {
      step_id: 'P1',
      activity: 'Chief Projects designates a Project Planner (PP) and Project Manager (PM) for the project',
      inputs: [],
      outputs: [],
      responsible: 'Chief Projects',
      comments: ''
    },
    {
      step_id: 'P2',
      activity: 'Bid Incharge shares the Final L1 Plan and Final Bid Report¹ (FBR) with Chief Projects',
      inputs: [],
      outputs: [],
      responsible: 'Bid Incharge',
      comments: ''
    },
    {
      step_id: 'P3',
      activity: 'Chief Projects shares the Final L1 Plan and Final Bid Report with Project Planner and Project Manager, to initiate the development of Project Schedule (PS) and Project Execution Approach (PEA) respectively',
      inputs: ['Final L1 Plan', 'FBR'],
      outputs: [],
      responsible: 'Chief Projects',
      comments: ''
    },
    {
      step_id: 'P4A',
      activity: 'Project Planner prepares the preliminary Project Schedule by leveraging the Wind Project Master Plan and modifying it to align with project requirements. To understand project requirements, Project Planner and Project Manager analyze key milestones, critical timelines, land availability, and other details by reviewing the Final L1 Plan and Final Bid Report. The project timeline is broken down into specific tasks with start and end dates, along with intermediate deadlines for key deliverables. Each phase is detailed to account for task dependencies, and critical path activities. The Plan includes float for potential risks and delays. PS must align with the L1 schedule submitted during bid stage. Any deviations must be communicated by the Project Planner to the Project Manager for review and necessary action',
      inputs: ['Wind Project Master Plan'],
      outputs: ['Preliminary PS'],
      responsible: 'Project Planner',
      comments: ''
    },
    {
      step_id: 'P4B',
      activity: 'Project Manager leverages the Final Bid Report¹ to develop Project Execution Approach², which provides a high-level overview of the entire project. Scope of the project (scope matrix). Land availability and high-level requirements, specifying the type, size, and amount of land needed; if land parcel has already been identified for the project, details of the land parcel to also be a part of PEA (in consultation with Land Team). Budgeting, including the value engineering target, to optimize cost-efficiency without compromising quality (in consultation with Commercial Team and Engineering Team). Regulatory compliance requirements, necessary permits, environmental considerations, and safety regulations (in consultation with Regulatory Team)',
      inputs: [],
      outputs: ['Scope Matrix (Template Provided)'],
      responsible: 'Project Manager',
      comments: ''
    },
    {
      step_id: 'P5',
      activity: 'Project Planner reviews Project Schedule with Project Manager to ensure alignment. Any modifications identified during this review are incorporated. In case of any discrepancies between the Project Manager and Project Planner, the Project Manager takes the final decision',
      inputs: [],
      outputs: [],
      responsible: 'Project Planner',
      comments: ''
    },
    {
      step_id: 'P6',
      activity: 'Project Planner and Project Manager circulate Project Schedule and Project Execution Approach respectively to functional leads³ for review, to seek alignment and address potential conflicts or gaps at an early stage',
      inputs: [],
      outputs: [],
      responsible: 'Project Planner, Project Manager',
      comments: ''
    },
    {
      step_id: 'P7A',
      activity: 'Project Planner, in consultation with Project Manager, assesses the feedback received from functional leads and adjusts the Project Schedule accordingly',
      inputs: [],
      outputs: [],
      responsible: 'Project Planner',
      comments: ''
    },
    {
      step_id: 'P7B',
      activity: 'Project Manager incorporates necessary changes in Project Execution Approach',
      inputs: [],
      outputs: ['PEA (includes scope matrix) (Template Provided)'],
      responsible: 'Project Manager',
      comments: ''
    },
    {
      step_id: 'P8',
      activity: 'Project Planner seeks sign-off on Project Schedule from functional leads',
      inputs: [],
      outputs: ['PS (Template Provided)'],
      responsible: 'Project Planner',
      comments: ''
    },
    {
      step_id: 'E',
      activity: 'Project Planner retains finalized Project Schedule, and Project Manager shares Project Execution Approach with Project Planner for future cross-functional¹ coordination',
      inputs: [],
      outputs: [],
      responsible: 'Project Planner',
      comments: ''
    }
  ],

  raciMatrix: [
    {
      step_id: 'S',
      task: 'Notify Chief Projects about any bid being won',
      responsible: 'Bid Incharge',
      accountable: '',
      consulted: '',
      informed: 'Chief Projects'
    },
    {
      step_id: 'P1',
      task: 'Designate Project Planner (PP) and Project Manager (PM) for the project',
      responsible: 'Chief Projects',
      accountable: 'Chief Projects',
      consulted: '',
      informed: 'Project Planner, Project Manager'
    },
    {
      step_id: 'P2',
      task: 'Share Final L1 Plan and Final Bid Report with Chief Projects',
      responsible: 'Bid Incharge',
      accountable: '',
      consulted: '',
      informed: 'Chief Projects'
    },
    {
      step_id: 'P3',
      task: 'Share Final L1 Plan and Final Bid Report with Project Planner and Project Manager',
      responsible: 'Chief Projects',
      accountable: '',
      consulted: '',
      informed: 'Project Planner, Project Manager'
    },
    {
      step_id: 'P4A',
      task: 'Prepare the draft Project Schedule (PS), leveraging the Wind Project Master Plan and insights from Final L1 Plan and Final Bid Report',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Chief Projects'
    },
    {
      step_id: 'P4B',
      task: 'Develop Project Execution Approach (PEA) leveraging Final Bid Report',
      responsible: 'Project Manager',
      accountable: '',
      consulted: 'Chief Land Officer, Chief Procurement Officer, Chief Engineering & Chief Regulatory',
      informed: 'Chief Projects'
    },
    {
      step_id: 'P5',
      task: 'Review Project Schedule with Project Manager for alignment',
      responsible: 'Project Planner',
      accountable: '',
      consulted: 'Project Manager',
      informed: ''
    },
    {
      step_id: 'P6',
      task: 'Circulate Project Schedule and Project Execution Approach with functional leads¹ for review',
      responsible: 'Project Planner, Project Manager',
      accountable: '',
      consulted: 'Functional Leads',
      informed: 'Chief Projects'
    },
    {
      step_id: 'P7A',
      task: 'Assess feedback from functional leads and adjust Project Schedule accordingly',
      responsible: 'Project Planner',
      accountable: '',
      consulted: 'Project Manager',
      informed: ''
    },
    {
      step_id: 'P7B',
      task: 'Assess feedback from functional leads and finalize Project Execution Approach',
      responsible: 'Project Manager',
      accountable: 'Chief Projects',
      consulted: '',
      informed: ''
    },
    {
      step_id: 'P8',
      task: 'Seek sign-off on Project Schedule from functional leads to finalize it',
      responsible: 'Project Planner',
      accountable: 'Chief Projects',
      consulted: 'Functional Leads',
      informed: ''
    },
    {
      step_id: 'E',
      task: 'Retain the finalized Project Schedule and Project Execution Approach for future cross-functional coordination in future',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    }
  ],

  processMap: [
    {
      step_id: 'S',
      step_type: 'start',
      title: 'Notify Chief Projects about bid won',
      description: 'The Bid Incharge notifies the Chief Projects about any bid being won',
      order_index: 1
    },
    {
      step_id: 'P1',
      step_type: 'process',
      title: 'Designate Project Planner and Project Manager',
      description: 'Chief Projects designates a Project Planner and Project Manager for the project',
      order_index: 2
    },
    {
      step_id: 'P4A',
      step_type: 'process',
      title: 'Prepare preliminary Project Schedule',
      description: 'Project Planner prepares the preliminary Project Schedule',
      order_index: 3
    },
    {
      step_id: 'P4B',
      step_type: 'process',
      title: 'Develop Project Execution Approach',
      description: 'Project Manager develops Project Execution Approach',
      order_index: 4
    },
    {
      step_id: 'P6',
      step_type: 'decision',
      title: 'Functional leads review',
      description: 'Circulate Project Schedule and PEA to functional leads for review',
      order_index: 5
    },
    {
      step_id: 'E',
      step_type: 'end',
      title: 'Finalize and retain documents',
      description: 'Retain finalized Project Schedule and Project Execution Approach',
      order_index: 6
    }
  ]
};
