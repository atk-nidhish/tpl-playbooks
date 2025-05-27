
import { supabase } from '@/integrations/supabase/client';

export const addWindCommissioningCompleteData = async (playbookId: string) => {
  console.log(`Adding complete Wind Commissioning data for all chapters to playbook: ${playbookId}`);

  // Check if data already exists to avoid duplicates
  const { data: existingSteps } = await supabase
    .from('process_steps')
    .select('step_id, phase_id')
    .eq('playbook_id', playbookId);

  const existingStepIds = existingSteps?.map(s => `${s.phase_id}-${s.step_id}`) || [];

  // Complete Process Steps for Chapter 3.1 - RLDC User Registration
  const chapter31ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'S',
      activity: 'Chief Regulatory directs Regulatory Approvals Head (RAH) to initiate the RLDC approval process for First Time Charging (FTC)',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Chief Regulatory',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P1',
      activity: 'RAH initiates collection of documents required for RLDC User Registration',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: 'RLDC User Registration requires (i) grid compliance report and (ii) technical and modelling data'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P2',
      activity: 'RAH requests the OEM SPOC to prepare the grid code compliance report',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P3',
      activity: 'OEM SPOC selects and onboards a third-party consultant to prepare the grid code compliance report',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P4',
      activity: 'OEM SPOC ensures the consultant conducts the required simulations and receives the grid code compliance report from the consultant',
      inputs: [],
      outputs: ['Grid Code Compliance Report'],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P5',
      activity: 'OEM SPOC shares the Grid Code Compliance Report with the RAH',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P6',
      activity: 'RAH reviews the report and seeks clarifications if any',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
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
      comments: 'This takes place atleast 6 months prior to the anticipated FTC date'
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
    }
  ];

  // Complete Process Steps for Chapter 3.2 - CEIG Approval & FTC Intimation
  const chapter32ProcessSteps = [
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
      comments: 'If approval is denied, RAH requests the PM to make the required changes and schedules another inspection (process repeats from P3)'
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
      comments: 'SCADA points, energy meters, connection agreement, sire responsibility schedule, and other required data documents'
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
      comments: 'Undertaking in Protection System, Telemetry and Communication, Energy metering, Statutory clearances, Cyber security requirement'
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
    }
  ];

  // Complete Process Steps for Chapter 5 - Performance Testing & HOTO
  const chapter5ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'S',
      activity: 'RAH notifies the Project Manager (PM) of the successful trial run certificate and COD certificate, of the last cluster of WTGs',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Regulatory Approvals Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P1',
      activity: 'PM directs the Site Quality Head (SQH) to ensure closure of all punch points',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P2',
      activity: 'SQH ensures closure of all punch points, signs-off on it and takes sign-off from OEM SPOC and Commissioning POC (CPOC). SQH shares the punch point list with the PM',
      inputs: [],
      outputs: ['Punch Point List'],
      timeline: '',
      responsible: 'Site Quality Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P3',
      activity: 'PM directs the OEM SPOC to initiate the performance test of the plant',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P4',
      activity: 'OEM SPOC conducts the performance test as outlined in the OEM contract',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P5',
      activity: 'OEM SPOC shares the results of the performance test with the PM. If results are not satisfactory, the test may be repeated as outlined in the contract',
      inputs: [],
      outputs: ['Performance Test Results'],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: 'If results are not satisfactory, the test may be repeated as outlined in the contract'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P6',
      activity: 'PM reviews the test procedure and data, and requests clarifications from the OEM SPOC, if required',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P7',
      activity: 'PM signs-off on the performance test findings, once all clarifications have been received',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: 'OEM Contract terms outline the escalation chain and dispute management procedure, if required'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P8',
      activity: 'PM directs OEM SPOC to provide HOTO of the plant to the O&M Team. PM requires confirmation of internal HOTO if the O&M Team is also from the OEM',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: 'PM requires confirmation of internal HOTO if the O&M Team is also from the OEM'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P9',
      activity: 'OEM SPOC conducts Knowledge Transfer (KT) sessions with the O&M team. OEM SPOC provides HOTO of items as outlined in the HOTO checklist',
      inputs: [],
      outputs: ['HOTO Checklist'],
      timeline: '',
      responsible: 'OEM SPOC',
      comments: 'OEM Contract milestones and terms typically serve as the HOTO checklist'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P10',
      activity: 'O&M Head signs-off on the HOTO checklist once KT is completed. O&M Head shares the HOTO checklist with the PM',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'O&M Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P11',
      activity: 'PM reviews the HOTO checklist and seeks clarifications from OEM SPOC or O&M Head respectively',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P12',
      activity: 'PM signs-off on the checklist once clarifications have been received and releases the Commissioning Clearance Certificate (CCC) to the OEM',
      inputs: [],
      outputs: ['Commissioning Clearance Certificate'],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'E',
      activity: 'PM notifies the Chief Commercial Officer that HOTO has been completed',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    }
  ];

  // Filter out existing steps
  const allProcessSteps = [...chapter31ProcessSteps, ...chapter32ProcessSteps, ...chapter5ProcessSteps];
  const newProcessSteps = allProcessSteps.filter(step => 
    !existingStepIds.includes(`${step.phase_id}-${step.step_id}`)
  );

  // Complete RACI Matrix entries for Chapter 3.1
  const chapter31RaciEntries = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'S',
      task: 'Direct Regulatory Approvals Head (RAH) to initiate the RLDC approval process for First Time Charging (FTC)',
      responsible: 'Chief Regulatory',
      accountable: '',
      consulted: '',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P1',
      task: 'Initiate collection of documents required for RLDC User Registration',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P2',
      task: 'Request the OEM SPOC to prepare the grid code compliance report',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: 'OEM SPOC, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P3',
      task: 'Select and onboard a third-party consultant to prepare the grid code compliance report',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P4',
      task: 'Ensure the consultant conducts the required simulations and receives the grid code compliance report',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P5',
      task: 'Share the Grid Code Compliance Report with the RAH',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: '',
      informed: 'Regulatory Approvals Head, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P6',
      task: 'Review the report and seek clarifications, if any',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P7',
      task: 'Provide answers to any clarifications from the RAH',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: '',
      informed: 'Regulatory Approvals Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P8',
      task: 'Request Wind Engineering Head (WEH) to provide the necessary technical and modelling data, and share the relevant annexure templates containing data requirements',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: 'Wind Engineering Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P9',
      task: 'Receive the requisite data from WEH and prepare the annexures required for user registration',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: ''
    },
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
    }
  ];

  // Complete RACI Matrix entries for Chapter 3.2
  const chapter32RaciEntries = [
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
    }
  ];

  // Complete RACI Matrix entries for Chapter 5
  const chapter5RaciEntries = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'S',
      task: 'Notify the Project Manager (PM) of the successful trial run certificate and COD certificate, of the last cluster of WTGs',
      responsible: 'Regulatory Approvals Head',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P1',
      task: 'Direct Site Quality Head (SQH) to ensure closure of all punch points',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'Site Quality Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P2',
      task: 'Ensure punch points are closed and take sign-off',
      responsible: 'Site Quality Head',
      accountable: '',
      consulted: 'OEM SPOC, CPOC, PM',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P3',
      task: 'Direct OEM SPOC to initiate the performance test',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'OEM SPOC'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P4',
      task: 'Conduct the performance test as outlined in the OEM contract',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: 'Project Manager, CPOC',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P5',
      task: 'Share the performance test results',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P6',
      task: 'Review the test procedure and data, and request clarifications from the OEM SPOC, if required',
      responsible: 'Project Manager',
      accountable: '',
      consulted: 'OEM SPOC',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P7',
      task: 'Sign-off on the performance test findings, once all clarifications have been received',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P8',
      task: 'Direct OEM SPOC to provide HOTO of the plant to the O&M Team',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'OEM SPOC, CPOC'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P9',
      task: 'Conduct KT sessions with the O&M team and provide HOTO of items in the HOTO checklist',
      responsible: 'OEM SPOC',
      accountable: '',
      consulted: 'CPOC',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P10',
      task: 'Sign-off on the HOTO checklist once KT is completed and share it with the Project Manager',
      responsible: 'CPOC',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P11',
      task: 'Review the HOTO checklist and seek clarifications',
      responsible: 'Project Manager',
      accountable: '',
      consulted: 'OEM SPOC, CPOC',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P12',
      task: 'Sign-off on the checklist once clarifications have been received, and release the CCC',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'OEM SPOC'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'E',
      task: 'Notify the Chief Commercial Officer that HOTO has been completed',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'Chief Commercial Officer'
    }
  ];

  // Process Map entries for all chapters
  const allProcessMapEntries = [
    // Chapter 3.1 Process Map
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'S',
      step_type: 'start',
      title: 'Direct Regulatory Approvals Head to initiate RLDC approval process',
      description: 'Chief Regulatory directs RAH to initiate the RLDC approval process for First Time Charging (FTC)',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P1',
      step_type: 'process',
      title: 'Initiate collection of documents for RLDC User Registration',
      description: 'RAH initiates collection of documents required for RLDC User Registration',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P2',
      step_type: 'process',
      title: 'Request OEM SPOC to prepare grid code compliance report',
      description: 'RAH requests the OEM SPOC to prepare the grid code compliance report',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P3',
      step_type: 'process',
      title: 'Select and onboard third-party consultant',
      description: 'OEM SPOC selects and onboards a third-party consultant to prepare the grid code compliance report',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P4',
      step_type: 'process',
      title: 'Conduct simulations and receive grid code compliance report',
      description: 'OEM SPOC ensures the consultant conducts the required simulations and receives the grid code compliance report from the consultant',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P5',
      step_type: 'process',
      title: 'Share Grid Code Compliance Report with RAH',
      description: 'OEM SPOC shares the Grid Code Compliance Report with the RAH',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P6',
      step_type: 'decision',
      title: 'Review report and seek clarifications if any',
      description: 'RAH reviews the report and seeks clarifications if any',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P7',
      step_type: 'process',
      title: 'Provide answers to clarifications',
      description: 'OEM SPOC provides answers for any clarifications from the RAH',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P8',
      step_type: 'process',
      title: 'Request technical and modelling data from WEH',
      description: 'RAH requests Wind Engineering Head (WEH) to provide the necessary technical and modelling data',
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P9',
      step_type: 'process',
      title: 'Prepare annexures for user registration',
      description: 'RAH receives the requisite data from WEH and prepares the annexures required for user registration',
      order_index: 10
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P10',
      step_type: 'process',
      title: 'Share RLDC User Registration Document for sign-off',
      description: 'RAH shares the RLDC User Registration Document with Chief Regulatory for sign-off',
      order_index: 11
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P11',
      step_type: 'milestone',
      title: 'Chief Regulatory signs-off on registration document',
      description: 'Chief Regulatory signs-off on the RLDC User Registration Document and shares the signed copy with RAH',
      order_index: 12
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P12',
      step_type: 'process',
      title: 'Submit user registration documents to RLDC',
      description: 'RAH submits the user registration documents with the RLDC',
      order_index: 13
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'P13',
      step_type: 'process',
      title: 'Answer RLDC queries',
      description: 'RAH receives queries, if any, from the RLDC and shares answers for the queries with the RLDC',
      order_index: 14
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-1',
      step_id: 'E',
      step_type: 'end',
      title: 'Receive confirmation of User registration from RLDC',
      description: 'RAH receives confirmation of User registration from the RLDC, and informs the Chief Regulatory and Project Manager',
      order_index: 15
    },

    // Chapter 3.2 Process Map
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'S',
      step_type: 'start',
      title: 'Inform RAH that pre-commissioning tests completed',
      description: 'Project Manager informs the RAH that the pre-commissioning tests have been completed',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P1',
      step_type: 'process',
      title: 'Notify CEIG for plant drawings approval and inspection',
      description: 'RAH notifies the CEIG to approve the plant drawings and conduct an inspection',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P2',
      step_type: 'process',
      title: 'Resolve queries and schedule CEIG inspection',
      description: 'RAH resolves any queries on the drawings and schedules the CEIG inspection',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P3',
      step_type: 'process',
      title: 'Accompany CEIG during ESA inspection',
      description: 'PM accompanies the CEIG during the ESA inspection',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P4',
      step_type: 'process',
      title: 'Receive order for compliance from CEIG',
      description: 'Post inspection, RAH receives the order for compliance from the CEIG',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P5',
      step_type: 'process',
      title: 'Prepare compliance report and share with CEIG',
      description: 'RAH prepares the compliance report and shares it with CEIG',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P6',
      step_type: 'milestone',
      title: 'Receive ESA certificate from CEIG',
      description: 'RAH receives the ESA certificate from the CEIG',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P7',
      step_type: 'process',
      title: 'Intimate RLDC for pre-data validation and share ESA certificate',
      description: 'RAH intimates the RLDC for pre-data validation and shares the ESA certificate with requisite data',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P8',
      step_type: 'process',
      title: 'Resolve RLDC queries',
      description: 'RAH receives queries, if any, from the RLDC, and resolves them',
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P9',
      step_type: 'process',
      title: 'Receive confirmation from RLDC',
      description: 'RAH receives confirmation from the RLDC that all the documents are in order',
      order_index: 10
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P10',
      step_type: 'process',
      title: 'Submit FTC request and trial run notice to RLDC',
      description: 'RAH submits FTC request and trial run notice to the RLDC',
      order_index: 11
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P11',
      step_type: 'process',
      title: 'Answer RLDC queries',
      description: 'RAH receives queries, if any, from the RLDC and shares answers for the queries',
      order_index: 12
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'P12',
      step_type: 'milestone',
      title: 'Receive trial run approval and grid charging code',
      description: 'RAH receives the approval for trial run from the RLDC, along with the grid charging code',
      order_index: 13
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3-2',
      step_id: 'E',
      step_type: 'end',
      title: 'Direct team to prepare for FTC and trial run',
      description: 'PM directs the OEM SPOC, Site Electrical Lead and Commissioning POC to prepare for FTC and trial run',
      order_index: 14
    },

    // Chapter 5 Process Map
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'S',
      step_type: 'start',
      title: 'Notify PM of successful trial run and COD certificate',
      description: 'RAH notifies the Project Manager of the successful trial run certificate and COD certificate',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P1',
      step_type: 'process',
      title: 'Direct SQH to ensure closure of all punch points',
      description: 'PM directs the Site Quality Head to ensure closure of all punch points',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P2',
      step_type: 'process',
      title: 'Ensure closure of all punch points and take sign-off',
      description: 'SQH ensures closure of all punch points, signs-off on it and takes sign-off from OEM SPOC and CPOC',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P3',
      step_type: 'process',
      title: 'Direct OEM SPOC to initiate performance test',
      description: 'PM directs the OEM SPOC to initiate the performance test of the plant',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P4',
      step_type: 'process',
      title: 'Conduct performance test as per OEM contract',
      description: 'OEM SPOC conducts the performance test as outlined in the OEM contract',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P5',
      step_type: 'process',
      title: 'Share performance test results with PM',
      description: 'OEM SPOC shares the results of the performance test with the PM',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P6',
      step_type: 'decision',
      title: 'Review test procedure and data',
      description: 'PM reviews the test procedure and data, and requests clarifications from the OEM SPOC, if required',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P7',
      step_type: 'milestone',
      title: 'Sign-off on performance test findings',
      description: 'PM signs-off on the performance test findings, once all clarifications have been received',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P8',
      step_type: 'process',
      title: 'Direct OEM SPOC to provide HOTO to O&M Team',
      description: 'PM directs OEM SPOC to provide HOTO of the plant to the O&M Team',
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P9',
      step_type: 'process',
      title: 'Conduct KT sessions and provide HOTO',
      description: 'OEM SPOC conducts Knowledge Transfer sessions with the O&M team and provides HOTO of items',
      order_index: 10
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P10',
      step_type: 'process',
      title: 'Sign-off on HOTO checklist',
      description: 'O&M Head signs-off on the HOTO checklist once KT is completed and shares it with the PM',
      order_index: 11
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P11',
      step_type: 'process',
      title: 'Review HOTO checklist and seek clarifications',
      description: 'PM reviews the HOTO checklist and seeks clarifications from OEM SPOC or O&M Head respectively',
      order_index: 12
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'P12',
      step_type: 'milestone',
      title: 'Sign-off on checklist and release CCC',
      description: 'PM signs-off on the checklist once clarifications have been received and releases the CCC to the OEM',
      order_index: 13
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-5',
      step_id: 'E',
      step_type: 'end',
      title: 'Notify Chief Commercial Officer that HOTO completed',
      description: 'PM notifies the Chief Commercial Officer that HOTO has been completed',
      order_index: 14
    }
  ];

  // All RACI entries
  const allRaciEntries = [...chapter31RaciEntries, ...chapter32RaciEntries, ...chapter5RaciEntries];

  try {
    // Insert new process steps only
    if (newProcessSteps.length > 0) {
      const { error: stepsError } = await supabase
        .from('process_steps')
        .insert(newProcessSteps);

      if (stepsError) {
        console.error('Error inserting process steps:', stepsError);
        throw stepsError;
      }
      console.log(`Inserted ${newProcessSteps.length} new process steps`);
    }

    // Delete existing RACI entries for these chapters and insert new ones
    const { error: deleteRaciError } = await supabase
      .from('raci_matrix')
      .delete()
      .eq('playbook_id', playbookId)
      .in('phase_id', ['chapter-3-1', 'chapter-3-2', 'chapter-5']);

    if (deleteRaciError) {
      console.error('Error deleting existing RACI entries:', deleteRaciError);
    }

    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert(allRaciEntries);

    if (raciError) {
      console.error('Error inserting RACI entries:', raciError);
      throw raciError;
    }
    console.log(`Inserted ${allRaciEntries.length} RACI entries`);

    // Delete existing process map entries for these chapters and insert new ones
    const { error: deleteMapError } = await supabase
      .from('process_map')
      .delete()
      .eq('playbook_id', playbookId)
      .in('phase_id', ['chapter-3-1', 'chapter-3-2', 'chapter-5']);

    if (deleteMapError) {
      console.error('Error deleting existing process map entries:', deleteMapError);
    }

    const { error: mapError } = await supabase
      .from('process_map')
      .insert(allProcessMapEntries);

    if (mapError) {
      console.error('Error inserting process map entries:', mapError);
      throw mapError;
    }
    console.log(`Inserted ${allProcessMapEntries.length} process map entries`);

    console.log('Successfully added complete Wind Commissioning data for chapters 3.1, 3.2, and 5');
  } catch (error) {
    console.error('Error adding complete Wind Commissioning data:', error);
    throw error;
  }
};
