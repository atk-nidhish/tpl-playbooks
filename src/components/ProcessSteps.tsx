
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
  step_name: string;
  description: string;
  deliverables: string;
  duration: string;
  predecessor: string;
  responsible_role: string;
  phase_id: string;
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
      step.step_name.toLowerCase().includes(searchTerm) ||
      step.description.toLowerCase().includes(searchTerm) ||
      step.deliverables.toLowerCase().includes(searchTerm) ||
      step.responsible_role?.toLowerCase().includes(searchTerm) ||
      step.step_id.toLowerCase().includes(searchTerm)
    );
  });

  const downloadReport = () => {
    const content = filteredSteps.map(step => 
      `Step ${step.step_id}: ${step.step_name}\n` +
      `Description: ${step.description}\n` +
      `Deliverables: ${step.deliverables}\n` +
      `Duration: ${step.duration}\n` +
      `Responsible: ${step.responsible_role || 'Not specified'}\n` +
      `Predecessor: ${step.predecessor || 'None'}\n\n`
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
                Detailed breakdown of process steps, deliverables, and responsibilities for this phase.
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
                    <CardTitle className="text-lg">{step.step_name}</CardTitle>
                  </div>
                  {step.predecessor && (
                    <Badge variant="outline" className="text-xs bg-gray-50">
                      After: {step.predecessor}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700 leading-relaxed">{step.description}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Deliverables</h4>
                  <p className="text-gray-700 leading-relaxed">{step.deliverables}</p>
                </div>
                
                <div className="flex flex-wrap gap-4 pt-2">
                  {step.duration && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Duration: {step.duration}</span>
                    </div>
                  )}
                  {step.responsible_role && (
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Responsible: {step.responsible_role}</span>
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
