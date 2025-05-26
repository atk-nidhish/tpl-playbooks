
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MessageSquare, Settings, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

interface ProcessStepsProps {
  playbookId: string;
  activePhase: string;
  searchQuery: string;
}

export const ProcessSteps = ({ playbookId, activePhase, searchQuery }: ProcessStepsProps) => {
  const [steps, setSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (playbookId && activePhase) {
      fetchSteps();
    }
  }, [playbookId, activePhase]);

  const fetchSteps = async () => {
    try {
      const { data, error } = await supabase
        .from('process_steps')
        .select('*')
        .eq('playbook_id', playbookId)
        .eq('phase_id', activePhase)
        .order('step_id');

      if (error) throw error;
      setSteps(data || []);
    } catch (error) {
      console.error('Error fetching process steps:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSteps = steps.filter(step =>
    step.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.responsible.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.inputs?.some(input => input.toLowerCase().includes(searchQuery.toLowerCase())) ||
    step.outputs?.some(output => output.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading process steps...</p>
      </div>
    );
  }

  if (!activePhase) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Please select a project phase to view process steps.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-orange-500" />
            Process Steps - {activePhase}
          </CardTitle>
          <CardDescription>
            Track the process steps with their inputs, outputs, and execution requirements
          </CardDescription>
        </CardHeader>
      </Card>

      {filteredSteps.length === 0 ? (
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">No process steps found for this phase.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredSteps.map((step, index) => (
            <Card key={step.id} className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {step.step_id}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-3">{step.activity}</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
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
                          {step.outputs?.map((output, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                              {output}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    {step.inputs && step.inputs.length > 0 && (
                      <div className="mb-4">
                        <span className="font-medium text-gray-700 text-sm">Inputs:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {step.inputs.map((input, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                              <ArrowRight className="h-2 w-2 mr-1" />
                              {input}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

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
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
