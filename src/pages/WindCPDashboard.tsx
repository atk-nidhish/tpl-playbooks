
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Wind, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";
import { createWindCPPlaybook, seedWindCPChapter1Data, seedWindCPChapter2Data } from "@/services/wind-cp-playbook-seeder";

const WindCPDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePhase, setActivePhase] = useState("chapter-1");
  const [playbookId, setPlaybookId] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializePlaybook = async () => {
      try {
        console.log('Initializing Wind C&P playbook...');
        const newPlaybookId = await createWindCPPlaybook();
        await seedWindCPChapter1Data(newPlaybookId);
        await seedWindCPChapter2Data(newPlaybookId);
        setPlaybookId(newPlaybookId);
        setIsInitialized(true);
        console.log('Wind C&P playbook initialized successfully');
      } catch (error) {
        console.error('Error initializing Wind C&P playbook:', error);
        setIsInitialized(true);
      }
    };

    initializePlaybook();
  }, []);

  const projectPhases = [
    {
      id: "chapter-1",
      name: "Chapter 1: Cost Estimation for PPA Bid Submission",
      description: "Process of estimating costs for PPA bid submission"
    },
    {
      id: "chapter-2", 
      name: "Chapter 2: Vendor Empanelment",
      description: "Framework for empaneling vendors through RFI process"
    },
    {
      id: "chapter-3",
      name: "Chapter 3: Contract Award and PR Execution",
      description: "Contract award and purchase requisition execution"
    },
    {
      id: "chapter-3a1",
      name: "Chapter 3a.1: Contract Award for Project-specific Agreement",
      description: "Contract award for project-specific agreements"
    },
    {
      id: "chapter-3a2",
      name: "Chapter 3a.2: Purchase Requisition Execution under Project-specific Agreement",
      description: "Purchase requisition execution under project-specific agreements"
    },
    {
      id: "chapter-3b1",
      name: "Chapter 3b.1: Contract Award for Framework Agreements",
      description: "Contract award for framework agreements"
    },
    {
      id: "chapter-3b2",
      name: "Chapter 3b.2: Purchase Requisition Execution under Framework Agreements",
      description: "Purchase requisition execution under framework agreements"
    },
    {
      id: "chapter-4",
      name: "Chapter 4: Contractor Management",
      description: "Contractor management processes"
    },
    {
      id: "chapter-4.1",
      name: "Chapter 4.1: Issue Escalation and Resolution",
      description: "Issue escalation and resolution processes"
    },
    {
      id: "chapter-4.2",
      name: "Chapter 4.2: Change of Scope Process",
      description: "Change of scope process management"
    }
  ];

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Initializing Wind C&P Playbook...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2 rounded-lg">
                <Wind className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Wind - C&P</h1>
                <p className="text-sm text-gray-600">Contracting & Procurement Playbook</p>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Chapters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectPhases.map((phase) => (
              <Card 
                key={phase.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activePhase === phase.id 
                    ? 'ring-2 ring-blue-400 bg-white' 
                    : 'bg-white/90 backdrop-blur-sm border-blue-200'
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
            <ProcessSteps playbookId={playbookId} activePhase={activePhase} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="raci">
            <RACIMatrix playbookId={playbookId} activePhase={activePhase} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="process-map">
            <ProcessMap playbookId={playbookId} activePhase={activePhase} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default WindCPDashboard;
