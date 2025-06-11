
import { supabase } from "@/integrations/supabase/client";

const PLAYBOOK_ID = "a1b2c3d4-e5f6-7890-abcd-123456789012";

export const seedPlanningWindData = async () => {
  console.log('Starting to seed Planning - Wind playbook data...');
  
  try {
    // Check if playbook exists, if not create it
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id')
      .eq('id', PLAYBOOK_ID)
      .single();

    if (!existingPlaybook) {
      console.log('Creating Planning - Wind playbook...');
      const { data: newPlaybook, error: playbookError } = await supabase
        .from('playbooks')
        .insert({
          id: PLAYBOOK_ID,
          name: "planning-wind",
          title: "Planning - Wind",
          description: "Wind Project Planning Playbook"
        })
        .select()
        .single();

      if (playbookError) {
        console.error('Error creating playbook:', playbookError);
        throw playbookError;
      }
      console.log('Planning - Wind playbook created successfully:', newPlaybook);
    }

    // Clear existing data for section 1.3 to avoid duplicates
    await supabase.from('process_steps').delete().eq('playbook_id', PLAYBOOK_ID).eq('phase_id', 'section-1.3');
    await supabase.from('raci_matrix').delete().eq('playbook_id', PLAYBOOK_ID).eq('phase_id', 'section-1.3');
    await supabase.from('process_map').delete().eq('playbook_id', PLAYBOOK_ID).eq('phase_id', 'section-1.3');

    // Section 1.3: Land Finalization Plan - Process Steps
    const section13ProcessSteps = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "S",
        activity: "Project Planner (PP) shares the required schedules / Plans with Land Head (LH), and requests them to initiate the development of Land Finalization Plan (LFP) – Project Schedule (PS) and Project Execution Approach (PEA)",
        inputs: ["PS", "PEA (includes scope matrix)"],
        outputs: [],
        timeline: "-",
        responsible: "Project Planner",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P1",
        activity: "Land Head (LH) reviews the Project Schedule and Project Execution Approach to identify land requirement for the project",
        inputs: [],
        outputs: [],
        timeline: "0.5",
        responsible: "Land Head",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P2",
        activity: "LH appoints a Land Manager (LM) for the project",
        inputs: [],
        outputs: [],
        timeline: "0.5",
        responsible: "Land Head",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P3",
        activity: "Land Manager, in consultation with Land Head, refers to 'Master Plan for Land Finalization – Wind' and makes necessary adjustments to align it with the project's scope and requirements",
        inputs: ["Master Plan for Land Finalization - Wind"],
        outputs: ["Preliminary LFP"],
        timeline: "1",
        responsible: "Land Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P4",
        activity: "LM incorporates timelines into LFP - Land Manager identifies the timelines and criticalities of land finalization by reviewing Project Schedule and Project Execution Approach",
        inputs: ["PS", "PEA (includes scope matrix)"],
        outputs: [],
        timeline: "",
        responsible: "Land Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P5",
        activity: "LM, in consultation with LH, identifies various requirements/ pre-requisites to be fulfilled for land finalization. Documents required for land finalization, Pre-requisites or conditions that must be satisfied before land is finalized, Cost associated with land finalization, Duration or estimated time for land finalization, Risks associated with land finalization, Land finalization considerations, requirements the land owners mandate before finalizing the land, Management action Plan for the process. Land Manager leverages Master Plan for Land Finalization to identify the above",
        inputs: [],
        outputs: [],
        timeline: "1",
        responsible: "Land Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P6",
        activity: "For each land finalization activity required, Land Manager identifies a PoC across function teams, whose work would be impacted by delay in land finalization. - Land Manager may consult functional leads to identify PoC",
        inputs: [],
        outputs: [],
        timeline: "0.5",
        responsible: "Land Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P7",
        activity: "LM, in consultation with the LH, prepares the final LFP, which includes – Documentation, pre-requisites, costs, land finalization timelines, risks, and land finalization considerations, A clear action Plan for land finalization, Identification of PoC whose work will be impacted in case of any delay",
        inputs: [],
        outputs: [],
        timeline: "1",
        responsible: "Land Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P8",
        activity: "Land Manager seeks review and approval (approval via formal sign-off) for LFP from Land Head",
        inputs: [],
        outputs: [],
        timeline: "1",
        responsible: "Land Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P9",
        activity: "If changes are required, Land Manager incorporates the feedback and reshares LFP with Land Head for approval. If no changes are required, Land Manager finalizes LFP",
        inputs: [],
        outputs: ["LFP (Template Provided)"],
        timeline: "",
        responsible: "Land Manager",
        comments: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "E",
        activity: "Land Manager shares the LFP with Project Planner for cross-functional coordination",
        inputs: [],
        outputs: [],
        timeline: "Total – 5 – 6 days",
        responsible: "Land Manager",
        comments: ""
      }
    ];

    // Section 1.3: RACI Matrix
    const section13RACIData = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "S",
        task: "Share required Plans/schedules with Land Head (LH), for the development of Land Finalization Plan (LFP)",
        responsible: "Project Planner",
        accountable: "",
        consulted: "Land Head",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P1",
        task: "Review the Project Schedule and Project Execution Approach to identify land requirement for the project",
        responsible: "Land Head",
        accountable: "",
        consulted: "",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P2",
        task: "Appoint a Land Manager for the project",
        responsible: "Land Head",
        accountable: "Land Head",
        consulted: "",
        informed: "Land Manager"
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P3",
        task: "Develop LFP, leveraging the Master Plan for Land Finalization – Wind",
        responsible: "Land Manager",
        accountable: "",
        consulted: "Land Head",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P4",
        task: "Incorporate timeline for land finalization in LFP by reviewing Project Schedule and Project Execution Approach",
        responsible: "Land Manager",
        accountable: "",
        consulted: "Land Head",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P5",
        task: "Identify requirements/ pre-requisites to be fulfilled for land finalization, leveraging Master Plan for Land Finalization",
        responsible: "Land Manager",
        accountable: "",
        consulted: "Land Head",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P6",
        task: "Identify PoC within functional teams whose work would be impacted by delay in land finalization",
        responsible: "Land Manager",
        accountable: "",
        consulted: "Cost Controller",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P7",
        task: "Prepare the final LFP, detailing documentation, pre-requisites, costs, land finalization timelines, risks, land finalization considerations, and PoC for each land finalization activity (as done in P6)",
        responsible: "Land Manager",
        accountable: "Land Manager",
        consulted: "Land Head",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P8",
        task: "Seek review and approval (approval via formal sign-off) for LFP from Land Head",
        responsible: "Land Manager",
        accountable: "Land Manager",
        consulted: "Land Head",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P9",
        task: "Incorporate changes to LFP basis feedback received and reapply for approval from Land Head to finalize LFP",
        responsible: "Land Manager",
        accountable: "Land Manager",
        consulted: "Land Head",
        informed: ""
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "E",
        task: "Share final LFP with Project Planner for cross-functional coordination",
        responsible: "Land Manager",
        accountable: "",
        consulted: "",
        informed: "Project Planner"
      }
    ];

    // Section 1.3: Process Map
    const section13ProcessMap = [
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "S",
        step_type: "start",
        title: "Share Required Plans",
        description: "Project Planner shares PS and PEA with Land Head",
        order_index: 1
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P1",
        step_type: "process",
        title: "Review Land Requirements",
        description: "Land Head identifies project land requirements",
        order_index: 2
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P2",
        step_type: "process",
        title: "Appoint Land Manager",
        description: "Land Head assigns Land Manager for project",
        order_index: 3
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P3",
        step_type: "process",
        title: "Develop Preliminary LFP",
        description: "Leverage Master Plan for Land Finalization",
        order_index: 4
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P4",
        step_type: "process",
        title: "Incorporate Timelines",
        description: "Identify criticalities and timeline requirements",
        order_index: 5
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P5",
        step_type: "process",
        title: "Identify Requirements",
        description: "Document land finalization prerequisites and costs",
        order_index: 6
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P6",
        step_type: "process",
        title: "Identify PoC",
        description: "Determine impact on functional teams",
        order_index: 7
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P7",
        step_type: "process",
        title: "Prepare Final LFP",
        description: "Complete documentation and action plans",
        order_index: 8
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P8",
        step_type: "process",
        title: "Seek Approval",
        description: "Review and approval from Land Head",
        order_index: 9
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "P9",
        step_type: "milestone",
        title: "Finalize LFP",
        description: "Incorporate feedback and finalize",
        order_index: 10
      },
      {
        playbook_id: PLAYBOOK_ID,
        phase_id: "section-1.3",
        step_id: "E",
        step_type: "end",
        title: "Share Final LFP",
        description: "Coordinate with Project Planner",
        order_index: 11
      }
    ];

    // Insert process steps for section 1.3
    const { error: processStepsError } = await supabase
      .from('process_steps')
      .insert(section13ProcessSteps);

    if (processStepsError) {
      console.error('Error inserting process steps:', processStepsError);
      throw processStepsError;
    }

    // Insert RACI data for section 1.3
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(section13RACIData);

    if (raciError) {
      console.error('Error inserting RACI data:', raciError);
      throw raciError;
    }

    // Insert process map data for section 1.3
    const { error: processMapError } = await supabase
      .from('process_map')
      .insert(section13ProcessMap);

    if (processMapError) {
      console.error('Error inserting process map data:', processMapError);
      throw processMapError;
    }

    console.log('Planning - Wind playbook section 1.3 data seeded successfully!');
  } catch (error) {
    console.error('Error seeding Planning - Wind playbook data:', error);
    throw error;
  }
};
