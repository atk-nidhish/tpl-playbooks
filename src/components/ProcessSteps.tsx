
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MessageSquare, Settings, ArrowRight, ArrowDown, FileInput, Package } from "lucide-react";
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
      console.log(`Fetching process steps for playbook: ${playbookId}, phase: ${activePhase}`);
      
      const { data, error } = await supabase
        .from('process_steps')
        .select('*')
        .eq('playbook_id', playbookId)
        .eq('phase_id', activePhase)
        .order('step_id');

      if (error) {
        console.error('Error fetching process steps:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} process steps:`, data);
      setSteps(data || []);
    } catch (error) {
      console.error('Error fetching process steps:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredSteps = steps.filter(step =>
    step.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
    step.responsible?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            Complete process steps with inputs, outputs, and execution requirements
          </CardDescription>
          <div className="text-sm text-gray-500">
            Found {steps.length} total steps, showing {filteredSteps.length} matching steps
          </div>
        </CardHeader>
      </Card>

      {filteredSteps.length === 0 ? (
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">
              {steps.length === 0 
                ? "No process steps found for this phase. The AI may still be processing the PDF or the phase ID might not match."
                : "No process steps match your search criteria."
              }
            </p>
            {steps.length === 0 && (
              <div className="mt-4 text-sm text-gray-500">
                <p>Debugging info:</p>
                <p>Playbook ID: {playbookId}</p>
                <p>Active Phase: {activePhase}</p>
              </div>
            )}
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
                    
                    {/* Process Flow Arrow */}
                    <div className="flex justify-center mb-4">
                      <ArrowDown className="h-6 w-6 text-gray-400" />
                    </div>

                    {/* Input and Output Sections with Same Size */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      {/* Required Inputs Section */}
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg min-h-[120px]">
                        <div className="flex items-center gap-2 mb-3">
                          <FileInput className="h-4 w-4 text-blue-500" />
                          <span className="font-medium text-blue-800">Required Inputs:</span>
                        </div>
                        {step.inputs && step.inputs.length > 0 ? (
                          <div className="space-y-2">
                            {step.inputs.map((input, idx) => (
                              <div key={idx} className="p-2 bg-blue-100 border border-blue-300 rounded">
                                <Badge variant="outline" className="text-xs bg-blue-200 text-blue-700 border-blue-400 mb-1">
                                  Input {idx + 1}
                                </Badge>
                                <p className="text-sm text-blue-800">{input}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-blue-600">No inputs specified</p>
                        )}
                      </div>

                      {/* Outputs Section */}
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg min-h-[120px]">
                        <div className="flex items-center gap-2 mb-3">
                          <Package className="h-4 w-4 text-green-500" />
                          <span className="font-medium text-green-800">Step Outputs:</span>
                        </div>
                        {step.outputs && step.outputs.length > 0 ? (
                          <div className="space-y-2">
                            {step.outputs.map((output, idx) => (
                              <div key={idx} className="p-2 bg-green-100 border border-green-300 rounded">
                                <Badge variant="outline" className="text-xs bg-green-200 text-green-700 border-green-400 mb-1">
                                  Output {idx + 1}
                                </Badge>
                                <p className="text-sm text-green-800">{output}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-green-600">No outputs specified</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                      <div>
                        <span className="font-medium text-gray-700">Responsible:</span>
                        <div className="flex items-center gap-1 mt-1">
                          <User className="h-3 w-3 text-gray-500" />
                          <span className="text-gray-600">{step.responsible || "Not specified"}</span>
                        </div>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Timeline:</span>
                        <div className="text-gray-600 mt-1">{step.timeline || "Not specified"}</div>
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
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
