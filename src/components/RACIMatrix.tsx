
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, FileSpreadsheet } from "lucide-react";
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
  onNavigateToQuiz?: () => void;
}

export const RACIMatrix = ({ playbookId, activePhase, searchQuery }: RACIMatrixProps) => {
  const [raciData, setRaciData] = useState<RACIData[]>([]);
  const [loading, setLoading] = useState(true);
  const [localSearch, setLocalSearch] = useState("");

  useEffect(() => {
    if (activePhase) {
      fetchRACIData();
    }
  }, [playbookId, activePhase]);

  const fetchRACIData = async () => {
    setLoading(true);
    try {
      console.log(`Fetching RACI data for playbook: ${playbookId}, phase: ${activePhase}`);
      
      const { data, error } = await supabase
        .from('raci_matrix')
        .select('*')
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
      setRaciData([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = raciData.filter(item => {
    const searchTerm = (searchQuery || localSearch).toLowerCase();
    return (
      item.task.toLowerCase().includes(searchTerm) ||
      item.responsible?.toLowerCase().includes(searchTerm) ||
      item.accountable?.toLowerCase().includes(searchTerm) ||
      item.consulted?.toLowerCase().includes(searchTerm) ||
      item.informed?.toLowerCase().includes(searchTerm) ||
      item.step_id.toLowerCase().includes(searchTerm)
    );
  });

  const downloadCSV = () => {
    const headers = ['Step ID', 'Task', 'Responsible', 'Accountable', 'Consulted', 'Informed'];
    const csvContent = [
      headers.join(','),
      ...filteredData.map(row => [
        row.step_id,
        `"${row.task.replace(/"/g, '""')}"`,
        row.responsible || '',
        row.accountable || '',
        row.consulted || '',
        row.informed || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `raci-matrix-${activePhase}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Loading RACI matrix...</p>
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
                RACI Matrix - {activePhase}
              </CardTitle>
              <CardDescription>
                Responsibility Assignment Matrix showing who is Responsible, Accountable, Consulted, and Informed for each task.
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={downloadCSV}
                className="bg-green-600 hover:bg-green-700"
                disabled={filteredData.length === 0}
              >
                <FileSpreadsheet className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search RACI matrix..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              {filteredData.length} items
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {filteredData.length === 0 ? (
        <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600">
              {raciData.length === 0 
                ? "No RACI data available for this phase." 
                : "No items match your search criteria."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900 min-w-[100px]">Step ID</th>
                    <th className="text-left p-4 font-semibold text-gray-900 min-w-[300px]">Task</th>
                    <th className="text-left p-4 font-semibold text-gray-900 min-w-[150px]">Responsible</th>
                    <th className="text-left p-4 font-semibold text-gray-900 min-w-[150px]">Accountable</th>
                    <th className="text-left p-4 font-semibold text-gray-900 min-w-[150px]">Consulted</th>
                    <th className="text-left p-4 font-semibold text-gray-900 min-w-[150px]">Informed</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={item.id} className={`border-b hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                      <td className="p-4">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          {item.step_id}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="max-w-md">
                          <p className="text-sm font-medium text-gray-900 leading-relaxed">{item.task}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        {item.responsible && (
                          <Badge className="bg-green-100 text-green-800">
                            {item.responsible}
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        {item.accountable && (
                          <Badge className="bg-blue-100 text-blue-800">
                            {item.accountable}
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        {item.consulted && (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            {item.consulted}
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        {item.informed && (
                          <Badge className="bg-purple-100 text-purple-800">
                            {item.informed}
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* RACI Legend */}
      <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg">RACI Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-green-100 text-green-800">R</Badge>
              <div>
                <p className="font-medium">Responsible</p>
                <p className="text-sm text-gray-600">Does the work</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-100 text-blue-800">A</Badge>
              <div>
                <p className="font-medium">Accountable</p>
                <p className="text-sm text-gray-600">Ultimately answerable</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-yellow-100 text-yellow-800">C</Badge>
              <div>
                <p className="font-medium">Consulted</p>
                <p className="text-sm text-gray-600">Provides input</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-purple-100 text-purple-800">I</Badge>
              <div>
                <p className="font-medium">Informed</p>
                <p className="text-sm text-gray-600">Kept in the loop</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
