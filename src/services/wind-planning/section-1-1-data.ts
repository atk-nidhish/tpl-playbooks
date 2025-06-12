
export const section1_1Data = {
  processSteps: [
    {
      step_id: 'S',
      activity: 'Bid Incharge¹ appoints Bid Planner² (BP) and shares the Bid Summary³ with BP for the development of Final L1 Plan',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Bid Incharge',
      comments: ''
    },
    {
      step_id: 'P1',
      activity: 'BP analyses the Bid Summary and develops the delivery milestones and timeline for the project',
      inputs: ['Bid Summary'],
      outputs: ['Delivery Milestones & Timeline (Template Provided)'],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      step_id: 'P2',
      activity: 'BP develops the Preliminary L1 Plan by updating the Wind Project Master Plan to meet the delivery milestones and timelines for the project',
      inputs: ['Wind Project Master Plan'],
      outputs: ['Preliminary L1 Plan'],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      step_id: 'P3',
      activity: 'BP updates the Preliminary L1 Plan based on the Preliminary Feasibility Report⁴ shared by the Land Team, to draft the Final L1 Plan',
      inputs: ['PFR'],
      outputs: [],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      step_id: 'P4',
      activity: 'BP shares the Final L1 Plan with functional leads⁵ for inputs',
      inputs: [],
      outputs: [],
      timeline: '2',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      step_id: 'P5',
      activity: 'BP evaluates feedback from the functional teams and incorporates necessary modifications to the Final L1 Plan',
      inputs: [],
      outputs: [],
      timeline: '2',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      step_id: 'P6',
      activity: 'BP shares the Final L1 Plan for sign off by the functional leads',
      inputs: [],
      outputs: [],
      timeline: '1',
      responsible: 'Bid Planner',
      comments: ''
    },
    {
      step_id: 'E',
      activity: 'BP seeks review and approval on the Final L1 Plan from COO and incorporates any changes recommended by COO in the final L1 Plan, then shares the Final L1 Plan with Bid Incharge for bid submission',
      inputs: ['Final L1 Plan'],
      outputs: ['Final L1 Plan (Template Provided)'],
      timeline: 'Total 7-8 days',
      responsible: 'Bid Planner',
      comments: ''
    }
  ],

  raciMatrix: [
    {
      step_id: 'S',
      task: 'Appoint Bid Planner (BP) and share the Bid Summary for Final L1 Plan development',
      responsible: 'Bid Incharge',
      accountable: 'Bid Incharge',
      consulted: '',
      informed: 'Bid Planner'
    },
    {
      step_id: 'P1',
      task: 'Analyze bid summary and develop delivery milestones and timeline for the project',
      responsible: 'Bid Planner',
      accountable: 'Bid Incharge',
      consulted: '',
      informed: ''
    },
    {
      step_id: 'P2',
      task: 'Prepare Preliminary L1 Plan by leveraging the Wind Project Master Plan and modifying it to align with project requirements',
      responsible: 'Bid Planner',
      accountable: 'Bid Incharge',
      consulted: '',
      informed: ''
    },
    {
      step_id: 'P3',
      task: 'Update the Preliminary L1 Plan, based on the Preliminary Feasibility Report¹ to draft the Final L1 Plan',
      responsible: 'Bid Planner',
      accountable: '',
      consulted: '',
      informed: 'Land Manager'
    },
    {
      step_id: 'P4',
      task: 'Share the Final L1 Plan with functional leads² for inputs',
      responsible: 'Bid Planner',
      accountable: '',
      consulted: '',
      informed: 'Functional Leads'
    },
    {
      step_id: 'P5',
      task: 'Evaluate feedback from the functional leads and incorporate changes to Final L1 Plan',
      responsible: 'Bid Planner',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      step_id: 'P6',
      task: 'Seek sign-off for Final L1 Plan from functional leads',
      responsible: 'Bid Planner',
      accountable: 'Bid Planner',
      consulted: '',
      informed: 'Functional Leads'
    },
    {
      step_id: 'E',
      task: 'Seek review and approval on the Final L1 Plan from COO, incorporate recommendations, and share with Bid Incharge for bid submission',
      responsible: 'Bid Planner',
      accountable: 'Bid Planner',
      consulted: '',
      informed: 'COO, Bid Incharge'
    }
  ],

  processMap: [
    {
      step_id: 'S',
      step_type: 'start',
      title: 'Appoint Bid Planner and share Bid Summary',
      description: 'Bid Incharge appoints Bid Planner and shares Bid Summary for Final L1 Plan development',
      order_index: 1
    },
    {
      step_id: 'P1',
      step_type: 'process',
      title: 'Analyze Bid Summary and develop delivery milestones',
      description: 'BP analyses the Bid Summary and develops the delivery milestones and timeline',
      order_index: 2
    },
    {
      step_id: 'P2',
      step_type: 'process',
      title: 'Develop Preliminary L1 Plan',
      description: 'BP develops the Preliminary L1 Plan by updating the Wind Project Master Plan',
      order_index: 3
    },
    {
      step_id: 'P3',
      step_type: 'process',
      title: 'Update L1 Plan based on PFR',
      description: 'BP updates the Preliminary L1 Plan based on the Preliminary Feasibility Report',
      order_index: 4
    },
    {
      step_id: 'P4',
      step_type: 'process',
      title: 'Share Final L1 Plan with functional leads',
      description: 'BP shares the Final L1 Plan with functional leads for inputs',
      order_index: 5
    },
    {
      step_id: 'P5',
      step_type: 'process',
      title: 'Evaluate feedback and incorporate modifications',
      description: 'BP evaluates feedback from functional teams and incorporates necessary modifications',
      order_index: 6
    },
    {
      step_id: 'P6',
      step_type: 'process',
      title: 'Seek sign-off from functional leads',
      description: 'BP shares the Final L1 Plan for sign off by the functional leads',
      order_index: 7
    },
    {
      step_id: 'E',
      step_type: 'end',
      title: 'COO approval and final submission',
      description: 'BP seeks review and approval from COO and shares Final L1 Plan for bid submission',
      order_index: 8
    }
  ]
};
