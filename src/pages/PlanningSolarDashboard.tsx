
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";
import { ChapterQuiz } from "@/components/ChapterQuiz";
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { Leaderboard } from "@/components/Leaderboard";
import { PlaybookReprocessor } from "@/components/PlaybookReprocessor";
import { ModernNavigation } from "@/components/ModernNavigation";
import { ModernTabs } from "@/components/ModernTabs";
import { seedPlanningSolarData } from "@/services/planning-solar-playbook-seeder";
import { Search, BookOpen, Users, Map, Settings, RotateCcw, Zap, Award, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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

  const handleReprocessPlaybook = async () => {
    try {
      console.log('Reprocessing Planning - Solar playbook...');
      
      // Clear existing data for this playbook
      await supabase.from('process_steps').delete().eq('playbook_id', PLAYBOOK_ID);
      await supabase.from('raci_matrix').delete().eq('playbook_id', PLAYBOOK_ID);
      await supabase.from('process_map').delete().eq('playbook_id', PLAYBOOK_ID);
      
      // Re-seed the data
      await seedPlanningSolarData();
      
      toast.success("Playbook reprocessed successfully!");
    } catch (error) {
      console.error('Error reprocessing playbook:', error);
      toast.error("Failed to reprocess playbook");
    }
  };

  const chapters = [
    {
      id: "chapter-1",
      name: "Chapter 1: Planning Process",
      shortName: "Ch 1: Planning",
      subChapters: [
        { id: "section-1.1", name: "1.1 Project Initiation", shortName: "1.1" },
        { id: "section-1.2", name: "1.2 Planning Scope", shortName: "1.2" },
        { id: "section-1.3", name: "1.3 Land Plan", shortName: "1.3" },
        { id: "section-1.4", name: "1.4 Engineering Plan", shortName: "1.4" },
        { id: "section-1.5", name: "1.5 Procurement Plan", shortName: "1.5" },
        { id: "section-1.6", name: "1.6 Construction Plan", shortName: "1.6" },
        { id: "section-1.7", name: "1.7 Commissioning Plan", shortName: "1.7" },
        { id: "section-1.8", name: "1.8 Plan Integration", shortName: "1.8" },
        { id: "section-1.9", name: "1.9 Plan Update", shortName: "1.9" }
      ]
    },
    {
      id: "chapter-2",
      name: "Chapter 2: Scope Management Plan",
      shortName: "Ch 2: Scope",
      subChapters: []
    },
    {
      id: "chapter-3",
      name: "Chapter 3: Cost Management Plan",
      shortName: "Ch 3: Cost",
      subChapters: []
    },
    {
      id: "chapter-4",
      name: "Chapter 4: Quality Management Plan",
      shortName: "Ch 4: Quality",
      subChapters: []
    },
    {
      id: "chapter-5",
      name: "Chapter 5: Risk Management Plan",
      shortName: "Ch 5: Risk",
      subChapters: []
    },
    {
      id: "chapter-6",
      name: "Chapter 6: Resource Management Plan",
      shortName: "Ch 6: Resource",
      subChapters: []
    }
  ];

  const processMapImages = {
    "section-1.1": "/lovable-uploads/2289e97c-b60f-4e79-b555-017b1a434121.png",
    "section-1.2": "/lovable-uploads/e636eada-e8c6-4f53-9c93-b0409b936e03.png",
    "section-1.3": "/lovable-uploads/3d9ebbef-27ff-4dc6-89d0-ec7cc752027e.png",
    "section-1.4": "/lovable-uploads/dbb9feef-9d7f-4850-8177-22dca61ec0d7.png",
    "section-1.5": "/lovable-uploads/7850b53b-86d8-44eb-8325-17ac3366fc82.png",
    "section-1.6": "/lovable-uploads/612ac02b-ad2d-414a-a2db-6fbbd09d360d.png",
    "section-1.7": "/lovable-uploads/b8a0d568-9703-4696-bb00-ea27bca372f1.png",
    "section-1.8": "/lovable-uploads/0b8675aa-99ea-47ba-9261-2092b1d93024.png",
    "section-1.9": "/lovable-uploads/d2969666-1f4c-4539-bd93-f744a481fd27.png",
    "section-2.3": "/lovable-uploads/1ace2979-e13f-4f17-a553-3f0241ffa59a.png",
    "section-3.3": "/lovable-uploads/8988784b-8360-4035-b449-b2c21a211765.png"
  };

  const navigateToRaci = () => {
    setActiveTab("raci");
  };

  const navigateToQuiz = () => {
    setActiveTab("quiz");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  Planning - Solar Playbook
                </CardTitle>
                <CardDescription className="text-lg text-gray-600 mt-2">
                  Comprehensive solar project planning methodology and execution framework
                </CardDescription>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 mt-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search across all sections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 border-orange-200 focus:border-orange-400"
                />
              </div>
              <Button
                onClick={handleReprocessPlaybook}
                variant="outline"
                className="border-orange-200 hover:bg-orange-50"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reprocess
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Modern Navigation */}
        <ModernNavigation 
          chapters={chapters}
          activePhase={activePhase}
          onPhaseChange={setActivePhase}
        />

        {/* Main Content with Modern Tabs */}
        <ModernTabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="processes" className="space-y-6">
            <ProcessSteps 
              playbookId={PLAYBOOK_ID} 
              activePhase={activePhase} 
              searchQuery={searchQuery}
              onNavigateToRaci={navigateToRaci}
            />
          </TabsContent>

          <TabsContent value="raci" className="space-y-6">
            <RACIMatrix 
              playbookId={PLAYBOOK_ID} 
              activePhase={activePhase} 
              searchQuery={searchQuery}
              onNavigateToQuiz={navigateToQuiz}
            />
          </TabsContent>

          <TabsContent value="process-map" className="space-y-6">
            <ProcessMap playbookId={PLAYBOOK_ID} activePhase={activePhase} />
            
            {/* Process Map Image */}
            {processMapImages[activePhase as keyof typeof processMapImages] && (
              <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Map className="h-5 w-5 text-orange-500" />
                    Detailed Process Map
                  </CardTitle>
                  <CardDescription>
                    Visual workflow diagram for {chapters.flatMap(c => c.subChapters).find(s => s.id === activePhase)?.name || chapters.find(c => c.id === activePhase)?.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-orange-200 rounded-lg overflow-hidden bg-white">
                    <img 
                      src={processMapImages[activePhase as keyof typeof processMapImages]}
                      alt={`Process map for ${chapters.flatMap(c => c.subChapters).find(s => s.id === activePhase)?.name || chapters.find(c => c.id === activePhase)?.name}`}
                      className="w-full h-auto"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <ChapterQuiz 
              activePhase={activePhase}
            />
          </TabsContent>

          <TabsContent value="certificate" className="space-y-6">
            <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-500" />
                  Playbook Certification
                </CardTitle>
                <CardDescription>
                  Complete all chapter quizzes to earn your Planning - Solar certification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlaybookCertification 
                  playbookId={PLAYBOOK_ID}
                  playbookName="Planning - Solar"
                  chapters={chapters}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Leaderboard />
          </TabsContent>
        </ModernTabs>
      </div>
    </div>
  );
}
