
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";
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

interface RACIMatrixProps {
  playbookId: string;
  activePhase: string;
  searchQuery: string;
}

export const RACIMatrix = ({ playbookId, activePhase, searchQuery }: RACIMatrixProps) => {
  const [raciData, setRaciData] = useState<RACIData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (playbookId && activePhase) {
      fetchRACIData();
    }
  }, [playbookId, activePhase]);

  const fetchRACIData = async () => {
    try {
      const { data, error } = await supabase
        .from('raci_matrix')
        .select('*')
        .eq('playbook_id', playbookId)
        .eq('phase_id', activePhase)
        .order('step_id');

      if (error) throw error;
      setRaciData(data || []);
    } catch (error) {
      console.error('Error fetching RACI data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = raciData.filter(item =>
    item.task.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.responsible.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.accountable.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.consulted.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.informed.toLowerCase().includes(searchQuery.toLowerCase())
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
        </CardHeader>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No RACI data found for this phase.</p>
            </div>
          ) : (
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
                {filteredData.map((item) => (
                  <TableRow key={item.id} className="hover:bg-gray-50">
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
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
