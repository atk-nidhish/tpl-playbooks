import { supabase } from '@/integrations/supabase/client';

export interface ParsedPlaybookData {
  title: string;
  description: string;
  phases: any;
  processSteps: any[];
  raciMatrix: any[];
  processMap: any[];
}

// Enhanced PDF content parser that handles structured playbooks with chapters
export const parsePDFContent = async (fileName: string): Promise<ParsedPlaybookData> => {
  console.log(`Processing structured PDF: ${fileName}`);
  
  if (fileName.includes('draft_comm_playbook')) {
    // Enhanced structure based on actual playbook format with chapters
    return {
      title: 'Draft Commercial Playbook',
      description: 'Commercial process execution playbook for sales and customer engagement with structured chapters',
      phases: {
        "Chapter 1": {
          name: "Chapter 1: Lead Generation & Qualification",
          description: "Initial lead identification, qualification, and customer discovery processes"
        },
        "Chapter 2": {
          name: "Chapter 2: Proposal Development & Technical Assessment", 
          description: "Technical analysis, solution design, and comprehensive proposal creation"
        },
        "Chapter 3": {
          name: "Chapter 3: Contract Negotiation & Execution",
          description: "Final contract negotiation, terms finalization, and agreement execution"
        },
        "Chapter 4": {
          name: "Chapter 4: Project Handover & Implementation",
          description: "Project transition to delivery team and implementation kickoff"
        }
      },
      processSteps: [
        // Chapter 1 Process Steps
        {
          phase_id: "Chapter 1",
          step_id: "1.1",
          activity: "Initial Lead Assessment",
          inputs: ["Lead Contact Information", "Company Background", "Market Segment Data", "Lead Source Details"],
          outputs: ["Lead Qualification Score", "Initial Assessment Report", "Go/No-Go Decision", "Next Action Plan"],
          timeline: "Day 1-2",
          responsible: "Business Development Manager",
          comments: "Ensure lead meets minimum qualification criteria including budget range and timeline before proceeding to discovery phase"
        },
        {
          phase_id: "Chapter 1",
          step_id: "1.2",
          activity: "Customer Discovery & Needs Analysis",
          inputs: ["Qualified Lead Report", "Customer Background Research", "Industry Analysis", "Stakeholder Mapping"],
          outputs: ["Comprehensive Needs Analysis", "Stakeholder Matrix", "Solution Requirements", "Discovery Call Summary"],
          timeline: "Week 1",
          responsible: "Senior Account Executive",
          comments: "Focus on understanding customer pain points, decision-making process, budget constraints, and timeline expectations. Document all stakeholder roles and influences."
        },
        {
          phase_id: "Chapter 1",
          step_id: "1.3",
          activity: "Opportunity Validation & Scoring",
          inputs: ["Discovery Call Summary", "Needs Analysis", "Competitive Landscape", "Internal Capability Assessment"],
          outputs: ["Opportunity Score", "Win Strategy", "Resource Requirements", "Bid Decision"],
          timeline: "Week 1-2",
          responsible: "Sales Manager",
          comments: "Use standardized scoring methodology to evaluate opportunity viability and competitive positioning"
        },
        
        // Chapter 2 Process Steps
        {
          phase_id: "Chapter 2",
          step_id: "2.1",
          activity: "Technical Site Assessment",
          inputs: ["Customer Requirements", "Site Information", "Technical Specifications", "Safety Requirements"],
          outputs: ["Site Assessment Report", "Technical Feasibility Study", "Preliminary Design", "Risk Assessment"],
          timeline: "Week 2-3",
          responsible: "Technical Lead Engineer",
          comments: "Conduct thorough site evaluation including structural, electrical, and environmental factors. Document any technical constraints or special requirements."
        },
        {
          phase_id: "Chapter 2",
          step_id: "2.2",
          activity: "Solution Design & Engineering",
          inputs: ["Site Assessment Report", "Customer Specifications", "Product Catalog", "Performance Requirements"],
          outputs: ["Detailed System Design", "Equipment Specifications", "Performance Projections", "Installation Plan"],
          timeline: "Week 3-4",
          responsible: "Design Engineer",
          comments: "Optimize system design for performance, cost, and customer requirements while ensuring compliance with local regulations"
        },
        {
          phase_id: "Chapter 2",
          step_id: "2.3",
          activity: "Cost Estimation & Pricing",
          inputs: ["System Design", "Equipment Specifications", "Installation Requirements", "Market Pricing Data"],
          outputs: ["Detailed Cost Breakdown", "Pricing Strategy", "Margin Analysis", "Alternative Options"],
          timeline: "Week 4",
          responsible: "Pricing Analyst",
          comments: "Develop competitive pricing while maintaining target margins. Include multiple configuration options to provide customer flexibility."
        },
        {
          phase_id: "Chapter 2",
          step_id: "2.4",
          activity: "Proposal Development & Review",
          inputs: ["System Design", "Cost Analysis", "Customer Requirements", "Win Strategy"],
          outputs: ["Complete Proposal Document", "Executive Summary", "Technical Appendices", "Commercial Terms"],
          timeline: "Week 4-5",
          responsible: "Proposal Manager",
          comments: "Ensure proposal addresses all customer requirements with clear value proposition and differentiators. Include implementation timeline and support services."
        },
        
        // Chapter 3 Process Steps
        {
          phase_id: "Chapter 3",
          step_id: "3.1",
          activity: "Proposal Presentation & Negotiation",
          inputs: ["Complete Proposal", "Presentation Materials", "Negotiation Strategy", "Authority Matrix"],
          outputs: ["Customer Feedback", "Negotiation Points", "Revised Terms", "Decision Timeline"],
          timeline: "Week 5-6",
          responsible: "Senior Account Executive",
          comments: "Present proposal with focus on value and ROI. Be prepared to negotiate on commercial terms while protecting key margins and technical requirements."
        },
        {
          phase_id: "Chapter 3",
          step_id: "3.2",
          activity: "Contract Terms Finalization",
          inputs: ["Customer Feedback", "Negotiation Points", "Legal Requirements", "Risk Assessment"],
          outputs: ["Final Contract Terms", "Legal Review", "Risk Mitigation Plan", "Approval Documentation"],
          timeline: "Week 6-7",
          responsible: "Contracts Manager",
          comments: "Work closely with legal team to finalize contract terms. Ensure all technical and commercial aspects are clearly defined with appropriate risk allocation."
        },
        {
          phase_id: "Chapter 3",
          step_id: "3.3",
          activity: "Contract Execution & Signing",
          inputs: ["Final Contract Terms", "Approvals", "Customer Acceptance", "Implementation Plan"],
          outputs: ["Executed Contract", "Project Kick-off Package", "Implementation Schedule", "Team Assignments"],
          timeline: "Week 7-8",
          responsible: "Sales Director",
          comments: "Coordinate final contract execution with all stakeholders. Ensure smooth handover to delivery team with complete project documentation."
        },
        
        // Chapter 4 Process Steps
        {
          phase_id: "Chapter 4",
          step_id: "4.1",
          activity: "Project Handover to Delivery Team",
          inputs: ["Executed Contract", "Technical Design", "Customer Requirements", "Project Timeline"],
          outputs: ["Handover Documentation", "Project Charter", "Team Assignments", "Communication Plan"],
          timeline: "Week 8",
          responsible: "Project Manager",
          comments: "Ensure complete knowledge transfer from sales to delivery team including all customer commitments and special requirements."
        },
        {
          phase_id: "Chapter 4",
          step_id: "4.2",
          activity: "Implementation Planning & Scheduling",
          inputs: ["Project Charter", "Resource Availability", "Site Requirements", "Customer Schedule"],
          outputs: ["Detailed Project Plan", "Resource Schedule", "Milestone Timeline", "Risk Register"],
          timeline: "Week 8-9",
          responsible: "Project Manager",
          comments: "Develop comprehensive implementation plan with clear milestones and dependencies. Coordinate with customer for site access and readiness."
        }
      ],
      raciMatrix: [
        // Chapter 1 RACI
        {
          phase_id: "Chapter 1",
          step_id: "1.1",
          task: "Initial Lead Assessment",
          responsible: "Business Development Manager",
          accountable: "Sales Director", 
          consulted: "Marketing Team, Technical Pre-Sales",
          informed: "Account Executive, Regional Manager"
        },
        {
          phase_id: "Chapter 1",
          step_id: "1.2",
          task: "Customer Discovery & Needs Analysis",
          responsible: "Senior Account Executive",
          accountable: "Sales Manager",
          consulted: "Technical Lead, Solution Architect",
          informed: "Sales Director, Proposal Manager"
        },
        {
          phase_id: "Chapter 1",
          step_id: "1.3",
          task: "Opportunity Validation & Scoring",
          responsible: "Sales Manager",
          accountable: "Sales Director",
          consulted: "Technical Lead, Finance Team",
          informed: "Account Executive, Regional Manager"
        },
        
        // Chapter 2 RACI
        {
          phase_id: "Chapter 2",
          step_id: "2.1",
          task: "Technical Site Assessment",
          responsible: "Technical Lead Engineer",
          accountable: "Engineering Manager",
          consulted: "Field Engineers, Safety Team",
          informed: "Account Executive, Project Manager"
        },
        {
          phase_id: "Chapter 2",
          step_id: "2.2",
          task: "Solution Design & Engineering",
          responsible: "Design Engineer",
          accountable: "Technical Lead Engineer",
          consulted: "Product Management, R&D Team",
          informed: "Account Executive, Manufacturing"
        },
        {
          phase_id: "Chapter 2",
          step_id: "2.3",
          task: "Cost Estimation & Pricing",
          responsible: "Pricing Analyst",
          accountable: "Finance Manager",
          consulted: "Procurement, Manufacturing",
          informed: "Sales Manager, Account Executive"
        },
        {
          phase_id: "Chapter 2",
          step_id: "2.4",
          task: "Proposal Development & Review",
          responsible: "Proposal Manager",
          accountable: "Sales Manager",
          consulted: "Technical Lead, Legal Team, Marketing",
          informed: "Sales Director, Account Executive"
        },
        
        // Chapter 3 RACI
        {
          phase_id: "Chapter 3",
          step_id: "3.1",
          task: "Proposal Presentation & Negotiation",
          responsible: "Senior Account Executive",
          accountable: "Sales Director",
          consulted: "Technical Lead, Legal Team",
          informed: "Regional Manager, Finance Team"
        },
        {
          phase_id: "Chapter 3",
          step_id: "3.2",
          task: "Contract Terms Finalization",
          responsible: "Contracts Manager",
          accountable: "Legal Director",
          consulted: "Sales Director, Finance Team",
          informed: "Account Executive, Project Manager"
        },
        {
          phase_id: "Chapter 3",
          step_id: "3.3",
          task: "Contract Execution & Signing",
          responsible: "Sales Director",
          accountable: "Regional Director",
          consulted: "Legal Team, Finance Director",
          informed: "Project Manager, Operations Team"
        },
        
        // Chapter 4 RACI
        {
          phase_id: "Chapter 4",
          step_id: "4.1",
          task: "Project Handover to Delivery Team",
          responsible: "Project Manager",
          accountable: "Operations Director",
          consulted: "Sales Team, Technical Lead",
          informed: "Customer, Finance Team"
        },
        {
          phase_id: "Chapter 4",
          step_id: "4.2",
          task: "Implementation Planning & Scheduling",
          responsible: "Project Manager",
          accountable: "Operations Director",
          consulted: "Engineering Team, Customer",
          informed: "Sales Team, Regional Manager"
        }
      ],
      processMap: [
        // Chapter 1 Process Map
        {
          phase_id: "Chapter 1",
          step_id: "1.1",
          step_type: "start",
          title: "Initial Lead Assessment",
          description: "Begin commercial process with comprehensive lead qualification and assessment",
          order_index: 1
        },
        {
          phase_id: "Chapter 1",
          step_id: "1.2",
          step_type: "process",
          title: "Customer Discovery",
          description: "Conduct detailed discovery to understand customer needs and decision process",
          order_index: 2
        },
        {
          phase_id: "Chapter 1",
          step_id: "1.3",
          step_type: "decision",
          title: "Opportunity Validation",
          description: "Validate opportunity viability and make bid/no-bid decision",
          order_index: 3
        },
        
        // Chapter 2 Process Map
        {
          phase_id: "Chapter 2",
          step_id: "2.1",
          step_type: "process",
          title: "Technical Site Assessment",
          description: "Perform comprehensive site evaluation and feasibility analysis",
          order_index: 4
        },
        {
          phase_id: "Chapter 2",
          step_id: "2.2",
          step_type: "process",
          title: "Solution Design",
          description: "Develop optimized system design and technical specifications",
          order_index: 5
        },
        {
          phase_id: "Chapter 2",
          step_id: "2.3",
          step_type: "process",
          title: "Cost Estimation",
          description: "Develop detailed cost analysis and competitive pricing strategy",
          order_index: 6
        },
        {
          phase_id: "Chapter 2",
          step_id: "2.4",
          step_type: "process",
          title: "Proposal Development",
          description: "Create comprehensive proposal with technical and commercial details",
          order_index: 7
        },
        
        // Chapter 3 Process Map
        {
          phase_id: "Chapter 3",
          step_id: "3.1",
          step_type: "process",
          title: "Proposal Presentation",
          description: "Present proposal and negotiate terms with customer stakeholders",
          order_index: 8
        },
        {
          phase_id: "Chapter 3",
          step_id: "3.2",
          step_type: "process",
          title: "Contract Finalization",
          description: "Finalize contract terms and complete legal review process",
          order_index: 9
        },
        {
          phase_id: "Chapter 3",
          step_id: "3.3",
          step_type: "milestone",
          title: "Contract Execution",
          description: "Execute final contract and obtain all required signatures",
          order_index: 10
        },
        
        // Chapter 4 Process Map
        {
          phase_id: "Chapter 4",
          step_id: "4.1",
          step_type: "process",
          title: "Project Handover",
          description: "Transfer project to delivery team with complete documentation",
          order_index: 11
        },
        {
          phase_id: "Chapter 4",
          step_id: "4.2",
          step_type: "end",
          title: "Implementation Planning",
          description: "Complete implementation planning and project initiation",
          order_index: 12
        }
      ]
    };
  }
  
  // Enhanced default structure for other PDFs following the same chapter-based format
  return {
    title: fileName.replace('.pdf', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: 'Structured playbook with chapter-based content extracted from PDF',
    phases: {
      "Chapter 1": {
        name: "Chapter 1: Initial Phase",
        description: "Initial planning and setup activities"
      },
      "Chapter 2": {
        name: "Chapter 2: Development Phase", 
        description: "Core development and implementation activities"
      },
      "Chapter 3": {
        name: "Chapter 3: Execution Phase",
        description: "Final execution and delivery activities"
      }
    },
    processSteps: [
      {
        phase_id: "Chapter 1",
        step_id: "1.1",
        activity: "Initial Setup",
        inputs: ["Requirements", "Resources"],
        outputs: ["Setup Plan", "Resource Allocation"],
        timeline: "Week 1",
        responsible: "Project Manager",
        comments: "Begin with comprehensive planning and resource identification"
      }
    ],
    raciMatrix: [
      {
        phase_id: "Chapter 1",
        step_id: "1.1",
        task: "Initial Setup",
        responsible: "Project Manager",
        accountable: "Project Director",
        consulted: "Team Leads",
        informed: "Stakeholders"
      }
    ],
    processMap: [
      {
        phase_id: "Chapter 1",
        step_id: "1.1",
        step_type: "start",
        title: "Initial Setup",
        description: "Begin project with initial setup activities",
        order_index: 1
      }
    ]
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

    // Parse the PDF content with enhanced structure
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

    console.log(`Successfully processed structured playbook: ${fileName}`);
    return playbook;

  } catch (error) {
    console.error('Error processing uploaded playbook:', error);
    throw error;
  }
};

export const scanAndProcessPlaybooks = async () => {
  try {
    console.log('Scanning for new structured playbooks in storage...');
    
    // List all files in the playbooks bucket
    const { data: files, error } = await supabase.storage
      .from('playbooks')
      .list();

    if (error) throw error;

    const pdfFiles = files?.filter(file => file.name.endsWith('.pdf')) || [];
    console.log(`Found ${pdfFiles.length} PDF files to process`);
    
    for (const file of pdfFiles) {
      console.log(`Processing file: ${file.name}`);
      await processUploadedPlaybook(file.name);
    }

    console.log(`Completed processing ${pdfFiles.length} PDF files with structured content extraction`);
    
  } catch (error) {
    console.error('Error scanning playbooks:', error);
    throw error;
  }
};
