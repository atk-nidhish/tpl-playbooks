
import { supabase } from "@/integrations/supabase/client";

export const seedSolarEngineeringData = async () => {
  console.log('Starting Solar Engineering playbook data seeding...');
  
  // Use the proper UUID for the playbook_id that matches the database
  const PLAYBOOK_ID = "550e8400-e29b-41d4-a716-446655440001";
  
  try {
    // Clear existing data for this playbook more thoroughly
    console.log('Clearing existing Solar Engineering data...');
    
    // Delete all existing data for this playbook to avoid duplicates
    await supabase.from('process_steps').delete().eq('playbook_id', PLAYBOOK_ID);
    await supabase.from('raci_matrix').delete().eq('playbook_id', PLAYBOOK_ID);
    await supabase.from('process_map').delete().eq('playbook_id', PLAYBOOK_ID);

    // Wait a moment to ensure deletions are complete
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Process steps for Chapter 1 - Basic Engineering Design Preparation
    const processStepsChapter1 = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "S",
        activity: "Bid Incharge shares Bid Summary with Solar Engineering Head (SEH) and requests them to develop Basic Engineering Design, which is to be included in the bid submission",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Bid Incharge",
        comments: "Initial step to start basic engineering design preparation process"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P1",
        activity: "SEH assigns the Engineering Manager (EM) to develop Basic Engineering Design. SEH shares the Bid Summary with the EM",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "SEH",
        comments: "Assignment of Engineering Manager for basic engineering design development"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P2",
        activity: "EM analyzes the Bid Summary to define the basic engineering design requirements based on – shortlisted land parcel specifications, target solar energy output, and feasibility of grid interconnection",
        inputs: ["Bid Summary"],
        outputs: ["Basic Engineering Design Requirement"],
        timeline: "0.5",
        responsible: "EM",
        comments: "Analysis of bid summary to define engineering requirements"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P3",
        activity: "EM develops the bid-specific Basic Engineering Design based on the requirements defined in P2 and leverage the Basic Engineering Design Library",
        inputs: ["Basic Engineering Design Library", "Basic Engineering Design Requirement"],
        outputs: ["Basic Engineering Design"],
        timeline: "0.5",
        responsible: "EM",
        comments: "Development of bid-specific basic engineering design using library resources"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P4",
        activity: "EM defines the Guaranteed Technical Particulars (GTP) based on the Basic Engineering Design for the project",
        inputs: ["Basic Engineering Design"],
        outputs: ["Guaranteed Technical Particulars (GTP)"],
        timeline: "0.5",
        responsible: "EM",
        comments: "Definition of guaranteed technical specifications based on engineering design"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P5",
        activity: "EM develops preliminary Bill of Quantities (BoQ) and Bill of Services (BoS) leveraging GTP and Basic Engineering Design for the project",
        inputs: ["Basic Engineering Design", "GTP"],
        outputs: ["Preliminary BoQ", "Preliminary BoS"],
        timeline: "0.5",
        responsible: "EM",
        comments: "Development of preliminary quantities and services based on design and GTP"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P6",
        activity: "EM seeks review and approval from SEH on the following outputs – Basic Engineering Design, GTP, Preliminary BoQ and BoS",
        inputs: [],
        outputs: [],
        timeline: "0.5",
        responsible: "EM",
        comments: "Review and approval request for all outputs from SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P7",
        activity: "SEH reviews the outputs (Basic Engineering Design, GTP and Preliminary BoQ and BoS) – If modifications are required, SEH recommends changes. If modifications are not required, SEH grants approval",
        inputs: ["Basic Engineering Design", "GTP", "Preliminary BoQ", "Preliminary BoS"],
        outputs: ["Basic Engineering Modifications"],
        timeline: "0.5",
        responsible: "SEH",
        comments: "Review of outputs with conditional approval or modification recommendations"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P8",
        activity: "If SEH recommends any modifications to the outputs shared, EM incorporates those and reshares the outputs for approval",
        inputs: ["Basic Engineering Modifications"],
        outputs: [],
        timeline: "0.5",
        responsible: "EM",
        comments: "Incorporation of recommended modifications if any"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P9",
        activity: "SEH seeks further review and approval from MD on the outputs (Basic Engineering Design, GTP and Preliminary BoQ and BoS)",
        inputs: [],
        outputs: [],
        timeline: "0.5",
        responsible: "SEH",
        comments: "Escalation to MD for final review and approval"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P10",
        activity: "If MD recommends any modifications, SEH notifies the same to EM, who incorporates those and shares the finalized outputs with SEH",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "SEH",
        comments: "Handling MD modifications through EM if required"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P11",
        activity: "SEH shares the Basic Engineering Design, GTP, Preliminary BoQ, and BoS with Bid Incharge for bid submission. SEH shares the preliminary BoQ and BoS with the Procurement Lead for procurement cost estimation, for the commercial bid",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "SEH",
        comments: "Final sharing of outputs with Bid Incharge and Procurement Lead"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "E",
        activity: "SEH adds the finalized Basic Engineering Design Document to the Basic Engineering Design library for future reference",
        inputs: [],
        outputs: [],
        timeline: "Total – approx. 4.5 weeks",
        responsible: "SEH",
        comments: "Final archiving of design documents in library for future use"
      }
    ];

    // Process steps for Chapter 2.1 - Owner's Engineer Finalization
    const processStepsChapter21 = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "S",
        activity: "Chief Business Development notifies the Solar Engineering Head (SEH) about bids won",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "BD Team",
        comments: "Initial notification of bid win to start engineering process"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P1",
        activity: "SEH appoints Project Engineering Manager(s) (PEMs) for the project. SEH may appoint separate PEMs for civil, electrical, and plant design engineering",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "SEH",
        comments: "Assignment of Project Engineering Managers for different disciplines"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P2",
        activity: "SEH designates a Lead PEM to facilitate cross-functional coordination and external communication. If multiple PEMs are appointed, one is designated as the Lead PEM. If only one PEM is appointed, they automatically assume the role of Lead PEM",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "SEH",
        comments: "Designation of Lead PEM for coordination and communication"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P3",
        activity: "Lead PEM drafts the Owner's Engineer (OE) Requirements List, leveraging Basic Engineering Design to determine: Capability Requirements: Expertise, qualifications, and software skills required; Staffing Requirements: Number of engineers required; Final L1 Plan to identify: Engagement Duration: Estimated duration for which OE is required; Design Verification Turnaround: Expected turnaround for design verification, aligned with the project schedule",
        inputs: ["Basic Engineering Design"],
        outputs: ["OE Requirement List (draft)", "Final L1 Plan"],
        timeline: "0.5",
        responsible: "Lead PEM",
        comments: "Drafting OE requirements based on basic engineering design"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P4",
        activity: "Lead PEM conducts a joint discussion with other PEM(s) to review the OE Requirement List, to ensure completeness and address any specific needs. Lead PEM amends the OE Requirement List, if required",
        inputs: ["OE Requirement List (draft)"],
        outputs: ["OE Requirement List (final)"],
        timeline: "0.5",
        responsible: "Lead PEM",
        comments: "Review and finalization of OE requirements with other PEMs"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P5",
        activity: "Lead PEM shares the OE Requirement List with the Procurement Lead to initiate the RFQ process and obtain technical details from empaneled OEs",
        inputs: ["OE Requirement List (final)"],
        outputs: ["RFQ Responses for OE"],
        timeline: "-",
        responsible: "Lead PEM",
        comments: "Initiation of RFQ process with Procurement Lead"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P6",
        activity: "Procurement Lead conducts the RFQ process, and shares the responses with Lead PEM for technical evaluation",
        inputs: ["OE Requirement List (final)"],
        outputs: ["RFQ Responses for OE"],
        timeline: "•",
        responsible: "Procurement Lead",
        comments: "Procurement conducts RFQ and shares responses for evaluation"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P7",
        activity: "Lead PEM conducts technical evaluation of the responses and shortlists OEs. For specific requirements incorporated in P4, Lead PEM conducts a joint discussion with other PEMs for evaluation",
        inputs: ["RFQ Responses for OE"],
        outputs: ["Shortlist of OE"],
        timeline: "up to 5 OE responses",
        responsible: "Lead PEM",
        comments: "Technical evaluation and shortlisting of Owner's Engineers"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P8",
        activity: "Lead PEM shares the Shortlist of OEs with the Procurement Lead",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Lead PEM",
        comments: "Sharing shortlist with Procurement Lead"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P9",
        activity: "Procurement Lead assesses the shortlisted responses based on appropriate evaluation criteria and hires an OE",
        inputs: ["Shortlist of OE"],
        outputs: [],
        timeline: "•",
        responsible: "Procurement Lead",
        comments: "Final assessment and hiring of Owner's Engineer"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P10",
        activity: "Procurement Lead notifies (via email) Lead PEM of the hired OE",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Procurement Lead",
        comments: "Notification of hired OE to Lead PEM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P11",
        activity: "Lead PEM communicates (via email) the appointment of OE to other PEM(s) and SEH",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Lead PEM",
        comments: "Communication of OE appointment to team"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "E",
        activity: "Lead PEM conducts a kick-off discussion with OE to discuss detailed project requirements, scope, and deliverables timeline (as detailed in OE Requirement List (final))",
        inputs: [],
        outputs: [],
        timeline: "Total – 1.5 – 2 weeks",
        responsible: "Lead PEM",
        comments: "Kick-off discussion with hired Owner's Engineer"
      }
    ];

    // Process steps for Chapter 2.2A - Site Survey Consultant Finalization
    const processStepsChapter22A = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.1",
        step_id: "S",
        activity: "Project Manager notifies Solar Engineering Head (SEH) about the finalized Land Parcels for the project, and shares Land Demarcation Summary for conducting Preliminary Works",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Project Manager",
        comments: "Initial notification about land parcels for preliminary works"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.1",
        step_id: "P1",
        activity: "SEH shares the Land Demarcation Summary with Lead PEM and directs them to commence preliminary works",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "SEH",
        comments: "Sharing land information and directing preliminary works commencement"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.1",
        step_id: "P2",
        activity: "Lead PEM prepares the Preliminary Works Requirement Document, which specifies – List of tests/surveys to be conducted; Number of blocks for testing; Standard block size as defined in Basic Engineering Design; other pertinent technical requirements (e.g., software), and; deliverable timeline, as aligned in Engineering Execution Plan",
        inputs: ["Land Demarcation Summary"],
        outputs: ["Preliminary Works Requirement Document"],
        timeline: "0.5",
        responsible: "Lead PEM",
        comments: "Preparation of preliminary works requirements document"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.1",
        step_id: "P3",
        activity: "Lead PEM shares the Preliminary Works Requirement Document with the Procurement Lead, requesting them to initiate the RFQ process and obtain technical details from empaneled Site Survey Consultants (SSC)",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Lead PEM",
        comments: "Sharing requirements with Procurement Lead for RFQ initiation"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.1",
        step_id: "P4",
        activity: "Procurement Lead conducts the RFQ process, and shares the vendor responses with Lead PEM for technical evaluation",
        inputs: ["Preliminary Works Requirement Document"],
        outputs: ["RFQ Responses for SSC"],
        timeline: "•",
        responsible: "Procurement Lead",
        comments: "RFQ process for Site Survey Consultants"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.1",
        step_id: "P5",
        activity: "Lead PEM conducts technical evaluation of the responses and creates a Shortlist of SSC",
        inputs: ["RFQ Responses for SSC"],
        outputs: ["Shortlist of SSC"],
        timeline: "0.5",
        responsible: "Lead PEM",
        comments: "Technical evaluation and shortlisting of Site Survey Consultants"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.1",
        step_id: "P6",
        activity: "Lead PEM shares the SSC Shortlist with the Procurement Lead",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Lead PEM",
        comments: "Sharing shortlist with Procurement Lead"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.1",
        step_id: "P7",
        activity: "Procurement Lead assesses the shortlisted SSC and hires one based on appropriate evaluation criteria",
        inputs: [],
        outputs: [],
        timeline: "•",
        responsible: "Procurement Lead",
        comments: "Assessment and hiring of Site Survey Consultant"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.1",
        step_id: "E",
        activity: "Procurement Lead informs Project Manager of the hired SSC, who further coordinates with SSC for Preliminary Works execution",
        inputs: [],
        outputs: [],
        timeline: "Total – 1 – 1.5 weeks",
        responsible: "Procurement Lead",
        comments: "Final notification and coordination for preliminary works execution"
      }
    ];

    // Process steps for Chapter 2.2B - Preliminary Works Execution
    const processStepsChapter22B = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.1",
        step_id: "S",
        activity: "Procurement Lead informs Project Manager of the hired SSC",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Procurement Lead",
        comments: "Initial notification of hired Site Survey Consultant"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.1",
        step_id: "P1",
        activity: "Project Manager, in consultation with Lead PEM, conducts a meeting with the hired SSC to discuss detailed requirements (as detailed in Preliminary Works Requirement Document) and shares following inputs for conducting Preliminary Works – Detailed Feasibility Report of Land Parcel; Land Demarcation Summary",
        inputs: ["Preliminary Works Requirement Document"],
        outputs: [],
        timeline: "0.5",
        responsible: "Project Manager",
        comments: "Meeting with SSC to discuss requirements and share inputs"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.1",
        step_id: "P2",
        activity: "Project Manager liaises with the hired SSC to ensure timely submission of all deliverables, as detailed in Preliminary Works Requirement Document. Project Manager facilitates the provision of any additional inputs/ data required to conduct the assessments",
        inputs: [],
        outputs: [],
        timeline: "1.5",
        responsible: "Project Manager",
        comments: "Ongoing liaison and support for SSC deliverables"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.1",
        step_id: "P3",
        activity: "Project Manager receives preliminary works deliverables from SSC",
        inputs: [],
        outputs: ["Preliminary Works Deliverables"],
        timeline: "",
        responsible: "Project Manager",
        comments: "Receipt of preliminary works deliverables from SSC"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.1",
        step_id: "P4",
        activity: "Project Manager consolidates preliminary works deliverables received from the SSC",
        inputs: ["Preliminary Works Deliverables"],
        outputs: ["Preliminary Works Deliverables Compilation"],
        timeline: "",
        responsible: "Project Manager",
        comments: "Consolidation of all preliminary works deliverables"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.1",
        step_id: "P5",
        activity: "Project Manager shares a copy of Preliminary Works Deliverables Compilation with EPC Contractor, Owner's Engineer (OE), and Project Engineering Manager(s) to support Detailed Engineering Design preparation",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Project Manager",
        comments: "Distribution of deliverables to support detailed engineering design"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.1",
        step_id: "E",
        activity: "Project Manager maintains all original report documents of Preliminary Works Deliverables Compilation with themselves for record-keeping",
        inputs: [],
        outputs: [],
        timeline: "Total – 2 – 2.5 weeks",
        responsible: "Project Manager",
        comments: "Record-keeping of all preliminary works documents"
      }
    ];

    // RACI matrix for Chapter 1 - Basic Engineering Design Preparation
    const raciMatrixChapter1 = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "S",
        task: "Share Bid Summary with Solar Engineering Head (SEH) & request for the development of Basic Engineering Design",
        responsible: "Bid Incharge",
        accountable: "Bid Incharge",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P1",
        task: "Appoint Engineering Manager (EM) for the preparation of Basic Engineering Design & share Bid Summary",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "EM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P2",
        task: "Analyze Bid Summary to define basic engineering design requirements",
        responsible: "EM",
        accountable: "EM",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P3",
        task: "Develop Basic Engineering Design by leveraging Basic Engineering Design Library",
        responsible: "EM",
        accountable: "EM",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P4",
        task: "Define Guaranteed Technical Particulars (GTP)",
        responsible: "EM",
        accountable: "",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P5",
        task: "Draft preliminary Bill of Quantities (BoQ) & Bill of Services (BoS)",
        responsible: "EM",
        accountable: "",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P6",
        task: "Submit the prepared outputs (Basic Engineering Design, GTP and Preliminary BoQ and BoS) to SEH for review and approval",
        responsible: "EM",
        accountable: "EM",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P7",
        task: "Review the outputs received and recommend modifications or approve",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "EM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P8",
        task: "Implement the recommended modifications and reshare the revised outputs for approval",
        responsible: "EM",
        accountable: "EM",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P9",
        task: "Seek further review and approval from MD on the outputs",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "MD",
        informed: "MD"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P10",
        task: "If MD recommends any modifications, notify the required changes to EM. Incorporate the changes recommended by MD and share the finalized outputs with SEH",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "EM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P11",
        task: "Share the final outputs with Bid Incharge for submission. Share preliminary BoQ & BoS with Procurement Lead for procurement cost estimation",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "Procurement Lead"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "E",
        task: "Archive final design documents in Engineering Library",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: ""
      }
    ];

    // RACI matrix for Chapter 2.1 - Owner's Engineer Finalization
    const raciMatrixChapter21 = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "S",
        task: "Notify the Solar Engineering Head when a bid is won",
        responsible: "BD Team",
        accountable: "BD Team",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "P1",
        task: "Appoint Project Engineering Manager(s) to oversee project engineering activities",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "PEM(s)"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "P2",
        task: "Designate a Lead PEM for cross-functional coordination and external communication",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "Lead PEM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "P3",
        task: "Draft the Owner's Engineer Requirement List leveraging Basic Engineering Design and Final L1 Plan",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "P4",
        task: "Review the Owner's Engineer Requirement List with other Project Engineering Manager(s) to ensure completeness and address specific project needs",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "Other PEM(s)",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "P5",
        task: "Submit the Owner's Engineer Requirement List to the Procurement Lead to initiate the RFQ process and obtain technical details from empaneled Owner's Engineer",
        responsible: "Lead PEM",
        accountable: "SEH",
        consulted: "",
        informed: "Procurement Lead"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "P6",
        task: "Conduct the RFQ process and shares received responses with the Lead PEM for technical evaluation",
        responsible: "Procurement Lead",
        accountable: "Procurement Lead",
        consulted: "",
        informed: "Lead PEM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "P7",
        task: "Conducts technical evaluation of the responses received and create a Shortlist of Owner's Engineers",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "Other PEMs",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "P8",
        task: "Share the shortlist of Owner's Engineers with the Procurement Lead",
        responsible: "Lead PEM",
        accountable: "",
        consulted: "",
        informed: "Procurement Lead"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "P9",
        task: "Assess the shortlisted responses based on appropriate evaluation criteria and hire an OE",
        responsible: "Procurement Lead",
        accountable: "Procurement Lead",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "P10",
        task: "Notify Lead PEM of the selected Owner's Engineer",
        responsible: "Procurement Lead",
        accountable: "",
        consulted: "",
        informed: "Lead PEM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "P11",
        task: "Inform Solar Engineering Head and other PEM(s) of the selected Owner's Engineer",
        responsible: "Lead PEM",
        accountable: "",
        consulted: "",
        informed: "SEH, Other PEM(s)"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.2",
        step_id: "E",
        task: "Conduct kick-off meeting with OE to align on scope, timelines, and deliverables",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "Other PEMs",
        informed: "SEH"
      }
    ];

    // RACI matrix for Chapter 2.2A - Site Survey Consultant Finalization
    const raciMatrixChapter22A = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.2",
        step_id: "S",
        task: "Notify Solar Engineering Head about the finalized Land Parcels for the project and share Land Demarcation Summary",
        responsible: "Project Manager",
        accountable: "Project Manager",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.2",
        step_id: "P1",
        task: "Share Land Demarcation Summary with Lead PEM and direct initiation of preliminary works",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "Lead PEM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.2",
        step_id: "P2",
        task: "Prepare the Preliminary Works Requirement Document",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.2",
        step_id: "P3",
        task: "Share the Preliminary Works Requirement Document with the Procurement Lead to initiate the RFQ process",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "",
        informed: "Procurement Lead"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.2",
        step_id: "P4",
        task: "Conduct RFQ process and share received responses with Lead PEM for technical evaluation",
        responsible: "Procurement Lead",
        accountable: "Procurement Lead",
        consulted: "",
        informed: "Lead PEM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.2",
        step_id: "P5",
        task: "Conduct technical evaluation of responses and shortlist Site Survey Consultants",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.2",
        step_id: "P6",
        task: "Share the Shortlist of Site Survey Consultants with the Procurement Lead",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "",
        informed: "Procurement Lead"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.2",
        step_id: "P7",
        task: "Assess the shortlisted Site Survey Consultants and hire one based on appropriate evaluation criteria",
        responsible: "Procurement Lead",
        accountable: "Procurement Lead",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2a.2",
        step_id: "E",
        task: "Notify Project Manager of the hired Site Survey Consultant",
        responsible: "Procurement Lead",
        accountable: "Procurement Lead",
        consulted: "",
        informed: "Project Manager"
      }
    ];

    // RACI matrix for Chapter 2.2B - Preliminary Works Execution
    const raciMatrixChapter22B = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.2",
        step_id: "S",
        task: "Notify Project Manager of the hired Site Survey Consultant",
        responsible: "Procurement Lead",
        accountable: "Procurement Lead",
        consulted: "",
        informed: "Project Manager"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.2",
        step_id: "P1",
        task: "Conduct discussion with Site Survey Consultant to share detailed requirements & inputs",
        responsible: "Project Manager",
        accountable: "Project Manager",
        consulted: "Lead PEM",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.2",
        step_id: "P2",
        task: "Liaise with the hired Site Survey Consultant to ensure timely submission of all deliverables",
        responsible: "Project Manager",
        accountable: "Project Manager",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.2",
        step_id: "P3",
        task: "Receive deliverables from Site Survey Consultants",
        responsible: "Project Manager",
        accountable: "Project Manager",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.2",
        step_id: "P4",
        task: "Consolidate all deliverables received from Site Survey Consultants into one compilation",
        responsible: "Project Manager",
        accountable: "Project Manager",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.2",
        step_id: "P5",
        task: "Consolidate all deliverables & share with EPC, OE, and PEM(s)",
        responsible: "Project Manager",
        accountable: "Project Manager",
        consulted: "",
        informed: "PEM(s)"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.2b.2",
        step_id: "E",
        task: "Archive original preliminary works reports for record-keeping",
        responsible: "Project Manager",
        accountable: "Project Manager",
        consulted: "",
        informed: ""
      }
    ];

    // Process map for Chapter 1 - Basic Engineering Design Preparation
    const processMapChapter1 = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "Start",
        step_type: "start",
        title: "Bid Summary Sharing",
        description: "Bid Incharge shares Bid Summary with SEH and requests Basic Engineering Design development",
        order_index: 1
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P1",
        step_type: "process",
        title: "Assign Engineering Manager",
        description: "SEH assigns Engineering Manager and shares Bid Summary",
        order_index: 2
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P2",
        step_type: "process",
        title: "Analyze Requirements",
        description: "EM analyzes Bid Summary to define basic engineering design requirements",
        order_index: 3
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P3",
        step_type: "process",
        title: "Develop Basic Design",
        description: "EM develops bid-specific Basic Engineering Design using library",
        order_index: 4
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P4",
        step_type: "process",
        title: "Define GTP",
        description: "EM defines Guaranteed Technical Particulars based on Basic Engineering Design",
        order_index: 5
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P5",
        step_type: "process",
        title: "Develop BoQ & BoS",
        description: "EM develops preliminary Bill of Quantities and Bill of Services",
        order_index: 6
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P6",
        step_type: "process",
        title: "Submit for Review",
        description: "EM submits outputs to SEH for review and approval",
        order_index: 7
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P7",
        step_type: "decision",
        title: "SEH Review",
        description: "SEH reviews outputs and recommends changes or grants approval",
        order_index: 8
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P8",
        step_type: "process",
        title: "Incorporate Changes",
        description: "EM incorporates recommended modifications if any",
        order_index: 9
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P9",
        step_type: "process",
        title: "MD Review Request",
        description: "SEH seeks further review and approval from MD",
        order_index: 10
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P10",
        step_type: "process",
        title: "Handle MD Feedback",
        description: "Process MD modifications through EM if required",
        order_index: 11
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P11",
        step_type: "process",
        title: "Final Distribution",
        description: "SEH shares final outputs with Bid Incharge and Procurement Lead",
        order_index: 12
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "End",
        step_type: "end",
        title: "Archive Documents",
        description: "SEH archives finalized Basic Engineering Design in library",
        order_index: 13
      }
    ];

    // Combine all data arrays
    const allProcessSteps = [
      ...processStepsChapter1,
      ...processStepsChapter21,
      ...processStepsChapter22A,
      ...processStepsChapter22B
    ];

    const allRaciMatrix = [
      ...raciMatrixChapter1,
      ...raciMatrixChapter21,
      ...raciMatrixChapter22A,
      ...raciMatrixChapter22B
    ];

    const allProcessMap = [
      ...processMapChapter1
    ];

    // Insert process steps with error handling
    console.log('Inserting process steps...');
    for (const step of allProcessSteps) {
      const { error } = await supabase
        .from('process_steps')
        .insert(step);

      if (error) {
        console.error('Error inserting process step:', error);
        throw error;
      }
    }

    // Insert RACI matrix with error handling
    console.log('Inserting RACI matrix...');
    for (const raci of allRaciMatrix) {
      const { error } = await supabase
        .from('raci_matrix')
        .insert(raci);

      if (error) {
        console.error('Error inserting RACI entry:', error);
        throw error;
      }
    }

    // Insert process map with error handling
    console.log('Inserting process map...');
    for (const mapStep of allProcessMap) {
      const { error } = await supabase
        .from('process_map')
        .insert(mapStep);

      if (error) {
        console.error('Error inserting process map step:', error);
        throw error;
      }
    }

    console.log('Solar Engineering playbook data seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding Solar Engineering playbook data:', error);
    throw error;
  }
};
