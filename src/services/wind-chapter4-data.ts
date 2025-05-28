
import { supabase } from "@/integrations/supabase/client";

export const addChapter4Data = async (playbookId: string) => {
  console.log('Adding Chapter 4 data to playbook:', playbookId);

  // Chapter 4.1 - Issue Escalation and Resolution Process Steps
  const chapter41ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "S",
      activity: "Project Manager (PM) identifies an issue with a contractor that may impact schedule or cost",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "Project Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P1",
      activity: "PM attempts immediate resolution with the contractor. If unsuccessful, PM escalates it to the Order Manager (OM)",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "Project Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P2",
      activity: "OM holds a discussion with the contractor to resolve the issue",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "Order Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P3",
      activity: "OM implements a short-term fix to minimize schedule delays or cost overruns. E.g. arranging temporary alternate vendors to supply goods or provide services",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "Order Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P4",
      activity: "For recurring issues, OM conducts Root Cause Analysis (RCA) prepares a report and shares it with Wind Procurement Head (WPH)",
      inputs: [],
      outputs: ["RCA Report"],
      timeline: "",
      responsible: "Order Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P5",
      activity: "WPH consults respective team and ensures process enhancements and preventive actions",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "Wind Procurement Head",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P6",
      activity: "Based on the terms laid out in the contract, Wind Procurement Head calculates penalties / assesses grounds for formal warning. If there are grounds for contract termination, WPH escalates to Chief Procurement",
      inputs: ["RCA Report"],
      outputs: ["Vendor Contract"],
      timeline: "",
      responsible: "Wind Procurement Head",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P7",
      activity: "Chief Procurement assesses the situation and decides on contract termination. If contract size > 10% of capex budget, Chief Procurement seeks approval from Chief Commercial Officer for contract termination",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "Chief Procurement",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P8",
      activity: "Chief Procurement accordingly issues a formal warning, penalty or letter of termination",
      inputs: [],
      outputs: ["Formal Notice"],
      timeline: "",
      responsible: "Chief Procurement",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "E",
      activity: "Chief Procurement adds the notice to vendor record and shares it with WPH and OM",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "Chief Procurement",
      comments: ""
    }
  ];

  // Chapter 4.2 - Change of Scope Process Steps
  const chapter42ProcessSteps = [
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "S",
      activity: "Project Manager (PM) requests Wind Engineering Head (WEH) for Technical Scope Change Note, to capture any technical deviation. For changes in quantity, this note is not required",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "Project Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "P1",
      activity: "WEH prepares the Technical Scope Change Note and shares it with the PM",
      inputs: ["Technical Section of Vendor RFP"],
      outputs: ["Technical Scope Change Note"],
      timeline: "",
      responsible: "Wind Engineering Head",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "P2",
      activity: "PM prepares a follow-up PR and shares it with the current Order Manager (OM)",
      inputs: ["Technical Scope Change Note"],
      outputs: ["Follow-up PR"],
      timeline: "",
      responsible: "Project Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "P3",
      activity: "Order Manager prepares a Purchase Order (PO) basis the PR shared by PM",
      inputs: ["Follow-up PR"],
      outputs: ["Purchase Order"],
      timeline: "",
      responsible: "Order Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "P4",
      activity: "Order Manager shares the PO with Wind Procurement Head (WPH) for approval. If contract size > 10% of capex budget, approval of Chief Procurement is also taken",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "Order Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "P5",
      activity: "Order Manager incorporates any feedback and re-shares for approval",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "Order Manager",
      comments: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "E",
      activity: "Order Manager issues the PO to the vendor",
      inputs: [],
      outputs: [],
      timeline: "",
      responsible: "Order Manager",
      comments: ""
    }
  ];

  // Chapter 4.1 RACI Matrix
  const chapter41RACIData = [
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "S",
      task: "Identification of a contractor issue that may impact schedule or cost",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P1",
      task: "Attempt immediate resolution with the contractor",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Order Manager"
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P2",
      task: "Hold discussion and attempt a resolution with the contractor",
      responsible: "Order Manager",
      accountable: "",
      consulted: "Project Manager",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P3",
      task: "Implementation of a short-term fix to prevent impact on schedule or cost",
      responsible: "Order Manager",
      accountable: "",
      consulted: "Project Manager",
      informed: "Project Manager"
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P4",
      task: "Prepare a Root Cause Analysis (RCA) report and share it with Wind Procurement Head (WPH)",
      responsible: "Order Manager",
      accountable: "",
      consulted: "Project Manager",
      informed: "Wind Procurement Head"
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P5",
      task: "Ensure process enhancements and preventive actions",
      responsible: "Wind Procurement Head",
      accountable: "",
      consulted: "Project Manager",
      informed: "Order Manager"
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P6",
      task: "Calculate penalties and assesses grounds for formal warning / termination",
      responsible: "Wind Procurement Head",
      accountable: "",
      consulted: "",
      informed: "Chief Procurement"
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P7",
      task: "Decide on contract termination and seek approval from Chief Commercial Officer, if required",
      responsible: "Chief Procurement",
      accountable: "Chief Procurement",
      consulted: "Project team",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "P8",
      task: "Issue a formal warning, penalty or letter of termination, based on decision",
      responsible: "Chief Procurement",
      accountable: "",
      consulted: "",
      informed: "Wind Procurement Head"
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.1",
      step_id: "E",
      task: "Add the notice to vendor record and share it with WPH and OM",
      responsible: "Chief Procurement",
      accountable: "",
      consulted: "",
      informed: "Wind Procurement Head, Order Manager"
    }
  ];

  // Chapter 4.2 RACI Matrix
  const chapter42RACIData = [
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "S",
      task: "Request Wind Engineering Head (WEH) to share the technical scope change note",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Wind Engineering Head"
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "P1",
      task: "Prepare the technical scope change note and share it with the PM",
      responsible: "Wind Engineering Head",
      accountable: "",
      consulted: "",
      informed: "Project Manager"
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "P2",
      task: "Prepare a follow-up PR and share it with OM",
      responsible: "Project Manager",
      accountable: "",
      consulted: "",
      informed: "Order Manager"
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "P3",
      task: "Prepare a Purchase Order based on the PR",
      responsible: "Order Manager",
      accountable: "",
      consulted: "",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "P4",
      task: "Share the PO with Wind Procurement Head (WPH) for approval",
      responsible: "Order Manager",
      accountable: "",
      consulted: "Wind Procurement Head",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "P5",
      task: "Incorporate any feedback from WPH and re-share for feedback",
      responsible: "Order Manager",
      accountable: "",
      consulted: "Wind Procurement Head",
      informed: ""
    },
    {
      playbook_id: playbookId,
      phase_id: "chapter-4.2",
      step_id: "E",
      task: "Issues the PO to the respective vendor",
      responsible: "Order Manager",
      accountable: "",
      consulted: "",
      informed: "Wind Procurement Head, Project Manager"
    }
  ];

  try {
    // Insert process steps for Chapter 4.1
    const { error: processStepsError41 } = await supabase
      .from('process_steps')
      .insert(chapter41ProcessSteps);

    if (processStepsError41) {
      console.error('Error inserting Chapter 4.1 process steps:', processStepsError41);
      throw processStepsError41;
    }

    // Insert process steps for Chapter 4.2
    const { error: processStepsError42 } = await supabase
      .from('process_steps')
      .insert(chapter42ProcessSteps);

    if (processStepsError42) {
      console.error('Error inserting Chapter 4.2 process steps:', processStepsError42);
      throw processStepsError42;
    }

    // Insert RACI data for Chapter 4.1
    const { error: raciError41 } = await supabase
      .from('raci_matrix')
      .insert(chapter41RACIData);

    if (raciError41) {
      console.error('Error inserting Chapter 4.1 RACI data:', raciError41);
      throw raciError41;
    }

    // Insert RACI data for Chapter 4.2
    const { error: raciError42 } = await supabase
      .from('raci_matrix')
      .insert(chapter42RACIData);

    if (raciError42) {
      console.error('Error inserting Chapter 4.2 RACI data:', raciError42);
      throw raciError42;
    }

    console.log('Successfully added Chapter 4 data');
  } catch (error) {
    console.error('Error adding Chapter 4 data:', error);
    throw error;
  }
};
