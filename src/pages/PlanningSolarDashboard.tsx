
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";
import { ChapterQuiz } from "@/components/ChapterQuiz";
import { PlaybookReprocessor } from "@/components/PlaybookReprocessor";
import { seedPlanningSolarData } from "@/services/planning-solar-playbook-seeder";
import { Search, BookOpen, Users, Map, Settings, RotateCcw, Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const PLAYBOOK_ID = "f895041f-04e3-466b-aa09-53782e40467c";

export default function PlanningSolarDashboard() {
  const [activePhase, setActivePhase] = useState("section-1.1");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("process-steps");

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
      await supabase.from('phases').delete().eq('playbook_id', PLAYBOOK_ID);
      
      // Re-seed the data
      await seedPlanningSolarData();
      
      toast.success("Playbook reprocessed successfully!");
    } catch (error) {
      console.error('Error reprocessing playbook:', error);
      toast.error("Failed to reprocess playbook");
    }
  };

  const phases = [
    { id: "section-1.1", title: "Project Initiation", description: "Initial project setup" },
    { id: "section-1.2", title: "Planning Scope", description: "Define project scope" },
    { id: "section-1.3", title: "Land Plan", description: "Land acquisition planning" },
    { id: "section-1.4", title: "Engineering Plan", description: "Engineering design planning" },
    { id: "section-1.5", title: "Procurement Plan", description: "Procurement strategy" },
    { id: "section-1.6", title: "Construction Plan", description: "Construction management" },
    { id: "section-1.7", title: "Commissioning Plan", description: "Commissioning strategy" },
    { id: "section-1.8", title: "Plan Integration", description: "Integration of all plans" },
    { id: "section-1.9", title: "Plan Update", description: "Plan revision management" }
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
    "section-1.9": "/lovable-uploads/d2969666-1f4c-4539-bd93-f744a481fd27.png"
  };

  const navigateToRaci = () => {
    setActiveTab("raci-matrix");
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

        {/* Phase Selection */}
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">Project Phases</CardTitle>
            <CardDescription>Select a phase to explore its detailed processes and requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {phases.map((phase) => (
                <Button
                  key={phase.id}
                  variant={activePhase === phase.id ? "default" : "outline"}
                  className={`h-auto p-4 flex flex-col items-start text-left ${
                    activePhase === phase.id
                      ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-orange-400"
                      : "border-orange-200 hover:bg-orange-50 hover:border-orange-300"
                  }`}
                  onClick={() => setActivePhase(phase.id)}
                >
                  <Badge 
                    variant="secondary" 
                    className={`mb-2 text-xs ${
                      activePhase === phase.id ? "bg-white/20 text-white" : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {phase.id.replace('section-', 'Section ')}
                  </Badge>
                  <div className="font-semibold text-sm mb-1">{phase.title}</div>
                  <div className="text-xs opacity-80">{phase.description}</div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardContent className="p-6">
              <TabsList className="grid grid-cols-4 lg:grid-cols-4 w-full bg-orange-50">
                <TabsTrigger value="process-steps" className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  <Settings className="h-4 w-4" />
                  Process Steps
                </TabsTrigger>
                <TabsTrigger value="raci-matrix" className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  <Users className="h-4 w-4" />
                  RACI Matrix
                </TabsTrigger>
                <TabsTrigger value="process-map" className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  <Map className="h-4 w-4" />
                  Process Map
                </TabsTrigger>
                <TabsTrigger value="quiz" className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                  <BookOpen className="h-4 w-4" />
                  Chapter Quiz
                </TabsTrigger>
              </TabsList>
            </CardContent>
          </Card>

          <TabsContent value="process-steps" className="space-y-6">
            <ProcessSteps 
              playbookId={PLAYBOOK_ID} 
              activePhase={activePhase} 
              searchQuery={searchQuery}
              onNavigateToRaci={navigateToRaci}
            />
          </TabsContent>

          <TabsContent value="raci-matrix" className="space-y-6">
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
                    Visual workflow diagram for {phases.find(p => p.id === activePhase)?.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-orange-200 rounded-lg overflow-hidden bg-white">
                    <img 
                      src={processMapImages[activePhase as keyof typeof processMapImages]}
                      alt={`Process map for ${phases.find(p => p.id === activePhase)?.title}`}
                      className="w-full h-auto"
                    />
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <ChapterQuiz 
              playbookId={PLAYBOOK_ID} 
              activePhase={activePhase}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
