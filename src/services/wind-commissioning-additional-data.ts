
import { supabase } from '@/integrations/supabase/client';

export const addWindCommissioningAdditionalData = async (playbookId: string) => {
  console.log(`Adding additional Wind Commissioning data to playbook: ${playbookId}`);

  // Additional Process Steps for Chapter 3.1 RLDC User Registration
  const additionalProcessSteps = [
    // Chapter 3.1 - RLDC User Registration (continuing from existing data)
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P7',
      activity: 'OEM SPOC provides answers for any clarifications from the RAH',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P8',
      activity: 'RAH requests Wind Engineering Head (WEH) to provide the necessary technical and modelling data, and shares the relevant annexure templates containing data requirements',
      inputs: ['Data Requirement Annexures'],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P9',
      activity: 'RAH receives the requisite data from WEH and prepares the annexures required for user registration',
      inputs: ['Technical and Modelling Data'],
      outputs: ['RLDC User Registration Document'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P10',
      activity: 'RAH shares the RLDC User Registration Document with Chief Regulatory for sign-off',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P11',
      activity: 'Chief Regulatory signs-off on the RLDC User Registration Document and shares the signed copy with RAH',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Chief Regulatory',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P12',
      activity: 'RAH submits the user registration documents with the RLDC',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P13',
      activity: 'RAH receives queries, if any, from the RLDC and shares answers for the queries with the RLDC',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'E',
      activity: 'RAH receives confirmation of User registration from the RLDC, and informs the Chief Regulatory and Project Manager',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },

    // Chapter 3.2 - CEIG Approval & FTC Intimation to RLDC
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'S',
      activity: 'Project Manager (PM) informs the Regulatory Approvals Head (RAH) that the pre-commissioning tests have been completed. CEIG Approval is required before requesting FTC and trial run approval from the RLDC',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P1',
      activity: 'RAH notifies the CEIG (Chief Electrical Inspector to the Government) to approve the plant drawings and conduct an inspection and provide the Electrical Safety Approval (ESA) for first-time charging (FTC)',
      inputs: ['Plant Drawings'],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P2',
      activity: 'RAH resolves any queries on the drawings and schedules the CEIG inspection and informs the PM of the same',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P3',
      activity: 'PM accompanies the CEIG during the ESA inspection',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P4',
      activity: 'Post inspection, RAH receives the order for compliance from the CEIG',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P5',
      activity: 'RAH prepares the compliance report and shares it with CEIG',
      inputs: ['Order for Compliance'],
      outputs: ['Compliance Report'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P6',
      activity: 'RAH receives the ESA certificate from the CEIG',
      inputs: [],
      outputs: ['ESA Certificate'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P7',
      activity: 'RAH intimates the RLDC for pre-data validation of plant, as per approved single-line diagram of plant, atleast 10 days before the anticipated FTC date. RAH shares the ESA certificate and requisite data with the RLDC',
      inputs: ['ESA Certificate', 'Validated data as per SLD'],
      outputs: ['RLDC Intimation Notice'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P8',
      activity: 'RAH receives queries, if any, from the RLDC, and resolves them',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P9',
      activity: 'RAH receives confirmation from the RLDC that all the documents are in order',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P10',
      activity: 'RAH submits First-time Charging (FTC) request and trial run notice to the RLDC, atleast 7 working days before anticipated FTC date. RAH submits the requisite documents to the RLDC',
      inputs: ['FTC Undertakings'],
      outputs: ['FTC Request Notice'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P11',
      activity: 'RAH receives queries, if any, from the RLDC and shares answers for the queries with the RLDC',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P12',
      activity: 'RAH receives the approval for trial run from the RLDC, along with the grid charging code, and shares it with the PM',
      inputs: [],
      outputs: ['Trial Run Approval', 'Grid Charge Code'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'E',
      activity: 'PM directs the OEM SPOC, Site Electrical Lead and Commissioning POC to prepare for FTC and trial run',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },

    // Chapter 4 - First Time Charging & Commercial Operation
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'S',
      activity: 'Regulatory Approvals Head (RAH) shares the Grid charge code and approval for FTC with the Project Manager (PM)',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P1',
      activity: 'PM directs the OEM SPOC, Site Electrical Lead and Commissioning POC (CPOC) to prepare for FTC, and shares the grid charge code with them',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P2',
      activity: 'OEM SPOC back-charges the USS transformer through the 33 kV line, using power from the grid',
      inputs: ['Grid Charge Code'],
      outputs: [],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P3',
      activity: 'PM requests the RLDC for the trial run charge code, 7 days after FTC',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P4',
      activity: 'PM receives the trial run charge code and shares it with the OEM SPOC',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P5',
      activity: 'OEM SPOC initiates the trial run',
      inputs: ['Trial Run Charge Code'],
      outputs: [],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P6',
      activity: 'OEM SPOC collects operational data over the duration of the trial run',
      inputs: [],
      outputs: ['Trial Run Data'],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: 'SCADA values of active and reactive power flows, interface energy meter readings, numerical relay, disturbance recorder and station event logger, among others'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P7',
      activity: 'OEM SPOC shares the trial run data with the Site Electrical Lead (SEL)',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P8',
      activity: 'SEL reviews the trial run data, with CPOC, and seeks clarifications from the OEM SPOC',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Site Electrical Lead',
      comments: 'Trial run may be conducted multiple times (as permitted by the RLDC) till satisfactory data values are observed'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P9',
      activity: 'SEL shares the trial run data with the PM, once all clarifications have been received',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Site Electrical Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P10',
      activity: 'PM approves and shares the trial run data with the RAH',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P11',
      activity: 'RAH prepares the trial run data in the requisite format and submits it to the RLDC',
      inputs: ['Trial Run Data'],
      outputs: ['Trial Run Data Report'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P12',
      activity: 'RAH receives queries, if any, from the RLDC and resolves them',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P13',
      activity: 'RAH receives the successful trial run certificate and Commercial Operation Date (COD) certificate from the RLDC',
      inputs: [],
      outputs: ['Successful Trial Run Certificate', 'COD Certificate'],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'E',
      activity: 'RAH notifies the PM, OEM SPOC, Commissioning POC and Chief Commercial Officer of the successful trial run certificate and COD certificate',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    }
  ];

  // Additional RACI Matrix entries
  const additionalRaciEntries = [
    // Chapter 3.1 RACI continuation
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P10',
      task: 'Share the RLDC User Registration Document with Chief Regulatory for sign-off',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: 'Chief Regulatory',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P11',
      task: 'Sign-off on the RLDC User Registration Document and share the signed copy with RAH',
      responsible: 'Chief Regulatory',
      accountable: '',
      consulted: '',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P12',
      task: 'Submit the user registration documents with the RLDC',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P13',
      task: 'Answer any queries from the RLDC',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'E',
      task: 'Receive confirmation of User registration from the RLDC, and inform the Chief Regulatory and Project Manager',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: 'Chief Regulatory, Project Manager'
    },

    // Chapter 3.2 RACI
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'S',
      task: 'Inform the Regulatory Approvals Head (RAH) that pre-commissioning tests have been completed',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P1',
      task: 'Notify the CEIG to approve plant drawings and conduct an inspection and provide the ESA',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P2',
      task: 'Resolve any queries on the drawings and schedule the CEIG inspection',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P3',
      task: 'Accompany the CEIG during the ESA inspection',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P4',
      task: 'Receive the order for compliance from the CEIG',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: 'Project Manager',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P5',
      task: 'Prepare the compliance report and share it with CEIG',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P6',
      task: 'Receive the ESA certificate from the CEIG',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P7',
      task: 'Intimate the RLDC for pre-data validation for FTC and share ESA certificate with requisite data',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P8',
      task: 'Share answers to the queries from the RLDC',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: 'Project Manager',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P9',
      task: 'Receive confirmation from the RLDC',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P10',
      task: 'Submit FTC and trial run request to the RLDC, and share the requisite data',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P11',
      task: 'Share answers to the queries from the RLDC',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: 'Project Manager',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P12',
      task: 'Receive the approval for trial run from the RLDC, along with the grid charging code',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'E',
      task: 'Direct the OEM SPOC, Site Electrical Lead and CPOC to prepare for FTC and trial run',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'OEM SPOC, Site Electrical Lead, Commissioning POC'
    },

    // Chapter 4 RACI
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'S',
      task: 'Share Grid charge code and approval for FTC with the PM',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P1',
      task: 'Direct the OEM SPOC, Site Electrical Lead and CPOC to prepare for FTC',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'OEM SPOC, Site Electrical Lead, CPOC'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P2',
      task: 'Back-charge the USS transformer through 33 kV line',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: 'Site Electrical Lead, PM',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P3',
      task: 'Request RLDC for trial run charge code',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P4',
      task: 'Share trial run charge code with OEM SPOC',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'OEM SPOC'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P5',
      task: 'Initiate the trial run',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: 'Site Electrical Lead, PM',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P6',
      task: 'Collect operational data over the duration of the trial run',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P7',
      task: 'Share the data with the Site Electrical Lead (SEL)',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P8',
      task: 'Review the data and seek clarifications from OEM SPOC',
      responsible: 'Site Electrical Lead',
      accountable: '',
      consulted: 'Commissioning POC, OEM SPOC',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P9',
      task: 'Share the trial run data with the PM',
      responsible: 'Site Electrical Lead',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P10',
      task: 'Approve and share the data for submission to the RLDC',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-4',
      step_id: 'P11',
      task: 'Prepare the data in the requisite format and submit it to the RLDC',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    }
  ];

  // Additional Process Map entries
  const additionalProcessMapEntries = [
    // Chapter 3.1 Process Map
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'S',
      step_type: 'start',
      title: 'Direct Regulatory Approvals Head to initiate RLDC approval process for First Time Charging',
      description: 'Chief Regulatory directs RAH to initiate the RLDC approval process for First Time Charging (FTC)',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P1',
      step_type: 'process',
      title: 'Initiate collection of documents required for RLDC User Registration',
      description: 'RAH initiates collection of documents required for RLDC User Registration',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P8',
      step_type: 'process',
      title: 'Request Wind Engineering Head to provide technical data',
      description: 'RAH requests WEH to provide necessary technical and modelling data, and shares the relevant annexure templates',
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P9',
      step_type: 'process',
      title: 'Receive requisite data from WEH and prepare annexures for user registration',
      description: 'RAH receives the requisite data from WEH and prepares the annexures required for user registration',
      order_index: 10
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P12',
      step_type: 'process',
      title: 'Submit the user registration documents with the RLDC',
      description: 'RAH submits the user registration documents with the RLDC',
      order_index: 13
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'E',
      step_type: 'end',
      title: 'Receive confirmation of User registration from the RLDC',
      description: 'RAH receives confirmation of User registration from the RLDC, and informs the Chief Regulatory and Project Manager',
      order_index: 15
    },

    // Chapter 3.2 Process Map
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'S',
      step_type: 'start',
      title: 'Inform the Regulatory Approvals Head that pre-commissioning tests have been completed',
      description: 'Project Manager informs the RAH that the pre-commissioning tests have been completed',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P1',
      step_type: 'process',
      title: 'Notify the CEIG to conduct an inspection and provide the Electrical Safety Approval',
      description: 'RAH notifies the CEIG to approve the plant drawings and conduct an inspection',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P3',
      step_type: 'process',
      title: 'Accompany the CEIG during the ESA inspection',
      description: 'PM accompanies the CEIG during the ESA inspection',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P6',
      step_type: 'process',
      title: 'Receive the ESA certificate from the CEIG',
      description: 'RAH receives the ESA certificate from the CEIG once all queries are resolved',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P10',
      step_type: 'process',
      title: 'Submit FTC and trial run request to the RLDC',
      description: 'RAH submits FTC and trial run request to the RLDC, and share the requisite data',
      order_index: 11
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P12',
      step_type: 'milestone',
      title: 'Receive the approval for trial run from the RLDC',
      description: 'RAH receives the approval for trial run from the RLDC, along with the grid charging code',
      order_index: 13
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'E',
      step_type: 'end',
      title: 'Direct the EPC SPOC, Site Electrical Lead and CPOC to prepare for FTC and trial run',
      description: 'PM directs the OEM SPOC, Site Electrical Lead and Commissioning POC to prepare for FTC and trial run',
      order_index: 14
    }
  ];

  try {
    // Insert additional process steps
    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(additionalProcessSteps);

    if (stepsError) {
      console.error('Error inserting additional process steps:', stepsError);
      throw stepsError;
    }

    // Insert additional RACI entries
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(additionalRaciEntries);

    if (raciError) {
      console.error('Error inserting additional RACI entries:', raciError);
      throw raciError;
    }

    // Insert additional process map entries
    const { error: mapError } = await supabase
      .from('process_map')
      .insert(additionalProcessMapEntries);

    if (mapError) {
      console.error('Error inserting additional process map entries:', mapError);
      throw mapError;
    }

    console.log('Successfully added additional Wind Commissioning data');
  } catch (error) {
    console.error('Error adding additional Wind Commissioning data:', error);
    throw error;
  }
};
