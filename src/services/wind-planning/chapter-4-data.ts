
export const chapter4Data = {
  processSteps: [
    {
      step_id: "S",
      activity: "Project Planner (PP) shares the following schedules with Chief QHSSE, and requests them to initiate the development of Project Quality Management Plan (PQMP) – Project Execution Approach (PEA), Project Schedule (PS), and Engineering Execution Plans (EEPs) (for standard quality requirements)",
      inputs: [],
      outputs: [],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P1",
      activity: "Chief QHSSE reviews the Project Schedule and Project Execution Approach to establish an understanding of project calendar which forms the basis for timeline identification for PQMP QM is fully aware of the project's quality standards, having collaborated with the Project Engineering Managers to define the standard quality requirements during the preparation of the EEPs",
      inputs: ["PEA (includes scope matrix)", "PS"],
      outputs: [],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P2",
      activity: "Chief QHSSE, in consultation with PM, performs the following activities: – Determine and outline various functional roles¹ required to ensure that the quality standards are met throughout the project's lifecycle – Identify audit requirements during project including frequency and auditors",
      inputs: [],
      outputs: [],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P3",
      activity: "Chief QHSSE refers to 'Master Plan for Quality Management – Wind' and makes necessary adjustments to align it with the project's scope and requirements – PQMP covers Plans, timeline and checkpoints, and functional role required to implement quality standard – Project Quality Standards are referred from Project Quality Requirement, developed in EEPs",
      inputs: ["EEPs", "Master Plan for Quality Management – Wind"],
      outputs: ["Preliminary PQMP"],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P4",
      activity: "Chief QHSSE develops the PQMP to ensure comprehensive guidelines are in place for implementing and overseeing quality standards, which covers – QC hold points – Quality documentation requirements by contractors – Submittals from contractor for quality approval – Non-conformance report (NCR) management and all other requirements in this context",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P5",
      activity: "Chief QHSSE finalizes PQMP, ensuring it includes – Quality Management Plan – Defined roles, audit requirements, and a structured approach with Plans, timelines, and checkpoints to uphold quality standards – Quality Monitoring and Control Plan – Established guidelines for inspections, documentation, submittals, and NCR management to ensure consistent quality throughout the project",
      inputs: [],
      outputs: ["PQMP (Template Provided)"],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "E",
      activity: "QHSSE shares PQMP with Project Planner (PP) for facilitating cross-functional coordination",
      inputs: [],
      outputs: [],
      timeline: "Total – 2 – 3 days",
      responsible: "",
      comments: ""
    }
  ],
  raciMatrix: [
    {
      step_id: "S",
      task: "Share the required Plans/schedules with Chief QHSSE and request them to develop Project Quality Management Plan (PQMP)",
      responsible: "Project Planner",
      accountable: "",
      consulted: "",
      informed: "Chief QHSSE"
    },
    {
      step_id: "P1",
      task: "Review the Project Schedule to establish an understanding of the project calendar, forming the basis for timeline identification for PQMP",
      responsible: "Chief QHSSE",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P2",
      task: "Determine and outline various functional roles required to ensure quality standards and audit requirements throughout the project's lifecycle",
      responsible: "Chief QHSSE",
      accountable: "",
      consulted: "Project Manager",
      informed: ""
    },
    {
      step_id: "P3",
      task: "Refer to 'Master Plan for Quality Management – Wind' and modify it to align with the project's scope and requirements",
      responsible: "Chief QHSSE",
      accountable: "Chief QHSSE",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P4",
      task: "Further develop the PQMP to ensure comprehensive guidelines are in place for implementing and overseeing quality standards",
      responsible: "Chief QHSSE",
      accountable: "Chief QHSSE",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P5",
      task: "Finalize the PQMP, ensuring it includes plan for quality management, monitoring and control",
      responsible: "Chief QHSSE",
      accountable: "Chief QHSSE",
      consulted: "",
      informed: ""
    },
    {
      step_id: "E",
      task: "Share the PQMP with Project Planner (PP) for cross-functional coordination",
      responsible: "Chief QHSSE",
      accountable: "Chief QHSSE",
      consulted: "",
      informed: "Project Planner"
    }
  ],
  processMap: [
    {
      step_id: "S",
      step_type: "start",
      title: "Start",
      description: "Share the required inputs (PEA, PS and EEPs) with Chief QHSSE and request them to develop PQMP",
      order_index: 1
    },
    {
      step_id: "I1",
      step_type: "milestone",
      title: "PEA",
      description: "",
      order_index: 2
    },
    {
      step_id: "I2",
      step_type: "milestone",
      title: "EEPs",
      description: "",
      order_index: 3
    },
    {
      step_id: "I3",
      step_type: "milestone",
      title: "Master Plan for Quality Management – Wind",
      description: "",
      order_index: 4
    },
    {
      step_id: "P1",
      step_type: "process",
      title: "Review the Project Schedule to establish an understanding of project calendar, which forms the basis for timeline identification for PQMP",
      description: "",
      order_index: 5
    },
    {
      step_id: "P2",
      step_type: "process",
      title: "Determine and outline various functional roles required to ensure the quality standards are met throughout the project's lifecycle",
      description: "",
      order_index: 6
    },
    {
      step_id: "P3",
      step_type: "process",
      title: "Refer to 'Master Plan for Quality Management – Wind' and making it to align with the project's scope and requirements",
      description: "",
      order_index: 7
    },
    {
      step_id: "O1",
      step_type: "milestone",
      title: "Preliminary PQMP",
      description: "",
      order_index: 8
    },
    {
      step_id: "P4",
      step_type: "process",
      title: "Further develop the PQMP to ensure comprehensive guidelines are in place for implementing and overseeing quality standards",
      description: "",
      order_index: 9
    },
    {
      step_id: "P5",
      step_type: "process",
      title: "Finalize the PQMP, ensuring it includes quality management plan and quality Monitoring and Control plan",
      description: "",
      order_index: 10
    },
    {
      step_id: "O2",
      step_type: "milestone",
      title: "PQMP",
      description: "",
      order_index: 11
    },
    {
      step_id: "E",
      step_type: "end",
      title: "End",
      description: "Share the PQMP with PP for cross-functional coordination",
      order_index: 12
    }
  ]
};
