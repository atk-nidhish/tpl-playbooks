
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, FileText, Users, Map, Zap } from "lucide-react";
import { seedCommissioningPlaybook } from "@/services/manual-data-seeder";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

interface PlaybookStats {
  totalSteps: number;
  totalRACIEntries: number;
  totalProcessMapItems: number;
  chapters: number;
}

export const CommissioningDashboard = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [playbookId, setPlaybookId] = useState<string | null>(null);
  const [stats, setStats] = useState<PlaybookStats | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkExistingPlaybook();
  }, []);

  const checkExistingPlaybook = async () => {
    try {
      const { data, error } = await supabase
        .from('playbooks')
        .select('id')
        .eq('name', 'commissioning_playbook_solar_power')
        .single();

      if (data) {
        setPlaybookId(data.id);
        await fetchStats(data.id);
      }
    } catch (error) {
      console.log('No existing commissioning playbook found');
    }
  };

  const fetchStats = async (id: string) => {
    try {
      const [stepsRes, raciRes, processMapRes] = await Promise.all([
        supabase.from('process_steps').select('id').eq('playbook_id', id),
        supabase.from('raci_matrix').select('id').eq('playbook_id', id),
        supabase.from('process_map').select('id').eq('playbook_id', id)
      ]);

      setStats({
        totalSteps: stepsRes.data?.length || 0,
        totalRACIEntries: raciRes.data?.length || 0,
        totalProcessMapItems: processMapRes.data?.length || 0,
        chapters: 4 // 3.1, 3.2, 4, and summary
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleCreateDashboard = async () => {
    setIsSeeding(true);
    try {
      const newPlaybookId = await seedCommissioningPlaybook();
      setPlaybookId(newPlaybookId);
      await fetchStats(newPlaybookId);
      console.log('Commissioning playbook created successfully!');
    } catch (error) {
      console.error('Error creating commissioning playbook:', error);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleViewPlaybook = () => {
    if (playbookId) {
      navigate(`/playbook/${playbookId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-3 rounded-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Commissioning Playbook Dashboard</h1>
          </div>
          <p className="text-xl text-gray-600 mb-2">Solar Power Project Execution Guide</p>
          <p className="text-sm text-gray-500">Part 6/6 | Playbook Series for Project Nav Saksham | Developed for Torrent Power</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Chapters</CardTitle>
                <FileText className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.chapters}</div>
                <p className="text-xs text-muted-foreground">Process phases</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Process Steps</CardTitle>
                <Play className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSteps}</div>
                <p className="text-xs text-muted-foreground">Detailed activities</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">RACI Entries</CardTitle>
                <Users className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRACIEntries}</div>
                <p className="text-xs text-muted-foreground">Role assignments</p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Process Maps</CardTitle>
                <Map className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProcessMapItems}</div>
                <p className="text-xs text-muted-foreground">Flow diagrams</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Project Overview */}
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-500" />
                Project Overview
              </CardTitle>
              <CardDescription>
                Comprehensive commissioning guide for solar project execution
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Chapter 3: Approvals for First Time Charging</h3>
                  <p className="text-sm text-gray-600">RLDC User Registration & CEIG Approval processes</p>
                </div>
                <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
                  2 Sections
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <h3 className="font-semibold text-gray-900">Chapter 4: First Time Charging & Commercial Operation</h3>
                  <p className="text-sm text-gray-600">FTC processes and commercial operation procedures</p>
                </div>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                  Complete Flow
                </Badge>
              </div>

              <div className="pt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Regulatory approvals and compliance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Technical validation and testing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Commercial operation certification</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Key Features */}
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-500" />
                Key Features
              </CardTitle>
              <CardDescription>
                Comprehensive tools for project commissioning management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Play className="h-4 w-4 text-blue-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">Detailed Process Steps</h4>
                    <p className="text-xs text-gray-500">Step-by-step execution guidelines</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="h-4 w-4 text-green-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">RACI Responsibility Matrix</h4>
                    <p className="text-xs text-gray-500">Clear role definitions and accountability</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Map className="h-4 w-4 text-purple-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">Visual Process Maps</h4>
                    <p className="text-xs text-gray-500">Interactive flow diagrams</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Process Coverage</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>• RLDC User Registration procedures</p>
                  <p>• CEIG approval workflows</p>
                  <p>• First Time Charging protocols</p>
                  <p>• Commercial operation certification</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Section */}
        <div className="mt-8 text-center">
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardContent className="p-8">
              {!playbookId ? (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Create Your Commissioning Dashboard</h2>
                  <p className="text-gray-600 mb-6">
                    Transform your uploaded commissioning playbook images into an interactive, searchable dashboard
                    with detailed process steps, RACI matrices, and visual process maps.
                  </p>
                  <Button 
                    onClick={handleCreateDashboard}
                    disabled={isSeeding}
                    size="lg"
                    className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white"
                  >
                    {isSeeding ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating Dashboard...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Create Dashboard
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Ready!</h2>
                  <p className="text-gray-600 mb-6">
                    Your commissioning playbook has been successfully processed and is ready for use.
                    Access all process steps, RACI matrices, and process maps.
                  </p>
                  <Button 
                    onClick={handleViewPlaybook}
                    size="lg"
                    className="bg-gradient-to-r from-green-400 to-blue-400 hover:from-green-500 hover:to-blue-500 text-white"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    View Dashboard
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
