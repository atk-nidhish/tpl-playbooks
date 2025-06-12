
export const section1_8Data = {
  processSteps: [
    {
      step_id: "S",
      activity: "Project Planner receives detailed plans from across the functional teams (Land, Engineering, Procurement, and Projects)",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P1",
      activity: "Project Planner integrates all detailed plans received from functional departments (Land, Engineering, Procurement, Projects) to create Detailed Project Schedule",
      inputs: ["PS", "LFP", "EEPs", "PPP", "CMP", "PCP", "CP"],
      outputs: ["Detailed Project Schedule (draft)"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P2",
      activity: "Project Planner shares the Detailed Project Schedule with Chief Projects for sign off",
      inputs: ["Detailed Project Schedule (draft)"],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P3",
      activity: "If Chief Projects recommends any changes, Project Planner incorporates the modifications suggested and resubmits the revised Plan to Chief Projects. Project Planner modifies the plan in consultation with respective functional lead",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P4",
      activity: "Chief Projects shares the Detailed Project Schedule with COO to seek final sign-off",
      inputs: [],
      outputs: ["Detailed Project Schedule (Final)"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P5",
      activity: "If COO recommends any modifications, Chief Projects notifies the same to Project Planner",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P6",
      activity: "Project Planner incorporates COO's recommended modifications and resubmits the revised Plan to Chief Projects. Project Planner modifies the plan in consultation with respective functional lead",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P7",
      activity: "Project Planner reshares the Detailed Project Schedule with Chief Projects for seeking approval from COO",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P8",
      activity: "Chief Projects shares the signed-off Detailed Project Schedule with Project Planner",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "E",
      activity: "Project Planner publishes the Detailed Project Schedule to notify functional teams",
      inputs: [],
      outputs: [],
      timeline: "Total 4 – 8 days",
      responsible: "",
      comments: ""
    }
  ],
  raciMatrix: [
    {
      step_id: "S",
      task: "Receive plans from across cross-functional teams",
      responsible: "Project Planner",
      accountable: "Project Planner",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P1",
      task: "Integrate all detailed plans received from functional departments (Land, Engineering, Procurement, Projects) to create Detailed Project Schedule",
      responsible: "Project Planner",
      accountable: "Project Planner",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P2",
      task: "Share the Detailed Project Schedule with Chief Projects for sign off",
      responsible: "Project Planner",
      accountable: "Project Planner",
      consulted: "",
      informed: "Chief Projects"
    },
    {
      step_id: "P3",
      task: "Share the Detailed Project Schedule with COO for final sign-off",
      responsible: "Chief Projects",
      accountable: "Chief Projects",
      consulted: "",
      informed: "COO"
    },
    {
      step_id: "P4",
      task: "If COO recommends any modifications, discuss the required modification with the respective functional department",
      responsible: "Chief Projects",
      accountable: "Chief Projects",
      consulted: "Functional Leads",
      informed: ""
    },
    {
      step_id: "P5",
      task: "Update the respective plan, and share the same to Project Planner",
      responsible: "Functional Leads",
      accountable: "Functional Leads",
      consulted: "",
      informed: "Project Planner"
    },
    {
      step_id: "P6",
      task: "Integrate the updated functional plan into the Detailed Project Schedule",
      responsible: "Project Planner",
      accountable: "Project Planner",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P7",
      task: "Share the Detailed Project Schedule with Chief Projects for seeking approval from COO",
      responsible: "Project Planner",
      accountable: "Project Planner",
      consulted: "",
      informed: "Chief Projects"
    },
    {
      step_id: "P8",
      task: "Share the signed-off Detailed Project Schedule with Project Planner",
      responsible: "Chief Projects",
      accountable: "Chief Projects",
      consulted: "",
      informed: "Project Planner"
    },
    {
      step_id: "E",
      task: "Publish the Detailed Project Schedule to notify functional teams",
      responsible: "Project Planner",
      accountable: "",
      consulted: "",
      informed: "Functional Leads"
    }
  ],
  processMap: [
    {
      step_id: "S",
      step_type: "start",
      title: "Start",
      description: "Receive detailed plans from cross-functional teams",
      order_index: 1
    },
    {
      step_id: "P1",
      step_type: "process",
      title: "Integrate Plans",
      description: "Integrate all detailed plans to create Detailed Project Schedule",
      order_index: 2
    },
    {
      step_id: "P2",
      step_type: "decision",
      title: "Chief Projects Sign-off",
      description: "Share Detailed Project Schedule with Chief Projects",
      order_index: 3
    },
    {
      step_id: "P3",
      step_type: "process",
      title: "Incorporate Changes",
      description: "Incorporate modifications suggested by Chief Projects",
      order_index: 4
    },
    {
      step_id: "P4",
      step_type: "decision",
      title: "COO Final Sign-off",
      description: "Share the Detailed Project Schedule with COO",
      order_index: 5
    },
    {
      step_id: "P5",
      step_type: "process",
      title: "Process Feedback",
      description: "Incorporate COO's recommended modifications",
      order_index: 6
    },
    {
      step_id: "P6",
      step_type: "process",
      title: "Update Plan",
      description: "Integrate updated functional plan into schedule",
      order_index: 7
    },
    {
      step_id: "P7",
      step_type: "decision",
      title: "Reshare for Approval",
      description: "Reshare with Chief Projects for COO approval",
      order_index: 8
    },
    {
      step_id: "P8",
      step_type: "process",
      title: "Share Signed-off Plan",
      description: "Share signed-off schedule with Project Planner",
      order_index: 9
    },
    {
      step_id: "E",
      step_type: "end",
      title: "End",
      description: "Publish the Detailed Project Schedule to notify teams",
      order_index: 10
    }
  ]
};
