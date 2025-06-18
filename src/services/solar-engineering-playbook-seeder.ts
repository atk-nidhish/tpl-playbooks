
import { supabase } from "@/integrations/supabase/client";

export const seedSolarEngineeringData = async () => {
  console.log('Starting Solar Engineering playbook data seeding...');
  
  // Use the proper UUID for the playbook_id that matches the database
  const PLAYBOOK_ID = "550e8400-e29b-41d4-a716-446655440001";
  
  try {
    // Clear existing data for this playbook
    console.log('Clearing existing Solar Engineering data...');
    await supabase.from('process_steps').delete().eq('playbook_id', PLAYBOOK_ID);
    await supabase.from('raci_matrix').delete().eq('playbook_id', PLAYBOOK_ID);
    await supabase.from('process_map').delete().eq('playbook_id', PLAYBOOK_ID);

    // Process steps for Chapter 1 - Basic Engineering Design Preparation (from images)
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

    // RACI matrix for Chapter 1 - Basic Engineering Design Preparation (from images)
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

    // Process map for Chapter 1 - Basic Engineering Design Preparation (from images)
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

    // Insert process steps
    console.log('Inserting process steps...');
    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(processStepsChapter1);

    if (stepsError) {
      console.error('Error inserting process steps:', stepsError);
      throw stepsError;
    }

    // Insert RACI matrix
    console.log('Inserting RACI matrix...');
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciMatrixChapter1);

    if (raciError) {
      console.error('Error inserting RACI matrix:', raciError);
      throw raciError;
    }

    // Insert process map
    console.log('Inserting process map...');
    const { error: mapError } = await supabase
      .from('process_map')
      .insert(processMapChapter1);

    if (mapError) {
      console.error('Error inserting process map:', mapError);
      throw mapError;
    }

    console.log('Solar Engineering playbook Chapter 1 data seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding Solar Engineering playbook data:', error);
    throw error;
  }
};
