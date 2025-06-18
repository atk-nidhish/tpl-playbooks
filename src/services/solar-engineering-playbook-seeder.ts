
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

    // Process steps for Chapter 1 - Basic Engineering Design Preparation (from screenshots)
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

    // RACI matrix for Chapter 1 - Basic Engineering Design Preparation (from screenshots)
    const raciMatrixChapter1 = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "S",
        task: "Share Bid Summary with Solar Engineering Head (SEH) & request for the development of Basic Engineering Design",
        responsible: "Bid Incharge",
        accountable: "Bid Incharge",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P1",
        task: "Appoint Engineering Manager (EM) for the preparation of Basic Engineering Design & share Bid Summary",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "EM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P2",
        task: "Analyze Bid Summary to define basic engineering design requirements",
        responsible: "EM",
        accountable: "EM",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P3",
        task: "Develop Basic Engineering Design by leveraging Basic Engineering Design Library",
        responsible: "EM",
        accountable: "EM",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P4",
        task: "Define Guaranteed Technical Particulars (GTP)",
        responsible: "EM",
        accountable: "",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P5",
        task: "Draft preliminary Bill of Quantities (BoQ) & Bill of Services (BoS)",
        responsible: "EM",
        accountable: "",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P6",
        task: "Submit the prepared outputs (Basic Engineering Design, GTP and Preliminary BoQ and BoS) to SEH for review and approval",
        responsible: "EM",
        accountable: "EM",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P7",
        task: "Review the outputs received and recommend modifications or approve",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "EM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P8",
        task: "Implement the recommended modifications and reshare the revised outputs for approval",
        responsible: "EM",
        accountable: "EM",
        consulted: "",
        informed: "SEH"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P9",
        task: "Seek further review and approval from MD on the outputs",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "MD",
        informed: "MD"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P10",
        task: "If MD recommends any modifications, notify the required changes to EM. Incorporate the changes recommended by MD and share the finalized outputs with SEH",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "EM"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "P11",
        task: "Share the final outputs with Bid Incharge for submission. Share preliminary BoQ & BoS with Procurement Lead for procurement cost estimation",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: "Procurement Lead"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.1",
        step_id: "E",
        task: "Archive final design documents in Engineering Library",
        responsible: "SEH",
        accountable: "SEH",
        consulted: "",
        informed: ""
      }
    ];

    // Process map for Chapter 1 - Basic Engineering Design Preparation (using the process map image)
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

    // Insert process steps with error handling
    console.log('Inserting process steps...');
    for (const step of processStepsChapter1) {
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
    for (const raci of raciMatrixChapter1) {
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
    for (const mapStep of processMapChapter1) {
      const { error } = await supabase
        .from('process_map')
        .insert(mapStep);

      if (error) {
        console.error('Error inserting process map step:', error);
        throw error;
      }
    }

    console.log('Solar Engineering playbook Chapter 1 data seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding Solar Engineering playbook data:', error);
    throw error;
  }
};
