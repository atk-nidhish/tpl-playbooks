import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { Leaderboard } from "@/components/Leaderboard";
import { ModernNavigation } from "@/components/ModernNavigation";
import { ModernTabs } from "@/components/ModernTabs";
import { seedSolarEngineeringData } from "@/services/solar-engineering-playbook-seeder";
import { Home, Map, Zap } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const PLAYBOOK_ID = "550e8400-e29b-41d4-a716-446655440001";

export default function SolarEngineeringDashboard() {
  const [activePhase, setActivePhase] = useState("chapter-1");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("processes");

  useEffect(() => {
    initializePlaybook();
  }, []);

  const initializePlaybook = async () => {
    try {
      console.log('Initializing Engineering - Solar playbook...');
      await seedSolarEngineeringData();
      console.log('Engineering - Solar playbook initialized successfully');
    } catch (error) {
      console.error('Error initializing playbook:', error);
      toast.error("Failed to initialize playbook data");
    }
  };

  const chapters = [
    {
      id: "chapter-1",
      name: "Chapter 1: Basic Engineering Design Preparation",
      shortName: "Ch 1: Basic Engineering",
      subChapters: [
        { id: "section-1.1", name: "Section 1.1: Process Steps", shortName: "1.1 Process Steps" },
        { id: "section-1.2", name: "Section 1.2: RACI", shortName: "1.2 RACI" },
        { id: "section-1.3", name: "Section 1.3: Process Map", shortName: "1.3 Process Map" }
      ]
    },
    {
      id: "chapter-2.1",
      name: "Chapter 2.1: Owner's Engineer Finalization",
      shortName: "Ch 2.1: Owner's Engineer",
      subChapters: [
        { id: "section-2.1.1", name: "Section 2.1.1: Process Steps", shortName: "2.1.1 Process Steps" },
        { id: "section-2.1.2", name: "Section 2.1.2: RACI", shortName: "2.1.2 RACI" },
        { id: "section-2.1.3", name: "Section 2.1.3: Process Map", shortName: "2.1.3 Process Map" }
      ]
    },
    {
      id: "chapter-2.2a",
      name: "Chapter 2.2A: Site Survey Consultant Finalization",
      shortName: "Ch 2.2A: Site Survey",
      subChapters: [
        { id: "section-2.2a.1", name: "Section 2.2A.1: Process Steps", shortName: "2.2A.1 Process Steps" },
        { id: "section-2.2a.2", name: "Section 2.2A.2: RACI", shortName: "2.2A.2 RACI" },
        { id: "section-2.2a.3", name: "Section 2.2A.3: Process Map", shortName: "2.2A.3 Process Map" }
      ]
    },
    {
      id: "chapter-2.2b",
      name: "Chapter 2.2B: Preliminary Works Execution",
      shortName: "Ch 2.2B: Preliminary Works",
      subChapters: [
        { id: "section-2.2b.1", name: "Section 2.2B.1: Process Steps", shortName: "2.2B.1 Process Steps" },
        { id: "section-2.2b.2", name: "Section 2.2B.2: RACI", shortName: "2.2B.2 RACI" },
        { id: "section-2.2b.3", name: "Section 2.2B.3: Process Map", shortName: "2.2B.3 Process Map" }
      ]
    },
    {
      id: "chapter-3",
      name: "Chapter 3: Detailed Engineering Design Preparation",
      shortName: "Ch 3: Detailed Engineering",
      subChapters: [
        { id: "section-3.1", name: "Section 3.1: Process Steps", shortName: "3.1 Process Steps" },
        { id: "section-3.2", name: "Section 3.2: RACI", shortName: "3.2 RACI" },
        { id: "section-3.3", name: "Section 3.3: Process Map", shortName: "3.3 Process Map" }
      ]
    },
    {
      id: "chapter-4",
      name: "Chapter 4: Sign-Off for Detailed Engineering Design",
      shortName: "Ch 4: Sign-Off",
      subChapters: [
        { id: "section-4.1", name: "Section 4.1: Process Steps", shortName: "4.1 Process Steps" },
        { id: "section-4.2", name: "Section 4.2: RACI", shortName: "4.2 RACI" },
        { id: "section-4.3", name: "Section 4.3: Process Map", shortName: "4.3 Process Map" }
      ]
    },
    {
      id: "chapter-5",
      name: "Chapter 5: Issue Resolution for Detailed Engineering Design",
      shortName: "Ch 5: Issue Resolution",
      subChapters: [
        { id: "section-5.1", name: "Section 5.1: Process Steps", shortName: "5.1 Process Steps" },
        { id: "section-5.2", name: "Section 5.2: RACI", shortName: "5.2 RACI" },
        { id: "section-5.3", name: "Section 5.3: Process Map", shortName: "5.3 Process Map" }
      ]
    },
    {
      id: "chapter-6",
      name: "Chapter 6: Assessment of OE Empanelment Requirements",
      shortName: "Ch 6: OE Assessment",
      subChapters: [
        { id: "section-6.1", name: "Section 6.1: Process Steps", shortName: "6.1 Process Steps" },
        { id: "section-6.2", name: "Section 6.2: RACI", shortName: "6.2 RACI" },
        { id: "section-6.3", name: "Section 6.3: Process Map", shortName: "6.3 Process Map" }
      ]
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
    "section-1.3": "/lovable-uploads/dbb9feef-9d7f-4850-8177-22dca61ec0d7.png",
    "section-2.1.3": "/lovable-uploads/placeholder-process-map.png",
    "section-2.2a.3": "/lovable-uploads/placeholder-process-map.png",
    "section-2.2b.3": "/lovable-uploads/placeholder-process-map.png",
    "section-3.3": "/lovable-uploads/placeholder-process-map.png",
    "section-4.3": "/lovable-uploads/placeholder-process-map.png",
    "section-5.3": "/lovable-uploads/placeholder-process-map.png",
    "section-6.3": "/lovable-uploads/placeholder-process-map.png"
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
                  <h1 className="text-2xl font-bold text-gray-900">Engineering - Solar</h1>
                  <p className="text-sm text-gray-600">Engineering Playbook</p>
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
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
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
                  <h1 className="text-2xl font-bold text-gray-900">Engineering - Solar</h1>
                  <p className="text-sm text-gray-600">Engineering Playbook</p>
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
            playbookId={PLAYBOOK_ID}
            playbookName="Engineering - Solar"
            chapters={chapters}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
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
                <h1 className="text-2xl font-bold text-gray-900">Engineering - Solar</h1>
                <p className="text-sm text-gray-600">Comprehensive solar engineering execution methodology and framework</p>
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

      <ModernNavigation 
        chapters={chapters}
        activePhase={activePhase}
        onPhaseChange={setActivePhase}
      />

      <div className="container mx-auto px-6 py-8">
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
