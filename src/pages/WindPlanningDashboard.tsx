import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ModernNavigation } from "@/components/ModernNavigation";
import { ModernTabs, TabsContent } from "@/components/ModernTabs";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { Leaderboard } from "@/components/Leaderboard";
import { ArrowLeft, MapPin, Search, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { createWindPlanningPlaybook } from "@/services/wind-planning/wind-planning-orchestrator";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [playbook, setPlaybook] = useState<any>(null);
  const [playbookId, setPlaybookId] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializePlaybook();
  }, []);

  const initializePlaybook = async () => {
    try {
      // First, try to fetch existing playbook
      const { data, error } = await supabase
        .from('playbooks')
        .select('*')
        .eq('name', 'wind-planning')
        .single();

      if (error && error.code === 'PGRST116') {
        // Playbook doesn't exist, create it
        console.log('Wind Planning playbook not found, creating it...');
        const newPlaybookId = await createWindPlanningPlaybook();
        setPlaybookId(newPlaybookId);
        
        // Fetch the newly created playbook
        const { data: newData } = await supabase
          .from('playbooks')
          .select('*')
          .eq('id', newPlaybookId)
          .single();
        
        setPlaybook(newData);
      } else if (error) {
        throw error;
      } else {
        setPlaybook(data);
        setPlaybookId(data.id);
      }
    } catch (error) {
      console.error('Error initializing playbook:', error);
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
      shortName: "Ch 2: Scope",
      subChapters: [
        { id: "section-2-1", name: "Section 2.1 - Scope Management Plan", shortName: "2.1 Scope Mgmt" }
      ]
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
    },
    {
      id: "certification",
      name: "Playbook Certification",
      shortName: "Certification"
    },
    {
      id: "leaderboard",
      name: "Certification Leaderboard",
      shortName: "Leaderboard"
    }
  ];

  const handleNavigateToRaci = () => {
    setCurrentTab("raci");
  };

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

  // Handle leaderboard section
  if (activePhase === "leaderboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
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
            </div>
          </div>
        </header>

        <ModernNavigation
          chapters={chapters}
          activePhase={activePhase}
          onPhaseChange={setActivePhase}
        />

        <div className="container mx-auto px-6 py-8">
          <Leaderboard />
        </div>
      </div>
    );
  }

  // Handle certification section
  if (activePhase === "certification") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
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
            </div>
          </div>
        </header>

        <ModernNavigation
          chapters={chapters}
          activePhase={activePhase}
          onPhaseChange={setActivePhase}
        />

        <div className="container mx-auto px-6 py-8">
          <PlaybookCertification 
            playbookId={playbookId}
            playbookName="Wind - Planning"
            chapters={chapters}
          />
        </div>
      </div>
    );
  }

  const getProcessMapImage = (phaseId: string) => {
    // Use the process map images from the uploaded screenshots
    if (phaseId === "section-1-1") {
      return "/lovable-uploads/47e7e779-539c-4951-b246-84c726cc68fc.png";
    } else if (phaseId === "section-1-2") {
      return "/lovable-uploads/39d791f6-decc-4af3-91c2-17aec32bce79.png";
    } else if (phaseId === "section-2-1") {
      return "/lovable-uploads/bec003c8-ff06-464d-820f-9b21e6f2086f.png";
    }
    // Fallback for other phases
    return "/lovable-uploads/02ea28df-7aa0-437b-8db2-15769af9665c.png";
  };

  const downloadProcessMap = (phaseId: string) => {
    const imageUrl = getProcessMapImage(phaseId);
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `Process-Map-${phaseId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search processes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-80 bg-white/90"
                />
              </div>
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
        {/* Content Tabs */}
        <ModernTabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsContent value="processes" className="space-y-6">
            <ProcessSteps 
              playbookId={playbookId} 
              activePhase={activePhase} 
              searchQuery={searchQuery}
              onNavigateToRaci={handleNavigateToRaci}
            />
          </TabsContent>

          <TabsContent value="raci" className="space-y-6">
            <RACIMatrix 
              playbookId={playbookId} 
              activePhase={activePhase} 
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="process-map" className="space-y-6">
            <div className="space-y-6">
              <Card className="bg-white/95 backdrop-blur-md border-green-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-green-600" />
                        Process Map - {activePhase}
                      </CardTitle>
                      <CardDescription>
                        Visual representation of the complete process flow
                      </CardDescription>
                    </div>
                    <Button 
                      onClick={() => downloadProcessMap(activePhase)}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <img 
                      src={getProcessMapImage(activePhase)}
                      alt={`Process Map for ${activePhase}`}
                      className="max-w-full h-auto rounded-lg shadow-lg border border-green-200"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </ModernTabs>
      </div>
    </div>
  );
};

export default WindPlanningDashboard;
