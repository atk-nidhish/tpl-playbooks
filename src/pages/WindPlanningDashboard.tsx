
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ModernNavigation } from "@/components/ModernNavigation";
import { ModernTabs, TabsContent } from "@/components/ModernTabs";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { ArrowLeft, MapPin, Users, CheckCircle, Clock, Award, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Chapter {
  id: string;
  name: string;
  shortName: string;
  subChapters?: Chapter[];
}

const WindPlanningDashboard = () => {
  const navigate = useNavigate();
  const [activePhase, setActivePhase] = useState("section-1-1");
  const [currentTab, setCurrentTab] = useState("processes");
  const [playbook, setPlaybook] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlaybook();
  }, []);

  const fetchPlaybook = async () => {
    try {
      const { data, error } = await supabase
        .from('playbooks')
        .select('*')
        .eq('name', 'wind-planning')
        .single();

      if (error) throw error;
      setPlaybook(data);
    } catch (error) {
      console.error('Error fetching playbook:', error);
    } finally {
      setLoading(false);
    }
  };

  const chapters: Chapter[] = [
    {
      id: "chapter-1",
      name: "Chapter 1 - Plan Integration Management",
      shortName: "Ch 1: Integration",
      subChapters: [
        { id: "section-1-1", name: "Section 1.1 - Project Plan Preparation During Bidding", shortName: "1.1 Plan Prep" },
        { id: "section-1-2", name: "Section 1.2 - Project Schedule and Execution Approach", shortName: "1.2 Schedule" },
        { id: "section-1-3", name: "Section 1.3 - Land Finalization Plan", shortName: "1.3 Land Plan" },
        { id: "section-1-4", name: "Section 1.4 - Engineering Plan", shortName: "1.4 Engineering" },
        { id: "section-1-5", name: "Section 1.5 - Procurement Plan", shortName: "1.5 Procurement" },
        { id: "section-1-6", name: "Section 1.6 - Construction Plan", shortName: "1.6 Construction" },
        { id: "section-1-7", name: "Section 1.7 - Commissioning Plan", shortName: "1.7 Commissioning" },
        { id: "section-1-8", name: "Section 1.8 - Plan Integration", shortName: "1.8 Integration" },
        { id: "section-1-9", name: "Section 1.9 - Plan Update", shortName: "1.9 Updates" }
      ]
    },
    {
      id: "chapter-2",
      name: "Chapter 2 - Scope Management Plan",
      shortName: "Ch 2: Scope"
    },
    {
      id: "chapter-3",
      name: "Chapter 3 - Cost Management Plan",
      shortName: "Ch 3: Cost"
    },
    {
      id: "chapter-4",
      name: "Chapter 4 - Quality Management Plan",
      shortName: "Ch 4: Quality"
    },
    {
      id: "chapter-5",
      name: "Chapter 5 - Statutory Approval Management Plan",
      shortName: "Ch 5: Approvals"
    },
    {
      id: "chapter-6",
      name: "Chapter 6 - Risk Management Plan",
      shortName: "Ch 6: Risk"
    }
  ];

  const getCurrentChapter = () => {
    for (const chapter of chapters) {
      if (chapter.id === activePhase) return chapter;
      if (chapter.subChapters) {
        const subChapter = chapter.subChapters.find(sub => sub.id === activePhase);
        if (subChapter) return subChapter;
      }
    }
    return chapters[0].subChapters?.[0] || chapters[0];
  };

  const currentChapter = getCurrentChapter();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Wind Planning Playbook...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-green-200 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 hover:bg-green-50 border-green-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Wind - Planning</h1>
                  <p className="text-sm text-gray-600">Wind Project Planning Playbook</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-800 font-semibold">
                Interactive Playbook
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <ModernNavigation
        chapters={chapters}
        activePhase={activePhase}
        onPhaseChange={setActivePhase}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Chapter Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-r from-green-400 to-teal-500 p-2 rounded-lg">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{currentChapter.name}</h2>
              <p className="text-gray-600">Comprehensive planning procedures and guidelines</p>
            </div>
          </div>

          {/* Progress and Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Progress</p>
                    <p className="text-lg font-bold text-green-600">12%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Est. Time</p>
                    <p className="text-lg font-bold text-blue-600">2-3 weeks</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Team Size</p>
                    <p className="text-lg font-bold text-purple-600">8-12</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white/90 backdrop-blur-sm border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Complexity</p>
                    <p className="text-lg font-bold text-orange-600">Advanced</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Progress value={12} className="w-full h-2 bg-green-100" />
        </div>

        {/* Content Tabs */}
        <ModernTabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsContent value="processes" className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-md border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  Process Steps
                </CardTitle>
                <CardDescription>
                  Detailed step-by-step procedures for {currentChapter.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ProcessSteps 
                  phaseId={activePhase} 
                  playbookName="wind-planning"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="raci" className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-md border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <Users className="h-5 w-5 text-green-600" />
                  RACI Matrix
                </CardTitle>
                <CardDescription>
                  Responsibility assignment matrix for {currentChapter.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <RACIMatrix 
                  phaseId={activePhase} 
                  playbookName="wind-planning"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="process-map" className="space-y-6">
            <Card className="bg-white/95 backdrop-blur-md border-green-200 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-teal-50 border-b border-green-100">
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <MapPin className="h-5 w-5 text-green-600" />
                  Process Map
                </CardTitle>
                <CardDescription>
                  Visual workflow diagram for {currentChapter.name}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <ProcessMap 
                  phaseId={activePhase} 
                  playbookName="wind-planning"
                />
              </CardContent>
            </Card>
          </TabsContent>
        </ModernTabs>

        {/* Certification Section */}
        <div className="mt-12">
          <PlaybookCertification 
            playbookId={playbook?.id}
            playbookName="Wind - Planning"
            onCertificationComplete={() => {
              console.log('Certification completed for Wind Planning');
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WindPlanningDashboard;
