
export const chapter3Data = {
  processSteps: [
    {
      step_id: "S",
      activity: "Project Planner (PP) requests for Cost Breakdown Structure (CBS) and shares the following Plans/schedules with Chief PMO – Project Schedule (PS) – Project Execution Approach (PEA) – Project Procurement Plan (PPP) – Project Budget (submitted during bid submission) – Work Breakdown Structure (WBS)",
      inputs: [],
      outputs: [],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P1",
      activity: "Chief PMO asks the Cost Controller to start the development of CBS and shares the inputs (Project Schedule, Project Execution Approach, Project Procurement Plan, Project Budget and Work Breakdown Structure)",
      inputs: ["PS", "PEA (includes scope matrix)", "PPP", "Project Budget", "WBS"],
      outputs: [],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P2",
      activity: "CC defines/ realigns the coding structure for CBS in line with the Work Breakdown Structure coding structure",
      inputs: [],
      outputs: [],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P3",
      activity: "CC defines the elements of CBS leveraging the Project Work Breakdown Structure and Master CBS Wind – CC makes modifications to master CBS Wind to ensure alignment with project scope and schedule.",
      inputs: ["Master CBS Wind"],
      outputs: ["Preliminary CBS"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P4",
      activity: "CC assigns the scope to all elements defined in CBS using the Scope Matrix",
      inputs: ["Scope Matrix"],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P5",
      activity: "CC checks for consistency between Work Breakdown Structure and CBS up to package level based on project control philosophy",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P6",
      activity: "In case of consistency between Work Breakdown Structure and CBS, process P7 is followed and In case of inconsistency between Work Breakdown Structure and CBS, CBS is realigned through process P2",
      inputs: [],
      outputs: [],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P7",
      activity: "CC assigns the budget cost to the CBS elements based on the project budget – CC allocates specific cost estimates (in INR) to each element – CC uses vendor quotes, historical data, and expert judgment to estimate cost for each item – CC consults Wind Procurement Head, if needed",
      inputs: ["Project Budget"],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P8",
      activity: "CC seeks sign off from Chief PMO for CBS",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P9",
      activity: "If changes are required, CC makes necessary revisions and reshares for approval – If no changes are required, CC finalizes CBS",
      inputs: [],
      outputs: ["CBS (Template Provided)"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "E",
      activity: "CC publishes the project CBS, which forms the basis for project cost monitoring and control – CC shares the project CBS with Project Planner for cross-functional coordination",
      inputs: [],
      outputs: [],
      timeline: "Total – 4 – 5 days",
      responsible: "",
      comments: ""
    }
  ],
  raciMatrix: [
    {
      step_id: "S",
      task: "Request for Cost Breakdown Structure (CBS) and share the required Plans/schedules with Chief PMO",
      responsible: "Project Planner",
      accountable: "",
      consulted: "",
      informed: "Chief PMO"
    },
    {
      step_id: "P1",
      task: "Ask the Cost Controller (CC) to commence the development of CBS and share the required inputs with CC",
      responsible: "Chief PMO",
      accountable: "",
      consulted: "",
      informed: "Cost Controller"
    },
    {
      step_id: "P2",
      task: "Define/realign the coding structure for CBS to align it with Work Breakdown Structure (WBS) coding structure",
      responsible: "Cost Controller",
      accountable: "",
      consulted: "Schedule Head",
      informed: ""
    },
    {
      step_id: "P3",
      task: "Define the elements of the CBS, leveraging the WBS and Master CBS Wind, and make the necessary modifications to ensure alignment with the project's scope and requirements",
      responsible: "Cost Controller",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P4",
      task: "Assign the scope to all CBS elements using the Scope Matrix",
      responsible: "Cost Controller",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P5",
      task: "Check for consistency between Work Breakdown Structure and CBS up to the package level",
      responsible: "Cost Controller",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P6",
      task: "If Work Breakdown Structure and CBS are inconsistent, realign CBS to make it consistent with WBS",
      responsible: "Cost Controller",
      accountable: "",
      consulted: "Schedule Head",
      informed: ""
    },
    {
      step_id: "P7",
      task: "Assign the budget cost (in INR) to the CBS elements based on the project budget",
      responsible: "Cost Controller",
      accountable: "",
      consulted: "Wind Procurement Head",
      informed: ""
    },
    {
      step_id: "P8",
      task: "Seek sign-off from Chief PMO for CBS",
      responsible: "Cost Controller",
      accountable: "Cost Controller",
      consulted: "Chief PMO",
      informed: ""
    },
    {
      step_id: "P9",
      task: "If changes are required, make necessary revisions and reshare for approval, to finalize CBS",
      responsible: "Cost Controller",
      accountable: "Cost Controller",
      consulted: "Chief PMO",
      informed: ""
    },
    {
      step_id: "E",
      task: "Publish the project CBS, which forms the basis for project cost monitoring and control Share the project CBS with Project Planner for cross-functional coordination",
      responsible: "Cost Controller",
      accountable: "Chief PMO",
      consulted: "",
      informed: "Chief PMO Project Planner"
    }
  ],
  processMap: [
    {
      step_id: "S",
      step_type: "start",
      title: "Start",
      description: "Share the inputs (PS, PEA, Project Budget and WBS) with Chief PMO to request them to proceed with CBS",
      order_index: 1
    },
    {
      step_id: "I1",
      step_type: "milestone",
      title: "PEA, PS, PPP Project Budget & WBS",
      description: "",
      order_index: 2
    },
    {
      step_id: "I2",
      step_type: "milestone",
      title: "Master CBS Wind",
      description: "",
      order_index: 3
    },
    {
      step_id: "I3",
      step_type: "milestone",
      title: "Scope Matrix",
      description: "",
      order_index: 4
    },
    {
      step_id: "I4",
      step_type: "milestone",
      title: "Project Budget",
      description: "",
      order_index: 5
    },
    {
      step_id: "P1",
      step_type: "process",
      title: "Ask the Cost Controller to start the development of CBS and share the inputs (Project Schedule, PEA)",
      description: "",
      order_index: 6
    },
    {
      step_id: "P2",
      step_type: "process",
      title: "Define the elements of CBS leveraging the Project WBS and Master CBS Wind",
      description: "",
      order_index: 7
    },
    {
      step_id: "P3",
      step_type: "process",
      title: "Assign the scope to all elements defined in CBS using the Scope Matrix",
      description: "",
      order_index: 8
    },
    {
      step_id: "P4",
      step_type: "process",
      title: "Check for consistency between WBS and CBS up to package level based on project control philosophy",
      description: "",
      order_index: 9
    },
    {
      step_id: "D1",
      step_type: "decision",
      title: "Assess and determine if the WBS and CBS are consistent with each other",
      description: "",
      order_index: 10
    },
    {
      step_id: "P7",
      step_type: "process",
      title: "Assign the budget cost to the CBS elements based on the project budget",
      description: "",
      order_index: 11
    },
    {
      step_id: "P8",
      step_type: "process",
      title: "If changes are required, make necessary revisions and reshare for approval to finalize CBS",
      description: "",
      order_index: 12
    },
    {
      step_id: "O2",
      step_type: "milestone",
      title: "Draft CBS",
      description: "",
      order_index: 13
    },
    {
      step_id: "O3",
      step_type: "milestone",
      title: "CBS",
      description: "",
      order_index: 14
    },
    {
      step_id: "E",
      step_type: "end",
      title: "End",
      description: "",
      order_index: 15
    }
  ]
};
