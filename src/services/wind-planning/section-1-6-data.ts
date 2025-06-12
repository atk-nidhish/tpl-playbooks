
export const section1_6Data = {
  processSteps: [
    {
      step_id: "S",
      activity: "Project Planner (PP) shares the following schedules and plans with Project Manager (PM) and requests the Construction Management Plan (CMP) – Project Schedule (PS), Project Execution Approach (PEA), Engineering Execution Plans (EEPs), and Project Procurement Plan (PPP), Statutory Approval Management Plan (SAMP)¹",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P1",
      activity: "Project Manager reviews the inputs received to identify – Timeline of activities impacting construction, Constraints that may impact the construction – regulatory, financial, time-based, resource-based limitations.",
      inputs: ["PS", "PEA (includes scope matrix)", "EEPs", "PPP", "SAMP"],
      outputs: [],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P2",
      activity: "Project Manager prepares draft CMP by leveraging the Wind Project Master Plan and modifying it to align with project milestones, timelines and constraints as analyzed in P1. CMP includes activities, milestones and timelines for all construction related activities, including: Early Works Schedule (EWS), Mobilization Checklist, Construction Schedule, Logistics Planning, Safety Management Plan, Construction Execution Plan. Timelines of CMP must align with Project Schedule.",
      inputs: ["Wind Project Master Plan"],
      outputs: ["Draft CMP"],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P3",
      activity: "Project Manager discusses the draft CMP with EPC contractor to seek inputs and any required modifications, under their scope of execution. While the Project Manager incorporates EPC contractor inputs, ownership of the plan remains with the Project Manager. This step may be bypassed if the EPC contractor for the project has not been selected finalized",
      inputs: [],
      outputs: [],
      timeline: "2",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P4",
      activity: "Project Manager incorporates changes suggested by EPC contractor, if required",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P5",
      activity: "Project Manager shares CMP with Chief Wind for review and approval (approval via formal sign-off)",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P6",
      activity: "If changes are needed, Project Manager updates the Plan and reshares for approval with Chief Wind",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P7",
      activity: "Project Manager shares the CMP with Chief Projects for approval Required only for projects > 50 MW capacity",
      inputs: [],
      outputs: ["CMP (Template Provided)"],
      timeline: "0.5",
      responsible: "",
      comments: ""
    },
    {
      step_id: "E",
      activity: "Project Manager shares the CMP with Project Planner for cross-functional coordination",
      inputs: [],
      outputs: [],
      timeline: "Total – 5 – 6 days",
      responsible: "",
      comments: ""
    }
  ],
  raciMatrix: [
    {
      step_id: "S",
      task: "Share Project Schedule (PS), Project Execution Approach (PEA), Engineering Execution Plans (EEPs), Project Procurement Plan (PPP) and Statutory Approval Management Plan (SAMP), and request for Construction Management Plan (CMP)",
      responsible: "Project Planner",
      accountable: "",
      consulted: "",
      informed: "Project Manager"
    },
    {
      step_id: "P1",
      task: "Review the received inputs to identify timeline of construction-related activities and identify any constraints that may impact the construction",
      responsible: "Project Manager",
      accountable: "Project Manager",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P2",
      task: "Prepare draft CMP by leveraging the Wind Project Master Plan and modifying it to align with project requirements",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Chief Wind"
    },
    {
      step_id: "P3",
      task: "Share draft CMP with EPC contractor to seek inputs and any necessary modifications, under their scope of execution",
      responsible: "Project Manager",
      accountable: "Project Manager",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P4",
      task: "Incorporate changes suggested by EPC contractor, if required",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P5",
      task: "Seek sign-off on CMP from Chief Wind",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Chief Wind",
      informed: ""
    },
    {
      step_id: "P6",
      task: "If changes are needed, update CMP and seek re-approval to finalize CMP",
      responsible: "Project Manager",
      accountable: "",
      consulted: "Chief Wind",
      informed: ""
    },
    {
      step_id: "P7",
      task: "Seek further approval from Chief Projects Required only for projects > 50 MW capacity",
      responsible: "Project Manager",
      accountable: "Chief Wind",
      consulted: "Chief Projects",
      informed: ""
    },
    {
      step_id: "E",
      task: "Share CMP with Project Planner for cross-functional coordination",
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
      description: "Project Planner shares schedules and plans, requests CMP",
      order_index: 1
    },
    {
      step_id: "P1",
      step_type: "process",
      title: "Review Inputs",
      description: "Project Manager reviews inputs to identify timeline and constraints",
      order_index: 2
    },
    {
      step_id: "P2",
      step_type: "process",
      title: "Prepare Draft CMP",
      description: "Prepare draft CMP leveraging Wind Project Master Plan",
      order_index: 3
    },
    {
      step_id: "P3",
      step_type: "decision",
      title: "EPC Contractor Input",
      description: "Discuss draft CMP with EPC contractor for inputs",
      order_index: 4
    },
    {
      step_id: "P4",
      step_type: "process",
      title: "Incorporate Changes",
      description: "Incorporate EPC contractor suggestions if required",
      order_index: 5
    },
    {
      step_id: "P5",
      step_type: "decision",
      title: "Chief Wind Review",
      description: "Share CMP with Chief Wind for review and approval",
      order_index: 6
    },
    {
      step_id: "P6",
      step_type: "process",
      title: "Update Plan",
      description: "Update CMP if changes needed and reshare for approval",
      order_index: 7
    },
    {
      step_id: "P7",
      step_type: "decision",
      title: "Chief Projects Approval",
      description: "Seek approval from Chief Projects (for >50MW projects)",
      order_index: 8
    },
    {
      step_id: "E",
      step_type: "end",
      title: "End",
      description: "Share CMP with Project Planner for coordination",
      order_index: 9
    }
  ]
};
