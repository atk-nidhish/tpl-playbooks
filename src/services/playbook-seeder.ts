
import { supabase } from '@/integrations/supabase/client';

export const createPlaybookFromImages = async (title: string, description: string, phases: any) => {
  try {
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: title.toLowerCase().replace(/\s+/g, '-'),
        title: title,
        description: description,
        phases: phases
      })
      .select()
      .single();

    if (playbookError) throw playbookError;

    console.log(`Playbook ${title} created successfully`);
    return playbook;

  } catch (error) {
    console.error('Error creating playbook from images:', error);
    throw error;
  }
};

export const addProcessSteps = async (playbookId: string, steps: any[]) => {
  try {
    const { error } = await supabase
      .from('process_steps')
      .insert(steps.map(step => ({ ...step, playbook_id: playbookId })));

    if (error) throw error;
    console.log('Process steps added successfully');
  } catch (error) {
    console.error('Error adding process steps:', error);
    throw error;
  }
};

export const addRACIMatrix = async (playbookId: string, raciData: any[]) => {
  try {
    const { error } = await supabase
      .from('raci_matrix')
      .insert(raciData.map(item => ({ ...item, playbook_id: playbookId })));

    if (error) throw error;
    console.log('RACI matrix added successfully');
  } catch (error) {
    console.error('Error adding RACI matrix:', error);
    throw error;
  }
};

export const addProcessMap = async (playbookId: string, processMapData: any[]) => {
  try {
    const { error } = await supabase
      .from('process_map')
      .insert(processMapData.map(item => ({ ...item, playbook_id: playbookId })));

    if (error) throw error;
    console.log('Process map added successfully');
  } catch (error) {
    console.error('Error adding process map:', error);
    throw error;
  }
};

