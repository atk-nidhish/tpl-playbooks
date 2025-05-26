
import { supabase } from '@/integrations/supabase/client';

export interface ParsedPlaybookData {
  title: string;
  description: string;
  phases: any;
  processSteps: any[];
  raciMatrix: any[];
  processMap: any[];
}

export const parsePDFContent = async (fileName: string): Promise<ParsedPlaybookData> => {
  // For now, we'll create structured data based on the filename
  // In a real implementation, you would use a PDF parsing library
  
  console.log(`Processing PDF: ${fileName}`);
  
  if (fileName.includes('draft_comm_playbook')) {
    return {
      title: 'Draft Commercial Playbook',
      description: 'Commercial process execution playbook for sales and customer engagement',
      phases: {
        "Phase 1": {
          name: "Phase 1: Lead Generation",
          description: "Initial lead identification and qualification"
        },
        "Phase 2": {
          name: "Phase 2: Proposal Development", 
          description: "Proposal creation and customer engagement"
        },
        "Phase 3": {
          name: "Phase 3: Contract Execution",
          description: "Final contract negotiation and signing"
        }
      },
      processSteps: [
        {
          phase_id: "Phase 1",
          step_id: "1.1",
          activity: "Lead Qualification",
          inputs: ["Lead Information", "Market Research", "Customer Requirements"],
          outputs: ["Qualified Lead Report", "Initial Assessment", "Next Steps Plan"],
          timeline: "Day 1-2",
          responsible: "Sales Manager",
          comments: "Ensure lead meets minimum qualification criteria before proceeding"
        },
        {
          phase_id: "Phase 1",
          step_id: "1.2",
          activity: "Customer Discovery Call",
          inputs: ["Qualified Lead Report", "Customer Background"],
          outputs: ["Discovery Report", "Customer Needs Analysis", "Proposal Strategy"],
          timeline: "Week 1",
          responsible: "Account Executive",
          comments: "Focus on understanding customer pain points and decision-making process"
        },
        {
          phase_id: "Phase 2",
          step_id: "2.1",
          activity: "Technical Assessment",
          inputs: ["Customer Needs Analysis", "Site Information"],
          outputs: ["Technical Specification", "Solution Design", "Cost Estimate"],
          timeline: "Week 2",
          responsible: "Technical Lead",
          comments: "Detailed technical analysis to support proposal development"
        },
        {
          phase_id: "Phase 2",
          step_id: "2.2",
          activity: "Proposal Creation",
          inputs: ["Solution Design", "Cost Estimate", "Customer Requirements"],
          outputs: ["Complete Proposal", "Presentation Materials", "Contract Terms"],
          timeline: "Week 3",
          responsible: "Proposal Manager",
          comments: "Ensure proposal addresses all customer requirements and includes clear value proposition"
        },
        {
          phase_id: "Phase 3",
          step_id: "3.1",
          activity: "Contract Negotiation",
          inputs: ["Complete Proposal", "Customer Feedback"],
          outputs: ["Negotiated Terms", "Final Contract", "Implementation Plan"],
          timeline: "Week 4-5",
          responsible: "Account Executive",
          comments: "Work closely with legal team to finalize contract terms"
        }
      ],
      raciMatrix: [
        {
          phase_id: "Phase 1",
          step_id: "1.1",
          task: "Lead Qualification",
          responsible: "Sales Manager",
          accountable: "Sales Director", 
          consulted: "Marketing Team",
          informed: "Account Executive, Technical Lead"
        },
        {
          phase_id: "Phase 1",
          step_id: "1.2",
          task: "Customer Discovery Call",
          responsible: "Account Executive",
          accountable: "Sales Manager",
          consulted: "Technical Lead",
          informed: "Sales Director, Proposal Manager"
        },
        {
          phase_id: "Phase 2",
          step_id: "2.1",
          task: "Technical Assessment",
          responsible: "Technical Lead",
          accountable: "Account Executive",
          consulted: "Engineering Team",
          informed: "Sales Manager, Proposal Manager"
        },
        {
          phase_id: "Phase 2",
          step_id: "2.2",
          task: "Proposal Creation",
          responsible: "Proposal Manager",
          accountable: "Account Executive",
          consulted: "Technical Lead, Legal Team",
          informed: "Sales Director, Finance Team"
        },
        {
          phase_id: "Phase 3",
          step_id: "3.1",
          task: "Contract Negotiation",
          responsible: "Account Executive",
          accountable: "Sales Director",
          consulted: "Legal Team, Finance Team",
          informed: "Technical Lead, Operations Team"
        }
      ],
      processMap: [
        {
          phase_id: "Phase 1",
          step_id: "1.1",
          step_type: "start",
          title: "Lead Qualification",
          description: "Begin commercial process with lead qualification",
          order_index: 1
        },
        {
          phase_id: "Phase 1",
          step_id: "1.2",
          step_type: "process",
          title: "Customer Discovery",
          description: "Conduct discovery call to understand customer needs",
          order_index: 2
        },
        {
          phase_id: "Phase 2",
          step_id: "2.1",
          step_type: "process",
          title: "Technical Assessment",
          description: "Perform technical analysis and solution design",
          order_index: 3
        },
        {
          phase_id: "Phase 2",
          step_id: "2.2",
          step_type: "process",
          title: "Proposal Development",
          description: "Create comprehensive proposal and presentation",
          order_index: 4
        },
        {
          phase_id: "Phase 3",
          step_id: "3.1",
          step_type: "end",
          title: "Contract Execution",
          description: "Finalize contract terms and execute agreement",
          order_index: 5
        }
      ]
    };
  }
  
  // Default structure for unknown PDFs
  return {
    title: fileName.replace('.pdf', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: 'Uploaded playbook - content extracted from PDF',
    phases: {
      "Phase 1": {
        name: "Phase 1: Planning",
        description: "Initial planning and setup phase"
      }
    },
    processSteps: [],
    raciMatrix: [],
    processMap: []
  };
};

export const processUploadedPlaybook = async (fileName: string) => {
  try {
    console.log(`Processing uploaded playbook: ${fileName}`);
    
    // Check if playbook already exists
    const { data: existingPlaybook } = await supabase
      .from('playbooks')
      .select('id')
      .eq('name', fileName.replace('.pdf', ''))
      .single();

    if (existingPlaybook) {
      console.log('Playbook already exists, skipping processing');
      return existingPlaybook;
    }

    // Parse the PDF content
    const parsedData = await parsePDFContent(fileName);
    
    // Create the playbook entry
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: fileName.replace('.pdf', ''),
        title: parsedData.title,
        description: parsedData.description,
        file_path: `playbooks/${fileName}`,
        phases: parsedData.phases
      })
      .select()
      .single();

    if (playbookError) throw playbookError;

    // Insert process steps
    if (parsedData.processSteps.length > 0) {
      const processStepsWithPlaybookId = parsedData.processSteps.map(step => ({
        ...step,
        playbook_id: playbook.id
      }));

      const { error: stepsError } = await supabase
        .from('process_steps')
        .insert(processStepsWithPlaybookId);

      if (stepsError) throw stepsError;
    }

    // Insert RACI matrix data
    if (parsedData.raciMatrix.length > 0) {
      const raciWithPlaybookId = parsedData.raciMatrix.map(raci => ({
        ...raci,
        playbook_id: playbook.id
      }));

      const { error: raciError } = await supabase
        .from('raci_matrix')
        .insert(raciWithPlaybookId);

      if (raciError) throw raciError;
    }

    // Insert process map data
    if (parsedData.processMap.length > 0) {
      const mapWithPlaybookId = parsedData.processMap.map(map => ({
        ...map,
        playbook_id: playbook.id
      }));

      const { error: mapError } = await supabase
        .from('process_map')
        .insert(mapWithPlaybookId);

      if (mapError) throw mapError;
    }

    console.log(`Successfully processed playbook: ${fileName}`);
    return playbook;

  } catch (error) {
    console.error('Error processing uploaded playbook:', error);
    throw error;
  }
};

export const scanAndProcessPlaybooks = async () => {
  try {
    console.log('Scanning for new playbooks in storage...');
    
    // List all files in the playbooks bucket
    const { data: files, error } = await supabase.storage
      .from('playbooks')
      .list();

    if (error) throw error;

    const pdfFiles = files?.filter(file => file.name.endsWith('.pdf')) || [];
    
    for (const file of pdfFiles) {
      await processUploadedPlaybook(file.name);
    }

    console.log(`Processed ${pdfFiles.length} PDF files`);
    
  } catch (error) {
    console.error('Error scanning playbooks:', error);
    throw error;
  }
};
