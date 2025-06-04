import { supabase } from "@/integrations/supabase/client";

const PLAYBOOK_ID = "f895041f-04e3-466b-aa09-53782e40467c";

export const seedPlanningSolarData = async () => {
  console.log('Starting to seed Planning - Solar playbook data...');
  
  try {
    // Check if playbook exists, if not create it
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id')
      .eq('id', PLAYBOOK_ID)
      .single();

    if (!existingPlaybook) {
      console.log('Creating Planning - Solar playbook...');
      const { data: newPlaybook, error: playbookError } = await supabase
        .from('playbooks')
        .insert({
          id: PLAYBOOK_ID,
          name: "planning-solar",
          title: "Planning - Solar",
          description: "Solar Project Planning Playbook"
        })
        .select()
        .single();

      if (playbookError) {
        console.error('Error creating playbook:', playbookError);
        throw playbookError;
      }
      console.log('Planning - Solar playbook created successfully:', newPlaybook);
    }

    // Clear existing data for chapters 2-6 to avoid duplicates
    await supabase.from('process_steps').delete().eq('playbook_id', PLAYBOOK_ID).in('phase_id', ['chapter-2', 'chapter-3', 'chapter-4', 'chapter-5', 'chapter-6']);
    await supabase.from('raci_matrix').delete().eq('playbook_id', PLAYBOOK_ID).in('phase_id', ['chapter-2', 'chapter-3', 'chapter-4', 'chapter-5', 'chapter-6']);
    await supabase.from('process_map').delete().eq('playbook_id', PLAYBOOK_ID).in('phase_id', ['chapter-2', 'chapter-3', 'chapter-4', 'chapter-5', 'chapter-6']);

    // Chapter 2: Scope Management Plan - Process Steps
    const chapter2ProcessSteps = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P1",
        activity: "Scope Management Plan Development",
        inputs: ["Project Charter", "EPC Contract", "Project Requirements"],
        outputs: ["Scope Management Plan"],
        timeline: "2 weeks",
        responsible: "Project Manager",
        comments: "Define how project scope will be managed throughout the project lifecycle"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P2",
        activity: "Work Breakdown Structure (WBS) Creation",
        inputs: ["Scope Management Plan", "Project Requirements"],
        outputs: ["Work Breakdown Structure", "WBS Dictionary"],
        timeline: "1 week",
        responsible: "Project Manager",
        comments: "Break down project deliverables into manageable work packages"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P3",
        activity: "Scope Baseline Development",
        inputs: ["WBS", "WBS Dictionary", "Project Scope Statement"],
        outputs: ["Scope Baseline"],
        timeline: "1 week",
        responsible: "Project Manager",
        comments: "Establish approved scope baseline for project control"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P4",
        activity: "Scope Change Control Process",
        inputs: ["Scope Baseline", "Change Requests"],
        outputs: ["Approved Changes", "Updated Scope Baseline"],
        timeline: "Ongoing",
        responsible: "Project Manager",
        comments: "Manage and control scope changes throughout project execution"
      }
    ];

    // Chapter 2: RACI Matrix
    const chapter2RACIData = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P1",
        task: "Scope Management Plan Development",
        responsible: "Project Manager",
        accountable: "Project Director",
        consulted: "Engineering Head, Procurement Head",
        informed: "Construction Head, Quality Head"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P2",
        task: "Work Breakdown Structure Creation",
        responsible: "Project Manager",
        accountable: "Project Director",
        consulted: "Department Heads",
        informed: "Project Team"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P3",
        task: "Scope Baseline Development",
        responsible: "Project Manager",
        accountable: "Project Director",
        consulted: "Engineering Head",
        informed: "All Department Heads"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P4",
        task: "Scope Change Control Process",
        responsible: "Project Manager",
        accountable: "Project Director",
        consulted: "Change Control Board",
        informed: "All Stakeholders"
      }
    ];

    // Chapter 3: Cost Management Plan - Process Steps
    const chapter3ProcessSteps = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P1",
        activity: "Cost Management Plan Development",
        inputs: ["Project Charter", "Scope Baseline", "EPC Contract"],
        outputs: ["Cost Management Plan"],
        timeline: "2 weeks",
        responsible: "Project Manager",
        comments: "Define how project costs will be planned, structured and controlled"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P2",
        activity: "Cost Estimation and Budgeting",
        inputs: ["WBS", "Resource Requirements", "Cost Management Plan"],
        outputs: ["Cost Estimates", "Project Budget", "Cost Baseline"],
        timeline: "3 weeks",
        responsible: "Cost Engineer",
        comments: "Develop comprehensive cost estimates and establish cost baseline"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P3",
        activity: "Cost Control and Monitoring",
        inputs: ["Cost Baseline", "Work Performance Data", "Actual Costs"],
        outputs: ["Cost Performance Reports", "Variance Analysis"],
        timeline: "Monthly",
        responsible: "Cost Engineer",
        comments: "Monitor and control project costs against baseline"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P4",
        activity: "Earned Value Management",
        inputs: ["Cost Baseline", "Schedule Baseline", "Work Performance"],
        outputs: ["EVM Reports", "Performance Indices"],
        timeline: "Monthly",
        responsible: "Cost Engineer",
        comments: "Implement earned value management for integrated cost and schedule performance"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P5",
        activity: "Cost Forecasting and Closure",
        inputs: ["EVM Data", "Performance Trends", "Change Requests"],
        outputs: ["Cost Forecasts", "Final Cost Reports"],
        timeline: "Monthly/Final",
        responsible: "Cost Engineer",
        comments: "Forecast final costs and prepare cost closure documentation"
      }
    ];

    // Chapter 3: RACI Matrix
    const chapter3RACIData = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P1",
        task: "Cost Management Plan Development",
        responsible: "Project Manager",
        accountable: "Project Director",
        consulted: "Cost Engineer, Finance Head",
        informed: "All Department Heads"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P2",
        task: "Cost Estimation and Budgeting",
        responsible: "Cost Engineer",
        accountable: "Project Manager",
        consulted: "Engineering Head, Procurement Head",
        informed: "Project Director, Finance Head"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P3",
        task: "Cost Control and Monitoring",
        responsible: "Cost Engineer",
        accountable: "Project Manager",
        consulted: "Department Heads",
        informed: "Project Director, Finance Head"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P4",
        task: "Earned Value Management",
        responsible: "Cost Engineer",
        accountable: "Project Manager",
        consulted: "Planning Engineer",
        informed: "Project Director, All Department Heads"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P5",
        task: "Cost Forecasting and Closure",
        responsible: "Cost Engineer",
        accountable: "Project Manager",
        consulted: "Finance Head",
        informed: "Project Director, All Stakeholders"
      }
    ];

    // Chapter 4: Quality Management Plan - Process Steps
    const chapter4ProcessSteps = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "S",
        activity: "Project Planner (PP) shares the following schedules with Chief QHSSE, and requests them to initiate the development of Project Quality Management Plan (PQMP) – Project Execution Approach (PEA), Project Schedule (PS), and Engineering Execution Plans (EEPs) (for standard quality requirements)",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Project Planner",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P1",
        activity: "Chief QHSSE reviews the Project Schedule and Project Execution Approach to establish an understanding of project calendar which forms the basis for timeline identification for PQMP. QM is fully aware of the project's quality standards, having collaborated with the Project Engineering Manager to define the standard quality requirements during the preparation of the EEPs",
        inputs: ["PEA (includes scope matrix)", "PS"],
        outputs: [],
        timeline: "0.5",
        responsible: "Chief QHSSE",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P2",
        activity: "Chief QHSSE, in consultation with PM, performs the following activities: Determine and outline various functional roles required to ensure the quality standards are met throughout the project's lifecycle. Identify audit requirements during project including frequency and auditors",
        inputs: [],
        outputs: [],
        timeline: "0.5",
        responsible: "Chief QHSSE",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P3",
        activity: "Chief QHSSE refers to 'Master Plan for Quality Management – Solar' and makes necessary adjustments to align it with the project's scope and requirements",
        inputs: ["EEPs"],
        outputs: ["Preliminary PQMP"],
        timeline: "1",
        responsible: "Chief QHSSE",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P4",
        activity: "PQMP covers plans, timeline and checkpoints, and functional role required to implement quality standard. Project Quality Standards are referred to from Project Quality Requirement developed in Engineering Execution Plans. Chief QHSSE develops the PQMP to ensure comprehensive guidelines are in place for implementing and overseeing quality standards, which covers – QC hold points, Quality documentation requirements by contractors, Submittals from contractor for quality approval, Non-conformance report (NCR) management and all other requirements in this context",
        inputs: ["Master Plan for Quality Management - Solar"],
        outputs: [],
        timeline: "",
        responsible: "Chief QHSSE",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P5",
        activity: "Chief QHSSE finalizes PQMP, ensuring it includes – Quality Management Plan – Defined roles, audit requirements, and a structured approach with Plans, timelines, and checkpoints to uphold quality standards. Quality Monitoring and Control Plan – Established guidelines for inspections, documentation, submittals, and NCR management to ensure consistent quality throughout the project.",
        inputs: [],
        outputs: ["PQMP (Template Provided)"],
        timeline: "",
        responsible: "Chief QHSSE",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "E",
        activity: "QHSSE shares PQMP with Project Planner (PP) for facilitating cross-functional coordination",
        inputs: [],
        outputs: [],
        timeline: "Total – 2 – 3 days",
        responsible: "Chief QHSSE",
        comments: ""
      }
    ];

    // Chapter 4: RACI Matrix
    const chapter4RACIData = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "S",
        task: "Share the required Plans/schedules with Chief QHSSE and request them to develop Project Quality Management Plan (PQMP)",
        responsible: "Project Planner",
        accountable: "",
        consulted: "",
        informed: "Chief QHSSE"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P1",
        task: "Review the Project Schedule to establish an understanding of the project calendar, forming the basis for timeline identification for PQMP",
        responsible: "Chief QHSSE",
        accountable: "",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P2",
        task: "Determine and outline various functional roles required to ensure quality standards and audit requirements throughout the project's lifecycle",
        responsible: "Chief QHSSE",
        accountable: "",
        consulted: "Project Manager",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P3",
        task: "Refer to 'Master Plan for Quality Management – Solar' and modify it to align with the project's scope and requirements",
        responsible: "Chief QHSSE",
        accountable: "Chief QHSSE",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P4",
        task: "Further develop the PQMP to ensure comprehensive guidelines are in place for implementing and overseeing quality standards",
        responsible: "Chief QHSSE",
        accountable: "Chief QHSSE",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P5",
        task: "Finalize the PQMP, ensuring it includes quality management Plan and quality Monitoring and Control Plan",
        responsible: "Chief QHSSE",
        accountable: "Chief QHSSE",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "E",
        task: "Share the PQMP with Project Planner (PP) for cross-functional coordination",
        responsible: "Chief QHSSE",
        accountable: "Chief QHSSE",
        consulted: "",
        informed: "Project Planner"
      }
    ];

    // Chapter 5: Statutory Approval Management Plan - Process Steps
    const chapter5ProcessSteps = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "S",
        activity: "Project Planner (PP) requests the Project Manager (PM) to develop Statutory Approval Management Plan (SAMP) and shares the required schedules / Plans – Project Schedule (PS), Project Execution Approach (PEA), Project Procurement Plan (PPP)",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Project Planner",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P1",
        activity: "The Project Manager informs the Chief Regulatory of the need to appoint a Regulatory Manager (RM) for the project",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Project Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P2",
        activity: "Chief Regulatory appoints a RM for the project",
        inputs: [],
        outputs: [],
        timeline: "0.5",
        responsible: "Chief Regulatory",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P3",
        activity: "PM, in consultation with RM, refers to the Solar Statutory Approval Requirement Compendium to prepare SAMP. The compendium outlines state-level statutory approval requirements for solar power Plants; helps to identify necessary approvals required throughout the project lifecycle",
        inputs: ["Solar Statutory Approval Requirement Compendium"],
        outputs: ["Preliminary SAMP"],
        timeline: "1",
        responsible: "Project Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P4",
        activity: "The Project Manager incorporates timelines into SAMP – Project Manager identifies the timelines and criticalities of statutory approvals by reviewing Project Schedule and Project Execution Approach",
        inputs: ["PS", "PEA (includes scope matrix)"],
        outputs: [],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P5",
        activity: "PM, in consultation with RM, identifies various requirements/ pre-requisites to be fulfilled for obtaining approvals. Documents required for obtaining approval, Pre-requisites or conditions that must be satisfied before approval is granted, Cost associated with getting approvals, Duration or estimated time for obtaining approval, Risks associated with getting the clearance, Consenting considerations, requirements the approving authority mandates before granting approval, Management action Plan for the process. Project Manager leverages Solar Statutory Approval Requirements Compendium to identify the above",
        inputs: [],
        outputs: [],
        timeline: "0.5",
        responsible: "Project Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P6",
        activity: "For each statutory approval required, Project Manager identifies a PoC across function teams, whose work would be impacted by delay in obtaining statutory approvals. – Project Manager may consult functional leads to identify PoC",
        inputs: [],
        outputs: [],
        timeline: "0.5",
        responsible: "Project Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P7",
        activity: "PM, in consultation with the RM, prepares the final SAMP, which includes – Documentation, pre-requisites, costs, approval timelines, risks, and consenting considerations, A clear action Plan for obtaining approvals, Identification of PoC whose work will be impacted in case of any delay",
        inputs: [],
        outputs: [],
        timeline: "1",
        responsible: "Project Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P8",
        activity: "Project Manager seeks review and approval (approval via formal sign-off) for SAMP from Chief Regulatory",
        inputs: [],
        outputs: [],
        timeline: "1",
        responsible: "Project Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P9",
        activity: "If changes are required, Project Manager incorporates the feedback and reshares SAMP with Chief Regulatory for approval. If no changes are required, Project Manager finalizes SAMP",
        inputs: [],
        outputs: ["SAMP (Template Provided)"],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "E",
        activity: "Project Manager shares the SAMP with Project Planner for cross-functional coordination",
        inputs: [],
        outputs: [],
        timeline: "Total – 5 – 6 days",
        responsible: "Project Manager",
        comments: ""
      }
    ];

    // Chapter 5: RACI Matrix
    const chapter5RACIData = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "S",
        task: "Share required Plans/schedules with Project Manager (PM), for the development of Statutory Approval Management Plan (SAMP)",
        responsible: "Project Planner",
        accountable: "",
        consulted: "Project Manager",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P1",
        task: "Inform the Chief Regulatory of the need to appoint Regulatory Manager for the project",
        responsible: "Project Manager",
        accountable: "",
        consulted: "",
        informed: "Chief Regulatory"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P2",
        task: "Appoint a Regulatory Manager for the project",
        responsible: "Chief Regulatory",
        accountable: "Chief Regulatory",
        consulted: "",
        informed: "Regulatory Manager"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P3",
        task: "Develop SAMP, leveraging the Solar Statutory Approval Requirement Compendium",
        responsible: "Project Manager",
        accountable: "",
        consulted: "Regulatory Manager",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P4",
        task: "Incorporate timeline for statutory approvals in SAMP by reviewing Project Schedule and Project Execution Approach",
        responsible: "Project Manager",
        accountable: "",
        consulted: "Regulatory Manager",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P5",
        task: "Identify requirements/ pre-requisites to be fulfilled for obtaining statutory approvals, leveraging Solar Statutory Approval Requirements Compendium",
        responsible: "Project Manager",
        accountable: "",
        consulted: "Regulatory Manager",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P6",
        task: "Identify PoC within functional teams whose work would be impacted by delay in obtaining statutory approvals",
        responsible: "Project Manager",
        accountable: "",
        consulted: "Cost Controller",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P7",
        task: "Prepare the final SAMP, detailing documentation, pre-requisites, costs, approval timelines, risks, consenting considerations, and PoC for each approval (as done in P6)",
        responsible: "Project Manager",
        accountable: "Project Manager",
        consulted: "Regulatory Manager",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P8",
        task: "Seek review and approval (approval via formal sign-off) for SAMP from Chief Regulatory",
        responsible: "Project Manager",
        accountable: "Project Manager",
        consulted: "Chief Regulatory",
        informed: "Regulatory Manager"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P9",
        task: "Incorporate changes to SAMP basis feedback received and reapply for approval from Chief Regulatory to finalize SAMP",
        responsible: "Project Manager",
        accountable: "Project Manager",
        consulted: "Chief Regulatory",
        informed: "Regulatory Manager"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "E",
        task: "Share final SAMP with Project Planner for cross-functional coordination",
        responsible: "Project Manager",
        accountable: "",
        consulted: "",
        informed: "Project Planner"
      }
    ];

    // Chapter 6: Risk Management Plan - Process Steps
    const chapter6ProcessSteps = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "S",
        activity: "Project Planner (PP) shares the following with Risk Head (RH), and requests for the initiation of Risk Management Plan (RMP) – Project Schedule (PS) and Project Execution Approach (PEA)",
        inputs: ["PS", "PEA (includes scope matrix)"],
        outputs: [],
        timeline: "-",
        responsible: "Project Planner",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P1",
        activity: "RH reviews the Project Schedule and Project Execution Approach to identify risk review requirement",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Risk Head",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P2",
        activity: "RH conducts Risk Review Workshop, where Functional Leads collectively, identify the risks. Risk Head documents the risks in the Risk Register. Functional Leads allocate a risk owner for every risk identified. An employee from any of the affected functions could be identified as the risk owner. Project Manager is de facto risk owner of any risk not attributed to any specific functions. Project Manager informs the respective Functions of the cross functional risks involved. Joint Risk Owners identified for cross-functional risks",
        inputs: [],
        outputs: ["Preliminary Risk Register"],
        timeline: "-",
        responsible: "Risk Head",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P3",
        activity: "From this step, the risk owner holds the primary responsibility of the risk. For each risk, Risk Owner initiates the development of Risk Management Plan, which includes the Plan for risk assessment and risk mitigation",
        inputs: [],
        outputs: ["Risk Register (Risk Register and risk management plan template shared as a separate file)"],
        timeline: "-",
        responsible: "Functional Leads",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P4",
        activity: "For Risk Assessment, the Risk Owner quantifies following 4 metric – Impact of risk on project schedule, Impact of risk on project scope, Impact of risk on project quality, Probability of risk occurrence",
        inputs: [],
        outputs: ["Preliminary Risk Management Plan"],
        timeline: "2",
        responsible: "Risk Owner",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P5",
        activity: "Risk Owner identify and communicate the inputs to Risk Head, who updates the risk register.",
        inputs: [],
        outputs: [],
        timeline: "1",
        responsible: "Risk Owner",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P6",
        activity: "Basis the inputs, risk register automatically assesses the risk and assigns Risk Priority Number (RPN). Basis the RPN, Risk Owner further builds Risk Management Plan by identifying an optimal risk mitigation action from different approaches based on an effort-benefit analysis, along with associated timelines",
        inputs: ["Risk Mitigation Approaches (Template Provided)"],
        outputs: ["Risk Management Plan (Risk Register and risk management plan template shared as a separate file)"],
        timeline: "2",
        responsible: "Risk Owner",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P7",
        activity: "If there are changes to the already identified risks, Risk Owner communicates it to the Risk Head, who then updates the risk register. Functional Leads continue to identify additional risks as the project progresses. Risk Register is accessible only to Risk Head, and any change in the register must go via Risk Head",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Risk Owner",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "E",
        activity: "The risk register is reviewed periodically during the weekly project review meeting. The process of identifying and updating risk continues throughout the project lifecycle",
        inputs: [],
        outputs: [],
        timeline: "Total – 6 – 7 days",
        responsible: "Risk Head",
        comments: ""
      }
    ];

    // Chapter 6: RACI Matrix
    const chapter6RACIData = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "S",
        task: "Share the required schedules / Plans with Risk Head (RH), and request RH to initiate the Risk Management Plan (RMP)",
        responsible: "Project Planner",
        accountable: "",
        consulted: "",
        informed: "Risk Head"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P1",
        task: "Review the Project Schedule and Project Execution Approach to assess the risk review requirement",
        responsible: "Risk Head",
        accountable: "",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P2",
        task: "Conduct a Risk Review Workshop, where Functional Leads collectively identify the risks with documentation of risks done in Risk Register",
        responsible: "Risk Head",
        accountable: "",
        consulted: "Functional Leads",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P3",
        task: "Identify a Risk Owner for every risk identified",
        responsible: "Functional Leads",
        accountable: "",
        consulted: "Risk Head",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P4",
        task: "Develop the Risk Management Plan, which includes risk assessment and mitigation Plans",
        responsible: "Risk Owner",
        accountable: "Risk Owner",
        consulted: "",
        informed: "Risk Head"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P4",
        task: "For Risk Assessment, quantify certain metrics and communicate it to RM.",
        responsible: "Risk Owner",
        accountable: "Risk Owner",
        consulted: "",
        informed: "Risk Head"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P5",
        task: "Update the risk register basis metrics from Risk Owner. Based on the inputs, the risk register assigns Risk Priority Number (RPN).",
        responsible: "Risk Head",
        accountable: "",
        consulted: "Risk Owner",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P6",
        task: "Based on the RPN, identify an optimal risk mitigation action, with associated timelines",
        responsible: "Risk Owner",
        accountable: "",
        consulted: "",
        informed: "Risk Head"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P7",
        task: "If there are changes to identified risks, communicate it to Risk Head",
        responsible: "Risk Owner",
        accountable: "Risk Owner",
        consulted: "",
        informed: "Risk Head"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P7",
        task: "Update the risk register",
        responsible: "Risk Head",
        accountable: "",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P7",
        task: "Functional Leads continue to identify additional risks as the project progresses",
        responsible: "Functional Leads",
        accountable: "",
        consulted: "",
        informed: "Risk Head"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "E",
        task: "Continue identifying and updating risks throughout the project lifecycle",
        responsible: "Risk Head",
        accountable: "",
        consulted: "",
        informed: ""
      }
    ];

    // Insert process steps for all chapters
    const { error: processStepsError } = await supabase
      .from('process_steps')
      .insert([...chapter2ProcessSteps, ...chapter3ProcessSteps, ...chapter4ProcessSteps, ...chapter5ProcessSteps, ...chapter6ProcessSteps]);

    if (processStepsError) {
      console.error('Error inserting process steps:', processStepsError);
      throw processStepsError;
    }

    // Insert RACI data for all chapters
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert([...chapter2RACIData, ...chapter3RACIData, ...chapter4RACIData, ...chapter5RACIData, ...chapter6RACIData]);

    if (raciError) {
      console.error('Error inserting RACI data:', raciError);
      throw raciError;
    }

    // Chapter 2: Process Map
    const chapter2ProcessMap = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P1",
        step_type: "process",
        title: "Scope Management Plan Development",
        description: "Define scope management approach and procedures",
        order_index: 1
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P2",
        step_type: "process",
        title: "WBS Creation",
        description: "Create work breakdown structure and dictionary",
        order_index: 2
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P3",
        step_type: "milestone",
        title: "Scope Baseline",
        description: "Establish approved scope baseline",
        order_index: 3
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-2",
        step_id: "P4",
        step_type: "process",
        title: "Scope Change Control",
        description: "Manage scope changes throughout project",
        order_index: 4
      }
    ];

    // Chapter 3: Process Map
    const chapter3ProcessMap = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P1",
        step_type: "process",
        title: "Cost Management Plan",
        description: "Develop cost management approach",
        order_index: 1
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P2",
        step_type: "process",
        title: "Cost Estimation & Budgeting",
        description: "Estimate costs and create project budget",
        order_index: 2
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P3",
        step_type: "process",
        title: "Cost Control & Monitoring",
        description: "Monitor and control project costs",
        order_index: 3
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P4",
        step_type: "process",
        title: "Earned Value Management",
        description: "Implement EVM for performance measurement",
        order_index: 4
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-3",
        step_id: "P5",
        step_type: "milestone",
        title: "Cost Forecasting & Closure",
        description: "Forecast costs and close cost management",
        order_index: 5
      }
    ];

    // Chapter 4: Process Map
    const chapter4ProcessMap = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "S",
        step_type: "start",
        title: "Share Required Plans",
        description: "Project Planner shares schedules with Chief QHSSE",
        order_index: 1
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P1",
        step_type: "process",
        title: "Review Project Schedule",
        description: "Establish project calendar for PQMP timeline",
        order_index: 2
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P2",
        step_type: "process",
        title: "Define Quality Roles",
        description: "Determine functional roles and audit requirements",
        order_index: 3
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P3",
        step_type: "process",
        title: "Draft Preliminary PQMP",
        description: "Leverage Master Plan for Quality Management",
        order_index: 4
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P4",
        step_type: "process",
        title: "Develop Comprehensive PQMP",
        description: "Include QC hold points and quality standards",
        order_index: 5
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "P5",
        step_type: "milestone",
        title: "Finalize PQMP",
        description: "Complete quality management and monitoring plan",
        order_index: 6
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-4",
        step_id: "E",
        step_type: "end",
        title: "Share PQMP",
        description: "Coordinate with Project Planner",
        order_index: 7
      }
    ];

    // Chapter 5: Process Map
    const chapter5ProcessMap = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "S",
        step_type: "start",
        title: "Share Required Plans",
        description: "Project Planner requests SAMP development",
        order_index: 1
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P1",
        step_type: "process",
        title: "Inform Chief Regulatory",
        description: "Need to appoint Regulatory Manager",
        order_index: 2
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P2",
        step_type: "process",
        title: "Appoint Regulatory Manager",
        description: "Chief Regulatory appoints RM for project",
        order_index: 3
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P3",
        step_type: "process",
        title: "Develop Preliminary SAMP",
        description: "Leverage Solar Statutory Approval Compendium",
        order_index: 4
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P4",
        step_type: "process",
        title: "Incorporate Timelines",
        description: "Identify criticalities and timeline requirements",
        order_index: 5
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P5",
        step_type: "process",
        title: "Identify Requirements",
        description: "Document approval prerequisites and costs",
        order_index: 6
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P6",
        step_type: "process",
        title: "Identify PoC",
        description: "Determine impact on functional teams",
        order_index: 7
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P7",
        step_type: "process",
        title: "Prepare Final SAMP",
        description: "Complete documentation and action plans",
        order_index: 8
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P8",
        step_type: "process",
        title: "Seek Approval",
        description: "Review and approval from Chief Regulatory",
        order_index: 9
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "P9",
        step_type: "milestone",
        title: "Finalize SAMP",
        description: "Incorporate feedback and finalize",
        order_index: 10
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-5",
        step_id: "E",
        step_type: "end",
        title: "Share Final SAMP",
        description: "Coordinate with Project Planner",
        order_index: 11
      }
    ];

    // Chapter 6: Process Map
    const chapter6ProcessMap = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "S",
        step_type: "start",
        title: "Share Required Plans",
        description: "Project Planner shares PS and PEA with Risk Head",
        order_index: 1
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P1",
        step_type: "process",
        title: "Review Schedule & Approach",
        description: "Risk Head reviews to identify risk requirements",
        order_index: 2
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P2",
        step_type: "process",
        title: "Risk Review Workshop",
        description: "Functional Leads identify risks and allocate owners",
        order_index: 3
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P3",
        step_type: "process",
        title: "Risk Owner Assignment",
        description: "Risk owners take responsibility for risk management",
        order_index: 4
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P4",
        step_type: "process",
        title: "Risk Assessment",
        description: "Quantify impact metrics and probability",
        order_index: 5
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P5",
        step_type: "process",
        title: "Communicate to Risk Head",
        description: "Risk Owner updates Risk Head with assessment",
        order_index: 6
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P6",
        step_type: "process",
        title: "Risk Mitigation Planning",
        description: "Develop optimal mitigation actions with timelines",
        order_index: 7
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "P7",
        step_type: "process",
        title: "Ongoing Risk Management",
        description: "Continuous risk identification and updates",
        order_index: 8
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-6",
        step_id: "E",
        step_type: "end",
        title: "Periodic Review",
        description: "Weekly project review meetings for risk updates",
        order_index: 9
      }
    ];

    // Insert process map data
    const { error: processMapError } = await supabase
      .from('process_map')
      .insert([...chapter2ProcessMap, ...chapter3ProcessMap, ...chapter4ProcessMap, ...chapter5ProcessMap, ...chapter6ProcessMap]);

    if (processMapError) {
      console.error('Error inserting process map data:', processMapError);
      throw processMapError;
    }

    console.log('Planning - Solar playbook data seeded successfully!');
  } catch (error) {
    console.error('Error seeding Planning - Solar playbook data:', error);
    throw error;
  }
};
