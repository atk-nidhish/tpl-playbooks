
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, User, ArrowRight, CheckCircle, Download, FileText } from "lucide-react";
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
  phase_id: string;
  playbook_id: string;
  created_at: string;
}

interface ProcessStepsProps {
  playbookId: string;
  activePhase: string;
  searchQuery: string;
  onNavigateToRaci?: () => void;
}

export const ProcessSteps = ({ playbookId, activePhase, searchQuery, onNavigateToRaci }: ProcessStepsProps) => {
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    if (activePhase) {
      fetchProcessSteps();
    }
  }, [playbookId, activePhase]);

  const fetchProcessSteps = async () => {
    setLoading(true);
    try {
      console.log(`Fetching process steps for playbook: ${playbookId}, phase: ${activePhase}`);
      
      const { data, error } = await supabase
        .from('process_steps')
        .select('*')
        .eq('phase_id', activePhase)
        .order('step_id', { ascending: true });

      if (error) {
        console.error('Error fetching process steps:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} process steps:`, data);
      setProcessSteps(data || []);
    } catch (error) {
      console.error('Error fetching process steps:', error);
      setProcessSteps([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredSteps = processSteps.filter(step => {
    const searchTerm = (searchQuery || localSearch).toLowerCase();
    return (
      (step.activity?.toLowerCase() || '').includes(searchTerm) ||
      (step.responsible?.toLowerCase() || '').includes(searchTerm) ||
      (step.step_id?.toLowerCase() || '').includes(searchTerm) ||
      (step.timeline?.toLowerCase() || '').includes(searchTerm) ||
      (step.comments?.toLowerCase() || '').includes(searchTerm) ||
      (step.inputs?.join(' ')?.toLowerCase() || '').includes(searchTerm) ||
      (step.outputs?.join(' ')?.toLowerCase() || '').includes(searchTerm)
    );
  });

  const downloadReport = () => {
    const content = filteredSteps.map(step => 
      `Step ${step.step_id}: ${step.activity}\n` +
      `Inputs: ${step.inputs?.join(', ') || 'None'}\n` +
      `Outputs: ${step.outputs?.join(', ') || 'None'}\n` +
      `Timeline: ${step.timeline || 'Not specified'}\n` +
      `Responsible: ${step.responsible || 'Not specified'}\n` +
      `Comments: ${step.comments || 'None'}\n\n`
    ).join('');

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `process-steps-${activePhase}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Loading process steps...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-blue-500" />
                Process Steps - {activePhase}
              </CardTitle>
              <CardDescription>
                Detailed breakdown of process steps, inputs, outputs, and responsibilities for this phase.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {onNavigateToRaci && (
                <Button 
                  onClick={onNavigateToRaci}
                  variant="outline"
                  className="border-blue-200 hover:bg-blue-50"
                >
                  View RACI Matrix
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              <Button 
                onClick={downloadReport}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={filteredSteps.length === 0}
              >
                <FileText className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search process steps..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {filteredSteps.length} steps
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {filteredSteps.length === 0 ? (
        <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">
              {processSteps.length === 0 
                ? "No process steps available for this phase." 
                : "No steps match your search criteria."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {filteredSteps.map((step, index) => (
            <Card key={step.id} className="bg-white/90 backdrop-blur-sm border-blue-200 hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-100 text-blue-800 text-sm px-3 py-1">
                      Step {step.step_id}
                    </Badge>
                    <CardTitle className="text-lg">{step.activity}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {step.inputs && step.inputs.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Inputs</h4>
                    <div className="flex flex-wrap gap-2">
                      {step.inputs.map((input, idx) => (
                        <Badge key={idx} variant="outline" className="bg-green-50 text-green-700">
                          {input}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {step.outputs && step.outputs.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Outputs</h4>
                    <div className="flex flex-wrap gap-2">
                      {step.outputs.map((output, idx) => (
                        <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700">
                          {output}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {step.comments && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Comments</h4>
                    <p className="text-gray-700 leading-relaxed">{step.comments}</p>
                  </div>
                )}
                
                <div className="flex flex-wrap gap-4 pt-2">
                  {step.timeline && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Timeline: {step.timeline}</span>
                    </div>
                  )}
                  {step.responsible && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Responsible: {step.responsible}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
