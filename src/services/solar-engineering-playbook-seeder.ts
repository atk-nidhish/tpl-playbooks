
import { supabase } from "@/integrations/supabase/client";

export const seedSolarEngineeringData = async () => {
  console.log('Starting Solar Engineering playbook data seeding...');
  
  const PLAYBOOK_ID = "solar-engineering-2024";
  
  try {
    // Clear existing data for this playbook
    console.log('Clearing existing Solar Engineering data...');
    await supabase.from('process_steps').delete().eq('playbook_id', PLAYBOOK_ID);
    await supabase.from('raci_matrix').delete().eq('playbook_id', PLAYBOOK_ID);
    await supabase.from('process_map').delete().eq('playbook_id', PLAYBOOK_ID);

    // Sample process steps for Chapter 1
    const processSteps = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-1",
        step_id: "P1",
        activity: "Initiate Basic Engineering Design Process",
        inputs: ["Project requirements", "Site survey data", "Preliminary design specifications"],
        outputs: ["Basic engineering design initiation document", "Project scope definition"],
        timeline: "2-3 days",
        responsible: "Engineering Team Lead",
        comments: "Foundation step for all subsequent engineering activities"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-1",
        step_id: "P2",
        activity: "Develop Preliminary System Layout",
        inputs: ["Site survey data", "Technical specifications", "Regulatory requirements"],
        outputs: ["Preliminary system layout", "Equipment specifications"],
        timeline: "1-2 weeks",
        responsible: "Design Engineer",
        comments: "Critical for determining overall project feasibility"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-1",
        step_id: "P3",
        activity: "Conduct Technical Review",
        inputs: ["Preliminary design", "Stakeholder requirements", "Technical standards"],
        outputs: ["Technical review report", "Design recommendations"],
        timeline: "3-5 days",
        responsible: "Senior Engineer",
        comments: "Ensures design meets all technical and regulatory standards"
      }
    ];

    // Sample RACI matrix for Chapter 1
    const raciMatrix = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-1",
        step_id: "P1",
        task: "Initiate Basic Engineering Design Process",
        responsible: "Engineering Team Lead",
        accountable: "Project Manager",
        consulted: "Technical Consultant",
        informed: "Client Representative"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-1",
        step_id: "P2",
        task: "Develop Preliminary System Layout",
        responsible: "Design Engineer",
        accountable: "Engineering Team Lead",
        consulted: "Site Survey Team",
        informed: "Project Manager"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-1",
        step_id: "P3",
        task: "Conduct Technical Review",
        responsible: "Senior Engineer",
        accountable: "Engineering Team Lead",
        consulted: "External Technical Expert",
        informed: "Client Representative"
      }
    ];

    // Sample process map for Chapter 1
    const processMap = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-1",
        step_id: "Start",
        step_type: "start",
        title: "Begin Basic Engineering Design",
        description: "Start the basic engineering design preparation process",
        order_index: 1
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-1",
        step_id: "P1",
        step_type: "process",
        title: "Initiate Design Process",
        description: "Initiate and plan the basic engineering design activities",
        order_index: 2
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-1",
        step_id: "P2",
        step_type: "process",
        title: "Develop Layout",
        description: "Create preliminary system layout and specifications",
        order_index: 3
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-1",
        step_id: "P3",
        step_type: "process",
        title: "Technical Review",
        description: "Conduct comprehensive technical review of the design",
        order_index: 4
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "chapter-1",
        step_id: "End",
        step_type: "end",
        title: "Complete Basic Engineering Design",
        description: "Finalize basic engineering design preparation phase",
        order_index: 5
      }
    ];

    // Insert process steps
    console.log('Inserting process steps...');
    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(processSteps);

    if (stepsError) {
      console.error('Error inserting process steps:', stepsError);
      throw stepsError;
    }

    // Insert RACI matrix
    console.log('Inserting RACI matrix...');
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciMatrix);

    if (raciError) {
      console.error('Error inserting RACI matrix:', raciError);
      throw raciError;
    }

    // Insert process map
    console.log('Inserting process map...');
    const { error: mapError } = await supabase
      .from('process_map')
      .insert(processMap);

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
