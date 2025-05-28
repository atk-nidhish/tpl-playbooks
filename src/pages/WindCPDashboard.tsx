
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Wind, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";
import { ChapterQuiz } from "@/components/ChapterQuiz";
import { ModernNavigation } from "@/components/ModernNavigation";
import { ModernTabs, TabsContent } from "@/components/ModernTabs";
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

  const chapters = [
    {
      id: "chapter-1",
      name: "Chapter 1: Cost Estimation for PPA Bid Submission",
      shortName: "Ch 1: Cost Estimation"
    },
    {
      id: "chapter-2", 
      name: "Chapter 2: Vendor Empanelment",
      shortName: "Ch 2: Vendor Empanelment"
    },
    {
      id: "chapter-3",
      name: "Chapter 3: Contract Award and PR Execution",
      shortName: "Ch 3: Contract Award",
      subChapters: [
        {
          id: "chapter-3a1",
          name: "Chapter 3a.1: Contract Award for Project-specific Agreement",
          shortName: "3a.1: Project-specific Award"
        },
        {
          id: "chapter-3a2",
          name: "Chapter 3a.2: Purchase Requisition Execution under Project-specific Agreement",
          shortName: "3a.2: Project-specific PR"
        },
        {
          id: "chapter-3b1",
          name: "Chapter 3b.1: Contract Award for Framework Agreements",
          shortName: "3b.1: Framework Award"
        },
        {
          id: "chapter-3b2",
          name: "Chapter 3b.2: Purchase Requisition Execution under Framework Agreements",
          shortName: "3b.2: Framework PR"
        }
      ]
    },
    {
      id: "chapter-4",
      name: "Chapter 4: Contractor Management",
      shortName: "Ch 4: Contractor Mgmt",
      subChapters: [
        {
          id: "chapter-4.1",
          name: "Chapter 4.1: Issue Escalation and Resolution",
          shortName: "4.1: Issue Resolution"
        },
        {
          id: "chapter-4.2",
          name: "Chapter 4.2: Change of Scope Process",
          shortName: "4.2: Scope Changes"
        }
      ]
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
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-2 rounded-lg">
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

      {/* Modern Navigation */}
      <ModernNavigation 
        chapters={chapters}
        activePhase={activePhase}
        onPhaseChange={setActivePhase}
      />

      <div className="container mx-auto px-6 py-8">
        {/* Main Content Tabs */}
        <ModernTabs defaultValue="processes">
          <TabsContent value="processes">
            <ProcessSteps playbookId={playbookId} activePhase={activePhase} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="raci">
            <RACIMatrix playbookId={playbookId} activePhase={activePhase} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="process-map">
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Process Map - {activePhase}
                  </CardTitle>
                  <CardDescription>
                    Visual representation of the complete process flow
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <img 
                      src="/lovable-uploads/02ea28df-7aa0-437b-8db2-15769af9665c.png" 
                      alt="Process Map" 
                      className="max-w-full h-auto rounded-lg shadow-lg border border-orange-200"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quiz">
            <ChapterQuiz activePhase={activePhase} />
          </TabsContent>
        </ModernTabs>
      </div>
    </div>
  );
};

export default WindCPDashboard;
