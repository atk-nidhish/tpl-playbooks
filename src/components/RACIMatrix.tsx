
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface RACIData {
  id: string;
  step_id: string;
  task: string;
  responsible: string;
  accountable: string;
  consulted: string;
  informed: string;
}

interface ProcessStep {
  step_id: string;
  outputs: string[];
}

interface RACIMatrixProps {
  playbookId: string;
  activePhase: string;
  searchQuery: string;
}

export const RACIMatrix = ({ playbookId, activePhase, searchQuery }: RACIMatrixProps) => {
  const [raciData, setRaciData] = useState<RACIData[]>([]);
  const [processSteps, setProcessSteps] = useState<ProcessStep[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (playbookId && activePhase) {
      fetchRACIData();
      fetchProcessSteps();
    }
  }, [playbookId, activePhase]);

  const fetchRACIData = async () => {
    try {
      console.log(`Fetching RACI data for playbook: ${playbookId}, phase: ${activePhase}`);
      
      const { data, error } = await supabase
        .from('raci_matrix')
        .select('*')
        .eq('playbook_id', playbookId)
        .eq('phase_id', activePhase)
        .order('step_id', { ascending: true });

      if (error) {
        console.error('Error fetching RACI data:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} RACI entries:`, data);
      setRaciData(data || []);
    } catch (error) {
      console.error('Error fetching RACI data:', error);
    }
  };

  const fetchProcessSteps = async () => {
    try {
      console.log(`Fetching process steps for outputs: ${playbookId}, phase: ${activePhase}`);
      
      const { data, error } = await supabase
        .from('process_steps')
        .select('step_id, outputs')
        .eq('playbook_id', playbookId)
        .eq('phase_id', activePhase);

      if (error) {
        console.error('Error fetching process steps:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} process steps for outputs:`, data);
      setProcessSteps(data || []);
    } catch (error) {
      console.error('Error fetching process steps:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = raciData.filter(item =>
    item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.responsible?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.accountable?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.consulted?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.informed?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleBadge = (text: string, role: string) => {
    if (!text) return null;
    
    const colorMap = {
      R: "bg-blue-100 text-blue-800",
      A: "bg-green-100 text-green-800",
      C: "bg-orange-100 text-orange-800",
      I: "bg-purple-100 text-purple-800"
    };

    return (
      <div className="flex items-center gap-1">
        <Badge className={`${colorMap[role as keyof typeof colorMap]} text-xs`}>
          {role}
        </Badge>
        <span className="text-sm">{text}</span>
      </div>
    );
  };

  const getStepOutputs = (stepId: string) => {
    const step = processSteps.find(s => s.step_id === stepId);
    return step?.outputs || [];
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Loading RACI matrix...</p>
      </div>
    );
  }

  if (!activePhase) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Please select a project phase to view RACI matrix.</p>
        </CardContent>
      </Card>
    );
  }

  // Sort filtered data: S first, then numbered steps, then E last
  const sortedFilteredData = filteredData.sort((a, b) => {
    const aId = a.step_id;
    const bId = b.step_id;
    
    // Handle "S" step - should always be first
    if (aId === "S") return -1;
    if (bId === "S") return 1;
    
    // Handle "E" step - should always be last
    if (aId === "E") return 1;
    if (bId === "E") return -1;
    
    // For numbered steps, sort numerically
    const aNum = parseInt(aId.replace(/^P/, ''));
    const bNum = parseInt(bId.replace(/^P/, ''));
    
    if (!isNaN(aNum) && !isNaN(bNum)) {
      return aNum - bNum;
    }
    
    // Fallback to string comparison
    return aId.localeCompare(bId);
  });

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-orange-500" />
            RACI Matrix - {activePhase}
          </CardTitle>
          <CardDescription>
            Clear RACI matrices that define roles and responsibilities for each step of the process
          </CardDescription>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">R</Badge>
              <span className="text-sm">Responsible</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">A</Badge>
              <span className="text-sm">Accountable</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-orange-100 text-orange-800">C</Badge>
              <span className="text-sm">Consulted</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-100 text-purple-800">I</Badge>
              <span className="text-sm">Informed</span>
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Found {raciData.length} total entries, showing {sortedFilteredData.length} matching entries
          </div>
        </CardHeader>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-6">
          {sortedFilteredData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">
                {raciData.length === 0 
                  ? "No RACI data found for this phase. The AI may still be processing the PDF or the phase ID might not match."
                  : "No RACI entries match your search criteria."
                }
              </p>
              {raciData.length === 0 && (
                <div className="mt-4 text-sm text-gray-500">
                  <p>Debugging info:</p>
                  <p>Playbook ID: {playbookId}</p>
                  <p>Active Phase: {activePhase}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedFilteredData.map((item) => {
                const outputs = getStepOutputs(item.step_id);
                return (
                  <div key={item.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]">Step</TableHead>
                          <TableHead className="min-w-[300px]">Task</TableHead>
                          <TableHead className="w-[200px]">Responsible</TableHead>
                          <TableHead className="w-[200px]">Accountable</TableHead>
                          <TableHead className="w-[200px]">Consulted</TableHead>
                          <TableHead className="w-[200px]">Informed</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="hover:bg-gray-50">
                          <TableCell>
                            <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-800 flex items-center justify-center font-bold text-sm">
                              {item.step_id}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{item.task}</TableCell>
                          <TableCell>{getRoleBadge(item.responsible, "R")}</TableCell>
                          <TableCell>{getRoleBadge(item.accountable, "A")}</TableCell>
                          <TableCell>{getRoleBadge(item.consulted, "C")}</TableCell>
                          <TableCell>{getRoleBadge(item.informed, "I")}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                    {outputs.length > 0 && (
                      <div className="bg-green-50 border-t border-green-200 p-3">
                        <div className="flex items-start gap-2">
                          <Package className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="font-medium text-green-800 text-sm">Step Outputs:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {outputs.map((output, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs bg-green-100 text-green-700 border-green-300">
                                  {output}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
