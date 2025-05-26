
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, ArrowRight, Circle, Square, Diamond, Hexagon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProcessMapStep {
  id: string;
  step_id: string;
  step_type: string;
  title: string;
  description: string;
  order_index: number;
}

interface ProcessMapProps {
  playbookId: string;
  activePhase: string;
}

export const ProcessMap = ({ playbookId, activePhase }: ProcessMapProps) => {
  const [processFlow, setProcessFlow] = useState<ProcessMapStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (playbookId && activePhase) {
      fetchProcessMap();
    }
  }, [playbookId, activePhase]);

  const fetchProcessMap = async () => {
    try {
      const { data, error } = await supabase
        .from('process_map')
        .select('*')
        .eq('playbook_id', playbookId)
        .eq('phase_id', activePhase)
        .order('order_index');

      if (error) throw error;
      setProcessFlow(data || []);
    } catch (error) {
      console.error('Error fetching process map:', error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading process map...</p>
      </div>
    );
  }

  if (!activePhase) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Please select a project phase to view process map.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-orange-500" />
            Process Map - {activePhase}
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
          {processFlow.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No process map data found for this phase.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {processFlow.map((step, index) => (
                <div key={step.id} className="flex items-center gap-6">
                  <div className={`p-4 rounded-lg border-2 ${getStepColor(step.step_type)} min-w-[300px]`}>
                    <div className="flex items-center gap-3 mb-2">
                      {getStepIcon(step.step_type)}
                      <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm">
                        {step.step_id}
                      </div>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  
                  {index < processFlow.length - 1 && (
                    <div className="flex-1 flex justify-center">
                      <ArrowRight className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
