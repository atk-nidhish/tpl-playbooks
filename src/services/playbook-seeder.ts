import { supabase } from '@/integrations/supabase/client';

export const seedOriginalPlaybook = async () => {
  try {
    // Insert the original solar execution playbook
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: 'solar-execution-original',
        title: 'Solar Project Execution Playbook',
        description: 'Comprehensive playbook for solar project execution with detailed process steps and RACI matrices',
        phases: {
          "Phase 1": {
            name: "Phase 1: Project Initiation",
            description: "Initial project setup and planning"
          },
          "Phase 2": {
            name: "Phase 2: Design & Engineering", 
            description: "System design and engineering phase"
          },
          "Phase 3": {
            name: "Phase 3: Implementation",
            description: "Project implementation and execution"
          }
        }
      })
      .select()
      .single();

    if (playbookError) throw playbookError;

    // Seed process steps data (keeping exact original text as requested)
    const processSteps = [
      {
        playbook_id: playbook.id,
        phase_id: "Phase 1",
        step_id: "1.1",
        activity: "Project Kick-off Meeting",
        inputs: ["Contract", "Site Survey", "Customer Requirements"],
        outputs: ["Project Plan", "Timeline", "Resource Allocation"],
        timeline: "Day 1",
        responsible: "Project Manager",
        comments: "Ensure all stakeholders are present and aligned on project scope"
      },
      {
        playbook_id: playbook.id,
        phase_id: "Phase 1", 
        step_id: "1.2",
        activity: "Site Assessment",
        inputs: ["Site Survey", "Engineering Requirements"],
        outputs: ["Site Report", "Technical Specifications"],
        timeline: "Week 1",
        responsible: "Site Engineer",
        comments: "Conduct thorough assessment of site conditions and constraints"
      }
    ];

    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(processSteps);

    if (stepsError) throw stepsError;

    // Seed RACI matrix data
    const raciData = [
      {
        playbook_id: playbook.id,
        phase_id: "Phase 1",
        step_id: "1.1",
        task: "Project Kick-off Meeting",
        responsible: "Project Manager",
        accountable: "Project Director",
        consulted: "Engineering Team",
        informed: "Customer, Operations Team"
      },
      {
        playbook_id: playbook.id,
        phase_id: "Phase 1",
        step_id: "1.2", 
        task: "Site Assessment",
        responsible: "Site Engineer",
        accountable: "Project Manager",
        consulted: "Design Team",
        informed: "Customer, Safety Team"
      }
    ];

    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(raciData);

    if (raciError) throw raciError;

    // Seed process map data
    const processMapData = [
      {
        playbook_id: playbook.id,
        phase_id: "Phase 1",
        step_id: "1.1",
        step_type: "start",
        title: "Project Initiation",
        description: "Begin project with kick-off meeting",
        order_index: 1
      },
      {
        playbook_id: playbook.id,
        phase_id: "Phase 1",
        step_id: "1.2",
        step_type: "process", 
        title: "Site Assessment",
        description: "Evaluate site conditions and requirements",
        order_index: 2
      }
    ];

    const { error: mapError } = await supabase
      .from('process_map')
      .insert(processMapData);

    if (mapError) throw mapError;

    console.log('Original playbook seeded successfully');
    return playbook;

  } catch (error) {
    console.error('Error seeding original playbook:', error);
    throw error;
  }
};

export const processUploadedPlaybook = async (fileName: string) => {
  try {
    // For now, create a placeholder entry for the uploaded playbook
    // In a real implementation, you would parse the PDF content
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: fileName.replace('.pdf', ''),
        title: fileName.replace('.pdf', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: 'Uploaded playbook - content to be processed',
        file_path: `playbooks/${fileName}`,
        phases: {
          "Phase 1": {
            name: "Phase 1: Planning",
            description: "Initial planning phase"
          }
        }
      })
      .select()
      .single();

    if (playbookError) throw playbookError;

    console.log(`Playbook ${fileName} processed successfully`);
    return playbook;

  } catch (error) {
    console.error('Error processing uploaded playbook:', error);
    throw error;
  }
};
