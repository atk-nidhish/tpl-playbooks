
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings } from "lucide-react";

interface ProcessStepsHeaderProps {
  activePhase: string;
  totalSteps: number;
  filteredSteps: number;
}

export const ProcessStepsHeader = ({ activePhase, totalSteps, filteredSteps }: ProcessStepsHeaderProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-orange-500" />
          Process Steps - {activePhase}
        </CardTitle>
        <CardDescription>
          Complete process steps with inputs, outputs, and execution requirements
        </CardDescription>
        <div className="text-sm text-gray-500">
          Found {totalSteps} total steps, showing {filteredSteps} matching steps
        </div>
      </CardHeader>
    </Card>
  );
};
