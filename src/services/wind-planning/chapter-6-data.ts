
export const chapter6Data = {
  processSteps: [
    {
      step_id: "S",
      activity: "Project Planner (PP) shares the following with Risk Head (RH), and requests for the initiation of Risk Management Plan (RMP) – Project Schedule (PS) and Project Execution Approach (PEA)",
      inputs: ["PS", "PEA (includes scope matrix)"],
      outputs: [],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P1",
      activity: "RH reviews the Project Schedule and Project Execution Approach to identify risk review requirement",
      inputs: [],
      outputs: [],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P2",
      activity: "RH conducts Risk Review Workshop, where Functional Leads¹ collectively, identify the risks – Risk Head documents the risks in the Risk Register – Functional Leads¹ allocate a risk owner for every risk identified – An employee from any of the affected functions could be identified as the risk owner – Project Manager is de facto risk owner of any risk not attributed to any specific functions – Project Manager informs the respective Functions of the cross functional risks involved. Joint Risk Owners identified for cross-functional risks – From this step, the risk owner holds the primary responsibility of the risk – For each risk, Risk Owner initiates the development of Risk Management Plan, which includes the Plan for risk assessment and risk mitigation",
      inputs: [],
      outputs: ["Preliminary Risk Register"],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P3",
      activity: "For Risk Assessment, the Risk Owner quantifies following 4 metric – Impact of risk on project schedule – Impact of risk on project scope – Impact of risk on project quality – Probability of risk occurrence",
      inputs: [],
      outputs: ["Risk Register (Template Provided)"],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P4",
      activity: "Risk Owner identify and communicate the inputs to Risk Head, who updates the risk register – Basis the inputs, risk register automatically assesses the risk and assigns Risk Priority Number (RPN) – Basis the RPN, Risk Owner further builds Risk Management Plan by identifying an optimal risk mitigation action from different approaches based on an effort-benefit analysis, along with associated timelines – If there are changes to the already identified risks, Risk Owner communicates it to the Risk Head, who then updates the risk register – Functional Leads continue to identify additional risks as the project progresses",
      inputs: ["Risk Mitigation Approaches (Template Provided)"],
      outputs: ["Risk Management Plan (Template Provided)"],
      timeline: "2",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P5",
      activity: "",
      inputs: [],
      outputs: [],
      timeline: "1",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P6",
      activity: "",
      inputs: [],
      outputs: [],
      timeline: "2",
      responsible: "",
      comments: ""
    },
    {
      step_id: "P7",
      activity: "Risk Register is accessible only to Risk Head, and any change in the register must go via Risk Head The risk register is reviewed periodically during the weekly project review meeting",
      inputs: [],
      outputs: [],
      timeline: "-",
      responsible: "",
      comments: ""
    },
    {
      step_id: "E",
      activity: "The process of identifying and updating risk continues throughout the project lifecycle",
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
      task: "Share the required schedules / Plans with Risk Head (RH), and request RH to initiate the Risk Management Plan (RMP)",
      responsible: "Project Planner",
      accountable: "",
      consulted: "",
      informed: "Risk Head"
    },
    {
      step_id: "P1",
      task: "Review the Project Schedule and Project Execution Approach to assess the risk review requirement",
      responsible: "Risk Head",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      step_id: "P2",
      task: "Conduct a Risk Review Workshop, where Functional Leads collectively identify the risks with documentation of risks done in Risk Register",
      responsible: "Risk Head",
      accountable: "",
      consulted: "Functional Leads",
      informed: ""
    },
    {
      step_id: "P3",
      task: "Identify a Risk Owner for every risk identified",
      responsible: "Functional Leads",
      accountable: "",
      consulted: "Risk Head",
      informed: ""
    },
    {
      step_id: "P4",
      task: "Develop the Risk Management Plan, which includes risk assessment and mitigation plans",
      responsible: "Risk Owner",
      accountable: "Risk Owner",
      consulted: "",
      informed: "Risk Head"
    },
    {
      step_id: "P5",
      task: "For Risk Assessment, quantify certain metrics and communicate it to RM",
      responsible: "Risk Owner",
      accountable: "Risk Owner",
      consulted: "",
      informed: "Risk Head"
    },
    {
      step_id: "P6",
      task: "Update the risk register basis metrics from Risk Owner Based on the inputs, the risk register assigns Risk Priority Number (RPN) Based on the RPN, identify an optimal risk mitigation action, with associated timelines",
      responsible: "Risk Head",
      accountable: "",
      consulted: "Risk Owner",
      informed: ""
    },
    {
      step_id: "P7",
      task: "If there are changes to identified risks, communicate it to Risk Head",
      responsible: "Risk Owner",
      accountable: "Risk Owner",
      consulted: "",
      informed: "Risk Head"
    },
    {
      step_id: "E",
      task: "Update the risk register",
      responsible: "Risk Head",
      accountable: "",
      consulted: "",
      informed: ""
    }
  ],
  processMap: [
    {
      step_id: "S",
      step_type: "start",
      title: "Start",
      description: "Share the required inputs (PS and PEA) with Risk Head and request them to initiate RMP",
      order_index: 1
    },
    {
      step_id: "I1",
      step_type: "milestone", 
      title: "PS",
      description: "",
      order_index: 2
    },
    {
      step_id: "I2",
      step_type: "milestone",
      title: "PEA",
      description: "",
      order_index: 3
    },
    {
      step_id: "P1",
      step_type: "process",
      title: "Review the inputs received to identify risk review requirement",
      description: "",
      order_index: 4
    },
    {
      step_id: "P2",
      step_type: "process", 
      title: "Conduct Risk Review Workshop, where Functional Leads collectively identify the risks",
      description: "",
      order_index: 5
    },
    {
      step_id: "P3",
      step_type: "process",
      title: "Functional Leads allocate a risk owner for identified risk",
      description: "",
      order_index: 6
    },
    {
      step_id: "O1",
      step_type: "milestone",
      title: "Preliminary Risk Register", 
      description: "",
      order_index: 7
    },
    {
      step_id: "P4",
      step_type: "process",
      title: "Risk Head documents the identified 4 metric in respective metric in Risk Register",
      description: "",
      order_index: 8
    },
    {
      step_id: "P5",
      step_type: "process",
      title: "For Risk Assessment, Risk Owner quantifies 4 risk related metric",
      description: "",
      order_index: 9
    },
    {
      step_id: "P6",
      step_type: "process",
      title: "Based on the RPN, identify an optimal risk mitigation action with associated timelines",
      description: "",
      order_index: 10
    },
    {
      step_id: "I3",
      step_type: "milestone",
      title: "Risk Mitigation Approaches",
      description: "",
      order_index: 11
    },
    {
      step_id: "O2",
      step_type: "milestone", 
      title: "Risk Management Plan",
      description: "",
      order_index: 12
    },
    {
      step_id: "P7",
      step_type: "process",
      title: "If there are changes to the already identified risks, communicate it to the Risk Head, who then updates the risk register",
      description: "",
      order_index: 13
    },
    {
      step_id: "E",
      step_type: "end",
      title: "End",
      description: "The process of identifying and updating risk continues throughout the project lifecycle",
      order_index: 14
    }
  ]
};
