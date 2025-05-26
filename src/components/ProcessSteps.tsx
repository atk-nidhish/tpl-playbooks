import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle, Clock, AlertCircle, User, MessageSquare, Settings } from "lucide-react";

interface ProcessStepsProps {
  activePhase: string;
  searchQuery: string;
}

export const ProcessSteps = ({ activePhase, searchQuery }: ProcessStepsProps) => {
  const [completedSteps, setCompletedSteps] = useState<string[]>([
    "S", "P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8"
  ]);

  const constructionSteps = [
    {
      id: "S",
      activity: "OEM Project Manager informs the Project Manager (PM) that the erection of at least 'N' WTGs and the Balance of Plant (BOP) has been completed",
      outputs: ["Project Manager"],
      timeline: "Day 1",
      responsible: "OEM SPOC",
      status: "completed",
      comments: "Ensure all WTGs are structurally complete and BOP systems are installed according to specifications."
    },
    {
      id: "P1",
      activity: "PM informs Chief O&M that construction and erection are complete and requests him to appoint a Commissioning POC (CPOC)",
      outputs: ["Chief O&M"],
      timeline: "Day 1-2",
      responsible: "Project Manager",
      status: "completed",
      comments: "CPOC should have relevant experience in commissioning similar solar projects."
    },
    {
      id: "P2",
      activity: "PM directs the Site Quality Head (SQH) and CPOC to conduct an inspection of the WTG and BOP",
      outputs: ["Site Quality Head", "Commissioning POC"],
      timeline: "Day 2-3",
      responsible: "Project Manager",
      status: "completed",
      comments: "Coordinate inspection schedules to avoid conflicts with other site activities."
    },
    {
      id: "P3",
      activity: "SQH requests OEM SPOC to individually appoint respective Mechanical, Civil and Electrical OEM engineers for the inspection of the WTG and BOP",
      outputs: ["OEM SPOC"],
      timeline: "Day 3-4",
      responsible: "Site Quality Head",
      status: "completed",
      comments: "Each engineer must be certified for their respective discipline and familiar with the equipment."
    },
    {
      id: "P4",
      activity: "OEM SPOC appoints Mechanical, Civil and Electrical OEM engineers for the inspection",
      outputs: ["OEM Engineers"],
      timeline: "Day 4-5",
      responsible: "OEM SPOC",
      status: "completed"
    },
    {
      id: "P5",
      activity: "SQH requests Site Mechanical, Civil and Electrical Heads, and CPOC, to accompany him for the respective inspection",
      outputs: ["Site Heads", "CPOC"],
      timeline: "Day 5-6",
      responsible: "Site Quality Head",
      status: "completed"
    },
    {
      id: "P6",
      activity: "SQH leads the inspection, and logs all the deviations in a punch point list",
      outputs: ["Punch Point List"],
      timeline: "Day 6-10",
      responsible: "Site Quality Head",
      status: "completed"
    },
    {
      id: "P7",
      activity: "SQH ensures signatures on the punch point list from the OEM Engineer and respective Site Functional Head",
      outputs: ["Signed Punch List"],
      timeline: "Day 10-11",
      responsible: "Site Quality Head",
      status: "completed"
    },
    {
      id: "P8",
      activity: "OEM SPOC closes all the critical punch points and prepares the compliance report",
      outputs: ["Compliance Report"],
      timeline: "Day 11-15",
      responsible: "OEM SPOC",
      status: "completed"
    },
    {
      id: "P9",
      activity: "OEM SPOC shares the compliance report with the SQH for approval",
      outputs: ["SQH Review"],
      timeline: "Day 15-16",
      responsible: "OEM SPOC",
      status: "in-progress"
    },
    {
      id: "P10",
      activity: "SQH provides feedback and requests OEM SPOC to re-share for approval",
      outputs: ["Feedback"],
      timeline: "Day 16-17",
      responsible: "Site Quality Head",
      status: "pending"
    },
    {
      id: "P11",
      activity: "SQH signs off on the compliance report and issues the Mechanical Clearance Certificate (MCC) to the OEM / Contractor SPOC",
      outputs: ["Mechanical Clearance Certificate"],
      timeline: "Day 17-20",
      responsible: "Site Quality Head",
      status: "pending"
    },
    {
      id: "E",
      activity: "SQH notifies the PM that MCC has been issued",
      outputs: ["Project Manager"],
      timeline: "Day 20",
      responsible: "Site Quality Head",
      status: "pending"
    }
  ];

  const precommissioningSteps = [
    {
      id: "S",
      activity: "SQH notifies the Project Manager (PM) that MCC has been issued",
      outputs: ["Project Manager"],
      timeline: "Day 1",
      responsible: "Site Quality Head",
      status: "completed",
      comments: "MCC issuance indicates mechanical systems are ready for electrical testing."
    },
    {
      id: "P1",
      activity: "PM notifies the OEM SPOC and Commissioning POC (CPOC) to initiate the pre-commissioning tests",
      outputs: ["OEM SPOC", "Commissioning POC"],
      timeline: "Day 1-2",
      responsible: "Project Manager",
      status: "completed",
      comments: "Ensure all safety protocols are in place before starting electrical tests."
    },
    {
      id: "P2",
      activity: "OEM SPOC prepares the Pre-commissioning checklist and shares it with Site Electrical Lead (SEL) for approval",
      outputs: ["Pre-commissioning checklist"],
      timeline: "Day 2-5",
      responsible: "OEM SPOC",
      status: "completed"
    },
    {
      id: "P3",
      activity: "SEL recommends changes, if required, and provides sign-off on the checklist",
      outputs: ["Approved checklist"],
      timeline: "Day 5-7",
      responsible: "Site Electrical Lead",
      status: "completed"
    },
    {
      id: "P4",
      activity: "SEL shares the checklist with CPOC for approval",
      outputs: ["Commissioning POC"],
      timeline: "Day 7-8",
      responsible: "Site Electrical Lead",
      status: "completed"
    },
    {
      id: "P5",
      activity: "CPOC recommends changes, if required, and provides sign-off on the checklist",
      outputs: ["Final checklist"],
      timeline: "Day 8-10",
      responsible: "Commissioning POC",
      status: "completed"
    },
    {
      id: "P6",
      activity: "CPOC shares the approved checklist with the OEM SPOC",
      outputs: ["OEM SPOC"],
      timeline: "Day 10-11",
      responsible: "Commissioning POC",
      status: "completed"
    },
    {
      id: "P7",
      activity: "OEM Engineers conducts the requisite tests, in the presence of OEM SPOC, SEL and CPOC, and documents the results in the checklist",
      outputs: ["Test results"],
      timeline: "Day 11-20",
      responsible: "OEM Engineers",
      status: "in-progress"
    },
    {
      id: "P8",
      activity: "OEM SPOC signs the checklist containing the test results and shares it with the CPOC",
      outputs: ["Commissioning POC"],
      timeline: "Day 20-21",
      responsible: "OEM SPOC",
      status: "pending"
    },
    {
      id: "P9",
      activity: "CPOC seeks clarifications from the OEM SPOC, if any, and signs-off on the checklist",
      outputs: ["OEM SPOC"],
      timeline: "Day 21-23",
      responsible: "Commissioning POC",
      status: "pending"
    },
    {
      id: "P10",
      activity: "CPOC shares the checklist with the SEL",
      outputs: ["Site Electrical Lead"],
      timeline: "Day 23-24",
      responsible: "Commissioning POC",
      status: "pending"
    },
    {
      id: "P11",
      activity: "SEL seeks clarifications from the OEM SPOC, if any, and signs-off on the checklist",
      outputs: ["OEM SPOC"],
      timeline: "Day 24-26",
      responsible: "Site Electrical Lead",
      status: "pending"
    },
    {
      id: "E",
      activity: "SEL shares the approved pre-commissioning test results with the PM",
      outputs: ["Project Manager"],
      timeline: "Day 26",
      responsible: "Site Electrical Lead",
      status: "pending"
    }
  ];

  const currentSteps = activePhase === "construction" ? constructionSteps : precommissioningSteps;

  const filteredSteps = currentSteps.filter(step =>
    step.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.responsible.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.outputs.some(output => output.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-300";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "pending":
        return "bg-orange-100 text-orange-800 border-orange-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const toggleStepCompletion = (stepId: string) => {
    setCompletedSteps(prev =>
      prev.includes(stepId)
        ? prev.filter(id => id !== stepId)
        : [...prev, stepId]
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-orange-500" />
            {activePhase === "construction" ? "Construction & Erection Inspection" : "Pre-commissioning Testing"}
          </CardTitle>
          <CardDescription>
            {activePhase === "construction" 
              ? "Track the inspection process conducted on completion of construction and erection"
              : "Monitor the tests conducted as part of the pre-commissioning process"
            }
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {filteredSteps.map((step, index) => (
          <Card key={step.id} className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-md transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={completedSteps.includes(step.id)}
                    onCheckedChange={() => toggleStepCompletion(step.id)}
                    className="mt-1"
                  />
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                    ${step.status === 'completed' ? 'bg-green-100 text-green-800' :
                      step.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-orange-100 text-orange-800'}
                  `}>
                    {step.id}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{step.activity}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                        <div>
                          <span className="font-medium text-gray-700">Responsible:</span>
                          <div className="flex items-center gap-1 mt-1">
                            <User className="h-3 w-3 text-gray-500" />
                            <span className="text-gray-600">{step.responsible}</span>
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Timeline:</span>
                          <div className="text-gray-600 mt-1">{step.timeline}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Outputs:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {step.outputs.map((output, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {output}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      {step.comments && (
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                          <div className="flex items-start gap-2">
                            <MessageSquare className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <span className="font-medium text-blue-800 text-sm">Additional Comments:</span>
                              <p className="text-blue-700 text-sm mt-1">{step.comments}</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(step.status)}
                      <Badge className={getStatusColor(step.status)}>
                        {step.status.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
