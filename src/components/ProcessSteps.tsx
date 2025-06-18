
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProcessStepCard } from "./ProcessStepCard";
import { ProcessStepsHeader } from "./ProcessStepsHeader";

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
  onNavigateToRaci?: () => void;
}

export const ProcessSteps = ({ playbookId, activePhase, searchQuery, onNavigateToRaci }: ProcessStepsProps) => {
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
      <ProcessStepsHeader
        activePhase={activePhase}
        totalSteps={steps.length}
        filteredSteps={filteredSteps.length}
      />

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
          {filteredSteps.map((step) => (
            <ProcessStepCard key={step.id} step={step} />
          ))}

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
