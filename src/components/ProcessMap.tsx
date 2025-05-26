
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, ArrowRight, Circle, Square, Diamond, Hexagon } from "lucide-react";

interface ProcessMapProps {
  activePhase: string;
}

export const ProcessMap = ({ activePhase }: ProcessMapProps) => {
  const constructionFlow = [
    { id: "S", type: "start", title: "OEM Completion Notice", description: "WTG & BOP Complete" },
    { id: "P1", type: "process", title: "PM Notification", description: "Request CPOC Appointment" },
    { id: "P2", type: "process", title: "Inspection Direction", description: "SQH & CPOC Assignment" },
    { id: "P3", type: "process", title: "Engineer Request", description: "OEM Engineer Assignment" },
    { id: "P4", type: "process", title: "Engineer Appointment", description: "Mechanical, Civil, Electrical" },
    { id: "P5", type: "process", title: "Team Assembly", description: "Site Heads & CPOC" },
    { id: "P6", type: "process", title: "Inspection Execution", description: "Punch Point Logging" },
    { id: "P7", type: "approval", title: "Signature Collection", description: "OEM & Site Head Sign-off" },
    { id: "P8", type: "process", title: "Punch Point Closure", description: "Compliance Report" },
    { id: "P9", type: "process", title: "Report Submission", description: "SQH Review Request" },
    { id: "P10", type: "process", title: "Feedback Loop", description: "Review & Corrections" },
    { id: "P11", type: "approval", title: "MCC Issuance", description: "Final Clearance" },
    { id: "E", type: "end", title: "PM Notification", description: "MCC Issued" }
  ];

  const precommissioningFlow = [
    { id: "S", type: "start", title: "MCC Notification", description: "Ready for Testing" },
    { id: "P1", type: "process", title: "Test Initiation", description: "OEM & CPOC Notification" },
    { id: "P2", type: "process", title: "Checklist Preparation", description: "Pre-commissioning Plan" },
    { id: "P3", type: "approval", title: "SEL Review", description: "Checklist Approval" },
    { id: "P4", type: "process", title: "CPOC Submission", description: "Document Sharing" },
    { id: "P5", type: "approval", title: "CPOC Review", description: "Final Checklist Approval" },
    { id: "P6", type: "process", title: "Document Distribution", description: "OEM Notification" },
    { id: "P7", type: "process", title: "Test Execution", description: "Comprehensive Testing" },
    { id: "P8", type: "process", title: "Results Documentation", description: "CPOC Submission" },
    { id: "P9", type: "approval", title: "CPOC Review", description: "Results Validation" },
    { id: "P10", type: "process", title: "SEL Submission", description: "Final Review Stage" },
    { id: "P11", type: "approval", title: "SEL Approval", description: "Test Sign-off" },
    { id: "E", type: "end", title: "PM Notification", description: "Testing Complete" }
  ];

  const currentFlow = activePhase === "construction" ? constructionFlow : precommissioningFlow;

  const getStepIcon = (type: string) => {
    switch (type) {
      case "start":
      case "end":
        return <Circle className="h-8 w-8 fill-purple-500 text-white" />;
      case "process":
        return <Hexagon className="h-8 w-8 fill-blue-300 text-blue-800" />;
      case "approval":
        return <Diamond className="h-8 w-8 fill-green-300 text-green-800" />;
      default:
        return <Square className="h-8 w-8 fill-gray-300 text-gray-600" />;
    }
  };

  const getStepColor = (type: string) => {
    switch (type) {
      case "start":
      case "end":
        return "bg-purple-50 border-purple-200";
      case "process":
        return "bg-blue-50 border-blue-200";
      case "approval":
        return "bg-green-50 border-green-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-orange-500" />
            Process Map - {activePhase === "construction" ? "Construction & Erection" : "Pre-commissioning Testing"}
          </CardTitle>
          <CardDescription>
            Visual representation of the complete process flow from start to finish
          </CardDescription>
          <div className="flex gap-6 mt-4">
            <div className="flex items-center gap-2">
              <Circle className="h-6 w-6 fill-purple-500 text-purple-500" />
              <span className="text-sm">Start/End</span>
            </div>
            <div className="flex items-center gap-2">
              <Hexagon className="h-6 w-6 fill-blue-300 text-blue-600" />
              <span className="text-sm">Process</span>
            </div>
            <div className="flex items-center gap-2">
              <Diamond className="h-6 w-6 fill-green-300 text-green-600" />
              <span className="text-sm">Approval</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-6">
          <div className="space-y-6">
            {currentFlow.map((step, index) => (
              <div key={step.id} className="flex items-center gap-6">
                <div className={`p-4 rounded-lg border-2 ${getStepColor(step.type)} min-w-[300px]`}>
                  <div className="flex items-center gap-3 mb-2">
                    {getStepIcon(step.type)}
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm">
                      {step.id}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
                </div>
                
                {index < currentFlow.length - 1 && (
                  <div className="flex-1 flex justify-center">
                    <ArrowRight className="h-6 w-6 text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
