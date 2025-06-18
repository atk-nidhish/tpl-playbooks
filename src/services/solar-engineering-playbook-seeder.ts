
import { supabase } from "@/integrations/supabase/client";

export const seedSolarEngineeringData = async () => {
  console.log('Starting Solar Engineering playbook data seeding...');
  
  // Use a proper UUID for the playbook_id
  const PLAYBOOK_ID = "550e8400-e29b-41d4-a716-446655440001";
  
  try {
    // Clear existing data for this playbook
    console.log('Clearing existing Solar Engineering data...');
    await supabase.from('process_steps').delete().eq('playbook_id', PLAYBOOK_ID);
    await supabase.from('raci_matrix').delete().eq('playbook_id', PLAYBOOK_ID);
    await supabase.from('process_map').delete().eq('playbook_id', PLAYBOOK_ID);

    // Process steps for Chapter 1 - Basic Engineering Design Preparation
    const processStepsChapter1 = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "S",
        activity: "Chief Business Development notifies the Solar Engineering Head (SEH) about bids won",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "BD Team",
        comments: "Initial notification step to start the basic engineering design preparation process"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P1",
        activity: "SEH appoints Project Engineering Manager(s) (PEMs) for the project - SEH may appoint separate PEMs for civil, electrical, and plant design engineering",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "SEH",
        comments: "Appointment of dedicated project engineering managers for different disciplines"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
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
        phase_id: "section-1.1",
        step_id: "P3",
        activity: "Lead PEM collects project details from BD Team",
        inputs: ["Project bid documents", "Technical specifications", "Site information"],
        outputs: ["Project details compilation"],
        timeline: "0.5 days",
        responsible: "Lead PEM",
        comments: "Collection of all project-related documentation and information"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P4",
        activity: "Lead PEM reviews project details and creates Basic Engineering Design Requirements",
        inputs: ["Project details compilation"],
        outputs: ["Basic Engineering Design Requirements"],
        timeline: "1 day",
        responsible: "Lead PEM",
        comments: "Analysis of project requirements and creation of engineering design specifications"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P5",
        activity: "Lead PEM shares Basic Engineering Design Requirements with PEMs for review and feedback",
        inputs: ["Basic Engineering Design Requirements"],
        outputs: ["Reviewed requirements with feedback"],
        timeline: "0.5 days",
        responsible: "Lead PEM",
        comments: "Collaborative review to ensure completeness and accuracy"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P6",
        activity: "Lead PEM finalizes Basic Engineering Design Requirements incorporating feedback",
        inputs: ["Reviewed requirements with feedback"],
        outputs: ["Final Basic Engineering Design Requirements"],
        timeline: "0.5 days",
        responsible: "Lead PEM",
        comments: "Incorporation of feedback and finalization of requirements"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P7",
        activity: "Lead PEM creates preliminary project schedule and milestone plan",
        inputs: ["Final Basic Engineering Design Requirements"],
        outputs: ["Preliminary project schedule", "Milestone plan"],
        timeline: "1 day",
        responsible: "Lead PEM",
        comments: "Development of initial project timeline and key milestones"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "E",
        activity: "Lead PEM submits Basic Engineering Design Requirements and project schedule to SEH for approval",
        inputs: ["Final Basic Engineering Design Requirements", "Preliminary project schedule"],
        outputs: ["Approved design requirements and schedule"],
        timeline: "Total: 3.5 days",
        responsible: "Lead PEM",
        comments: "Final approval from SEH to proceed with detailed engineering"
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
        comments: "Initial notification step to start the Owner's Engineer finalization process"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P1",
        activity: "SEH appoints Project Engineering Manager(s) (PEMs) for the project - SEH may appoint separate PEMs for civil, electrical, and plant design engineering",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "SEH",
        comments: "Appointment of dedicated project engineering managers for different disciplines"
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
        activity: "Lead PEM drafts the Owner's Engineer (OE) Requirements List, leveraging Basic Engineering Design to determine: Capability Requirements (Expertise, qualifications, and software skills required), Staffing Requirements (Number of engineers required), Final L1 Plan to identify Engagement Duration and Design Verification Turnaround",
        inputs: ["Basic Engineering Design", "Final L1 Plan"],
        outputs: ["OE Requirement List (draft)"],
        timeline: "0.5 days",
        responsible: "Lead PEM",
        comments: "Comprehensive requirements definition for Owner's Engineer selection"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P4",
        activity: "Lead PEM conducts a joint discussion with other PEM(s) to review the OE Requirement List, to ensure completeness and address any specific needs. Lead PEM amends the OE Requirement List, if required",
        inputs: ["OE Requirement List (draft)"],
        outputs: ["OE Requirement List (final)"],
        timeline: "0.5 days",
        responsible: "Lead PEM",
        comments: "Collaborative review and finalization of OE requirements"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P5",
        activity: "Lead PEM shares the OE Requirement List with the Procurement Lead to initiate the RFQ process and obtain technical details from empaneled OEs",
        inputs: [],
        outputs: [],
        timeline: "-",
        responsible: "Lead PEM",
        comments: "Handover to procurement for RFQ process initiation"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P6",
        activity: "Procurement Lead conducts the RFQ process, and shares the responses with Lead PEM for technical evaluation",
        inputs: ["OE Requirement List (final)"],
        outputs: ["RFP Responses for OE"],
        timeline: "Variable",
        responsible: "Procurement Lead",
        comments: "RFQ process execution and response collection"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P7",
        activity: "Lead PEM conducts technical evaluation of the responses and shortlists OEs. For specific requirements incorporated in P4, Lead PEM conducts a joint discussion with other PEMs for evaluation",
        inputs: ["RFP Responses for OE"],
        outputs: ["Shortlist of OE (Template Provided)"],
        timeline: "Variable (up to 5 OE responses)",
        responsible: "Lead PEM",
        comments: "Technical evaluation and shortlisting of qualified OEs"
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
        comments: "Handover of shortlisted OEs to procurement"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "P9",
        activity: "Procurement Lead assesses the shortlisted responses based on appropriate evaluation criteria and hire an OE",
        inputs: ["Shortlist of OE"],
        outputs: [],
        timeline: "Variable",
        responsible: "Procurement Lead",
        comments: "Final evaluation and selection of Owner's Engineer"
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
        comments: "Notification of selected OE to engineering team"
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
        comments: "Internal communication of OE appointment"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.1",
        step_id: "E",
        activity: "Lead PEM conducts a kick-off discussion with OE to discuss detailed project requirements, scope, and deliverables timeline (as detailed in OE Requirement List (final)). Other PEM(s) shall also be invited to the kick-off discussion",
        inputs: [],
        outputs: [],
        timeline: "Total – 1.5 – 2 weeks",
        responsible: "Lead PEM",
        comments: "Project kick-off with selected Owner's Engineer"
      }
    ];

    // RACI matrix for Chapter 1 - Basic Engineering Design Preparation
    const raciMatrixChapter1 = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "S",
        task: "Notify the Solar Engineering Head when a bid is won",
        responsible: "BD Team",
        accountable: "BD Team",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P1",
        task: "Appoint Project Engineering Manager(s) to oversee project engineering activities",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "PEM(s)"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P2",
        task: "Designate a Lead PEM for cross-functional coordination and external communication",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "Lead PEM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P3",
        task: "Collect project details from BD Team",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "BD Team",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P4",
        task: "Review project details and create Basic Engineering Design Requirements",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "",
        informed: "SEH, PEMs"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P5",
        task: "Review Basic Engineering Design Requirements and provide feedback",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "PEMs",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P6",
        task: "Finalize Basic Engineering Design Requirements incorporating feedback",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "",
        informed: "SEH, PEMs"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "P7",
        task: "Create preliminary project schedule and milestone plan",
        responsible: "Lead PEM",
        accountable: "Lead PEM",
        consulted: "PEMs",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.2",
        step_id: "E",
        task: "Submit Basic Engineering Design Requirements and project schedule for approval",
        responsible: "Lead PEM",
        accountable: "SEH",
        consulted: "",
        informed: "PEMs"
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

    // Process map for Chapter 1 - Basic Engineering Design Preparation
    const processMapChapter1 = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "Start",
        step_type: "start",
        title: "Begin Basic Engineering Design Preparation",
        description: "BD Team notifies SEH about bid win to start basic engineering design preparation",
        order_index: 1
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P1",
        step_type: "process",
        title: "Appoint Project Engineering Managers",
        description: "SEH appoints PEM(s) for project engineering activities",
        order_index: 2
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P2",
        step_type: "process",
        title: "Designate Lead PEM",
        description: "SEH designates Lead PEM for coordination and communication",
        order_index: 3
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P3",
        step_type: "process",
        title: "Collect Project Details",
        description: "Lead PEM collects project details from BD Team",
        order_index: 4
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P4",
        step_type: "process",
        title: "Create Design Requirements",
        description: "Lead PEM reviews project details and creates Basic Engineering Design Requirements",
        order_index: 5
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P5",
        step_type: "process",
        title: "Review Requirements",
        description: "Lead PEM shares requirements with PEMs for review and feedback",
        order_index: 6
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P6",
        step_type: "process",
        title: "Finalize Requirements",
        description: "Lead PEM finalizes requirements incorporating feedback",
        order_index: 7
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P7",
        step_type: "process",
        title: "Create Project Schedule",
        description: "Lead PEM creates preliminary project schedule and milestone plan",
        order_index: 8
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "End",
        step_type: "end",
        title: "Submit for Approval",
        description: "Lead PEM submits requirements and schedule to SEH for approval",
        order_index: 9
      }
    ];

    // Process map for Chapter 2.1 - Owner's Engineer Finalization
    const processMapChapter21 = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "Start",
        step_type: "start",
        title: "Begin Owner's Engineer Finalization",
        description: "BD Team notifies SEH about bid win to start OE finalization process",
        order_index: 1
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "P1",
        step_type: "process",
        title: "Appoint Project Engineering Managers",
        description: "SEH appoints PEM(s) for project engineering activities",
        order_index: 2
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "P2",
        step_type: "process",
        title: "Designate Lead PEM",
        description: "SEH designates Lead PEM for coordination and communication",
        order_index: 3
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "P3",
        step_type: "process",
        title: "Draft OE Requirements List",
        description: "Lead PEM creates comprehensive OE requirements leveraging design documents",
        order_index: 4
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "P4",
        step_type: "process",
        title: "Review OE Requirements",
        description: "Lead PEM reviews requirements with other PEMs to ensure completeness",
        order_index: 5
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "P5",
        step_type: "process",
        title: "Submit to Procurement",
        description: "Lead PEM shares final requirements with Procurement Lead",
        order_index: 6
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "P6",
        step_type: "process",
        title: "Conduct RFQ Process",
        description: "Procurement Lead executes RFQ and collects responses",
        order_index: 7
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "P7",
        step_type: "process",
        title: "Technical Evaluation",
        description: "Lead PEM evaluates responses and creates shortlist",
        order_index: 8
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "P8",
        step_type: "process",
        title: "Share Shortlist",
        description: "Lead PEM provides shortlist to Procurement Lead",
        order_index: 9
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "P9",
        step_type: "process",
        title: "Final Selection",
        description: "Procurement Lead evaluates and selects final OE",
        order_index: 10
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "P10",
        step_type: "process",
        title: "Notify Selection",
        description: "Procurement Lead notifies Lead PEM of selected OE",
        order_index: 11
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "P11",
        step_type: "process",
        title: "Internal Communication",
        description: "Lead PEM communicates OE selection to team",
        order_index: 12
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-2.1.3",
        step_id: "End",
        step_type: "end",
        title: "Complete OE Finalization",
        description: "Conduct kick-off meeting with selected OE to finalize engagement",
        order_index: 13
      }
    ];

    // Combine all process steps
    const allProcessSteps = [...processStepsChapter1, ...processStepsChapter21];
    const allRaciMatrix = [...raciMatrixChapter1, ...raciMatrixChapter21];
    const allProcessMap = [...processMapChapter1, ...processMapChapter21];

    // Insert process steps
    console.log('Inserting process steps...');
    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(allProcessSteps);

    if (stepsError) {
      console.error('Error inserting process steps:', stepsError);
      throw stepsError;
    }

    // Insert RACI matrix
    console.log('Inserting RACI matrix...');
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(allRaciMatrix);

    if (raciError) {
      console.error('Error inserting RACI matrix:', raciError);
      throw raciError;
    }

    // Insert process map
    console.log('Inserting process map...');
    const { error: mapError } = await supabase
      .from('process_map')
      .insert(allProcessMap);

    if (mapError) {
      console.error('Error inserting process map:', mapError);
      throw mapError;
    }

    console.log('Solar Engineering playbook data seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding Solar Engineering playbook data:', error);
    throw error;
  }
};
