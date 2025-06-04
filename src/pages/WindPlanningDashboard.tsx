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
import { Home, Map, Wind, Lock } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const PLAYBOOK_ID = "wind-planning-001";

export default function WindPlanningDashboard() {
  const [activePhase, setActivePhase] = useState("section-1.1");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("processes");

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

  const navigateToRaci = () => {
    setActiveTab("raci");
  };

  // Handle leaderboard section
  if (activePhase === "leaderboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                  <Home className="h-5 w-5 text-gray-600" />
                </Link>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                  <Wind className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Wind - Planning</h1>
                  <p className="text-sm text-gray-600">Planning Playbook</p>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                  <Home className="h-5 w-5 text-gray-600" />
                </Link>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                  <Wind className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Wind - Planning</h1>
                  <p className="text-sm text-gray-600">Planning Playbook</p>
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
            playbookName="Wind - Planning"
            chapters={chapters}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <Home className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
                <Wind className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Wind - Planning</h1>
                <p className="text-sm text-gray-600">Comprehensive wind project planning methodology and execution framework</p>
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
              <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
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
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <div className="text-center py-8">
                      <p className="text-gray-500">Process maps will be available soon</p>
                    </div>
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
