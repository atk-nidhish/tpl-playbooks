
import { supabase } from '@/integrations/supabase/client';

export const createWindCPPlaybook = async () => {
  // Create the Wind C&P playbook
  const { data: playbook, error } = await supabase
    .from('playbooks')
    .insert({
      name: 'wind-cp-playbook',
      title: 'Wind - C&P (Contracting & Procurement)',
      description: 'Wind Contracting and Procurement Playbook',
      phases: {
        "chapter-1": {
          "name": "Cost Estimation for PPA Bid Submission",
          "description": "This chapter covers the process of estimating costs which serve as an input for the PPA bid submission."
        },
        "chapter-2": {
          "name": "Vendor Empanelment",
          "description": "This chapter serves as a framework for empaneling vendors by means of a Request for Information (RFI)."
        },
        "chapter-3": {
          "name": "Contract Award and PR Execution",
          "description": "Contract award and purchase requisition execution processes"
        },
        "chapter-3a1": {
          "name": "Contract Award for Project-specific Agreement",
          "description": "Contract award process for project-specific agreements",
          "parent": "chapter-3"
        },
        "chapter-3a2": {
          "name": "Purchase Requisition Execution under Project-specific Agreement",
          "description": "Purchase requisition execution under project-specific agreements",
          "parent": "chapter-3"
        },
        "chapter-3b1": {
          "name": "Contract Award for Framework Agreements",
          "description": "Contract award process for framework agreements",
          "parent": "chapter-3"
        },
        "chapter-3b2": {
          "name": "Purchase Requisition Execution under Framework Agreements",
          "description": "Purchase requisition execution under framework agreements",
          "parent": "chapter-3"
        },
        "chapter-4": {
          "name": "Contractor Management",
          "description": "Contractor management processes and procedures"
        },
        "chapter-4.1": {
          "name": "Issue Escalation and Resolution",
          "description": "Issue escalation and resolution processes",
          "parent": "chapter-4"
        },
        "chapter-4.2": {
          "name": "Change of Scope Process",
          "description": "Change of scope process management",
          "parent": "chapter-4"
        }
      }
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating Wind C&P playbook:', error);
    throw error;
  }

  console.log('Created Wind C&P playbook:', playbook.id);
  return playbook.id;
};

export const seedWindCPChapter1Data = async (playbookId: string) => {
  console.log('Seeding Chapter 1 data for Wind C&P playbook...');

  // Chapter 1 Process Steps
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'S',
      activity: 'Wind Engineering Head (WEH) shares the design requirements and initial Bill of Quantities (BoQ) and Bill of Services (BoS) with Wind Procurement Head (WPH)',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Wind Engineering Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P1',
      activity: 'WPH places items from BoQ and BoS within procurement packages. WPH assigns those packages to the Procurement Leads',
      inputs: ['BoQ and BoS', 'Contracting Strategy Packages'],
      outputs: [],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P2',
      activity: 'Procurement Leads check availability and costs of package items in the market. Procurement Leads may refer to costs from recent past orders or get informal quotes from vendors. Procurement Leads prepare the Market availability report and share it with WPH',
      inputs: [],
      outputs: ['Market availability report'],
      timeline: '',
      responsible: 'Procurement Leads',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P3',
      activity: 'WPH and WEH align on requirements basis market availability and finalize BoQ and BoS',
      inputs: ['Market availability report'],
      outputs: [],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P4',
      activity: 'WPH prepares the cost estimate report basis estimates from Procurement Leads. Contingency allowance to be taken on all costs',
      inputs: ['BoQ and BoS'],
      outputs: ['Cost Estimate'],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P5',
      activity: 'WPH receives IRR sensitivity report from Commercial Manager',
      inputs: [],
      outputs: ['IRR Sensitivity Report'],
      timeline: '',
      responsible: 'Commercial Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P6',
      activity: 'WPH shares cost estimate and IRR sensitivity report with Engineering, Finance, and BD Teams for finalization and sign-off',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P7',
      activity: 'Changes recommended are incorporated and re-shared for finalization and sign-off',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'E',
      activity: 'WPH shares approved cost estimate and IRR sensitivity report with Chief BD',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    }
  ];

  // Insert process steps
  for (const step of processSteps) {
    const { error } = await supabase
      .from('process_steps')
      .insert(step);
    
    if (error) {
      console.error('Error inserting process step:', error);
    }
  }

  // Chapter 1 RACI Matrix
  const raciEntries = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'S',
      task: 'Share the initial BOQ and BOS for cost estimation during bid preparation with Wind Procurement Head',
      responsible: 'Wind Engineering Head',
      accountable: '',
      consulted: '',
      informed: 'Wind Procurement Head, Procurement'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P1',
      task: 'Assign procurement packages to the Procurement Leads',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: '',
      informed: 'Procurement Leads'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P2',
      task: 'Prepare the market availability report',
      responsible: 'Procurement Leads',
      accountable: '',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P3',
      task: 'Align on requirements basis market availability and finalize BOQ and BOS',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: 'Wind Engineering Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P4',
      task: 'Prepare the cost estimate report for bid submission',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: 'Procurement Leads',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P5',
      task: 'Share IRR Sensitivity Report with WPH',
      responsible: 'Commercial Manager',
      accountable: '',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P6',
      task: 'Share the cost estimate and IRR sensitivity report with Engineering, Finance, and BD Teams for approval',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: 'Engineering, Finance and BD Team',
      informed: 'Chief Procurement'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P7',
      task: 'Incorporate recommended changes and re-seek approval',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: 'Engineering, Finance and BD Team',
      informed: 'Chief Procurement'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'E',
      task: 'Share cost estimate and IRR sensitivity report with Chief Business Development for bid preparation',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: '',
      informed: 'Chief Business Development, Chief Procurement'
    }
  ];

  // Insert RACI entries
  for (const raci of raciEntries) {
    const { error } = await supabase
      .from('raci_matrix')
      .insert(raci);
    
    if (error) {
      console.error('Error inserting RACI entry:', error);
    }
  }

  // Chapter 1 Process Map
  const processMapSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'S',
      step_type: 'start',
      title: 'Start - Design Requirements Sharing',
      description: 'WEH shares design requirements and initial BoQ/BoS with WPH',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P1',
      step_type: 'process',
      title: 'Package Assignment',
      description: 'WPH places items in procurement packages and assigns to Procurement Leads',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P2',
      step_type: 'process',
      title: 'Market Analysis',
      description: 'Procurement Leads check market availability and costs, prepare market report',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P3',
      step_type: 'process',
      title: 'Requirements Alignment',
      description: 'WPH and WEH align on requirements and finalize BoQ/BoS',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P4',
      step_type: 'process',
      title: 'Cost Estimation',
      description: 'WPH prepares cost estimate report with contingency allowance',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P5',
      step_type: 'process',
      title: 'IRR Analysis',
      description: 'WPH receives IRR sensitivity report from Commercial Manager',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P6',
      step_type: 'decision',
      title: 'Review & Approval',
      description: 'Share estimates with Engineering, Finance, BD Teams for approval',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'P7',
      step_type: 'process',
      title: 'Incorporate Changes',
      description: 'Incorporate feedback and re-share for final approval',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-1',
      step_id: 'E',
      step_type: 'end',
      title: 'Final Submission',
      description: 'Share approved estimates with Chief BD for bid preparation',
      order_index: 9
    }
  ];

  // Insert process map steps
  for (const mapStep of processMapSteps) {
    const { error } = await supabase
      .from('process_map')
      .insert(mapStep);
    
    if (error) {
      console.error('Error inserting process map step:', error);
    }
  }

  console.log('Chapter 1 data seeded successfully');
};

