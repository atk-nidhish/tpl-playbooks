
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { useDataInit } from "@/hooks/useDataInit";
import { seedPlanningWindData } from "@/services/planning-wind-playbook-seeder";

const PlanningWindDashboard = () => {
  const [activePhase, setActivePhase] = useState("section-1.1");
  const [activeTab, setActiveTab] = useState("process-steps");
  const [searchQuery, setSearchQuery] = useState("");
  const [isInitializing, setIsInitializing] = useState(true);

  const playbookId = "a1b2c3d4-e5f6-7890-abcd-123456789012";
  const playbookName = "Planning - Wind";

  const chapters = [
    {
      id: "chapter-1",
      name: "Plan Integration Management",
      shortName: "Chapter 1",
      subChapters: [
        { id: "section-1.1", name: "Project Plan Preparation During Bidding", shortName: "1.1" },
        { id: "section-1.2", name: "Project Schedule and Execution Approach", shortName: "1.2" },
        { id: "section-1.3", name: "Land Finalization Plan", shortName: "1.3" },
        { id: "section-1.4", name: "Engineering Plan", shortName: "1.4" },
        { id: "section-1.5", name: "Procurement Plan", shortName: "1.5" },
        { id: "section-1.6", name: "Construction Plan", shortName: "1.6" },
        { id: "section-1.7", name: "Commissioning Plan", shortName: "1.7" },
        { id: "section-1.8", name: "Plan Integration", shortName: "1.8" },
        { id: "section-1.9", name: "Plan Update", shortName: "1.9" }
      ]
    },
    { id: "chapter-2", name: "Scope Management Plan", shortName: "Chapter 2" },
    { id: "chapter-3", name: "Cost Management Plan", shortName: "Chapter 3" },
    { id: "chapter-4", name: "Quality Management Plan", shortName: "Chapter 4" },
    { id: "chapter-5", name: "Statutory Approval Management Plan", shortName: "Chapter 5" },
    { id: "chapter-6", name: "Risk Management Plan", shortName: "Chapter 6" }
  ];

  useEffect(() => {
    const initializeData = async () => {
      try {
        console.log('Initializing Planning - Wind playbook data...');
        await seedPlanningWindData();
        console.log('Planning - Wind playbook initialization complete');
      } catch (error) {
        console.error('Error initializing Planning - Wind data:', error);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeData();
  }, []);

  const phases = [
    { id: "section-1.1", name: "1.1 Project Plan Preparation During Bidding" },
    { id: "section-1.2", name: "1.2 Project Schedule and Execution Approach" },
    { id: "section-1.3", name: "1.3 Land Finalization Plan" },
    { id: "section-1.4", name: "1.4 Engineering Plan" },
    { id: "section-1.5", name: "1.5 Procurement Plan" },
    { id: "section-1.6", name: "1.6 Construction Plan" },
    { id: "section-1.7", name: "1.7 Commissioning Plan" },
    { id: "section-1.8", name: "1.8 Plan Integration" },
    { id: "section-1.9", name: "1.9 Plan Update" },
    { id: "chapter-2", name: "Chapter 2: Scope Management Plan" },
    { id: "chapter-3", name: "Chapter 3: Cost Management Plan" },
    { id: "chapter-4", name: "Chapter 4: Quality Management Plan" },
    { id: "chapter-5", name: "Chapter 5: Statutory Approval Management Plan" },
    { id: "chapter-6", name: "Chapter 6: Risk Management Plan" }
  ];

  const handleNavigateToRaci = () => {
    setActiveTab("raci-matrix");
  };

  const handleNavigateToQuiz = () => {
    setActiveTab("certification");
  };

  if (isInitializing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing Planning - Wind Playbook...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Planning - Wind Playbook
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive wind project planning playbook covering all aspects from bidding to execution
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search process steps, activities, or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 backdrop-blur-sm border-orange-200 focus:border-orange-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg border border-orange-200 p-4 sticky top-4">
              <h3 className="font-semibold text-gray-900 mb-4">Project Phases</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {phases.map((phase) => (
                  <button
                    key={phase.id}
                    onClick={() => setActivePhase(phase.id)}
                    className={`w-full text-left p-3 rounded-lg transition-all duration-200 text-sm ${
                      activePhase === phase.id
                        ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg"
                        : "bg-gray-50 hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {phase.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-white/90 backdrop-blur-sm border border-orange-200">
                <TabsTrigger 
                  value="process-steps" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
                >
                  Process Steps
                </TabsTrigger>
                <TabsTrigger 
                  value="raci-matrix"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
                >
                  RACI Matrix
                </TabsTrigger>
                <TabsTrigger 
                  value="process-map"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
                >
                  Process Map
                </TabsTrigger>
                <TabsTrigger 
                  value="certification"
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white"
                >
                  Certification
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="process-steps" className="mt-0">
                  <ProcessSteps 
                    playbookId={playbookId} 
                    activePhase={activePhase}
                    searchQuery={searchQuery}
                    onNavigateToRaci={handleNavigateToRaci}
                  />
                </TabsContent>

                <TabsContent value="raci-matrix" className="mt-0">
                  <RACIMatrix 
                    playbookId={playbookId} 
                    activePhase={activePhase}
                    searchQuery={searchQuery}
                    onNavigateToQuiz={handleNavigateToQuiz}
                  />
                </TabsContent>

                <TabsContent value="process-map" className="mt-0">
                  <ProcessMap 
                    playbookId={playbookId} 
                    activePhase={activePhase}
                  />
                </TabsContent>

                <TabsContent value="certification" className="mt-0">
                  <PlaybookCertification 
                    playbookId={playbookId}
                    playbookName={playbookName}
                    chapters={chapters}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanningWindDashboard;
