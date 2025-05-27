
import { supabase } from '@/integrations/supabase/client';

export const seedCommissioningPlaybook = async () => {
  try {
    console.log('Seeding Commissioning Playbook data...');

    // Create the playbook
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: 'commissioning_playbook_solar_power',
        title: 'Commissioning Playbook - Solar Power Project',
        description: 'Comprehensive Commissioning Guide for Solar Project Execution - Part 6/6 | Playbook Series for Project Nav Saksham, Developed for Torrent Power',
        phases: {
          chapter_3: {
            name: 'Approvals for First Time Charging',
            description: 'This chapter covers the approvals required for first-time charging of the blocks.'
          },
          chapter_3_1: {
            name: 'RLDC User Registration',
            description: 'This chapter covers the process for RLDC user registration.'
          },
          chapter_3_2: {
            name: 'CEIG Approval & FTC Intimation to RLDC',
            description: 'This chapter covers the process for intimating the RLDC for FTC and receiving approval for the same.'
          },
          chapter_4: {
            name: 'First Time Charging (FTC) & Commercial Operation',
            description: 'This chapter covers the first-time charging process, approvals required for commissioning and initiation of commercial operations.'
          }
        }
      })
      .select()
      .single();

    if (playbookError) throw playbookError;

    console.log('Created playbook:', playbook);

    // Chapter 3.1 - RLDC User Registration Process Steps
    const chapter31ProcessSteps = [
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'S',
        activity: 'Chief Regulatory directs Regulatory Approvals Head (RAH) to initiate the RLDC approval process for First Time Charging (FTC)',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Chief Regulatory',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P1',
        activity: 'RAH initiates collection of documents required for RLDC User Registration. RLDC User Registration requires (i) grid compliance report and (ii) technical and modelling data',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P2',
        activity: 'RAH requests the EPC SPOC to prepare the grid code compliance report',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P3',
        activity: 'EPC SPOC selects and onboards a third-party consultant to prepare the grid code compliance report',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'EPC SPOC',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P4',
        activity: 'EPC SPOC ensures the consultant conducts the required simulations and receives the grid code compliance report from the consultant',
        inputs: [],
        outputs: ['Grid Code Compliance Report'],
        timeline: '',
        responsible: 'EPC SPOC',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P5',
        activity: 'EPC SPOC shares the Grid Code Compliance Report with the RAH',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'EPC SPOC',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P6',
        activity: 'RAH reviews the report and seek clarifications if any',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P7',
        activity: 'EPC SPOC provides answers for any clarifications from the RAH',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'EPC SPOC',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P8',
        activity: 'RAH requests Solar Engineering Head (SEH) to provide the necessary technical and modelling data, and shares the relevant annexure templates containing data requirements',
        inputs: ['Data Requirement Annexures'],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P9',
        activity: 'RAH receives the requisite data from SEH and prepares the annexures required for user registration',
        inputs: ['Technical and Modelling Data'],
        outputs: ['RLDC User Registration Document'],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: 'This takes place atleast 6 months prior to the anticipated FTC date'
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P10',
        activity: 'RAH shares the RLDC User Registration Document with Chief Regulatory for sign-off',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P11',
        activity: 'Chief Regulatory signs-off on the RLDC User Registration Document and shares the signed copy with RAH',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Chief Regulatory',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P12',
        activity: 'RAH submits the user registration documents with the RLDC',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'P13',
        activity: 'RAH receives queries, if any, from the RLDC and shares answers for the queries with the RLDC',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_1',
        step_id: 'E',
        activity: 'RAH receives confirmation of User registration from the RLDC, and informs the Chief Regulatory and Project Manager',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      }
    ];

    // Chapter 3.2 Process Steps
    const chapter32ProcessSteps = [
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'S',
        activity: 'Project Manager (PM) informs the Regulatory Approvals Head (RAH) that the pre-commissioning tests have been completed and that the blocks are ready to be charged. CEIG Approvals is required before requesting FTC and trial run approval from the RLDC',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P1',
        activity: 'RAH notifies the CEIG (Chief Electrical Inspector to the Government) to approve the plant drawings and conduct an inspection and provide the Electrical Safety Approval (ESA) for first-time charging (FTC)',
        inputs: ['Plant Drawings'],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P2',
        activity: 'RAH resolves any queries on the drawings and schedules the CEIG inspection and informs the PM of the same',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P3',
        activity: 'PM accompanies the CEIG during the ESA inspection',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P4',
        activity: 'Post inspection, RAH receives the order for compliance from the CEIG',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P5',
        activity: 'RAH prepares the compliance report and shares it with CEIG',
        inputs: ['Order for Compliance'],
        outputs: ['Compliance Report'],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P6',
        activity: 'RAH receives the ESA certificate from the CEIG',
        inputs: [],
        outputs: ['ESA Certificate'],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: 'If approval is denied, RAH requests the PM to make the required changes and schedules another inspection (process repeats from P3)'
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P7',
        activity: 'RAH intimates the RLDC for pre-data validation of plant, as per approved single-line diagram of plant, atleast 10 days before the anticipated FTC date',
        inputs: ['ESA Certificate'],
        outputs: ['RLDC Intimation Notice'],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P8',
        activity: 'RAH shares the ESA certificate and requisite data with the RLDC',
        inputs: ['Validated data as per SLD'],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: 'SCADA points, energy meters, connection agreement, sire responsibility schedule, and other required data documents'
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P9',
        activity: 'RAH receives queries, if any, from the RLDC, and resolves them',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P10',
        activity: 'RAH submits First-time Charging (FTC) request and trial run notice to the RLDC, atleast 7 working days before anticipated FTC date and submits the requisite documents to the RLDC',
        inputs: ['FTC Undertakings'],
        outputs: ['FTC Request Notice'],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: 'Undertaking in Protection System, Telemetry and Communication, Energy metering, Statutory clearances, Cyber security requirement'
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P11',
        activity: 'RAH receives queries, if any, from the RLDC and shares answers for the queries with the RLDC',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'P12',
        activity: 'RAH receives the approval for trial run from the RLDC, along with the grid charging code, and shares it with the PM',
        inputs: [],
        outputs: ['Trial Run Approval', 'Grid Charge Code'],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_3_2',
        step_id: 'E',
        activity: 'PM directs the EPC SPOC and Site Leads to prepare for FTC and trial run',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Project Manager',
        comments: ''
      }
    ];

    // Chapter 4 Process Steps
    const chapter4ProcessSteps = [
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'S',
        activity: 'Regulatory Approvals Head (RAH) shares the Grid charge code and approval for FTC with the Project Manager (PM)',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P1',
        activity: 'PM directs the EPC SPOC and Site Electrical Lead to prepare for FTC, and shares the grid charge code with them',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P2',
        activity: 'EPC SPOC back-charges the AC infrastructure using power from the grid',
        inputs: ['Grid Charge Code'],
        outputs: [],
        timeline: '',
        responsible: 'EPC SPOC',
        comments: 'In self-EPC of plant commissioning, AC infrastructure will be back charged by the commissioning team'
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P3',
        activity: 'PM requests the RLDC for the trial run charge code, 7 days after FTC',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P4',
        activity: 'PM receives the trial run charge code and shares it with the EPC SPOC',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P5',
        activity: 'EPC SPOC initiates the trial run and brings the DC block online',
        inputs: ['Trial Run Charge Code'],
        outputs: [],
        timeline: '',
        responsible: 'EPC SPOC',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P6',
        activity: 'EPC SPOC collects operational data over the duration of the trial run',
        inputs: [],
        outputs: ['Trial Run Data Record'],
        timeline: '',
        responsible: 'EPC SPOC',
        comments: 'SCADA values of active and reactive power flows, interface energy meter readings, numerical relay, disturbance recorder and station event logger, among others'
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P7',
        activity: 'EPC SPOC shares the trial run data with the Site Electrical Lead (SEL)',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'EPC SPOC',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P8',
        activity: 'SEL reviews the trial run data and seeks clarifications from the EPC SPOC',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Site Electrical Lead',
        comments: 'Trial run may be conducted multiple times (as permitted by the RLDC) till satisfactory data values are observed'
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P9',
        activity: 'SEL shares the trial run data with the PM, once all clarifications have been received',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Site Electrical Lead',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P10',
        activity: 'PM approves and shares the trial run data with the RAH',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Project Manager',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P11',
        activity: 'RAH prepares the trial run data in the requisite format and submits it to the RLDC',
        inputs: ['Trial Run Data'],
        outputs: ['Trial Run Data Report'],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P12',
        activity: 'RAH receives queries, if any, from the RLDC and resolves them',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'P13',
        activity: 'RAH receives the successful trial run certificate and Commercial Operation Date (COD) certificate from the RLDC',
        inputs: [],
        outputs: ['Successful Trial Run Certificate', 'COD Certificate'],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      },
      {
        playbook_id: playbook.id,
        phase_id: 'chapter_4',
        step_id: 'E',
        activity: 'RAH notifies the PM, EPC SPOC, Commissioning POC and Chief Commercial Officer of the successful trial run certificate and COD certificate',
        inputs: [],
        outputs: [],
        timeline: '',
        responsible: 'Regulatory Approvals Head',
        comments: ''
      }
    ];

    // Insert all process steps
    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert([...chapter31ProcessSteps, ...chapter32ProcessSteps, ...chapter4ProcessSteps]);

    if (stepsError) throw stepsError;

    console.log('Inserted process steps successfully');

    // RACI Matrix data for Chapter 3.1
    const chapter31RACI = [
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'S', task: 'Direct Regulatory Approvals Head (RAH) to initiate the RLDC approval process for First Time Charging (FTC)', responsible: 'Chief Regulatory', accountable: '', consulted: '', informed: 'Regulatory Approvals Head' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P1', task: 'Initiate collection of documents required for RLDC User Registration', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P2', task: 'Request the EPC SPOC to prepare the grid code compliance report', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: 'EPC SPOC, Project Manager' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P3', task: 'Select and onboard a third-party consultant to prepare the grid code compliance report', responsible: 'EPC SPOC', accountable: '', consulted: '', informed: 'Project Manager' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P4', task: 'Ensure the consultant conducts the required simulations and receives the grid code compliance report', responsible: 'EPC SPOC', accountable: '', consulted: 'Third Party Consultant', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P5', task: 'Share the Grid Code Compliance Report with the RAH', responsible: 'EPC SPOC', accountable: '', consulted: '', informed: 'Regulatory Approvals Head, Project Manager' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P6', task: 'Review the report and seek clarifications, if any', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P7', task: 'Provide answers to any clarifications from the RAH', responsible: 'EPC SPOC', accountable: '', consulted: '', informed: 'Regulatory Approvals Head' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P8', task: 'Request Solar Engineering Head (SEH) to provide the necessary technical and modelling data, and share the relevant annexure templates containing data requirements', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: 'Solar Engineering Head' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P9', task: 'Receive the requisite data from SEH and prepare the annexures required for user registration', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P10', task: 'Share the RLDC User Registration Document with Chief Regulatory for sign-off', responsible: 'Regulatory Approvals Head', accountable: '', consulted: 'Chief Regulatory', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P11', task: 'Sign-off on the RLDC User Registration Document and share the signed copy with RAH', responsible: 'Chief Regulatory', accountable: '', consulted: '', informed: 'Regulatory Approvals Head' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P12', task: 'Submit the user registration documents with the RLDC', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P13', task: 'Answer any queries from the RLDC', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'E', task: 'Receive confirmation of User registration from the RLDC, and inform the Chief Regulatory and Project Manager', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: 'Chief Regulatory, Project Manager' }
    ];

    // RACI Matrix data for Chapter 3.2
    const chapter32RACI = [
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'S', task: 'Inform the Regulatory Approvals Head (RAH) that tests have been completed and blocks are ready to be charged', responsible: 'Project Manager', accountable: '', consulted: '', informed: 'Regulatory Approvals Head' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P1', task: 'Notify the CEIG to approve plant drawings and conduct an inspection and provide the ESA', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P2', task: 'Resolve any queries on the drawings and schedule the CEIG inspection', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: 'Project Manager' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P3', task: 'Accompany the CEIG during the ESA inspection', responsible: 'Project Manager', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P4', task: 'Receive the order for compliance from the CEIG', responsible: 'Regulatory Approvals Head', accountable: '', consulted: 'Project Manager', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P5', task: 'Prepare the compliance report and share it with CEIG', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P6', task: 'Receive the ESA certificate from the CEIG', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P7', task: 'Intimate the RLDC for pre-data validation for FTC and share ESA certificate with requisite data', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P8', task: 'Share answers to the queries from the RLDC', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: 'Project Manager' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P9', task: 'Receive confirmation from the RLDC', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P10', task: 'Submit FTC and trial run request to the RLDC, and share the requisite data', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P11', task: 'Share answers to the queries from the RLDC', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: 'Project Manager' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P12', task: 'Receive the approval for trial run from the RLDC, along with the grid charging code', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: 'Project Manager' },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'E', task: 'Direct the EPC SPOC and Site Electrical Lead to prepare for FTC and trial run', responsible: 'Project Manager', accountable: '', consulted: '', informed: 'EPC SPOC, Site Electrical Lead' }
    ];

    // RACI Matrix data for Chapter 4
    const chapter4RACI = [
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'S', task: 'Share Grid charge code and approval for FTC with the PM', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: 'Project Manager' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P1', task: 'Direct the EPC SPOC and Site Electrical Lead to prepare for FTC, and share charge code', responsible: 'Project Manager', accountable: '', consulted: '', informed: 'EPC SPOC, Site Electrical Lead' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P2', task: 'Back-charge the AC infrastructure using grid power', responsible: 'EPC SPOC', accountable: '', consulted: 'Site Electrical Lead, PM', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P3', task: 'Request RLDC for trial run charge code', responsible: 'Project Manager', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P4', task: 'Share trial run charge code with EPC SPOC', responsible: 'Project Manager', accountable: '', consulted: '', informed: 'EPC SPOC' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P5', task: 'Initiate trial run and bring DC block online', responsible: 'EPC SPOC', accountable: '', consulted: 'Site Electrical Lead, PM', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P6', task: 'Collect operational data over the duration of the trial run', responsible: 'EPC SPOC', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P7', task: 'Share the data with the Site Electrical Lead (SEL)', responsible: 'EPC SPOC', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P8', task: 'Review the data and seek clarifications from EPC SPOC', responsible: 'Site Electrical Lead', accountable: '', consulted: '', informed: 'EPC SPOC' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P9', task: 'Share the trial run data with the PM', responsible: 'Site Electrical Lead', accountable: '', consulted: '', informed: 'Project Manager' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P10', task: 'Approve and share the data for submission to the RLDC', responsible: 'Project Manager', accountable: '', consulted: '', informed: 'Regulatory Approvals Head' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P11', task: 'Prepare the data in the requisite format and submit it to the RLDC', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P12', task: 'Answer any queries from the RLDC', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: 'Project Manager' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P13', task: 'Receive the successful trial run and COD certificate from RLDC', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: '' },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'E', task: 'Notify regarding the trial run certificate and COD certificate', responsible: 'Regulatory Approvals Head', accountable: '', consulted: '', informed: 'PM, EPC SPOC, CPOC, Chief Commercial Officer' }
    ];

    // Insert RACI data
    const { error: raciError } = await supabase
      .from('raci_matrix')
      .insert([...chapter31RACI, ...chapter32RACI, ...chapter4RACI]);

    if (raciError) throw raciError;

    console.log('Inserted RACI matrix successfully');

    // Process Map data - simplified version based on the images
    const processMapData = [
      // Chapter 3.1 Process Map
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'S', step_type: 'start', title: 'Start', description: 'Chief Regulatory directs RAH to initiate RLDC approval process for First Time Charging', order_index: 1 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P1', step_type: 'process', title: 'Initiate collection', description: 'RAH initiates collection of documents required for RLDC User Registration', order_index: 2 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P2', step_type: 'process', title: 'Request EPC SPOC', description: 'RAH requests the EPC SPOC to prepare the grid code compliance report', order_index: 3 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P3', step_type: 'process', title: 'Select consultant', description: 'EPC SPOC selects and onboards a third-party consultant to prepare the grid code compliance report', order_index: 4 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P4', step_type: 'process', title: 'Ensure simulations', description: 'EPC SPOC ensures the consultant conducts the required simulations and receives the grid code compliance report', order_index: 5 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P5', step_type: 'process', title: 'Share report', description: 'EPC SPOC shares the Grid Code Compliance Report with the RAH', order_index: 6 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P6', step_type: 'decision', title: 'Review report', description: 'RAH reviews the report and seek clarifications if any', order_index: 7 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P7', step_type: 'process', title: 'Provide answers', description: 'EPC SPOC provides answers for any clarifications from the RAH', order_index: 8 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P8', step_type: 'process', title: 'Request SEH data', description: 'RAH requests Solar Engineering Head (SEH) to provide the necessary technical and modelling data', order_index: 9 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P9', step_type: 'process', title: 'Prepare annexures', description: 'RAH receives the requisite data from SEH and prepares the annexures required for user registration', order_index: 10 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P10', step_type: 'process', title: 'Share for sign-off', description: 'RAH shares the RLDC User Registration Document with Chief Regulatory for sign-off', order_index: 11 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P11', step_type: 'milestone', title: 'Sign-off', description: 'Chief Regulatory signs-off on the RLDC User Registration Document and shares the signed copy with RAH', order_index: 12 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P12', step_type: 'process', title: 'Submit documents', description: 'RAH submits the user registration documents with the RLDC', order_index: 13 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'P13', step_type: 'process', title: 'Answer queries', description: 'RAH receives queries, if any, from the RLDC and shares answers for the queries with the RLDC', order_index: 14 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_1', step_id: 'E', step_type: 'end', title: 'End', description: 'RAH receives confirmation of User registration from the RLDC, and informs the Chief Regulatory and Project Manager', order_index: 15 },

      // Chapter 3.2 Process Map
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'S', step_type: 'start', title: 'Start', description: 'Project Manager informs RAH that pre-commissioning tests have been completed and blocks are ready to be charged', order_index: 1 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P1', step_type: 'process', title: 'Notify CEIG', description: 'RAH notifies the CEIG to approve the plant drawings and conduct an inspection', order_index: 2 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P2', step_type: 'process', title: 'Resolve queries', description: 'RAH resolves any queries on the drawings and schedules the CEIG inspection', order_index: 3 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P3', step_type: 'process', title: 'Accompany inspection', description: 'PM accompanies the CEIG during the ESA inspection', order_index: 4 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P4', step_type: 'process', title: 'Receive order', description: 'Post inspection, RAH receives the order for compliance from the CEIG', order_index: 5 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P5', step_type: 'process', title: 'Prepare compliance', description: 'RAH prepares the compliance report and shares it with CEIG', order_index: 6 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P6', step_type: 'milestone', title: 'Receive ESA', description: 'RAH receives the ESA certificate from the CEIG', order_index: 7 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P7', step_type: 'process', title: 'Intimate RLDC', description: 'RAH intimates the RLDC for pre-data validation of plant, as per approved single-line diagram', order_index: 8 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P8', step_type: 'process', title: 'Share data', description: 'RAH shares the ESA certificate and requisite data with the RLDC', order_index: 9 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P9', step_type: 'process', title: 'Resolve queries', description: 'RAH receives queries, if any, from the RLDC, and resolves them', order_index: 10 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P10', step_type: 'process', title: 'Submit FTC request', description: 'RAH submits First-time Charging (FTC) request and trial run notice to the RLDC', order_index: 11 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P11', step_type: 'process', title: 'Answer queries', description: 'RAH receives queries, if any, from the RLDC and shares answers for the queries with the RLDC', order_index: 12 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'P12', step_type: 'milestone', title: 'Receive approval', description: 'RAH receives the approval for trial run from the RLDC, along with the grid charging code', order_index: 13 },
      { playbook_id: playbook.id, phase_id: 'chapter_3_2', step_id: 'E', step_type: 'end', title: 'End', description: 'PM directs the EPC SPOC and Site Leads to prepare for FTC and trial run', order_index: 14 },

      // Chapter 4 Process Map  
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'S', step_type: 'start', title: 'Start', description: 'Regulatory Approvals Head shares the Grid charge code and approval for FTC with the Project Manager', order_index: 1 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P1', step_type: 'process', title: 'Direct preparation', description: 'PM directs the EPC SPOC and Site Electrical Lead to prepare for FTC, and shares the grid charge code with them', order_index: 2 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P2', step_type: 'process', title: 'Back-charge AC', description: 'EPC SPOC back-charges the AC infrastructure using power from the grid', order_index: 3 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P3', step_type: 'process', title: 'Request trial code', description: 'PM requests the RLDC for the trial run charge code, 7 days after FTC', order_index: 4 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P4', step_type: 'process', title: 'Share trial code', description: 'PM receives the trial run charge code and shares it with the EPC SPOC', order_index: 5 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P5', step_type: 'process', title: 'Initiate trial run', description: 'EPC SPOC initiates the trial run and brings the DC block online', order_index: 6 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P6', step_type: 'process', title: 'Collect data', description: 'EPC SPOC collects operational data over the duration of the trial run', order_index: 7 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P7', step_type: 'process', title: 'Share with SEL', description: 'EPC SPOC shares the trial run data with the Site Electrical Lead (SEL)', order_index: 8 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P8', step_type: 'decision', title: 'Review data', description: 'SEL reviews the trial run data and seeks clarifications from the EPC SPOC', order_index: 9 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P9', step_type: 'process', title: 'Share with PM', description: 'SEL shares the trial run data with the PM, once all clarifications have been received', order_index: 10 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P10', step_type: 'milestone', title: 'Approve data', description: 'PM approves and shares the trial run data with the RAH', order_index: 11 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P11', step_type: 'process', title: 'Submit to RLDC', description: 'RAH prepares the trial run data in the requisite format and submits it to the RLDC', order_index: 12 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P12', step_type: 'process', title: 'Resolve queries', description: 'RAH receives queries, if any, from the RLDC and resolves them', order_index: 13 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'P13', step_type: 'milestone', title: 'Receive certificates', description: 'RAH receives the successful trial run certificate and Commercial Operation Date (COD) certificate from the RLDC', order_index: 14 },
      { playbook_id: playbook.id, phase_id: 'chapter_4', step_id: 'E', step_type: 'end', title: 'End', description: 'RAH notifies the PM, EPC SPOC, Commissioning POC and Chief Commercial Officer of the successful trial run certificate and COD certificate', order_index: 15 }
    ];

    // Insert process map data
    const { error: processMapError } = await supabase
      .from('process_map')
      .insert(processMapData);

    if (processMapError) throw processMapError;

    console.log('Inserted process map successfully');

    console.log('Commissioning Playbook seeded successfully!');
    return playbook.id;

  } catch (error) {
    console.error('Error seeding commissioning playbook:', error);
    throw error;
  }
};
