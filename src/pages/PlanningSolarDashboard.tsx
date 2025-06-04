
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { Leaderboard } from "@/components/Leaderboard";
import { ModernNavigation } from "@/components/ModernNavigation";
import { ModernTabs } from "@/components/ModernTabs";
import { seedPlanningSolarData } from "@/services/planning-solar-playbook-seeder";
import { Home, BookOpen, Users, Map, Settings, Zap, Award, Trophy, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const PLAYBOOK_ID = "f895041f-04e3-466b-aa09-53782e40467c";

export default function PlanningSolarDashboard() {
  const [activePhase, setActivePhase] = useState("section-1.1");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("processes");

  useEffect(() => {
    // Initialize playbook data on component mount
    initializePlaybook();
  }, []);

  const initializePlaybook = async () => {
    try {
      console.log('Initializing Planning - Solar playbook...');
      await seedPlanningSolarData();
      console.log('Planning - Solar playbook initialized successfully');
    } catch (error) {
      console.error('Error initializing playbook:', error);
      toast.error("Failed to initialize playbook data");
    }
  };

  const chapters = [
    {
      id: "chapter-1",
      name: "Chapter 1: Plan Integration Management",
      shortName: "Ch 1: Plan Integration",
      subChapters: [
        { id: "section-1.1", name: "Section 1.1: Project Plan Preparation During Bidding", shortName: "1.1 Project Plan Prep" },
        { id: "section-1.2", name: "Section 1.2: Project Schedule and Execution Approach", shortName: "1.2 Schedule & Execution" },
        { id: "section-1.3", name: "Section 1.3: Land Finalization Plan", shortName: "1.3 Land Finalization" },
        { id: "section-1.4", name: "Section 1.4: Engineering Plan", shortName: "1.4 Engineering Plan" },
        { id: "section-1.5", name: "Section 1.5: Procurement Plan", shortName: "1.5 Procurement Plan" },
        { id: "section-1.6", name: "Section 1.6: Construction Plan", shortName: "1.6 Construction Plan" },
        { id: "section-1.7", name: "Section 1.7: Commissioning Plan", shortName: "1.7 Commissioning Plan" },
        { id: "section-1.8", name: "Section 1.8: Plan Integration", shortName: "1.8 Plan Integration" },
        { id: "section-1.9", name: "Section 1.9: Plan Update", shortName: "1.9 Plan Update" }
      ]
    },
    {
      id: "chapter-2",
      name: "Chapter 2: Scope Management Plan",
      shortName: "Ch 2: Scope Management"
    },
    {
      id: "chapter-3",
      name: "Chapter 3: Cost Management Plan",
      shortName: "Ch 3: Cost Management"
    },
    {
      id: "chapter-4",
      name: "Chapter 4: Quality Management Plan",
      shortName: "Ch 4: Quality Management"
    },
    {
      id: "chapter-5",
      name: "Chapter 5: Statutory Approval Management Plan",
      shortName: "Ch 5: Statutory Approval"
    },
    {
      id: "chapter-6",
      name: "Chapter 6: Risk Management Plan",
      shortName: "Ch 6: Risk Management"
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

  const processMapImages = {
    "section-1.1": "/lovable-uploads/5707c4f3-b2b9-4e30-b8e5-27b2de0ecf63.png",
    "section-1.2": "/lovable-uploads/e636eada-e8c6-4f53-9c93-b0409b936e03.png",
    "section-1.3": "/lovable-uploads/80b2c685-97ca-460f-8b5f-ef4312be4cd9.png",
    "section-1.4": "/lovable-uploads/dbb9feef-9d7f-4850-8177-22dca61ec0d7.png",
    "section-1.5": "/lovable-uploads/ab781f20-6004-4afc-80be-aade9fc13cd3.png",
    "section-1.6": "/lovable-uploads/612ac02b-ad2d-414a-a2db-6fbbd09d360d.png",
    "section-1.7": "/lovable-uploads/b8a0d568-9703-4696-bb00-ea27bca372f1.png",
    "section-1.8": "/lovable-uploads/0b8675aa-99ea-47ba-9261-2092b1d93024.png",
    "section-1.9": "/lovable-uploads/d2969666-1f4c-4539-bd93-f744a481fd27.png",
    "chapter-2": "/lovable-uploads/1ace2979-e13f-4f17-a553-3f0241ffa59a.png",
    "chapter-3": "/lovable-uploads/8988784b-8360-4035-b449-b2c21a211765.png",
    "chapter-4": "/lovable-uploads/7c770988-9bc7-44c4-b83c-875d7731fe58.png",
    "chapter-5": "/lovable-uploads/62318464-8cad-4c33-af4b-1d77c3894c26.png",
    "chapter-6": "/lovable-uploads/5988e549-2352-4c27-9380-24fdc2e14575.png"
  };

  const navigateToRaci = () => {
    setActiveTab("raci");
  };

  const downloadProcessMap = (phaseId: string) => {
    const imageUrl = processMapImages[phaseId as keyof typeof processMapImages];
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `Process-Map-${phaseId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Handle leaderboard section
  if (activePhase === "leaderboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-orange-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link to="/" className="p-2 hover:bg-orange-100 rounded-lg transition-colors">
                  <Home className="h-5 w-5 text-gray-600" />
                </Link>
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Planning - Solar</h1>
                  <p className="text-sm text-gray-600">Planning Playbook</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Modern Navigation */}
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-orange-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link to="/" className="p-2 hover:bg-orange-100 rounded-lg transition-colors">
                  <Home className="h-5 w-5 text-gray-600" />
                </Link>
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Planning - Solar</h1>
                  <p className="text-sm text-gray-600">Planning Playbook</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Modern Navigation */}
        <ModernNavigation 
          chapters={chapters}
          activePhase={activePhase}
          onPhaseChange={setActivePhase}
        />

        <div className="container mx-auto px-6 py-8">
          <PlaybookCertification 
            playbookId={PLAYBOOK_ID}
            playbookName="Planning - Solar"
            chapters={chapters}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="p-2 hover:bg-orange-100 rounded-lg transition-colors">
                <Home className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Planning - Solar</h1>
                <p className="text-sm text-gray-600">Comprehensive solar project planning methodology and execution framework</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  placeholder="Search processes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 bg-white/90"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Modern Navigation */}
      <ModernNavigation 
        chapters={chapters}
        activePhase={activePhase}
        onPhaseChange={setActivePhase}
      />

      <div className="container mx-auto px-6 py-8">
        {/* Main Content Tabs */}
        <ModernTabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="processes">
            <ProcessSteps 
              playbookId={PLAYBOOK_ID} 
              activePhase={activePhase} 
              searchQuery={searchQuery}
              onNavigateToRaci={navigateToRaci}
            />
          </TabsContent>

          <TabsContent value="raci">
            <RACIMatrix 
              playbookId={PLAYBOOK_ID} 
              activePhase={activePhase} 
              searchQuery={searchQuery}
            />
          </TabsContent>

          <TabsContent value="process-map">
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Process Map - {activePhase}
                      </CardTitle>
                      <CardDescription>
                        Visual representation of the complete process flow
                      </CardDescription>
                    </div>
                    <Button 
                      onClick={() => downloadProcessMap(activePhase)}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                    >
                      <Map className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    {processMapImages[activePhase as keyof typeof processMapImages] ? (
                      <img 
                        src={processMapImages[activePhase as keyof typeof processMapImages]}
                        alt={`Process Map for ${activePhase}`}
                        className="max-w-full h-auto rounded-lg shadow-lg border border-orange-200"
                      />
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No process map available for this section</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </ModernTabs>
      </div>
    </div>
  );
}
