
import { supabase } from '@/integrations/supabase/client';

export const seedSolarEngineeringData = async (): Promise<string> => {
  console.log('Creating Solar Engineering Playbook...');

  const playbookId = "solar-engineering-playbook-2024";

  // First, check if playbook already exists
  const { data: existingPlaybook } = await supabase
    .from('playbooks')
    .select('id')
    .eq('name', 'solar-engineering')
    .single();

  if (existingPlaybook) {
    console.log('Solar Engineering Playbook already exists, clearing existing data...');
    
    // Clear existing data for this playbook
    console.log('Deleting existing process steps...');
    await supabase
      .from('process_steps')
      .delete()
      .eq('playbook_id', playbookId);

    console.log('Deleting existing RACI matrix...');
    await supabase
      .from('raci_matrix')
      .delete()
      .eq('playbook_id', playbookId);

    console.log('Deleting existing process map...');
    await supabase
      .from('process_map')
      .delete()
      .eq('playbook_id', playbookId);
    
    // Wait a moment to ensure deletions are complete
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Insert fresh data
    await insertPlaybookData(playbookId);
    
    console.log('Successfully updated Solar Engineering Playbook data');
    return playbookId;
  }

  // Create new playbook if it doesn't exist
  const playbookData = {
    name: 'solar-engineering',
    title: 'Engineering - Solar',
    description: 'Solar Engineering Execution Playbook',
    phases: {
      '1-1': {
        name: 'Section 1.1 - Basic Engineering Design Preparation',
        description: 'This section covers the preparation of basic engineering design for solar projects'
      },
      '2-1-1': {
        name: 'Section 2.1.1 - Owner\'s Engineer Finalization',
        description: 'This section covers the finalization of owner\'s engineer for solar projects'
      },
      '2-2a-1': {
        name: 'Section 2.2A.1 - Site Survey Consultant Finalization',
        description: 'This section covers the finalization of site survey consultant'
      },
      '2-2b-1': {
        name: 'Section 2.2B.1 - Preliminary Works Execution',
        description: 'This section covers the execution of preliminary engineering works'
      },
      '3-1': {
        name: 'Section 3.1 - Detailed Engineering Design Preparation',
        description: 'This section covers the preparation of detailed engineering design'
      },
      '4-1': {
        name: 'Section 4.1 - Sign-Off for Detailed Engineering Design',
        description: 'This section covers the sign-off process for detailed engineering design'
      },
      '5-1': {
        name: 'Section 5.1 - Issue Resolution for Detailed Engineering Design',
        description: 'This section covers issue resolution for detailed engineering design'
      },
      '6-1': {
        name: 'Section 6.1 - Assessment of OE Empanelment Requirements',
        description: 'This section covers the assessment of owner\'s engineer empanelment requirements'
      }
    }
  };

  const { data: playbook, error: playbookError } = await supabase
    .from('playbooks')
    .insert(playbookData)
    .select('id')
    .single();

  if (playbookError) {
    console.error('Error creating playbook:', playbookError);
    throw playbookError;
  }

  await insertPlaybookData(playbookId);

  console.log('Successfully created Solar Engineering Playbook with all data');
  return playbookId;
};

