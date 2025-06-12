
export const chapter5Data = {
  processSteps: [
    {
      step_id: "S",
      activity: "Project Planner (PP) requests the Project Manager (PM) to develop Statutory Approval Management Plan (SAMP) and shares the required schedules / Plans – Project Schedule (PS), – Project Execution Approach (PEA) – Project Procurement Plan (PPP)",
      inputs: [],
      outputs: [],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P1",
      activity: "The Project Manager informs the Chief Regulatory of the need to appoint a Regulatory Manager (RM) for the project",
      inputs: [],
      outputs: [],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P2",
      activity: "Chief Regulatory appoints a RM for the project",
      inputs: [],
      outputs: [],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P3",
      activity: "PM, in consultation with RM, refers to the Wind Statutory Approval Requirement Compendium to prepare SAMP¹ – The compendium outlines state-level statutory approval requirements for Wind Power Plants; helps to identify necessary approvals required throughout the project lifecycle",
      inputs: ["Wind Statutory Approval Requirement Compendium"],
      outputs: ["Preliminary SAMP"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P4",
      activity: "The Project Manager incorporates timelines into SAMP – Project Manager identifies the timelines and criticalities of statutory approvals by reviewing Project Schedule and Project Execution Approach",
      inputs: ["PS", "PEA (includes scope matrix)"],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P5",
      activity: "PM, in consultation with RM, identifies various requirements/ pre-requisites to be fulfilled for obtaining approvals – Documents required for obtaining approval – Pre-requisites or conditions that must be satisfied before approval is granted – Cost associated with getting approvals – Duration or estimated time for obtaining approval – Risks associated with getting the clearance – Consenting considerations, requirements the approving authority mandates before granting approval – Management action Plan for the process Project Manager leverages Wind Statutory Approval Requirements Compendium to identify the above",
      inputs: [],
      outputs: [],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P6",
      activity: "For each statutory approval required, Project Manager identifies a PoC across function teams, whose work would be impacted by delay in obtaining statutory approvals – Project Manager may consult functional leads¹ to identify PoC",
      inputs: [],
      outputs: [],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P7",
      activity: "PM, in consultation with the RM, prepares the final SAMP, which includes – Documentation, pre-requisites, costs, approval timelines, risks, and consenting considerations – A clear action Plan for obtaining approvals – Identification of PoC whose work will be impacted in case of any delay",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P8",
      activity: "Project Manager seeks review and approval (approval via formal sign-off) for SAMP from Chief Regulatory",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P9",
      activity: "If changes are required, Project Manager incorporates the feedback and reshares SAMP with Chief Regulatory for approval – If no changes are required, Project Manager finalizes SAMP",
      inputs: [],
      outputs: ["SAMP (Template Provided)"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "E",
      activity: "Project Manager shares the SAMP with Project Planner for cross-functional coordination",
      inputs: [],
      outputs: [],
      timeline: "Total – 6 – 7 days",
      responsible: "",
      comments: ""
    }
  ],
  raciMatrix: [
    {
      step_id: "S",
      task: "Share required Plans/Schedules with Project Manager (PM), for the development of Statutory Approval Management Plan (SAMP)",
      responsible: "Project Planner",
      accountable: "",
      consulted: "Project Manager",
      informed: ""
    },
    {
      step_id: "P1",
      task: "Inform the Chief Regulatory of the need to appoint Regulatory Manager for the project",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Chief Regulatory"
    },
    {
      step_id: "P2",
      task: "Appoint a Regulatory Manager for the project",
      responsible: "Chief Regulatory",
      accountable: "Chief Regulatory",
      consulted: "",
      informed: "Regulatory Manager"
    },
    {
      step_id: "P3",
      task: "Develop SAMP, leveraging the Wind Statutory Approval Requirement Compendium",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Regulatory Manager",
      informed: ""
    },
    {
      step_id: "P4",
      task: "Incorporate timeline for statutory approvals in SAMP by reviewing Project Schedule and Project Execution Approach",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Regulatory Manager",
      informed: ""
    },
    {
      step_id: "P5",
      task: "Identify requirements/ pre-requisites to be fulfilled for obtaining statutory approvals, leveraging Wind Statutory Approval Requirements Compendium",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Regulatory Manager",
      informed: ""
    },
    {
      step_id: "P6",
      task: "Identify PoC within functional teams whose work would be impacted by delay in obtaining statutory approvals",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Cost Controller",
      informed: ""
    },
    {
      step_id: "P7",
      task: "Prepare the final SAMP, detailing documentation, pre-requisites, costs, approval timelines, risks, consenting considerations, and PoC for each approval (as done in P6)",
      responsible: "Project Manager",
      accountable: "Project Manager",
      consulted: "Regulatory Manager",
      informed: ""
    },
    {
      step_id: "P8",
      task: "Seek review and approval (approval via formal sign-off) for SAMP from Chief Regulatory",
      responsible: "Project Manager",
      accountable: "Project Manager",
      consulted: "Chief Regulatory",
      informed: "Regulatory Manager"
    },
    {
      step_id: "P9",
      task: "Incorporate changes to SAMP basis feedback received and reshare for approval from Chief Regulatory to finalize SAMP",
      responsible: "Project Manager",
      accountable: "Project Manager",
      consulted: "Chief Regulatory",
      informed: "Regulatory Manager"
    },
    {
      step_id: "E",
      task: "Share final SAMP with Project Planner for cross-functional coordination",
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
      description: "Share required Plans (PS, PEA and PPP) with PM and request them to develop SAMP",
      order_index: 1
    },
    {
      step_id: "I1",
      step_type: "milestone",
      title: "Wind Statutory Approval Requirement Compendium",
      description: "",
      order_index: 2
    },
    {
      step_id: "I2",
      step_type: "milestone",
      title: "PS",
      description: "",
      order_index: 3
    },
    {
      step_id: "I3",
      step_type: "milestone",
      title: "PEA",
      description: "",
      order_index: 4
    },
    {
      step_id: "P1",
      step_type: "process",
      title: "Inform Chief Regulatory of the need to appoint RM for the project",
      description: "",
      order_index: 5
    },
    {
      step_id: "P2",
      step_type: "process",
      title: "Chief Regulatory appoints a RM for the project",
      description: "",
      order_index: 6
    },
    {
      step_id: "P3",
      step_type: "process",
      title: "Leverage the Wind Statutory Approval Requirement Compendium to prepare SAMP",
      description: "",
      order_index: 7
    },
    {
      step_id: "O1",
      step_type: "milestone",
      title: "Preliminary SAMP",
      description: "",
      order_index: 8
    },
    {
      step_id: "P4",
      step_type: "process",
      title: "Incorporate timelines into SAMP by identifying the timelines and criticalities of statutory approvals",
      description: "",
      order_index: 9
    },
    {
      step_id: "P5",
      step_type: "process",
      title: "Identify various requirements to be fulfilled for obtaining statutory approvals",
      description: "",
      order_index: 10
    },
    {
      step_id: "P6",
      step_type: "process",
      title: "Identify PoC across function teams whose work will be impacted by approvals",
      description: "",
      order_index: 11
    },
    {
      step_id: "P7",
      step_type: "process",
      title: "Prepare the final SAMP, covering documentation, pre-requisites, costs, approval timelines, risks, consenting considerations, and action plan",
      description: "",
      order_index: 12
    },
    {
      step_id: "P8",
      step_type: "process",
      title: "Seek review and approval from Chief Regulatory for approval",
      description: "",
      order_index: 13
    },
    {
      step_id: "D1",
      step_type: "decision",
      title: "If changes are required, feedback further to the plan from Chief Regulatory for approval",
      description: "",
      order_index: 14
    },
    {
      step_id: "O2",
      step_type: "milestone",
      title: "SAMP",
      description: "",
      order_index: 15
    },
    {
      step_id: "E",
      step_type: "end",
      title: "End",
      description: "Share SAMP with PP for cross-functional coordination",
      order_index: 16
    }
  ]
};
