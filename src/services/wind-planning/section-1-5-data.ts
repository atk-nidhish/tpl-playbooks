
export const section1_5Data = {
  processSteps: [
    {
      step_id: "S",
      activity: "Project Planner (PP) requests the procurement team for Project Procurement Plan and shares the following to Wind Procurement Head (WPH) – Project Schedule (PS), Project Execution Approach (PEA), and Engineering Execution Plans (EEPs) as they are progressively prepared, enabling procurement Planning to commence concurrently. Chief Procurement appoints Wind Procurement Head (WPH) to oversee the preparation of Project Procurement Plan and shares the inputs received",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P1",
      activity: "WPH reviews the Project Schedule, Project Execution Approach and Engineering Execution Plans to identify the items for procurement, technical requirements and timelines across the project lifecycle – Items to be procured encompass materials, components and services if needed, WPH seeks clarifications from Project Engineering Managers. WPH designs the contracting packages for materials and services, leveraging Execution Strategy Framework (ESF) to identify the right package strategy for the project. SPH may consult functional leads¹ in drafting the contracting packages for the project",
      inputs: ["PS", "PEA", "EEPs"],
      outputs: ["Procurement Requirement List (Template Provided)"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P2",
      activity: "WPH designs the contracting packages for materials and services, leveraging Execution Strategy Framework (ESF) to identify the right package strategy for the project. SPH may consult functional leads¹ in drafting the contracting packages for the project",
      inputs: ["ESF"],
      outputs: ["Procurement Package Strategy (draft)"],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P3",
      activity: "WPH shares the package strategy with Functional Leads¹ for review and sign-off",
      inputs: ["Procurement Package Strategy (draft)"],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P4",
      activity: "WPH incorporates any modifications suggested by Functional Leads¹",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P5",
      activity: "WPH shares the package strategy with Chief Procurement for review and approval (approval via formal sign-off) Required only for projects > 50 MW capacity. If required, WPH modifies the package strategy basis inputs from Chief Procurement and seeks re-approval to finalize the strategy",
      inputs: [],
      outputs: ["Procurement Package Strategy (Template Provided)"],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P6",
      activity: "If required, WPH modifies the package strategy basis inputs from Chief Procurement and seeks re-approval to finalize the strategy",
      inputs: [],
      outputs: [],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P7",
      activity: "WPH assigns the procurement packages to the respective Procurement Leads. Procurement Leads further notify the vendors² about the procurement Plan",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P8",
      activity: "Procurement Leads prepare their draft Procurement Schedules by modifying the Wind Project Master Plan based on inputs from: Analysis of items to be procured and timelines in P1, Inputs from vendors. Further refinements to the draft Plan are made based on subsequent rounds of alignment with vendors",
      inputs: ["Wind Project Master Plan"],
      outputs: ["Draft Procurement Schedules"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P9",
      activity: "Procurement Leads share procurement schedule with WPH for review and approval (approval via formal sign-off)",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P10",
      activity: "If WPH recommends changes to the procurement schedule, Procurement Leads incorporate the changes and reshare for approval",
      inputs: [],
      outputs: ["Procurement Schedules (Template Provided)"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P11",
      activity: "WPH shares the finalized procurement schedules with Project Planner",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P12",
      activity: "Project Planner compiles all the procurement schedules to create consolidated Project Procurement Plan (PPP) and shares it with WPH. Timelines of PPP must align with Project Schedule. Any deviations must be communicated by Project Planner to the Project Manager for review and necessary action",
      inputs: ["Procurement Schedules"],
      outputs: [],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P13",
      activity: "WPH seeks further approval for Project Procurement Plan from Chief Procurement Required only for projects > 50 MW capacity",
      inputs: [],
      outputs: ["Project Procurement Plan (Template Provided)"],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "E",
      activity: "WPH communicates finalized Project Procurement Plan to Project Planner for cross-functional coordination",
      inputs: [],
      outputs: [],
      timeline: "Total – 7 – 9 days",
      responsible: "",
      comments: ""
    }
  ],
  raciMatrix: [
    {
      step_id: "S",
      task: "Request the procurement team for procurement Plan and share Project Schedule (PS), Project Execution Approach (PEA), and Engineering Execution Plans (EEPs). Appoint Wind Procurement Head (WPH) for the project",
      responsible: "Project Planner",
      accountable: "",
      consulted: "",
      informed: "Chief Procurement, Wind Procurement Head"
    },
    {
      step_id: "P1",
      task: "Review Project Schedule, Project Execution Approach, and Engineering Execution Plans to identify procurement items, requirements and timelines. Seek clarifications from Project Engineering Managers if needed",
      responsible: "Wind Procurement Head",
      accountable: "",
      consulted: "Project Engineering Managers",
      informed: ""
    },
    {
      step_id: "P2",
      task: "Leverage Execution Strategy Framework (ESF) to package procurement activities",
      responsible: "Wind Procurement Head",
      accountable: "",
      consulted: "Land Manager, Project Manager, Project Engineering Manager",
      informed: ""
    },
    {
      step_id: "P3",
      task: "Share the package strategy with Functional Leads for review and sign-off",
      responsible: "Wind Procurement Head",
      accountable: "Wind Procurement Head",
      consulted: "Land Manager, Project Manager, Project Engineering Manager",
      informed: ""
    },
    {
      step_id: "P4",
      task: "Incorporate any modifications suggested by Functional Leads",
      responsible: "Wind Procurement Head",
      accountable: "Wind Procurement Head",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P5",
      task: "Seek sign-off on procurement package allocation from Chief Procurement Required only for projects > 50 MW capacity",
      responsible: "Wind Procurement Head",
      accountable: "",
      consulted: "Chief Procurement",
      informed: ""
    },
    {
      step_id: "P6",
      task: "Modify procurement package basis inputs from Chief Procurement and seek re-approval to finalize the strategy",
      responsible: "Wind Procurement Head",
      accountable: "",
      consulted: "Chief Procurement",
      informed: ""
    },
    {
      step_id: "P7",
      task: "Assign procurement packages to respective Procurement Leads. Notify EPC contractor about components to be procured by them",
      responsible: "Wind Procurement Head, Procurement Leads",
      accountable: "",
      consulted: "",
      informed: "Procurement Leads"
    },
    {
      step_id: "P8",
      task: "Prepare draft Procurement Schedule by leveraging the Wind Project Master Plan and aligning it with project requirements and timelines",
      responsible: "Procurement Leads",
      accountable: "Wind Procurement Head",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P9",
      task: "Share Procurement Schedule with WPH for review and approval (approval via formal sign-off)",
      responsible: "Procurement Leads",
      accountable: "",
      consulted: "",
      informed: "Wind Procurement Head"
    },
    {
      step_id: "P10",
      task: "Incorporate changes to Procurement Schedule based on WPH's review and reshare for approval",
      responsible: "Procurement Leads",
      accountable: "",
      consulted: "",
      informed: "Wind Procurement Head"
    },
    {
      step_id: "P11",
      task: "Share finalized Procurement Schedules with Project Planner",
      responsible: "Wind Procurement Head",
      accountable: "",
      consulted: "",
      informed: "Project Planner"
    },
    {
      step_id: "P12",
      task: "Compile all Procurement Schedules to create consolidated Project Procurement Plan (PPP) and share it with WPH",
      responsible: "Project Planner",
      accountable: "",
      consulted: "",
      informed: "Wind Procurement Head"
    },
    {
      step_id: "P13",
      task: "Seek further approval for PPP from Chief Procurement Required only for projects > 50 MW capacity",
      responsible: "Wind Procurement Head",
      accountable: "",
      consulted: "Chief Procurement",
      informed: "Project Planner"
    },
    {
      step_id: "E",
      task: "Communicate final PPP to Project Planner for future cross functional coordination",
      responsible: "Wind Procurement Head",
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
      description: "Project Planner requests procurement team for Project Procurement Plan",
      order_index: 1
    },
    {
      step_id: "P1",
      step_type: "process",
      title: "Review and Identify Requirements",
      description: "WPH reviews Project Schedule, PEA, and EEPs to identify procurement items",
      order_index: 2
    },
    {
      step_id: "P2",
      step_type: "process",
      title: "Design Contracting Packages",
      description: "WPH designs contracting packages using ESF framework",
      order_index: 3
    },
    {
      step_id: "P3",
      step_type: "decision",
      title: "Functional Leads Review",
      description: "Share package strategy with Functional Leads for review",
      order_index: 4
    },
    {
      step_id: "P4",
      step_type: "process",
      title: "Incorporate Modifications",
      description: "WPH incorporates modifications from Functional Leads",
      order_index: 5
    },
    {
      step_id: "P5",
      step_type: "decision",
      title: "Chief Procurement Approval",
      description: "Seek approval from Chief Procurement (for >50MW projects)",
      order_index: 6
    },
    {
      step_id: "P6",
      step_type: "process",
      title: "Finalize Strategy",
      description: "Modify and finalize procurement package strategy",
      order_index: 7
    },
    {
      step_id: "P7",
      step_type: "process",
      title: "Assign Packages",
      description: "Assign procurement packages to Procurement Leads",
      order_index: 8
    },
    {
      step_id: "P8",
      step_type: "process",
      title: "Prepare Draft Schedules",
      description: "Procurement Leads prepare draft schedules",
      order_index: 9
    },
    {
      step_id: "P9",
      step_type: "decision",
      title: "WPH Review",
      description: "Share schedules with WPH for review and approval",
      order_index: 10
    },
    {
      step_id: "P10",
      step_type: "process",
      title: "Incorporate Changes",
      description: "Incorporate WPH feedback and reshare for approval",
      order_index: 11
    },
    {
      step_id: "P11",
      step_type: "process",
      title: "Share Final Schedules",
      description: "WPH shares finalized schedules with Project Planner",
      order_index: 12
    },
    {
      step_id: "P12",
      step_type: "process",
      title: "Compile PPP",
      description: "Project Planner compiles consolidated Project Procurement Plan",
      order_index: 13
    },
    {
      step_id: "P13",
      step_type: "decision",
      title: "Final Approval",
      description: "Seek final approval from Chief Procurement",
      order_index: 14
    },
    {
      step_id: "E",
      step_type: "end",
      title: "End",
      description: "Communicate final PPP to Project Planner",
      order_index: 15
    }
  ]
};
