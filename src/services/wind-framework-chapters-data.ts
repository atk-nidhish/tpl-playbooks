
import { supabase } from '@/integrations/supabase/client';

export const addFrameworkChaptersData = async (playbookId: string) => {
  console.log(`Adding Framework Chapters data to playbook: ${playbookId}`);

  // Process Steps for Chapter 3b.1 - Contract Award for Framework Agreements
  const chapter3b1ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'S',
      activity: 'Chief Procurement (CP) requests Wind Procurement Head (WPH) to identify packages for framework agreement and, shortlist vendors for the same',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Chief Procurement',
      comments: 'The vendor selection process is to be held via a closed RFP for empaneled vendors only'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P1',
      activity: 'WPH reviews the packages based on the execution strategy for contracting, and identifies high-value / long-lead items. WPH takes inputs from Engineering and BD team on design specifications and quantities, for each item, based on projected requirement in Growth Outlook',
      inputs: ['Contracting Strategy Packages', 'Growth Outlook'],
      outputs: ['BOQ'],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P2',
      activity: 'WPH assigns a Procurement Lead to each package and requests to shortlist vendors for the same',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P3',
      activity: 'Procurement Lead reviews the List of Empaneled Vendors for given BOQ items and selects vendors for the closed RFP',
      inputs: ['BOQ', 'List of Empaneled Vendors'],
      outputs: ['Vendor List for Framework Agreement'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P4',
      activity: 'List is shared with WPH and Wind Engineering Head (WEH) team for approval',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P5',
      activity: 'Procurement Lead incorporates any feedback and re-shares for approval',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P6',
      activity: 'Procurement Lead prepares the Framework RFP. Framework RFP is prepared by modifying the Framework RFP template',
      inputs: ['Framework RFP Template'],
      outputs: ['Framework RFP'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P7',
      activity: 'Procurement Lead floats the Framework RFP and collates responses',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P8',
      activity: 'Procurement Lead shares the responses / proposals with the WEH for technical evaluation',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P9',
      activity: 'WEH shortlists vendor proposals and shares the list with Procurement Lead',
      inputs: ['RFP Responses'],
      outputs: ['Shortlisted Vendor Proposals'],
      timeline: '',
      responsible: 'Wind Engineering Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P10',
      activity: 'Procurement Lead reviews the quotations within these proposals. Procurement Lead selects 2-3 vendors based on appropriate assessment criteria, highlighting the order of selection preference',
      inputs: ['Shortlisted Vendor Proposals'],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P11',
      activity: 'Procurement Lead shares the selected vendors quote with WPH for finalization and approval to initiate contract negotiations. If the contract size > 10% of the procurement budget, approval of Chief Procurement is also required',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P12',
      activity: 'WPH finalizes a vendor and directs the Procurement Lead to initiate contract negotiation',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P13',
      activity: 'Procurement Lead negotiates and finalizes contract terms with the vendor. Procurement Lead prepares the Framework Agreement basis negotiated terms',
      inputs: [],
      outputs: ['Framework Agreement'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P14',
      activity: 'Procurement Lead shares the Framework Agreement with WPH for approval. If the contract size > 10% of the procurement budget, approval of Chief Procurement is also required',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P15',
      activity: 'Procurement Lead incorporates any feedback and re-shares for approval',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P16',
      activity: 'Procurement Lead ensures No Deviation Certificate is received from the Vendor',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P17',
      activity: 'Procurement Lead ensures signature of Framework Agreement by signatories from both sides',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'E',
      activity: 'Procurement Lead shares the Framework Agreement with WPH and Chief Procurement',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    }
  ];

  // Process Steps for Chapter 3b.2 - Framework Agreement Execution
  const chapter3b2ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'S',
      activity: 'Procurement Lead shares the Framework Agreement with WPH and Chief Procurement. Procurement Lead will serve as the Order Manager for the given framework contract',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P1',
      activity: 'Order Manager requests Project Manager to align delivery timelines with vendor',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Order Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P2',
      activity: 'Project Manager finalizes the delivery schedule with vendor',
      inputs: ['Delivery Schedule'],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: 'Timelines will be agreed in the contract, at a monthly level. This alignment is at a day-wise level.'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P3',
      activity: 'Project Manager informs Chief SCM when items are ready at factory',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P4',
      activity: 'Chief SCM hires a third-party inspection (TPI) agency to inspect items at the manufacturing site. Inspection Process is outlined in the Wind Engineering Playbook',
      inputs: [],
      outputs: ['Inspection Checklist'],
      timeline: '',
      responsible: 'Chief SCM',
      comments: 'TPI Onboarding Process is outlined in Chapter 5 of the Wind Engineering Playbook. Inspection procedure is outlined in Chapter 6 of the Wind Engineering Playbook.'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P5',
      activity: 'Once inspection is complete, Chief SCM grants approval for all components under evaluation and issues the Quality Release Note (QRN) to the vendor',
      inputs: ['Inspection Checklist'],
      outputs: ['Quality Release Note'],
      timeline: '',
      responsible: 'Chief SCM',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P6',
      activity: 'Vendor raises invoices to the Order Manager, as per the milestones, with required proof documents. For example, Vendor prepares and shares the payment invoice, along with QRN, to the Order Manager',
      inputs: ['Quality Release Note'],
      outputs: ['Payment Invoice'],
      timeline: '',
      responsible: 'Vendor',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P7',
      activity: 'Order Manager confirms the QRN with the Chief SCM',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Order Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P8',
      activity: 'Order Manager releases payment to the vendor so items can be dispatched to the site',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Order Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P9',
      activity: 'Goods are dispatched to the project site. Delivery is tracked by the Chief SCM in the Delivery Tracker. If item is delayed, the PO is added to the Delayed Items Tracker',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Chief SCM',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'E',
      activity: 'Chief SCM receives the delivery and shares the Goods Received Note (GRN) with the Order Manager',
      inputs: [],
      outputs: ['Goods Received Note'],
      timeline: '',
      responsible: 'Chief SCM',
      comments: ''
    }
  ];

  // RACI Matrix for Chapter 3b.1
  const chapter3b1RaciEntries = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'S',
      task: 'Request Wind Procurement Head (WPH) to identify packages for framework agreement and, shortlist vendors for the same',
      responsible: 'Chief Procurement',
      accountable: '',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P1',
      task: 'Prepare the BOQ of items to be included in framework agreement',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: 'Engineering, BD Teams',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P2',
      task: 'Assign a Procurement Lead for the package',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: '',
      informed: 'Procurement Lead'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P3',
      task: 'Prepare list of vendors for BOQ items',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P4',
      task: 'Share the list for approval with WPH and WEH',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Procurement Head, Wind Engineering Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P5',
      task: 'Incorporate any feedback and re-share for approval',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Procurement Head, Wind Engineering Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P6',
      task: 'Prepare the framework RFP',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P7',
      task: 'Float the Framework RFP and collate responses',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P8',
      task: 'Share the RFP responses with Wind Engineering Head (WEH) for technical evaluation',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: 'Wind Engineering Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P9',
      task: 'Shortlist vendors and share the list with Procurement Lead',
      responsible: 'Wind Engineering Head',
      accountable: '',
      consulted: '',
      informed: 'Procurement Lead'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P10',
      task: 'Review vendor proposals and highlight 2-3 vendors in order of preference',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P11',
      task: 'Share the highlighted vendors proposals with WPH for finalization and approval to initiate contract negotiations',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Procurement Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P12',
      task: 'Finalize vendor and direct Procurement Lead to initiate contract negotiations',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: '',
      informed: 'Procurement Lead'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P13',
      task: 'Prepares the Framework Agreement basis negotiated terms with vendor',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P14',
      task: 'Share the Framework Agreement with WPH for approval',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Procurement Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P15',
      task: 'Incorporate any feedback and re-share for approval',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Procurement Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P16',
      task: 'Ensure No Deviation Certificate is received from the Vendor',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'P17',
      task: 'Ensure signature of Framework Agreement by signatories from both sides',
      responsible: 'Procurement Lead',
      accountable: 'Procurement Lead',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b1',
      step_id: 'E',
      task: 'Share the signed Framework Agreement with WPH and Chief Procurement',
      responsible: 'Procurement Lead',
      accountable: 'Procurement Lead',
      consulted: '',
      informed: 'Chief Procurement, Wind Procurement Head'
    }
  ];

  // RACI Matrix for Chapter 3b.2
  const chapter3b2RaciEntries = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'S',
      task: 'Share the Framework Agreement with WPH and Chief Procurement',
      responsible: 'Procurement Lead',
      accountable: 'Procurement Lead',
      consulted: '',
      informed: 'Wind Procurement Head, Chief Procurement'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P1',
      task: 'Request Project Manager to align delivery timelines with vendor',
      responsible: 'Order Manager',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P2',
      task: 'Finalize delivery schedule with vendor',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'Order Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P3',
      task: 'Inform Chief SCM that items are ready at factory',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'Chief SCM'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P4',
      task: 'Send a third-party inspection (TPI) agency to inspect items at manufacturing site',
      responsible: 'Chief SCM',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P5',
      task: 'Issue the Quality Release Note (QRN) to the vendor',
      responsible: 'Chief SCM',
      accountable: 'Chief SCM',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P6',
      task: 'Receive payment invoice from the vendor',
      responsible: 'Order Manager',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P7',
      task: 'Confirm the QRN with Chief SCM',
      responsible: 'Order Manager',
      accountable: '',
      consulted: 'Chief SCM',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P8',
      task: 'Release payment to the vendor so items can be dispatched to the site',
      responsible: 'Order Manager',
      accountable: '',
      consulted: '',
      informed: 'Chief SCM, Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'P9',
      task: 'Track deliveries and update delivery and delayed items tracker accordingly',
      responsible: 'Chief SCM',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3b2',
      step_id: 'E',
      task: 'Receive delivery at site and release GRN',
      responsible: 'Chief SCM',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    }
  ];

  try {
    // Insert process steps for chapter 3b.1
    const { error: steps3b1Error } = await supabase
      .from('process_steps')
      .insert(chapter3b1ProcessSteps);

    if (steps3b1Error) {
      console.error('Error inserting chapter 3b.1 process steps:', steps3b1Error);
      throw steps3b1Error;
    }

    // Insert process steps for chapter 3b.2
    const { error: steps3b2Error } = await supabase
      .from('process_steps')
      .insert(chapter3b2ProcessSteps);

    if (steps3b2Error) {
      console.error('Error inserting chapter 3b.2 process steps:', steps3b2Error);
      throw steps3b2Error;
    }

    // Insert RACI entries for chapter 3b.1
    const { error: raci3b1Error } = await supabase
      .from('raci_matrix')
      .insert(chapter3b1RaciEntries);

    if (raci3b1Error) {
      console.error('Error inserting chapter 3b.1 RACI entries:', raci3b1Error);
      throw raci3b1Error;
    }

    // Insert RACI entries for chapter 3b.2
    const { error: raci3b2Error } = await supabase
      .from('raci_matrix')
      .insert(chapter3b2RaciEntries);

    if (raci3b2Error) {
      console.error('Error inserting chapter 3b.2 RACI entries:', raci3b2Error);
      throw raci3b2Error;
    }

    console.log('Successfully added Framework Chapters data for chapters 3b.1 and 3b.2');
  } catch (error) {
    console.error('Error adding Framework Chapters data:', error);
    throw error;
  }
};
