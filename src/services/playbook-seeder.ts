
import { supabase } from "@/integrations/supabase/client";

export const seedOriginalPlaybook = async () => {
  try {
    // First, insert the playbook
    const { data: playbook, error: playbookError } = await supabase
      .from('playbooks')
      .insert({
        name: 'solar-execution-original',
        title: 'Solar Project Execution Tracker',
        description: 'Pre-Commissioning Playbook - Interactive Edition',
        phases: {
          construction: {
            name: 'Construction & Erection Inspection',
            description: 'Physical completion verification through joint inspections'
          },
          precommissioning: {
            name: 'Pre-commissioning Testing',
            description: 'Functionality and safety validation through structured testing'
          }
        }
      })
      .select()
      .single();

    if (playbookError) throw playbookError;

    // Insert construction phase process steps
    const constructionSteps = [
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "S",
        activity: "OEM Project Manager informs the Project Manager (PM) that the erection of at least 'N' WTGs and the Balance of Plant (BOP) has been completed",
        inputs: ["Completion notification from OEM"],
        outputs: ["Project Manager"],
        timeline: "Day 1",
        responsible: "OEM SPOC",
        comments: "Ensure all WTGs are structurally complete and BOP systems are installed according to specifications."
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "P1",
        activity: "PM informs Chief O&M that construction and erection are complete and requests him to appoint a Commissioning POC (CPOC)",
        inputs: ["Completion notification"],
        outputs: ["Chief O&M"],
        timeline: "Day 1-2",
        responsible: "Project Manager",
        comments: "CPOC should have relevant experience in commissioning similar solar projects."
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "P2",
        activity: "PM directs the Site Quality Head (SQH) and CPOC to conduct an inspection of the WTG and BOP",
        inputs: ["CPOC appointment"],
        outputs: ["Site Quality Head", "Commissioning POC"],
        timeline: "Day 2-3",
        responsible: "Project Manager",
        comments: "Coordinate inspection schedules to avoid conflicts with other site activities."
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "P3",
        activity: "SQH requests OEM SPOC to individually appoint respective Mechanical, Civil and Electrical OEM engineers for the inspection of the WTG and BOP",
        inputs: ["Inspection directive"],
        outputs: ["OEM SPOC"],
        timeline: "Day 3-4",
        responsible: "Site Quality Head",
        comments: "Each engineer must be certified for their respective discipline and familiar with the equipment."
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "P4",
        activity: "OEM SPOC appoints Mechanical, Civil and Electrical OEM engineers for the inspection",
        inputs: ["Engineer appointment request"],
        outputs: ["OEM Engineers"],
        timeline: "Day 4-5",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "P5",
        activity: "SQH requests Site Mechanical, Civil and Electrical Heads, and CPOC, to accompany him for the respective inspection",
        inputs: ["OEM engineer appointments"],
        outputs: ["Site Heads", "CPOC"],
        timeline: "Day 5-6",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "P6",
        activity: "SQH leads the inspection, and logs all the deviations in a punch point list",
        inputs: ["Inspection team assembly"],
        outputs: ["Punch Point List"],
        timeline: "Day 6-10",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "P7",
        activity: "SQH ensures signatures on the punch point list from the OEM Engineer and respective Site Functional Head",
        inputs: ["Completed inspection"],
        outputs: ["Signed Punch List"],
        timeline: "Day 10-11",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "P8",
        activity: "OEM SPOC closes all the critical punch points and prepares the compliance report",
        inputs: ["Signed punch list"],
        outputs: ["Compliance Report"],
        timeline: "Day 11-15",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "P9",
        activity: "OEM SPOC shares the compliance report with the SQH for approval",
        inputs: ["Compliance report"],
        outputs: ["SQH Review"],
        timeline: "Day 15-16",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "P10",
        activity: "SQH provides feedback and requests OEM SPOC to re-share for approval",
        inputs: ["Compliance report review"],
        outputs: ["Feedback"],
        timeline: "Day 16-17",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "P11",
        activity: "SQH signs off on the compliance report and issues the Mechanical Clearance Certificate (MCC) to the OEM / Contractor SPOC",
        inputs: ["Approved compliance report"],
        outputs: ["Mechanical Clearance Certificate"],
        timeline: "Day 17-20",
        responsible: "Site Quality Head",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "construction",
        step_id: "E",
        activity: "SQH notifies the PM that MCC has been issued",
        inputs: ["MCC issuance"],
        outputs: ["Project Manager"],
        timeline: "Day 20",
        responsible: "Site Quality Head",
        comments: ""
      }
    ];

    const { error: stepsError } = await supabase
      .from('process_steps')
      .insert(constructionSteps);

    if (stepsError) throw stepsError;

    // Insert precommissioning phase process steps
    const precommissioningSteps = [
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "S",
        activity: "SQH notifies the Project Manager (PM) that MCC has been issued",
        inputs: ["MCC issuance"],
        outputs: ["Project Manager"],
        timeline: "Day 1",
        responsible: "Site Quality Head",
        comments: "MCC issuance indicates mechanical systems are ready for electrical testing."
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "P1",
        activity: "PM notifies the OEM SPOC and Commissioning POC (CPOC) to initiate the pre-commissioning tests",
        inputs: ["MCC notification"],
        outputs: ["OEM SPOC", "Commissioning POC"],
        timeline: "Day 1-2",
        responsible: "Project Manager",
        comments: "Ensure all safety protocols are in place before starting electrical tests."
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "P2",
        activity: "OEM SPOC prepares the Pre-commissioning checklist and shares it with Site Electrical Lead (SEL) for approval",
        inputs: ["Test initiation notification"],
        outputs: ["Pre-commissioning checklist"],
        timeline: "Day 2-5",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "P3",
        activity: "SEL recommends changes, if required, and provides sign-off on the checklist",
        inputs: ["Pre-commissioning checklist"],
        outputs: ["Approved checklist"],
        timeline: "Day 5-7",
        responsible: "Site Electrical Lead",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "P4",
        activity: "SEL shares the checklist with CPOC for approval",
        inputs: ["SEL approved checklist"],
        outputs: ["Commissioning POC"],
        timeline: "Day 7-8",
        responsible: "Site Electrical Lead",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "P5",
        activity: "CPOC recommends changes, if required, and provides sign-off on the checklist",
        inputs: ["Checklist from SEL"],
        outputs: ["Final checklist"],
        timeline: "Day 8-10",
        responsible: "Commissioning POC",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "P6",
        activity: "CPOC shares the approved checklist with the OEM SPOC",
        inputs: ["CPOC approved checklist"],
        outputs: ["OEM SPOC"],
        timeline: "Day 10-11",
        responsible: "Commissioning POC",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "P7",
        activity: "OEM Engineers conducts the requisite tests, in the presence of OEM SPOC, SEL and CPOC, and documents the results in the checklist",
        inputs: ["Approved checklist"],
        outputs: ["Test results"],
        timeline: "Day 11-20",
        responsible: "OEM Engineers",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "P8",
        activity: "OEM SPOC signs the checklist containing the test results and shares it with the CPOC",
        inputs: ["Completed test results"],
        outputs: ["Commissioning POC"],
        timeline: "Day 20-21",
        responsible: "OEM SPOC",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "P9",
        activity: "CPOC seeks clarifications from the OEM SPOC, if any, and signs-off on the checklist",
        inputs: ["Test results from OEM"],
        outputs: ["OEM SPOC"],
        timeline: "Day 21-23",
        responsible: "Commissioning POC",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "P10",
        activity: "CPOC shares the checklist with the SEL",
        inputs: ["CPOC signed checklist"],
        outputs: ["Site Electrical Lead"],
        timeline: "Day 23-24",
        responsible: "Commissioning POC",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "P11",
        activity: "SEL seeks clarifications from the OEM SPOC, if any, and signs-off on the checklist",
        inputs: ["Checklist from CPOC"],
        outputs: ["OEM SPOC"],
        timeline: "Day 24-26",
        responsible: "Site Electrical Lead",
        comments: ""
      },
      {
        playbook_id: playbook.id,
        phase_id: "precommissioning",
        step_id: "E",
        activity: "SEL shares the approved pre-commissioning test results with the PM",
        inputs: ["SEL signed checklist"],
        outputs: ["Project Manager"],
        timeline: "Day 26",
        responsible: "Site Electrical Lead",
        comments: ""
      }
    ];

    const { error: preStepsError } = await supabase
      .from('process_steps')
      .insert(precommissioningSteps);

    if (preStepsError) throw preStepsError;

    console.log('Original playbook seeded successfully');
    return playbook;
  } catch (error) {
    console.error('Error seeding original playbook:', error);
    throw error;
  }
};
