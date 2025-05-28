
import { supabase } from '@/integrations/supabase/client';

export const addWindCommissioningAdditionalData = async (playbookId: string) => {
  console.log(`Adding additional Wind Commissioning data to playbook: ${playbookId}`);

  // Process Steps for Chapter 3a.1 - Contract Award for Project-specific Agreement
  const chapter3a1ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'S',
      activity: 'Technical Team raises a Purchase Requisition (PR) to a Procurement Lead',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Technical Team',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P1',
      activity: 'Procurement Lead reviews the PR and decides one of the following: Repeat order to a previously contracted vendor OR RFP for empaneled vendors',
      inputs: ['Purchase Requisition (PR)'],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: 'For repeat order, approval will be taken from WPH, and steps will continue from P9 onwards'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P2',
      activity: 'Procurement Lead prepares the RFP and incorporates: Technical requirements from the Wind Engineering Head (WEH), Timeline that aligns with the Project Procurement Plan',
      inputs: ['BoQ / BoS', 'RFP Template', 'Technical requirements', 'Project Procurement Plan'],
      outputs: ['RFP'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: 'RFP is prepared by modifying the RFP template'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P3',
      activity: 'Procurement Lead floats the RFP to empaneled vendors and collates the responses',
      inputs: [],
      outputs: ['RFP responses'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P4',
      activity: 'Procurement Lead shares the responses / proposals with the WEH for technical evaluation',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P5',
      activity: 'WEH shortlists vendor proposals and shares the list with Procurement Lead',
      inputs: ['RFP responses'],
      outputs: ['Shortlisted Vendor Proposals'],
      timeline: '',
      responsible: 'Wind Engineering Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P6',
      activity: 'Procurement Lead reviews the quotations within these proposals, Procurement Lead selects 2-3 vendors based on appropriate assessment criteria, highlighting the order of selection preference',
      inputs: ['Shortlisted Vendor Proposals'],
      outputs: ['Shortlisted Vendor List'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P7',
      activity: 'Procurement Lead shares the selected vendors quotes with WPH for finalization and approval to initiate contract negotiations',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: 'If the contract size > 10% of the procurement budget, approval of Chief Procurement is also required'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P8',
      activity: 'WPH finalizes a vendor and directs the Procurement Lead to initiate contract negotiation',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Wind Procurement Head',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P9',
      activity: 'Procurement Lead negotiates contract terms and finalizes them with the vendor, Procurement Lead prepares the contract basis negotiated terms',
      inputs: [],
      outputs: ['Vendor Contract'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P10',
      activity: 'Procurement Lead shares the Vendor Contract with WPH for approval',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: 'If the contract size > 10% of the procurement budget, approval of Chief Procurement is also required'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
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
      phase_id: 'chapter-3a1',
      step_id: 'P12',
      activity: 'Procurement Lead ensures No Deviation Certificate is received from the Vendor',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P13',
      activity: 'Procurement Lead ensures signature of Vendor Contract by signatories from both sides',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'E',
      activity: 'Procurement Lead shares the signed Vendor Contract with WPH',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    }
  ];

  // Process Steps for Chapter 3a.2 - Purchase Requisition Execution under Project-specific Agreement
  const chapter3a2ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'S',
      activity: 'Procurement Lead shares the signed Vendor Contract with WPH',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P1',
      activity: 'Procurement Lead issues a Purchase Order (PO) to the vendor basis requirements outlined in the contract, Procurement Lead to serve as the Order Manager for the given PO',
      inputs: ['Vendor Contract'],
      outputs: ['Purchase Order (PO)'],
      timeline: '',
      responsible: 'Procurement Lead',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P2',
      activity: 'Order Manager updates the PO tracker and informs the Project Manager',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Order Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P3',
      activity: 'Vendor aligns the schedule with the Project Manager, Supply Chain Management (SCM) Chief and respective Technical Team',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Project Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P4',
      activity: 'For goods in the TPI list, Chief SCM hires a third-party inspection (TPI) agency to inspect goods at manufacturing site',
      inputs: [],
      outputs: ['Inspection Checklist'],
      timeline: '',
      responsible: 'Chief SCM',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P5',
      activity: 'Once inspection process is complete, Chief SCM grants approval for all components under evaluation and issues the Quality Release Note (QRN) to the vendor',
      inputs: ['Inspection Checklist'],
      outputs: ['Quality Release Note'],
      timeline: '',
      responsible: 'Chief SCM',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P6',
      activity: 'Goods are dispatched to the project site, Delivery is tracked by the Chief SCM in the Delivery Tracker, If item is delayed, the PO gets added to the Delayed Items Tracker',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Chief SCM',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P7',
      activity: 'Chief SCM receives the delivery on-site and issues the Goods Received Note (GRN) to the Vendor',
      inputs: [],
      outputs: ['Goods Received Note'],
      timeline: '',
      responsible: 'Chief SCM',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P8',
      activity: 'Vendor prepares the payment invoice and shares it with the Order Manager, along with the GRN',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Vendor',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P9',
      activity: 'Order Manager confirms the GRN with the Chief SCM',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Order Manager',
      comments: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'E',
      activity: 'Order Manager releases payment to the Vendor and updates the PO tracker',
      inputs: [],
      outputs: [],
      timeline: '',
      responsible: 'Order Manager',
      comments: ''
    }
  ];

  // RACI Matrix for Chapter 3a.1
  const chapter3a1RaciEntries = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'S',
      task: 'Raise a Purchase Requisition (PR) to the Procurement Lead',
      responsible: 'Technical Team',
      accountable: '',
      consulted: '',
      informed: 'Procurement Lead, Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P1',
      task: 'Reviews the PR and decides between repeat and new order',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P2',
      task: 'Prepare the RFP',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Engineering Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P3',
      task: 'Float the RFP to empaneled vendors and collate the responses',
      responsible: 'Procurement Lead',
      accountable: 'Procurement Lead',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P4',
      task: 'Share the RFP responses with the Wind Engineering Head (WEH) for technical evaluation',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: 'Wind Engineering Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P5',
      task: 'Shortlist vendors and share the list with Procurement Lead',
      responsible: 'Wind Engineering Head',
      accountable: '',
      consulted: '',
      informed: 'Procurement Lead'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P6',
      task: 'Choose vendors for contract negotiations based on appropriate assessment criteria',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P7',
      task: 'Share the selected vendors proposals with Wind Procurement Head for finalization and approval to initiate contract negotiations',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Procurement Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P8',
      task: 'Finalize a vendor and direct the Procurement Lead to initiate contract negotiation',
      responsible: 'Wind Procurement Head',
      accountable: '',
      consulted: '',
      informed: 'Procurement Lead'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P9',
      task: 'Prepare the contract basis negotiated terms with vendor',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P10',
      task: 'Share the Vendor Contract with WPH for approval',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Procurement Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P11',
      task: 'Incorporate any feedback and re-share for approval',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: 'Wind Procurement Head',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P12',
      task: 'Ensure No Deviation Certificate is received from the Vendor',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'P13',
      task: 'Ensure signature of Vendor Contract by signatories from both sides',
      responsible: 'Procurement Lead',
      accountable: 'Procurement Lead',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a1',
      step_id: 'E',
      task: 'Share the signed Vendor Contract with WPH',
      responsible: 'Procurement Lead',
      accountable: 'Procurement Lead',
      consulted: '',
      informed: 'Wind Procurement Head'
    }
  ];

  // RACI Matrix for Chapter 3a.2
  const chapter3a2RaciEntries = [
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'S',
      task: 'Share the signed Vendor Contract with WPH',
      responsible: 'Procurement Lead',
      accountable: 'Procurement Lead',
      consulted: '',
      informed: 'Wind Procurement Head'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P1',
      task: 'Issue a Purchase Order (PO) to the vendor basis requirements outlined in the contract',
      responsible: 'Procurement Lead',
      accountable: '',
      consulted: '',
      informed: 'Technical Team'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P2',
      task: 'Update the PO tracker',
      responsible: 'Order Manager',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P3',
      task: 'Request vendor for schedule confirmation; Inform Chief SCM',
      responsible: 'Project Manager',
      accountable: '',
      consulted: '',
      informed: 'Chief SCM'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P4',
      task: 'Send a third-party inspection (TPI) agency to inspect goods at manufacturing site',
      responsible: 'Chief SCM',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P5',
      task: 'Issue the Quality Release Note (QRN) to the vendor',
      responsible: 'Chief SCM',
      accountable: 'Chief SCM',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P6',
      task: 'Track deliveries and update delivery and delayed items tracker accordingly',
      responsible: 'Chief SCM',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P7',
      task: 'Issue the GRN on receiving delivery on site',
      responsible: 'Chief SCM',
      accountable: '',
      consulted: '',
      informed: 'Project Manager'
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P8',
      task: 'Receive payment invoice from the vendor',
      responsible: 'Order Manager',
      accountable: '',
      consulted: '',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'P9',
      task: 'Confirm GRN with Chief SCM',
      responsible: 'Order Manager',
      accountable: '',
      consulted: 'Chief SCM',
      informed: ''
    },
    {
      playbook_id: playbookId,
      phase_id: 'chapter-3a2',
      step_id: 'E',
      task: 'Release payment to the Vendor and update the PO tracker',
      responsible: 'Order Manager',
      accountable: 'Order Manager',
      consulted: '',
      informed: 'Wind Procurement Head'
    }
  ];

  // Add new process map images
  await fetch('/lovable-uploads/ba7bcb46-50f3-45af-b059-43ecec5d3bf4.png');
  await fetch('/lovable-uploads/e3364575-a72a-4210-bd19-60a920fed4ac.png');

  try {
    // Insert process steps for chapter 3a.1
    const { error: steps3a1Error } = await supabase
      .from('process_steps')
      .insert(chapter3a1ProcessSteps);

    if (steps3a1Error) {
      console.error('Error inserting chapter 3a.1 process steps:', steps3a1Error);
      throw steps3a1Error;
    }

    // Insert process steps for chapter 3a.2
    const { error: steps3a2Error } = await supabase
      .from('process_steps')
      .insert(chapter3a2ProcessSteps);

    if (steps3a2Error) {
      console.error('Error inserting chapter 3a.2 process steps:', steps3a2Error);
      throw steps3a2Error;
    }

    // Insert RACI entries for chapter 3a.1
    const { error: raci3a1Error } = await supabase
      .from('raci_matrix')
      .insert(chapter3a1RaciEntries);

    if (raci3a1Error) {
      console.error('Error inserting chapter 3a.1 RACI entries:', raci3a1Error);
      throw raci3a1Error;
    }

    // Insert RACI entries for chapter 3a.2
    const { error: raci3a2Error } = await supabase
      .from('raci_matrix')
      .insert(chapter3a2RaciEntries);

    if (raci3a2Error) {
      console.error('Error inserting chapter 3a.2 RACI entries:', raci3a2Error);
      throw raci3a2Error;
    }

    console.log('Successfully added Wind Commissioning additional data for chapters 3a.1 and 3a.2');
  } catch (error) {
    console.error('Error adding additional Wind Commissioning data:', error);
    throw error;
  }
};
