
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

    // Clear existing data for chapters 2 and 3 to avoid duplicates
    await supabase.from('process_steps').delete().eq('playbook_id', PLAYBOOK_ID).in('phase_id', ['chapter-2', 'chapter-3']);
    await supabase.from('raci_matrix').delete().eq('playbook_id', PLAYBOOK_ID).in('phase_id', ['chapter-2', 'chapter-3']);
    await supabase.from('process_map').delete().eq('playbook_id', PLAYBOOK_ID).in('phase_id', ['chapter-2', 'chapter-3']);

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

    // Insert process steps for chapters 2 and 3
    const { error: processStepsError } = await supabase
      .from('process_steps')
      .insert([...chapter2ProcessSteps, ...chapter3ProcessSteps]);

    if (processStepsError) {
      console.error('Error inserting process steps:', processStepsError);
      throw processStepsError;
    }

    // Insert RACI data for chapters 2 and 3
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert([...chapter2RACIData, ...chapter3RACIData]);

    if (raciError) {
      console.error('Error inserting RACI data:', raciError);
      throw raciError;
    }

    // Add process map data for chapters 2 and 3
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

    // Insert process map data
    const { error: processMapError } = await supabase
      .from('process_map')
      .insert([...chapter2ProcessMap, ...chapter3ProcessMap]);

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
