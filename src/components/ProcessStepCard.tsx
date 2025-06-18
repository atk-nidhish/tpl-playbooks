
import { Card, CardHeader } from "@/components/ui/card";
import { FileInput, Package } from "lucide-react";

interface ProcessStep {
  id: string;
  step_id: string;
  activity: string;
  inputs: string[];
  outputs: string[];
  timeline: string;
  responsible: string;
  comments: string;
}

interface ProcessStepCardProps {
  step: ProcessStep;
}

export const ProcessStepCard = ({ step }: ProcessStepCardProps) => {
  const hasInputs = step.inputs && step.inputs.length > 0;
  const hasOutputs = step.outputs && step.outputs.length > 0;

  const getStepDisplayId = (stepId: string) => {
    if (stepId === "S" || stepId === "Start") return "Start";
    if (stepId === "E" || stepId === "End") return "End";
    return stepId;
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-md transition-all duration-300">
      <CardHeader className="pb-2">
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-lg">
            {getStepDisplayId(step.step_id)}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-2 text-sm">{step.activity}</h3>

            {(hasInputs || hasOutputs) && (
              <div className="grid grid-cols-2 gap-2 mb-2">
                {hasInputs && (
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-xs">
                    <div className="flex items-center gap-1 mb-1">
                      <FileInput className="h-3 w-3 text-blue-500" />
                      <span className="font-medium text-blue-800">Inputs:</span>
                    </div>
                    <div className="text-blue-700 leading-tight">
                      <div className="space-y-1">
                        {step.inputs.map((input, idx) => (
                          <div key={idx} className="text-xs" title={input}>
                            {idx + 1}. {input}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {hasOutputs && (
                  <div className="p-2 bg-green-50 border border-green-200 rounded text-xs">
                    <div className="flex items-center gap-1 mb-1">
                      <Package className="h-3 w-3 text-green-500" />
                      <span className="font-medium text-green-800">Outputs:</span>
                    </div>
                    <div className="text-green-700 leading-tight">
                      <div className="space-y-1">
                        {step.outputs.map((output, idx) => (
                          <div key={idx} className="text-xs" title={output}>
                            {idx + 1}. {output}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