export const seedWindCPChapter2Data = async (playbookId: string) => {
  console.log('Seeding Chapter 2 data for Wind C&P playbook...');

  // Chapter 2 Process Steps
  const processSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'S',
      activity: 'Chief Business Development shares the quarterly Growth Outlook with Wind Procurement Head (WPH) for the 1st and 3rd quarters of the financial year',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Chief Business Development',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P1',
      activity: 'WPH identifies land parcels for projects in the pipeline',
      inputs: ['Growth Outlook', 'Land Bank'],
      outputs: ['Project-wise Land Parcel List'],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P2',
      activity: 'WPH assigns the contracting packages with associated region/land parcel to Procurement Leads',
      inputs: ['Project-wise Land Parcel List', 'Contracting Strategy Packages'],
      outputs: [],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P3',
      activity: 'Procurement Leads, for each package, create a Gap Assessment Summary, identifying regions where the empaneled vendors are insufficient to meet the projected demand. Engineering and Land Teams to prepare the Gap Assessment Summary for service providers under their scope',
      inputs: ['List of Empaneled Vendors'],
      outputs: ['Gap Assessment Summary'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P4',
      activity: 'Once gap is identified, Procurement Lead begins preparation of the RFI for their respective package. Procurement Lead requests the Wind Engineering Head (WEH) to prepare the PQC and technical assessment section of the RFI',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P5',
      activity: 'Procurement Lead receives the Pre-Qualification Criteria (PQC) and technical assessment section of the RFI from the WEH. Procurement Lead drafts all the other sections of the RFI. RFI is prepared by modifying the standard RFI template',
      inputs: ['Gap Assessment Summary', 'RFI Template', 'PQC & Technical Assessment'],
      outputs: ['RFI'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P6',
      activity: 'Procurement Lead floats the RFI and collates responses from all the vendors',
      inputs: [],
      outputs: ['RFI Responses'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P7',
      activity: 'Procurement Lead shares responses with WEH for technical evaluation',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P8',
      activity: 'WEH prepares and shares the list of feasible / shortlisted vendors with the Procurement Lead',
      inputs: [],
      outputs: ['List of Feasible / Shortlisted Vendors'],
      timeline: '',
      responsible: 'Wind Engineering Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P9',
      activity: 'Procurement Lead evaluates the feasible/shortlisted vendors basis appropriate evaluation criteria and prepares a list of Vendors to be Empaneled',
      inputs: ['List of Feasible / Shortlisted Vendors'],
      outputs: ['List of Empaneled Vendors'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P10',
      activity: 'Procurement Lead shares the final list with WPH for approval. If the package covered in the RFI > 10% of the procurement budget, approval of Chief Procurement is also required',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P11',
      activity: 'Procurement Lead incorporates any feedback and re-shares for approval',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P12',
      activity: 'Procurement Lead empanels the vendors and informs them, on receiving approval',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'E',
      activity: 'Procurement Lead shares the new list with the respective Technical Team which will raise the PR for given packages\' items',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    }
  ];

  // Insert process steps
  for (const step of processSteps) {
    const { error } = await supabase
      .from('process_steps')
      .insert(step);
    
    if (error) {
      console.error('Error inserting process step:', error);
    }
  }

  // Chapter 2 RACI Matrix
  const raciEntries = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'S',
      task: 'Share the quarterly Growth Outlook with Wind Procurement Head (WPH)',
      responsible: 'Chief Business Development (BD)',
      accountable: '',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P1',
      task: 'Identify land parcels for projects in the pipeline',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: 'Chief Land Officer, Chief BD',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P2',
      task: 'Assign the contracting packages with associated region/land parcel to Procurement Leads',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: '',
      informed: 'Procurement Lead'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P3',
      task: 'Create a Gap Assessment Summary',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Engineering Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P4',
      task: 'Request the Wind Engineering Head (WEH) to prepare the PQC and technical assessment section of the RFI',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: 'Wind Engineering Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P5',
      task: 'Draft the RFI document',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Engineering Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P6',
      task: 'Float the RFI document and collates responses from all the vendors',
      responsible: 'Procurement Lead',
      accountable: 'Procurement Lead',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P7',
      task: 'Share responses with WEH for technical evaluation',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: 'Wind Engineering Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P8',
      task: 'Prepare and share the list of feasible / shortlisted vendors with Procurement Lead',
      responsible: 'Wind Engineering Head',
      accountable: '',
      consulted: '',
      informed: 'Procurement Lead'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P9',
      task: 'Evaluate the feasible/shortlisted vendors basis appropriate evaluation criteria and prepare a list of Vendors to be Empaneled',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P10',
      task: 'Share the final list with Wind Procurement Head for approval',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Procurement Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P11',
      task: 'Incorporate any feedback from Wind Procurement Head and re-share for approval',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Procurement Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P12',
      task: 'Empanel the vendors and inform them',
      responsible: 'Procurement Lead',
      accountable: 'Procurement Lead',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'E',
      task: 'Share the new list of empaneled vendors with respective Technical Team',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: 'Technical Team, Wind Procurement Head'
    }
  ];

  // Insert RACI entries
  for (const raci of raciEntries) {
    const { error } = await supabase
      .from('raci_matrix')
      .insert(raci);
    
    if (error) {
      console.error('Error inserting RACI entry:', error);
    }
  }

  // Chapter 2 Process Map
  const processMapSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'S',
      step_type: 'start',
      title: 'Growth Outlook Sharing',
      description: 'Chief BD shares quarterly Growth Outlook with WPH',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P1',
      step_type: 'process',
      title: 'Land Parcel Identification',
      description: 'WPH identifies land parcels for pipeline projects',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P2',
      step_type: 'process',
      title: 'Package Assignment',
      description: 'WPH assigns contracting packages to Procurement Leads',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P3',
      step_type: 'process',
      title: 'Gap Assessment',
      description: 'Procurement Leads create Gap Assessment Summary',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P4',
      step_type: 'process',
      title: 'RFI Preparation Request',
      description: 'Procurement Lead requests WEH to prepare PQC and technical assessment',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P5',
      step_type: 'process',
      title: 'RFI Document Creation',
      description: 'Procurement Lead drafts complete RFI document',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P6',
      step_type: 'process',
      title: 'RFI Distribution',
      description: 'Procurement Lead floats RFI and collates vendor responses',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P7',
      step_type: 'process',
      title: 'Technical Evaluation',
      description: 'Procurement Lead shares responses with WEH for evaluation',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P8',
      step_type: 'process',
      title: 'Vendor Shortlisting',
      description: 'WEH prepares list of feasible/shortlisted vendors',
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P9',
      step_type: 'process',
      title: 'Vendor Evaluation',
      description: 'Procurement Lead evaluates vendors for empanelment',
      order_index: 10
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P10',
      step_type: 'decision',
      title: 'Approval Process',
      description: 'Procurement Lead seeks approval from WPH/Chief Procurement',
      order_index: 11
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P11',
      step_type: 'process',
      title: 'Feedback Incorporation',
      description: 'Procurement Lead incorporates feedback and re-seeks approval',
      order_index: 12
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'P12',
      step_type: 'process',
      title: 'Vendor Empanelment',
      description: 'Procurement Lead empanels vendors and informs them',
      order_index: 13
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-2',
      step_id: 'E',
      step_type: 'end',
      title: 'List Distribution',
      description: 'Share empaneled vendor list with Technical Team',
      order_index: 14
    }
  ];

  // Insert process map steps
  for (const mapStep of processMapSteps) {
    const { error } = await supabase
      .from('process_map')
      .insert(mapStep);
    
    if (error) {
      console.error('Error inserting process map step:', error);
    }
  }

  console.log('Chapter 2 data seeded successfully');
};