const insertPlaybookData = async (playbookId: string) => {
  console.log('Starting to insert Solar Engineering playbook data...');
  
  // Section 1.1 - Basic Engineering Design Preparation - Process Steps
  const section11ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'S',
      activity: 'Bid Incharge shares Bid Summary with Solar Engineering Head (SEH) and requests them to develop Basic Engineering Design, which is to be included in the bid submission',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'Bid Incharge',
      comments: 'Start step'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P1',
      activity: 'SEH assigns the Engineering Manager (EM) to develop Basic Engineering Design. SEH shares the Bid Summary with the EM',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'SEH',
      comments: 'Assignment of Engineering Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P2',
      activity: 'EM analyzes the Bid Summary to define the basic engineering design requirements based on shortlisted land parcel specifications, target solar power output, and feasibility of grid interconnection',
      inputs: ['Bid Summary'],
      outputs: ['Basic Engineering Design Requirement'],
      timeline: '0.5',
      responsible: 'EM',
      comments: 'Analysis of requirements'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P3',
      activity: 'EM develops the bid-specific Basic Engineering Design based on the requirements defined in P2 and leverage the Basic Engineering Design Library',
      inputs: ['Basic Engineering Design Library', 'Basic Engineering Design Requirement'],
      outputs: ['Basic Engineering Design'],
      timeline: '0.5',
      responsible: 'EM',
      comments: 'Development of basic engineering design'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P4',
      activity: 'EM defines the Guaranteed Technical Particulars (GTP) based on the Basic Engineering Design for the project',
      inputs: ['Basic Engineering Design'],
      outputs: ['Guaranteed Technical Particulars (GTP)'],
      timeline: '0.5',
      responsible: 'EM',
      comments: 'Definition of technical particulars'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P5',
      activity: 'EM develops preliminary Bill of Quantities (BoQ) and Bill of Services (BoS) leveraging GTP and Basic Engineering Design for the project',
      inputs: ['Basic Engineering Design', 'GTP'],
      outputs: ['Preliminary BoQ', 'Preliminary BoS'],
      timeline: '0.5',
      responsible: 'EM',
      comments: 'Development of preliminary bills'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P6',
      activity: 'EM seeks review and approval from SEH on the following outputs: Basic Engineering Design, GTP and Preliminary BoQ and BoS',
      inputs: [],
      outputs: [],
      timeline: '0.5',
      responsible: 'EM',
      comments: 'Seeking review and approval'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P7',
      activity: 'SEH reviews the outputs (Basic Engineering Design, GTP and Preliminary BoQ and BoS) - If modifications are required, SEH recommends changes - If modifications are not required, SEH grants approval',
      inputs: ['Basic Engineering Design', 'GTP', 'Preliminary BoQ', 'Preliminary BoS'],
      outputs: ['Basic Engineering Modifications'],
      timeline: '0.5',
      responsible: 'SEH',
      comments: 'Review and approval process'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P8',
      activity: 'If SEH recommends any modifications to the outputs shared, EM incorporates those and reshares the outputs for approval',
      inputs: ['Basic Engineering Modifications'],
      outputs: [],
      timeline: '0.5',
      responsible: 'EM',
      comments: 'Incorporation of modifications'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P9',
      activity: 'SEH seeks further review and approval from MD on the outputs (Basic Engineering Design, GTP and Preliminary BoQ and BoS)',
      inputs: [],
      outputs: [],
      timeline: '0.5',
      responsible: 'SEH',
      comments: 'MD review request'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P10',
      activity: 'If MD recommends any modifications, SEH notifies the same to EM, who incorporates those and shares the finalized outputs with SEH',
      inputs: [],
      outputs: [],
      timeline: '0.5',
      responsible: 'SEH/EM',
      comments: 'MD modifications incorporation'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P11',
      activity: 'SEH shares the Basic Engineering Design, GTP, Preliminary BoQ, and BoS with Bid Incharge for bid submission. SEH shares the preliminary BoQ and BoS with the Procurement Lead for procurement cost estimation, for the commercial bid',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'SEH',
      comments: 'Final sharing for bid submission'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'E',
      activity: 'SEH adds the finalized Basic Engineering Design Document to the Basic Engineering Design library for future reference',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'SEH',
      comments: 'End step - archiving'
    }
  ];

  // Section 1.1 - RACI Matrix
  const section11RaciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'S',
      task: 'Share Bid Summary with Solar Engineering Head (SEH) & request for the development of Basic Engineering Design',
      responsible: 'Bid Incharge',
      accountable: 'Bid Incharge',
      consulted: '',
      informed: 'SEH'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P1',
      task: 'Appoint Engineering Manager (EM) for the preparation of Basic Engineering Design & share Bid Summary',
      responsible: 'SEH',
      accountable: 'SEH',
      consulted: '',
      informed: 'EM'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P2',
      task: 'Analyze Bid Summary to define basic engineering design requirements',
      responsible: 'EM',
      accountable: 'EM',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P3',
      task: 'Develop Basic Engineering Design by leveraging Basic Engineering Design Library',
      responsible: 'EM',
      accountable: 'EM',
      consulted: '',
      informed: 'SEH'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P4',
      task: 'Define Guaranteed Technical Particulars (GTP)',
      responsible: 'EM',
      accountable: '',
      consulted: '',
      informed: 'SEH'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P5',
      task: 'Draft preliminary Bill of Quantities (BoQ) & Bill of Services (BoS)',
      responsible: 'EM',
      accountable: '',
      consulted: '',
      informed: 'SEH'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P6',
      task: 'Submit the prepared outputs (Basic Engineering Design, GTP and Preliminary BoQ and BoS) to SEH for review and approval',
      responsible: 'EM',
      accountable: 'EM',
      consulted: '',
      informed: 'SEH'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P7',
      task: 'Review the outputs received and recommend modifications or approve',
      responsible: 'SEH',
      accountable: 'SEH',
      consulted: '',
      informed: 'EM'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P8',
      task: 'Implement the recommended modifications and reshare the revised outputs for approval',
      responsible: 'EM',
      accountable: 'EM',
      consulted: '',
      informed: 'SEH'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P9',
      task: 'Seek further review and approval from MD on the outputs',
      responsible: 'SEH',
      accountable: 'SEH',
      consulted: 'MD',
      informed: 'MD'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P10',
      task: 'If MD recommends any modifications, notify the required changes to EM Incorporate the changes recommended by MD and share the finalized outputs with SEH',
      responsible: 'SEH',
      accountable: 'SEH',
      consulted: '',
      informed: 'EM'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P10',
      task: 'Incorporate the changes recommended by MD and share the finalized outputs with SEH',
      responsible: 'EM',
      accountable: 'EM',
      consulted: '',
      informed: 'SEH'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P11',
      task: 'Share the final outputs with Bid Incharge for submission',
      responsible: 'SEH',
      accountable: 'SEH',
      consulted: '',
      informed: 'Bid Incharge'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P11',
      task: 'Share preliminary BoQ & BoS with Procurement Lead for procurement cost estimation',
      responsible: 'SEH',
      accountable: 'SEH',
      consulted: '',
      informed: 'Procurement Lead'
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'E',
      task: 'Archive final design documents in Engineering Library',
      responsible: 'SEH',
      accountable: 'SEH',
      consulted: '',
      informed: ''
    }
  ];

  // Section 2.1.1 - Owner's Engineer Finalization - Process Steps
  const section211ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'S',
      activity: 'Chief Business Development notifies the Solar Engineering Head (SEH) about bids won',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'BD Team',
      comments: 'Start step - bid won notification'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P1',
      activity: 'SEH appoints Project Engineering Manager(s) (PEMs) for the project. SEH may appoint separate PEMs for civil, electrical, and plant design engineering',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'SEH',
      comments: 'Appointment of Project Engineering Managers'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P2',
      activity: 'SEH designates a Lead PEM to facilitate cross-functional coordination and external communication. If multiple PEMs are appointed, one is designated as the Lead PEM. If only one PEM is appointed, they automatically assume the role of Lead PEM',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'SEH',
      comments: 'Designation of Lead PEM'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P3',
      activity: 'Lead PEM drafts the Owner\'s Engineer (OE) Requirements List, leveraging Basic Engineering Design to determine: Capability Requirements: Expertise, qualifications, and software skills required; Staffing Requirements: Number of engineers required; Final L1 Plan to identify: Engagement Duration: Estimated duration for which OE is required; Design Verification Turnaround: Expected turnaround for design verification, aligned with the project schedule',
      inputs: ['Basic Engineering Design', 'Final L1 Plan'],
      outputs: ['OE Requirement List (draft)'],
      timeline: '0.5',
      responsible: 'Lead PEM',
      comments: 'Drafting OE requirements'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P4',
      activity: 'Lead PEM conducts a joint discussion with other PEM(s) to review the OE Requirement List, to ensure completeness and address any specific needs. Lead PEM amends the OE Requirement List, if required',
      inputs: ['OE Requirement List (draft)'],
      outputs: ['OE Requirement List (final)'],
      timeline: '0.5',
      responsible: 'Lead PEM',
      comments: 'Review and finalization of OE requirements'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P5',
      activity: 'Lead PEM shares the OE Requirement List with the Procurement Lead to initiate the RFQ process and obtain technical details from empaneled OEs',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'Lead PEM',
      comments: 'Initiation of RFQ process'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P6',
      activity: 'Procurement Lead conducts the RFQ process, and shares the responses with Lead PEM for technical evaluation',
      inputs: ['OE Requirement List (final)'],
      outputs: ['RFP Responses for OE'],
      timeline: '1 week',
      responsible: 'Procurement Lead',
      comments: 'RFQ process execution'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P7',
      activity: 'Lead PEM conducts technical evaluation of the responses and shortlists OEs. For specific requirements incorporated in P4, Lead PEM conducts a joint discussion with other PEMs for evaluation',
      inputs: ['RFP Responses for OE'],
      outputs: ['Shortlist of OE'],
      timeline: '1 week (up to 5 OE responses)',
      responsible: 'Lead PEM',
      comments: 'Technical evaluation and shortlisting'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P8',
      activity: 'Lead PEM shares the Shortlist of OEs with the Procurement Lead',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'Lead PEM',
      comments: 'Sharing shortlist'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P9',
      activity: 'Procurement Lead assesses the shortlisted responses based on appropriate evaluation criteria and hires an OE',
      inputs: ['Shortlist of OE'],
      outputs: [],
      timeline: '1 week',
      responsible: 'Procurement Lead',
      comments: 'Final OE selection'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P10',
      activity: 'Procurement Lead notifies (via email) Lead PEM of the hired OE',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'Procurement Lead',
      comments: 'Notification of hired OE'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P11',
      activity: 'Lead PEM communicates (via email) the appointment of OE to other PEM(s) and SEH',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'Lead PEM',
      comments: 'Communication of OE appointment'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'E',
      activity: 'Lead PEM conducts a kick-off discussion with OE to discuss detailed project requirements, scope, and deliverables timeline (as detailed in OE Requirement List (final)). Other PEM(s) shall also be invited to the kick-off discussion',
      inputs: [],
      outputs: [],
      timeline: '0',
      responsible: 'Lead PEM',
      comments: 'End step - kick-off with OE'
    }
  ];

  // Section 2.1.1 - RACI Matrix
  const section211RaciMatrix = [
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'S',
      task: 'Notify the Solar Engineering Head when a bid is won',
      responsible: 'BD Team',
      accountable: 'BD Team',
      consulted: '',
      informed: 'SEH'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P1',
      task: 'Appoint Project Engineering Manager(s) to oversee project engineering activities',
      responsible: 'SEH',
      accountable: 'SEH',
      consulted: '',
      informed: 'PEM(s)'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P2',
      task: 'Designate a Lead PEM for cross-functional coordination and external communication',
      responsible: 'SEH',
      accountable: 'SEH',
      consulted: '',
      informed: 'Lead PEM'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P3',
      task: 'Draft the Owner\'s Engineer Requirement List leveraging Basic Engineering Design and Final L1 Plan',
      responsible: 'Lead PEM',
      accountable: 'Lead PEM',
      consulted: '',
      informed: 'SEH'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P4',
      task: 'Review the Owner\'s Engineer Requirement List with other Project Engineering Manager(s) to ensure completeness and address specific project needs',
      responsible: 'Lead PEM',
      accountable: 'Lead PEM',
      consulted: 'Other PEM(s)',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P5',
      task: 'Submit the Owner\'s Engineer Requirement List to the Procurement Lead to initiate the RFQ process and obtain technical details from empaneled Owner\'s Engineer',
      responsible: 'Lead PEM',
      accountable: 'SEH',
      consulted: '',
      informed: 'Procurement Lead'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P6',
      task: 'Conduct the RFQ process and shares received responses with the Lead PEM for technical evaluation',
      responsible: 'Procurement Lead',
      accountable: 'Procurement Lead',
      consulted: '',
      informed: 'Lead PEM'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P7',
      task: 'Conducts technical evaluation of the responses received and create a Shortlist of Owner\'s Engineers',
      responsible: 'Lead PEM',
      accountable: 'Lead PEM',
      consulted: 'Other PEMs',
      informed: 'SEH'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P8',
      task: 'Share the shortlist of Owner\'s Engineers with the Procurement Lead',
      responsible: 'Lead PEM',
      accountable: '',
      consulted: '',
      informed: 'Procurement Lead'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P9',
      task: 'Assess the shortlisted responses based on appropriate evaluation criteria and hire an OE',
      responsible: 'Procurement Lead',
      accountable: 'Procurement Lead',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P10',
      task: 'Notify Lead PEM of the selected Owner\'s Engineer',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: 'Lead PEM'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P11',
      task: 'Inform Solar Engineering Head and other PEM(s) of the selected Owner\'s Engineer',
      responsible: 'Lead PEM',
      accountable: '',
      consulted: '',
      informed: 'SEH, Other PEM(s)'
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'E',
      task: 'Conduct kick-off meeting with OE to align on scope, timelines, and deliverables',
      responsible: 'Lead PEM',
      accountable: 'Lead PEM',
      consulted: 'Other PEMs',
      informed: 'SEH'
    }
  ];

  // Process Map entries for both sections
  const allProcessMap = [
    // Section 1.1 Process Map
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'S',
      step_type: 'start',
      title: 'Start: Bid Summary Shared',
      description: 'Bid Incharge shares Bid Summary with SEH',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P1',
      step_type: 'process',
      title: 'Assign Engineering Manager',
      description: 'SEH assigns EM and shares Bid Summary',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P2',
      step_type: 'process',
      title: 'Analyze Requirements',
      description: 'EM analyzes Bid Summary to define requirements',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P3',
      step_type: 'process',
      title: 'Develop Basic Engineering Design',
      description: 'EM develops design using library',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P4',
      step_type: 'process',
      title: 'Define GTP',
      description: 'EM defines Guaranteed Technical Particulars',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P5',
      step_type: 'process',
      title: 'Develop Preliminary Bills',
      description: 'EM develops preliminary BoQ and BoS',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P6',
      step_type: 'decision',
      title: 'SEH Review Request',
      description: 'EM seeks SEH review and approval',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P7',
      step_type: 'decision',
      title: 'SEH Review',
      description: 'SEH reviews outputs and provides feedback',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P8',
      step_type: 'process',
      title: 'Incorporate Changes',
      description: 'EM incorporates SEH modifications',
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P9',
      step_type: 'decision',
      title: 'MD Review Request',
      description: 'SEH seeks MD review and approval',
      order_index: 10
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P10',
      step_type: 'process',
      title: 'MD Modifications',
      description: 'Incorporate MD recommendations',
      order_index: 11
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'P11',
      step_type: 'process',
      title: 'Share Final Outputs',
      description: 'SEH shares outputs for bid submission',
      order_index: 12
    },
    {
      playbook_id: playbookId,
      phase_id: '1-1',
      step_id: 'E',
      step_type: 'end',
      title: 'End: Archive Documents',
      description: 'SEH archives final design in library',
      order_index: 13
    },
    // Section 2.1.1 Process Map
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'S',
      step_type: 'start',
      title: 'Start: Bid Won Notification',
      description: 'BD Team notifies SEH about won bids',
      order_index: 1
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P1',
      step_type: 'process',
      title: 'Appoint PEMs',
      description: 'SEH appoints Project Engineering Managers',
      order_index: 2
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P2',
      step_type: 'process',
      title: 'Designate Lead PEM',
      description: 'SEH designates Lead PEM for coordination',
      order_index: 3
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P3',
      step_type: 'process',
      title: 'Draft OE Requirements',
      description: 'Lead PEM drafts OE Requirements List',
      order_index: 4
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P4',
      step_type: 'process',
      title: 'Review Requirements',
      description: 'Joint review of OE Requirements with PEMs',
      order_index: 5
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P5',
      step_type: 'process',
      title: 'Initiate RFQ',
      description: 'Lead PEM shares requirements with Procurement',
      order_index: 6
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P6',
      step_type: 'process',
      title: 'Conduct RFQ',
      description: 'Procurement conducts RFQ process',
      order_index: 7
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P7',
      step_type: 'process',
      title: 'Technical Evaluation',
      description: 'Lead PEM evaluates and shortlists OEs',
      order_index: 8
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P8',
      step_type: 'process',
      title: 'Share Shortlist',
      description: 'Lead PEM shares shortlist with Procurement',
      order_index: 9
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P9',
      step_type: 'decision',
      title: 'Final Selection',
      description: 'Procurement selects and hires OE',
      order_index: 10
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P10',
      step_type: 'process',
      title: 'Notify Selection',
      description: 'Procurement notifies Lead PEM of hired OE',
      order_index: 11
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'P11',
      step_type: 'process',
      title: 'Communicate Appointment',
      description: 'Lead PEM informs PEMs and SEH',
      order_index: 12
    },
    {
      playbook_id: playbookId,
      phase_id: '2-1-1',
      step_id: 'E',
      step_type: 'end',
      title: 'End: Kick-off Meeting',
      description: 'Lead PEM conducts kick-off with OE',
      order_index: 13
    }
  ];

  // Combine all process steps
  const allProcessSteps = [
    ...section11ProcessSteps,
    ...section211ProcessSteps
  ];

  // Combine all RACI entries
  const allRaciMatrix = [
    ...section11RaciMatrix,
    ...section211RaciMatrix
  ];

  console.log(`Prepared ${allProcessSteps.length} process steps for insertion`);
  console.log(`Prepared ${allRaciMatrix.length} RACI entries for insertion`);
  console.log(`Prepared ${allProcessMap.length} process map entries for insertion`);

  try {
    // Insert process steps
    if (allProcessSteps.length > 0) {
      console.log('Inserting process steps...');
      const { error: stepsError } = await supabase
        .from('process_steps')
        .insert(allProcessSteps);

      if (stepsError) {
        console.error('Error inserting process steps:', stepsError);
        throw stepsError;
      }
      console.log(`Successfully inserted ${allProcessSteps.length} process steps`);
    }

    // Insert RACI matrix
    if (allRaciMatrix.length > 0) {
      console.log('Inserting RACI matrix...');
      const { error: raciError } = await supabase
        .from('raci_matrix')
        .insert(allRaciMatrix);

      if (raciError) {
        console.error('Error inserting RACI matrix:', raciError);
        throw raciError;
      }
      console.log(`Successfully inserted ${allRaciMatrix.length} RACI entries`);
    }

    // Insert process map
    if (allProcessMap.length > 0) {
      console.log('Inserting process map...');
      const { error: mapError } = await supabase
        .from('process_map')
        .insert(allProcessMap);

      if (mapError) {
        console.error('Error inserting process map:', mapError);
        throw mapError;
      }
      console.log(`Successfully inserted ${allProcessMap.length} process map entries`);
    }

    console.log('All Solar Engineering playbook data inserted successfully');

  } catch (error) {
    console.error('Error inserting Solar Engineering playbook data:', error);
    throw error;
  }
};
