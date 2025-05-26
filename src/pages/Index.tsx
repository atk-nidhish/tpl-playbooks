
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Sun, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePhase, setActivePhase] = useState("Phase 1");
  
  // Legacy hardcoded playbook ID - this will be replaced when we have proper data seeding
  const legacyPlaybookId = "legacy-solar-execution";

  const projectPhases = [
    {
      id: "Phase 1",
      name: "Phase 1: Project Initiation",
      description: "Initial project setup and planning"
    },
    {
      id: "Phase 2", 
      name: "Phase 2: Design & Engineering",
      description: "System design and engineering phase"
    },
    {
      id: "Phase 3",
      name: "Phase 3: Implementation",
      description: "Project implementation and execution"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="p-2 hover:bg-orange-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-2 rounded-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Solar Project Execution</h1>
                <p className="text-sm text-gray-600">Legacy Interactive Playbook Edition</p>
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
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Phase Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Phases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectPhases.map((phase) => (
              <Card 
                key={phase.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activePhase === phase.id 
                    ? 'ring-2 ring-orange-400 bg-white' 
                    : 'bg-white/90 backdrop-blur-sm border-orange-200'
                }`}
                onClick={() => setActivePhase(phase.id)}
              >
                <CardHeader>
                  <CardTitle className="text-lg">{phase.name}</CardTitle>
                  <CardDescription>{phase.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="processes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white/90 backdrop-blur-sm">
            <TabsTrigger value="processes" className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Process Steps
            </TabsTrigger>
            <TabsTrigger value="raci" className="flex items-center gap-2">
              RACI Matrix
            </TabsTrigger>
            <TabsTrigger value="process-map" className="flex items-center gap-2">
              Process Map
            </TabsTrigger>
          </TabsList>

          <TabsContent value="processes">
            <ProcessSteps playbookId={legacyPlaybookId} activePhase={activePhase} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="raci">
            <RACIMatrix playbookId={legacyPlaybookId} activePhase={activePhase} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="process-map">
            <ProcessMap playbookId={legacyPlaybookId} activePhase={activePhase} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
