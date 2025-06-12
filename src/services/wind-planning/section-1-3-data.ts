
export const section1_3Data = {
  processSteps: [
    {
      step_id: 'S',
      activity: 'Project Planner (PP) shares the Final Bid Report (FBR), Project Schedule (PS) and Project Execution Approach (PEA) with Land Team, and requests for Land Finalization Plan (LFP)',
      inputs: [],
      outputs: [],
      responsible: 'Project Planner',
      comments: ''
    },
    {
      step_id: 'P1',
      activity: 'Chief Land Officer appoints Land Manager (LM) on the project, for the development of LFP. Preferably appoints the same Land Manager who handled land identification during bid submission',
      inputs: [],
      outputs: [],
      responsible: 'Chief Land Officer',
      comments: ''
    },
    {
      step_id: 'P2',
      activity: 'Chief Land Officer shares the inputs (Final Bid Report, Project Schedule and Project Execution Approach) received with appointed LM',
      inputs: ['FBR', 'PS', 'PEA (includes scope matrix)'],
      outputs: [],
      responsible: 'Chief Land Officer',
      comments: ''
    },
    {
      step_id: 'P3',
      activity: 'LM prepares the draft Land Finalization Plan by leveraging the Wind Project Master Plan and modifying it to align with project requirements - LM reviews Final Bid Report, Project Schedule and Project Execution Approach to evaluate detailed land requirement and timeline - Land Finalization Plan outlines process steps, timelines, milestones, and Point of Contact (PoC) responsible for each phase of land finalization. Timelines of LFP must align with Project Schedule. Any deviations must be communicated by the Land Manager to the Project Manager for review and necessary action',
      inputs: ['Wind Project Master Plan'],
      outputs: ['Preliminary LFP'],
      responsible: 'Land Manager',
      comments: ''
    },
    {
      step_id: 'P4',
      activity: 'LM shares the LFP with Chief Land Officer for review and approval (approval via formal sign-off)',
      inputs: [],
      outputs: [],
      responsible: 'Land Manager',
      comments: ''
    },
    {
      step_id: 'P5',
      activity: 'If changes are required, LM incorporates the feedback and reshares for approval. If no changes are required, L1TM finalizes the Land Finalization Plan',
      inputs: [],
      outputs: ['LFP (Template Provided)'],
      responsible: 'Land Manager',
      comments: ''
    },
    {
      step_id: 'E',
      activity: 'LM communicates the finalized LFP post approval to Project Planner for cross-team coordination',
      inputs: [],
      outputs: [],
      responsible: 'Land Manager',
      comments: ''
    }
  ],

  raciMatrix: [
    {
      step_id: 'S',
      task: 'Share Final Bid Report (FBR), Project Schedule (PS) and Project Execution Approach (PEA) with Land Team',
      responsible: 'Project Planner',
      accountable: '',
      consulted: '',
      informed: 'Chief Land Officer'
    },
    {
      step_id: 'P1',
      task: 'Appoint Land Manager (LM) for development of Land Finalization Plan (LFP)',
      responsible: 'Chief Land Officer',
      accountable: '',
      consulted: '',
      informed: 'Land Manager'
    },
    {
      step_id: 'P2',
      task: 'Share inputs (Final Bid Report, Project Schedule and Project Execution Approach) received with appointed LM',
      responsible: 'Chief Land Officer',
      accountable: '',
      consulted: '',
      informed: 'Land Manager'
    },
    {
      step_id: 'P3',
      task: 'Prepare draft Land Finalization Plan (LFP) by leveraging the Wind Project Master Plan and inputs received in P2',
      responsible: 'Land Manager',
      accountable: '',
      consulted: '',
      informed: 'Chief Land Officer'
    },
    {
      step_id: 'P4',
      task: 'Share Land Finalization Plan with Chief Land Officer for review and approval (approval via formal sign-off)',
      responsible: 'Land Manager',
      accountable: '',
      consulted: '',
      informed: 'Chief Land Officer'
    },
    {
      step_id: 'P5',
      task: 'Incorporate feedback and reshare Land Finalization Plan for approval, if changes are required',
      responsible: 'Land Manager',
      accountable: '',
      consulted: 'Chief Land Officer',
      informed: ''
    },
    {
      step_id: 'E',
      task: 'Communicate finalized Land Finalization Plan to Project Planner for cross-team coordination',
      responsible: 'Land Manager',
      accountable: '',
      consulted: '',
      informed: 'Project Planner'
    }
  ],

  processMap: [
    {
      step_id: 'S',
      step_type: 'start',
      title: 'Share FBR, PS and PEA with Land Team',
      description: 'Project Planner shares Final Bid Report, Project Schedule and Project Execution Approach with Land Team',
      order_index: 1
    },
    {
      step_id: 'P1',
      step_type: 'process',
      title: 'Appoint Land Manager for LFP development',
      description: 'Chief Land Officer appoints Land Manager for development of Land Finalization Plan',
      order_index: 2
    },
    {
      step_id: 'P2',
      step_type: 'process',
      title: 'Share inputs with appointed LM',
      description: 'Chief Land Officer shares inputs received with appointed Land Manager',
      order_index: 3
    },
    {
      step_id: 'P3',
      step_type: 'process',
      title: 'Prepare draft LFP',
      description: 'Land Manager prepares draft Land Finalization Plan leveraging Wind Project Master Plan',
      order_index: 4
    },
    {
      step_id: 'P4',
      step_type: 'process',
      title: 'Share LFP for review and approval',
      description: 'Land Manager shares LFP with Chief Land Officer for review and approval',
      order_index: 5
    },
    {
      step_id: 'P5',
      step_type: 'process',
      title: 'Incorporate feedback and finalize',
      description: 'Land Manager incorporates feedback and finalizes Land Finalization Plan',
      order_index: 6
    },
    {
      step_id: 'E',
      step_type: 'end',
      title: 'Communicate finalized LFP',
      description: 'Land Manager communicates finalized LFP to Project Planner for coordination',
      order_index: 7
    }
  ]
};