export const createWindCommissioningPlaybook = async () => {
  try {
    // Define phases structure with Chapter 3 containing sub-chapters
    const phases = {
      "Chapter 1": {
        name: "Chapter 1 - Construction and Erection Inspection",
        description: "Inspections conducted on completion of construction and erection"
      },
      "Chapter 2": {
        name: "Chapter 2 - Pre-commissioning Testing", 
        description: "Tests conducted as part of the pre-commissioning process"
      },
      "Chapter 3": {
        name: "Chapter 3 - Approvals for First Time Charging",
        description: "Regulatory approvals and processes for first-time charging"
      },
      "Chapter 3.1": {
        name: "Chapter 3.1 - RLDC User Registration",
        description: "Process for registering with Regional Load Dispatch Centre"
      },
      "Chapter 3.2": {
        name: "Chapter 3.2 - CEIG Approval & FTC Intimation to RLDC",
        description: "Securing regulatory approvals for energization and first-time charging"
      },
      "Chapter 4": {
        name: "Chapter 4 - First Time Charging (FTC) & Commercial Operation",
        description: "Energization and testing leading to commercial operation"
      },
      "Chapter 5": {
        name: "Chapter 5 - Performance Testing & HOTO",
        description: "Performance testing and handover to O&M team"
      }
    };

    // Create the main playbook
    const playbook = await createPlaybookFromImages(
      "Wind Commissioning Playbook",
      "Comprehensive Commissioning Guide for Wind Project Execution",
      phases
    );

    // Process Steps for Chapter 1
    const chapter1Steps = [
      {
        phase_id: "Chapter 1",
        step_id: "S",
        activity: "OEM Project Manager informs the Project Manager (PM) that the erection of at least 'N' WTGs and the Balance of Plant (BOP) has been completed. OEM Project Manager serves as the OEM SPOC for the entire commissioning process",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "OEM SPOC",
        comments: "N will be defined in the PPA as the minimum number of WTGs (in MW) that can be commissioned together."
      },
      {
        phase_id: "Chapter 1",
        step_id: "P1", 
        activity: "PM informs Chief O&M that construction and erection are complete and requests him to appoint a Commissioning POC (CPOC). CPOC is appointed once, at the time of commissioning of the first cluster of WTGs",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P2",
        activity: "PM directs the Site Quality Head (SQH) and CPOC to conduct an inspection of the WTG and BOP. Inspection of the PSS will happen separately, but the procedure remains the same",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P3",
        activity: "SQH requests OEM SPOC to individually appoint respective Mechanical, Civil and Electrical OEM engineers for the inspection of the WTG and BOP",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P4",
        activity: "OEM SPOC appoints Mechanical, Civil and Electrical OEM engineers for the inspection",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P5",
        activity: "SQH requests Site Mechanical, Civil and Electrical Heads, and CPOC, to accompany him for the respective inspection",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P6",
        activity: "SQH leads the inspection, and logs all the deviations in a punch point list. Construction checklist is checked to ensure open observations / NCRs have been closed",
        inputs: [],
        outputs: ["Punch Point List"],
        timeline: "",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P7",
        activity: "SQH ensures signatures on the punch point list from the OEM Engineer and respective Site Functional Head. Commissioning POC has an observatory role at this stage",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P8",
        activity: "OEM SPOC closes all the critical punch points and prepares the compliance report",
        inputs: [],
        outputs: ["Compliance Report"],
        timeline: "",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P9",
        activity: "OEM SPOC shares the compliance report with the SQH for approval",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P10",
        activity: "SQH provides feedback and requests OEM SPOC to re-share for approval",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P11",
        activity: "SQH signs off on the compliance report and issues the Mechanical Clearance Certificate (MCC) to the OEM / Contractor SPOC",
        inputs: [],
        outputs: ["Mechanical Clearance Certificate"],
        timeline: "",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "E",
        activity: "SQH notifies the PM that MCC has been issued",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Site Quality Head",
        comments: ""
      }
    ];

    // Process Steps for Chapter 2
    const chapter2Steps = [
      {
        phase_id: "Chapter 2",
        step_id: "S",
        activity: "SQH notifies the Project Manager (PM) that MCC has been issued",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P1",
        activity: "PM notifies the OEM SPOC and Commissioning POC (CPOC) to initiate the pre-commissioning tests. For BOP, respective contractor conducts the tests, while the procedure remains the same as outlined below",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P2",
        activity: "OEM SPOC prepares the Pre-commissioning checklist and shares it with Site Electrical Lead (SEL) for approval",
        inputs: [],
        outputs: ["Pre-commissioning checklist"],
        timeline: "",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P3",
        activity: "SEL recommends changes, if required, and provides sign-off on the checklist",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Site Electrical Lead",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P4",
        activity: "SEL shares the checklist with CPOC for approval",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Site Electrical Lead",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P5",
        activity: "CPOC recommends changes, if required, and provides sign-off on the checklist",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Commissioning POC",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P6",
        activity: "CPOC shares the approved checklist with the OEM SPOC",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Commissioning POC",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P7",
        activity: "OEM Engineers conducts the requisite tests, in the presence of OEM SPOC, SEL and CPOC, and documents the results in the checklist",
        inputs: [],
        outputs: ["Pre-commissioning checklist"],
        timeline: "",
        responsible: "OEM Engineers",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P8",
        activity: "OEM SPOC signs the checklist containing the test results and shares it with the CPOC",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P9",
        activity: "CPOC seeks clarifications from the OEM SPOC, if any, and signs-off on the checklist",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Commissioning POC",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P10",
        activity: "CPOC shares the checklist with the SEL",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Commissioning POC",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P11",
        activity: "SEL seeks clarifications from the OEM SPOC, if any, and signs-off on the checklist",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Site Electrical Lead",
        comments: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "E",
        activity: "SEL shares the approved pre-commissioning test results with the PM",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Site Electrical Lead",
        comments: ""
      }
    ];

    // Process Steps for Chapter 4
    const chapter4Steps = [
      {
        phase_id: "Chapter 4",
        step_id: "S",
        activity: "RAH notifies the Project Manager (PM) of the successful trial run certificate and COD certificate, of the last cluster of WTGs",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Regulatory Approvals Head",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P1",
        activity: "PM directs the Site Quality Head (SQH) to ensure closure of all punch points",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P2",
        activity: "SQH ensures closure of all punch points, signs-off on it and takes sign-off from OEM SPOC and Commissioning POC (CPOC). SQH shares the punch point list with the PM",
        inputs: [],
        outputs: ["Punch Point List"],
        timeline: "",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P3",
        activity: "PM directs the OEM SPOC to initiate the performance test of the plant",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P4",
        activity: "OEM SPOC conducts the performance test as outlined in the OEM contract",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P5",
        activity: "OEM SPOC shares the results of the performance test with the PM. If results are not satisfactory, the test may be repeated as outlined in the contract",
        inputs: [],
        outputs: ["Performance Test Results"],
        timeline: "",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P6",
        activity: "PM reviews the test procedure and data, and requests clarifications from the OEM SPOC, if required",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P7",
        activity: "PM signs-off on the performance test findings, once all clarifications have been received",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P8",
        activity: "PM directs OEM SPOC to provide HOTO of the plant to the O&M Team. PM requires confirmation of internal HOTO if the O&M Team is also from the OEM",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P9",
        activity: "OEM SPOC conducts Knowledge Transfer (KT) sessions with the O&M team. OEM SPOC provides HOTO of items as outlined in the HOTO checklist",
        inputs: [],
        outputs: ["HOTO Checklist"],
        timeline: "",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P10",
        activity: "O&M Head signs-off on the HOTO checklist once KT is completed. O&M Head shares the HOTO checklist with the PM",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "O&M Head",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P11",
        activity: "PM reviews the HOTO checklist and seeks clarifications from OEM SPOC or O&M Head respectively",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "P12",
        activity: "PM signs-off on the checklist once clarifications have been received and releases the Commissioning Clearance Certificate (CCC) to the OEM",
        inputs: [],
        outputs: ["Commissioning Clearance Certificate"],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      },
      {
        phase_id: "Chapter 4",
        step_id: "E",
        activity: "PM notifies the Chief Commercial Officer that HOTO has been completed",
        inputs: [],
        outputs: [],
        timeline: "",
        responsible: "Project Manager",
        comments: ""
      }
    ];

    await addProcessSteps(playbook.id, [...chapter1Steps, ...chapter2Steps, ...chapter4Steps]);

    // RACI Matrix data for Chapter 1
    const chapter1RACI = [
      {
        phase_id: "Chapter 1",
        step_id: "S",
        task: "Inform Project Manager (PM) that construction and erection of WTGs and BOP is complete",
        responsible: "OEM SPOC",
        accountable: "",
        consulted: "",
        informed: "Project Manager"
      },
      {
        phase_id: "Chapter 1", 
        step_id: "P1",
        task: "Inform Chief O&M about construction and erection completion and request for Commissioning POC appointment",
        responsible: "Project Manager",
        accountable: "",
        consulted: "",
        informed: "Chief O&M"
      },
      {
        phase_id: "Chapter 1",
        step_id: "P2", 
        task: "Direct Site Quality Head (SQH) and Commissioning POC to conduct an inspection of the WTG and BOP",
        responsible: "Project Manager",
        accountable: "",
        consulted: "",
        informed: "Site Quality Head, Commissioning POC"
      },
      {
        phase_id: "Chapter 1",
        step_id: "P3",
        task: "Request OEM SPOC to appoint OEM engineers for the inspection",
        responsible: "Site Quality Head",
        accountable: "",
        consulted: "",
        informed: "OEM SPOC"
      },
      {
        phase_id: "Chapter 1",
        step_id: "P4",
        task: "Appoint Mechanical, Civil and Electrical OEM engineers for the inspection",
        responsible: "OEM SPOC",
        accountable: "",
        consulted: "",
        informed: "OEM Engineers"
      },
      {
        phase_id: "Chapter 1",
        step_id: "P5",
        task: "Request Site Mechanical, Civil and Electrical Leads and CPOC, to attend the respective inspection",
        responsible: "Site Quality Head",
        accountable: "",
        consulted: "",
        informed: "Site Mechanical, Civil, Electrical Lead, CPOC"
      },
      {
        phase_id: "Chapter 1",
        step_id: "P6",
        task: "Lead the inspection of the block, and log all the deviations in a punch point list",
        responsible: "Site Quality Head",
        accountable: "",
        consulted: "OEM Engineers, Site Mechanical, Civil, Electrical Lead, CPOC",
        informed: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P7",
        task: "Ensure signatures on the punch point list from the OEM Engineer and respective Site Functional Head",
        responsible: "Site Quality Head",
        accountable: "Site Quality Head",
        consulted: "OEM Engineers, Site Mechanical, Civil, Electrical Lead, CPOC",
        informed: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P8",
        task: "Close all the critical punch points and prepare the compliance report",
        responsible: "OEM SPOC",
        accountable: "",
        consulted: "",
        informed: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P9",
        task: "Share the compliance report with the SQH for approval",
        responsible: "OEM SPOC",
        accountable: "",
        consulted: "Site Quality Head",
        informed: ""
      },
      {
        phase_id: "Chapter 1",
        step_id: "P10",
        task: "Provide feedback and request OEM SPOC to re-share for approval",
        responsible: "Site Quality Head",
        accountable: "",
        consulted: "",
        informed: "OEM SPOC"
      },
      {
        phase_id: "Chapter 1",
        step_id: "P11",
        task: "Sign off on the compliance report and issues the Mechanical Clearance Certificate (MCC)",
        responsible: "Site Quality Head",
        accountable: "Site Quality Head",
        consulted: "",
        informed: "OEM SPOC"
      },
      {
        phase_id: "Chapter 1",
        step_id: "E",
        task: "Notify the PM that MCC has been issued",
        responsible: "Site Quality Head",
        accountable: "",
        consulted: "",
        informed: "Project Manager"
      }
    ];

    // RACI Matrix data for Chapter 2
    const chapter2RACI = [
      {
        phase_id: "Chapter 2",
        step_id: "S",
        task: "Notify the Project Manager (PM) that MCC has been issued",
        responsible: "Site Quality Head",
        accountable: "",
        consulted: "",
        informed: "Project Manager"
      },
      {
        phase_id: "Chapter 2",
        step_id: "P1",
        task: "Notify the OEM SPOC and Commissioning POC (CPOC) to initiate the pre-commissioning tests",
        responsible: "Project Manager",
        accountable: "",
        consulted: "",
        informed: "OEM SPOC, Commissioning POC"
      },
      {
        phase_id: "Chapter 2",
        step_id: "P2",
        task: "Prepare the Pre-commissioning checklist and share it with Site Electrical Lead (SEL) for approval",
        responsible: "OEM SPOC",
        accountable: "",
        consulted: "",
        informed: "Site Electrical Lead"
      },
      {
        phase_id: "Chapter 2",
        step_id: "P3",
        task: "Recommend changes, if required, and provide sign-off on the checklist",
        responsible: "Site Electrical Lead",
        accountable: "",
        consulted: "",
        informed: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P4",
        task: "Share the documents with CPOC for approval",
        responsible: "Site Electrical Lead",
        accountable: "",
        consulted: "",
        informed: "Commissioning POC"
      },
      {
        phase_id: "Chapter 2",
        step_id: "P5",
        task: "Recommend changes, if required, and provide sign-off on the checklist",
        responsible: "Commissioning POC",
        accountable: "",
        consulted: "",
        informed: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P6",
        task: "Share the approved checklist with the OEM SPOC",
        responsible: "Commissioning POC",
        accountable: "",
        consulted: "",
        informed: "OEM SPOC"
      },
      {
        phase_id: "Chapter 2",
        step_id: "P7",
        task: "Conduct the requisite tests and document the results in the checklist",
        responsible: "OEM Engineers",
        accountable: "",
        consulted: "OEM SPOC, Site Electrical Lead, Commissioning POC",
        informed: ""
      },
      {
        phase_id: "Chapter 2",
        step_id: "P8",
        task: "Sign the checklist containing the test results and share it with the CPOC",
        responsible: "OEM SPOC",
        accountable: "",
        consulted: "",
        informed: "Commissioning POC"
      },
      {
        phase_id: "Chapter 2",
        step_id: "P9",
        task: "Seek clarifications if any, and sign-off on the checklist",
        responsible: "Commissioning POC",
        accountable: "",
        consulted: "OEM SPOC",
        informed: ""
      }
    ];

    // RACI Matrix data for Chapter 5
    const chapter5RACI = [
      {
        phase_id: "Chapter 5",
        step_id: "S",
        task: "Notify the Project Manager (PM) of the successful trial run certificate and COD certificate, of the last cluster of WTGs",
        responsible: "Regulatory Approvals Head",
        accountable: "",
        consulted: "",
        informed: "Project Manager"
      },
      {
        phase_id: "Chapter 5",
        step_id: "P1",
        task: "Direct Site Quality Head (SQH) to ensure closure of all punch points",
        responsible: "Project Manager",
        accountable: "",
        consulted: "",
        informed: "Site Quality Head"
      },
      {
        phase_id: "Chapter 5",
        step_id: "P2",
        task: "Ensure punch points are closed and take sign-off",
        responsible: "Site Quality Head",
        accountable: "",
        consulted: "OEM SPOC, CPOC, PM",
        informed: ""
      },
      {
        phase_id: "Chapter 5",
        step_id: "P3",
        task: "Direct OEM SPOC to initiate the performance test",
        responsible: "Project Manager",
        accountable: "",
        consulted: "",
        informed: "OEM SPOC"
      },
      {
        phase_id: "Chapter 5",
        step_id: "P4",
        task: "Conduct the performance test as outlined in the OEM contract",
        responsible: "OEM SPOC",
        accountable: "",
        consulted: "Project Manager, CPOC",
        informed: ""
      },
      {
        phase_id: "Chapter 5",
        step_id: "P5",
        task: "Share the performance test results",
        responsible: "OEM SPOC",
        accountable: "",
        consulted: "",
        informed: "Project Manager"
      },
      {
        phase_id: "Chapter 5",
        step_id: "P6",
        task: "Review the test procedure and data, and request clarifications from the OEM SPOC, if required",
        responsible: "Project Manager",
        accountable: "",
        consulted: "OEM SPOC",
        informed: ""
      },
      {
        phase_id: "Chapter 5",
        step_id: "P7",
        task: "Sign-off on the performance test findings, once all clarifications have been received",
        responsible: "Project Manager",
        accountable: "",
        consulted: "",
        informed: ""
      },
      {
        phase_id: "Chapter 5",
        step_id: "P8",
        task: "Direct OEM SPOC to provide HOTO of the plant to the O&M Team",
        responsible: "Project Manager",
        accountable: "",
        consulted: "",
        informed: "OEM SPOC, CPOC"
      },
      {
        phase_id: "Chapter 5",
        step_id: "P9",
        task: "Conduct KT sessions with the O&M team and provide HOTO of items in the HOTO checklist",
        responsible: "OEM SPOC",
        accountable: "",
        consulted: "CPOC",
        informed: ""
      },
      {
        phase_id: "Chapter 5",
        step_id: "P10",
        task: "Sign-off on the HOTO checklist once KT is completed and share it with the Project Manager",
        responsible: "CPOC",
        accountable: "",
        consulted: "",
        informed: "Project Manager"
      },
      {
        phase_id: "Chapter 5",
        step_id: "P11",
        task: "Review the HOTO checklist and seek clarifications",
        responsible: "Project Manager",
        accountable: "",
        consulted: "OEM SPOC, CPOC",
        informed: ""
      },
      {
        phase_id: "Chapter 5",
        step_id: "P12",
        task: "Sign-off on the checklist once clarifications have been received, and release the CCC",
        responsible: "Project Manager",
        accountable: "",
        consulted: "",
        informed: "OEM SPOC"
      },
      {
        phase_id: "Chapter 5",
        step_id: "E",
        task: "Notify the Chief Commercial Officer that HOTO has been completed",
        responsible: "Project Manager",
        accountable: "",
        consulted: "",
        informed: "Chief Commercial Officer"
      }
    ];

    await addRACIMatrix(playbook.id, [...chapter1RACI, ...chapter2RACI, ...chapter5RACI]);

    // Process Map data for Chapter 1
    const chapter1ProcessMap = [
      {
        phase_id: "Chapter 1",
        step_id: "S",
        step_type: "start",
        title: "Construction & Erection Complete",
        description: "OEM informs PM that WTG and BOP construction completed",
        order_index: 1
      },
      {
        phase_id: "Chapter 1",
        step_id: "P1",
        step_type: "process",
        title: "Appoint Commissioning POC",
        description: "PM requests Chief O&M to appoint CPOC for inspection",
        order_index: 2
      },
      {
        phase_id: "Chapter 1",
        step_id: "P2",
        step_type: "process", 
        title: "Direct Site Quality Head",
        description: "PM directs SQH and CPOC to conduct WTG and BOP inspection",
        order_index: 3
      },
      {
        phase_id: "Chapter 1",
        step_id: "P3",
        step_type: "process",
        title: "Request OEM Engineers",
        description: "SQH requests OEM SPOC to appoint respective engineers",
        order_index: 4
      },
      {
        phase_id: "Chapter 1",
        step_id: "P4",
        step_type: "process",
        title: "Appoint OEM Engineers",
        description: "OEM SPOC appoints engineers for inspection",
        order_index: 5
      },
      {
        phase_id: "Chapter 1",
        step_id: "P5",
        step_type: "process",
        title: "Request Site Heads",
        description: "SQH requests site heads to accompany for inspection",
        order_index: 6
      },
      {
        phase_id: "Chapter 1",
        step_id: "P6",
        step_type: "process",
        title: "Lead Inspection",
        description: "SQH leads inspection and logs deviations in punch point list",
        order_index: 7
      },
      {
        phase_id: "Chapter 1",
        step_id: "P7",
        step_type: "milestone",
        title: "Ensure Signatures",
        description: "SQH ensures signatures on punch point list from relevant stakeholders",
        order_index: 8
      },
      {
        phase_id: "Chapter 1",
        step_id: "P8",
        step_type: "process",
        title: "Close Critical Punch Points",
        description: "OEM SPOC closes critical issues and prepares compliance report",
        order_index: 9
      },
      {
        phase_id: "Chapter 1",
        step_id: "P9",
        step_type: "process",
        title: "Share Compliance Report",
        description: "OEM SPOC shares compliance report with SQH for approval",
        order_index: 10
      },
      {
        phase_id: "Chapter 1",
        step_id: "P10",
        step_type: "decision",
        title: "Review and Feedback",
        description: "SQH provides feedback and requests re-submission if needed",
        order_index: 11
      },
      {
        phase_id: "Chapter 1",
        step_id: "P11",
        step_type: "milestone",
        title: "Issue MCC",
        description: "SQH signs off and issues Mechanical Clearance Certificate",
        order_index: 12
      },
      {
        phase_id: "Chapter 1",
        step_id: "E",
        step_type: "end",
        title: "Notify PM",
        description: "SQH notifies PM that MCC has been issued",
        order_index: 13
      }
    ];

    // Process Map data for Chapter 4
    const chapter4ProcessMap = [
      {
        phase_id: "Chapter 4",
        step_id: "S",
        step_type: "start",
        title: "Trial Run Complete",
        description: "RAH notifies PM of successful trial run and COD certificate",
        order_index: 1
      },
      {
        phase_id: "Chapter 4",
        step_id: "P1",
        step_type: "process",
        title: "Direct Punch Point Closure",
        description: "PM directs SQH to ensure closure of all punch points",
        order_index: 2
      },
      {
        phase_id: "Chapter 4",
        step_id: "P2",
        step_type: "process",
        title: "Ensure Punch Point Closure",
        description: "SQH closes punch points and obtains sign-offs from stakeholders",
        order_index: 3
      },
      {
        phase_id: "Chapter 4",
        step_id: "P3",
        step_type: "process",
        title: "Initiate Performance Test",
        description: "PM directs OEM SPOC to initiate performance test",
        order_index: 4
      },
      {
        phase_id: "Chapter 4",
        step_id: "P4",
        step_type: "process",
        title: "Conduct Performance Test",
        description: "OEM SPOC conducts performance test as per contract",
        order_index: 5
      },
      {
        phase_id: "Chapter 4",
        step_id: "P5",
        step_type: "process",
        title: "Share Test Results",
        description: "OEM SPOC shares performance test results with PM",
        order_index: 6
      },
      {
        phase_id: "Chapter 4",
        step_id: "P6",
        step_type: "decision",
        title: "Review Test Data",
        description: "PM reviews test procedure and requests clarifications if needed",
        order_index: 7
      },
      {
        phase_id: "Chapter 4",
        step_id: "P7",
        step_type: "milestone",
        title: "Sign-off Performance Test",
        description: "PM signs off on performance test findings",
        order_index: 8
      },
      {
        phase_id: "Chapter 4",
        step_id: "P8",
        step_type: "process",
        title: "Direct HOTO",
        description: "PM directs OEM SPOC to provide HOTO to O&M team",
        order_index: 9
      },
      {
        phase_id: "Chapter 4",
        step_id: "P9",
        step_type: "process",
        title: "Conduct KT and HOTO",
        description: "OEM SPOC conducts knowledge transfer and handover",
        order_index: 10
      },
      {
        phase_id: "Chapter 4",
        step_id: "P10",
        step_type: "process",
        title: "O&M Sign-off",
        description: "O&M Head signs off on HOTO checklist and shares with PM",
        order_index: 11
      },
      {
        phase_id: "Chapter 4",
        step_id: "P11",
        step_type: "decision",
        title: "Review HOTO Checklist",
        description: "PM reviews HOTO checklist and seeks clarifications",
        order_index: 12
      },
      {
        phase_id: "Chapter 4",
        step_id: "P12",
        step_type: "milestone",
        title: "Release CCC",
        description: "PM signs off and releases Commissioning Clearance Certificate",
        order_index: 13
      },
      {
        phase_id: "Chapter 4",
        step_id: "E",
        step_type: "end",
        title: "Notify Commercial",
        description: "PM notifies Chief Commercial Officer of HOTO completion",
        order_index: 14
      }
    ];

    await addProcessMap(playbook.id, [...chapter1ProcessMap, ...chapter4ProcessMap]);

    console.log('Wind Commissioning Playbook created successfully with all data');
    return playbook;

  } catch (error) {
    console.error('Error creating Wind Commissioning Playbook:', error);
    throw error;
  }
};
