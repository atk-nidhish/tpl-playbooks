
export const section1_7Data = {
  processSteps: [
    {
      step_id: "S",
      activity: "Project Planner (PP) shares the following schedules with Project Manager (PM), and requests for Commissioning Plan – Project Schedule (PS), Project Execution Approach (PEA), Construction Management Plan (CMP), Statutory Approval Management Plan (SAMP)",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P1",
      activity: "Project Manager identifies the project activities and dependencies related to pre-commissioning and commissioning activities. For this, Project Manager leverages the inputs (Project Schedule, Project Execution Approach, Construction Management Plan and SAMP) received",
      inputs: ["PS", "PEA (includes scope matrix)", "CMP", "SAMP"],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P2",
      activity: "Project Manager defines the Turn-over Systems (TOS), and its completion criteria based on high level pre-commissioning and commissioning activities and package dependencies",
      inputs: [],
      outputs: ["Turnover Systems List & Completion Criteria (Template Provided)"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P3",
      activity: "Project Manager, defines the responsibility matrix for TOS, assigning a Point of Contact (PoC) accountable for the completion of each activity. Project Manager may consult Site Manager for creation of TOS and responsibility matrix",
      inputs: [],
      outputs: ["Responsibility Matrix (Template Provided)"],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P4",
      activity: "Project Manager prepare draft Pre-Commissioning Plan (PCP) by leveraging the Wind Project Master Plan and modifying it to align with project requirements. Project Manager further details PCP, outlining – Key timelines and milestones as mentioned in Project Schedule, Project Execution Approach and Construction Management Plan, Prerequisites for each pre-commissioning activity and its PoC by leveraging Turnover System List & Completion Criteria and Responsibility Matrix. Timelines of PCP must align with Project Schedule",
      inputs: ["Wind Project Master Plan"],
      outputs: ["Draft PCP"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P5",
      activity: "After preparation of PCP and Statutory Approval Management Plan (SAMP)¹, Project Manager begins drafting the Commissioning Plan (CP) by leveraging the Wind Project Master Plan and modifying it to align with project requirements – Key commissioning activities, milestones and timelines as mentioned in Project Schedule, Project Execution Approach and Construction Management Plan, Pre-requisites of commissioning activities and their details as mentioned in TOS & completion criteria and Responsibility Matrix, Regulatory timeline as mentioned in SAMP. Project Manager drafts CP in consultation with Chief O&M. Timelines of CP must align with Project Schedule",
      inputs: ["SAMP", "Wind Project Master Plan", "Draft PCP"],
      outputs: ["Draft CP"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P6",
      activity: "Project Manager seeks review and approval (approval via formal sign-off) on draft PCP and CP from Chief Wind",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P7",
      activity: "If changes are needed, Project Manager updates the Plan and reshares for approval. If no changes are needed, Project Manager finalizes the PCP and CP",
      inputs: [],
      outputs: ["PCP (Template Provided)", "CP (Template Provided)"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "E",
      activity: "Project Manager shares the Plans with Project Planner for future cross-functional coordination",
      inputs: [],
      outputs: [],
      timeline: "4 – 5 days",
      responsible: "",
      comments: ""
    }
  ],
  raciMatrix: [
    {
      step_id: "S",
      task: "Share Project Schedule (PS), Project Execution Approach (PEA), Construction Management Plan (CMP) and Statutory Approval Management Plan (SAMP), and request for the development of Commissioning Plan",
      responsible: "Project Planner",
      accountable: "",
      consulted: "",
      informed: "Project Manager"
    },
    {
      step_id: "P1",
      task: "Identify project activities and dependencies related to pre-commissioning and commissioning activities by leveraging Project Schedule, Project Execution Approach and Construction Management Plan",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P2",
      task: "Define the Turn-over Systems (TOS) and its completion criteria based on high level pre-commissioning and commissioning activities, and package dependencies",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P3",
      task: "Define the responsibility matrix for TOS, assigning POCs accountable for completion of each activity",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Site Manager",
      informed: ""
    },
    {
      step_id: "P4",
      task: "Prepare draft Pre-Commissioning Plan (PCP) by leveraging the Wind Project Master Plan and modifying it to align with project requirements and timelines",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Chief Wind"
    },
    {
      step_id: "P5",
      task: "Prepare draft Commissioning Plan (CP) by leveraging the Wind Project Master Plan and modifying it to align with project requirements and timelines",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Chief Wind"
    },
    {
      step_id: "P6",
      task: "Seek review and approval (approval via formal sign-off) on PCP and CP from Chief Wind",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Chief Wind",
      informed: ""
    },
    {
      step_id: "P7",
      task: "If changes are needed, update the Plan and seek re-approval to finalize PCP and CP",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Chief Wind",
      informed: ""
    },
    {
      step_id: "E",
      task: "Share the Plans with Project Planner for cross-functional coordination",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Project Planner"
    }
  ],
  processMap: [
    {
      step_id: "S",
      step_type: "start",
      title: "Start",
      description: "Project Planner shares schedules and plans, requests Commissioning Plan",
      order_index: 1
    },
    {
      step_id: "P1",
      step_type: "process",
      title: "Identify Activities",
      description: "Identify project activities and dependencies for commissioning",
      order_index: 2
    },
    {
      step_id: "P2",
      step_type: "process",
      title: "Define Turn-over Systems",
      description: "Define TOS and completion criteria",
      order_index: 3
    },
    {
      step_id: "P3",
      step_type: "process",
      title: "Define Responsibility Matrix",
      description: "Assign POCs for each TOS activity",
      order_index: 4
    },
    {
      step_id: "P4",
      step_type: "process",
      title: "Prepare Draft PCP",
      description: "Create Pre-Commissioning Plan using Master Plan",
      order_index: 5
    },
    {
      step_id: "P5",
      step_type: "process",
      title: "Prepare Draft CP",
      description: "Create Commissioning Plan in consultation with Chief O&M",
      order_index: 6
    },
    {
      step_id: "P6",
      step_type: "decision",
      title: "Chief Wind Review",
      description: "Seek review and approval from Chief Wind",
      order_index: 7
    },
    {
      step_id: "P7",
      step_type: "process",
      title: "Finalize Plans",
      description: "Update if needed or finalize PCP and CP",
      order_index: 8
    },
    {
      step_id: "E",
      step_type: "end",
      title: "End",
      description: "Share plans with Project Planner for coordination",
      order_index: 9
    }
  ]
};
