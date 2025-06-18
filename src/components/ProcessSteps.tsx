
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, ArrowRight, FileInput, Package, Users } from "lucide-react";
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
  activePhase?: string;
  searchQuery?: string;
  onNavigateToRaci?: () => void;
  chapters?: any[];
  isLoading?: boolean;
}

export const ProcessSteps = ({ playbookId, activePhase, searchQuery = "", onNavigateToRaci, chapters, isLoading }: ProcessStepsProps) => {
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
        .eq('phase_id', activePhase);

      if (error) {
        console.error('Error fetching process steps:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} process steps:`, data);
      
      // Sort steps: Start first, then P1, P2, P3... then End at the end
      const sortedSteps = (data || []).sort((a, b) => {
        const aId = a.step_id;
        const bId = b.step_id;
        
        // Handle "Start" step - should always be first
        if (aId === "Start" || aId === "S") return -1;
        if (bId === "Start" || bId === "S") return 1;
        
        // Handle "End" step - should always be last
        if (aId === "End" || aId === "E") return 1;
        if (bId === "End" || bId === "E") return -1;
        
        // For P-prefixed steps (P1, P2, etc.), sort numerically
        if (aId.startsWith('P') && bId.startsWith('P')) {
          const aNum = parseInt(aId.substring(1));
          const bNum = parseInt(bId.substring(1));
          return aNum - bNum;
        }
        
        // P-prefixed steps come before non-P steps
        if (aId.startsWith('P') && !bId.startsWith('P')) return -1;
        if (!aId.startsWith('P') && bId.startsWith('P')) return 1;
        
        // For numbered steps without P prefix, sort numerically
        const aNum = parseInt(aId);
        const bNum = parseInt(bId);
        
        if (!isNaN(aNum) && !isNaN(bNum)) {
          return aNum - bNum;
        }
        
        // Fallback to string comparison
        return aId.localeCompare(bId);
      });
      
      setSteps(sortedSteps);
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

  const getStepDisplayId = (stepId: string) => {
    if (stepId === "S" || stepId === "Start") return "Start";
    if (stepId === "E" || stepId === "End") return "End";
    return stepId;
  };

  if (loading || isLoading) {
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
        <div className="grid gap-3">
          {filteredSteps.map((step, index) => {
            const hasInputs = step.inputs && step.inputs.length > 0;
            const hasOutputs = step.outputs && step.outputs.length > 0;
            
            return (
              <Card key={step.id} className="bg-white/90 backdrop-blur-sm border-orange-200 hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-lg">
                      {getStepDisplayId(step.step_id)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">{step.activity}</h3>

                      {/* Only show inputs and outputs - timeline removed */}
                      {(hasInputs || hasOutputs) && (
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          {/* Inputs - Only show if has content */}
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

                          {/* Outputs - Only show if has content */}
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
          })}

          {/* Navigation Button at the end */}
          {filteredSteps.length > 0 && onNavigateToRaci && (
            <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
              <CardContent className="p-6 text-center">
                <Button 
                  onClick={onNavigateToRaci}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                >
                  <Users className="h-4 w-4 mr-2" />
                  View RACI Matrix
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};
