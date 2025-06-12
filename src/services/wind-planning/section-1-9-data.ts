
export const section1_9Data = {
  processSteps: [
    {
      step_id: "S",
      activity: "The Schedule Head (SH) or Site Planner (SP) identifies a delay in project execution that necessitates an update to the project Plan. If delay is identified by SH, SH informs SP about the delay",
      inputs: [],
      outputs: [],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P1",
      activity: "SP informs the PM about the identified delay",
      inputs: [],
      outputs: [],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P2",
      activity: "PM collaborates with the functional lead, responsible for the delayed activity, to assess the impact and define corrective actions, including timeline adjustments and re-sequencing activities across the project",
      inputs: [],
      outputs: ["Corrective Action Plan (Template Provided)"],
      timeline: "3",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P3",
      activity: "PM revises the schedules, considering the discussed changes with functional lead and realigning dependent activities",
      inputs: ["Corrective Action Plan"],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P4",
      activity: "PM submits the revised Plan to Chief Wind for review and approval (approval via formal sign-off)",
      inputs: [],
      outputs: [],
      timeline: "3",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P5",
      activity: "PM incorporates any feedback from the Chief Wind and resubmits the revised Plan to Chief Wind for approval, if needed",
      inputs: [],
      outputs: ["Draft Revised Plan"],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P6",
      activity: "For a revision of more than 5% delay¹ in the overall timeline, PM also seeks approval from Chief Project",
      inputs: [],
      outputs: ["Final Revised Plan"],
      timeline: "2",
      responsible: "",
      comments: ""
    },
    {
      step_id: "E",
      activity: "PM publishes the updated Plan to notify functional leads, and Project Planner of the revised schedule. The process of Plan revision and schedule management continues throughout the project lifecycle",
      inputs: [],
      outputs: [],
      timeline: "Total – 9 – 10 days",
      responsible: "",
      comments: ""
    }
  ],
  raciMatrix: [
    {
      step_id: "S",
      task: "Identify a delay in project execution that necessitates an update to the project Plan",
      responsible: "Schedule Head / Site Planner",
      accountable: "",
      consulted: "",
      informed: "Site Planner Chief PMO"
    },
    {
      step_id: "P1",
      task: "Inform the PM about the identified delay",
      responsible: "Schedule Planner",
      accountable: "",
      consulted: "",
      informed: "Project Manager"
    },
    {
      step_id: "P2",
      task: "Collaborate with the functional lead, responsible for the delayed activity, to assess the impact and define corrective actions",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Functional Lead",
      informed: ""
    },
    {
      step_id: "P3",
      task: "Revise the schedules, considering the discussed changes with functional lead and realigning dependent activities",
      responsible: "Project Manager",
      accountable: "Project Manager",
      consulted: "Functional Heads",
      informed: ""
    },
    {
      step_id: "P4",
      task: "Submit the revised Plan to Chief Wind for review and approval (approval via formal sign-off)",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Chief Wind",
      informed: ""
    },
    {
      step_id: "P5",
      task: "Incorporate any feedback from the Chief Wind and resubmit the revised Plan to Chief Wind for approval, if needed",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Chief Wind",
      informed: ""
    },
    {
      step_id: "P6",
      task: "Any delay beyond 5%, seek approval from Chief Projects",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Chief Projects",
      informed: "Chief Wind"
    },
    {
      step_id: "E",
      task: "Publish the updated Plan to notify functional leads and Project Planner of the revised schedule. The process of Plan revision and schedule management continues throughout the project lifecycle",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Functional Heads & Project Planner"
    }
  ],
  processMap: [
    {
      step_id: "S",
      step_type: "start",
      title: "Start",
      description: "Schedule identifies delay plans necessitating the Schedule Head or Site Planner",
      order_index: 1
    },
    {
      step_id: "P1",
      step_type: "process",
      title: "Integrate all identified plans received from functional leads to create integrated Project Schedule",
      description: "",
      order_index: 2
    },
    {
      step_id: "O1",
      step_type: "milestone",
      title: "Detailed Project Schedule",
      description: "",
      order_index: 3
    },
    {
      step_id: "P2",
      step_type: "process",
      title: "Incorporate COO's recommended modifications and submit the revised Plan to Chief Projects",
      description: "",
      order_index: 4
    },
    {
      step_id: "P3",
      step_type: "decision",
      title: "Incorporate the modifications suggested by Chief Projects to Project Planner",
      description: "",
      order_index: 5
    },
    {
      step_id: "P4",
      step_type: "process",
      title: "Notify the modifications suggested by Chief Projects to Project Planner",
      description: "",
      order_index: 6
    },
    {
      step_id: "P5",
      step_type: "process",
      title: "Share the approval of Detailed Project Schedule with Chief Projects for seeking approval",
      description: "",
      order_index: 7
    },
    {
      step_id: "O3",
      step_type: "milestone",
      title: "Detailed Project Schedule",
      description: "",
      order_index: 8
    },
    {
      step_id: "E",
      step_type: "end",
      title: "End",
      description: "",
      order_index: 9
    }
  ]
};
