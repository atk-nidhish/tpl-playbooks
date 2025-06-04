
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ModernNavigation } from "@/components/ModernNavigation";
import { ModernTabs, TabsContent } from "@/components/ModernTabs";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";

const WindCPDashboard = () => {
  const { id } = useParams();
  const [activePhase, setActivePhase] = useState("chapters-overview");
  const [activeTab, setActiveTab] = useState("processes");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Initialize active phase from URL or default to "chapter-1"
    const storedPhase = localStorage.getItem(`activePhase-${id}`);
    if (storedPhase) {
      setActivePhase(storedPhase);
    }

    // Set initial active tab based on active phase
    switch (activePhase) {
      case "processes":
        setActiveTab("processes");
        break;
      case "raci":
        setActiveTab("raci");
        break;
      case "process-map":
        setActiveTab("process-map");
        break;
      default:
        setActiveTab("processes");
        break;
    }
  }, [id]);

  const chapters = [
    {
      id: "chapters-overview",
      name: "Overview",
      shortName: "Overview"
    },
    {
      id: "wind-framework",
      name: "Wind Framework",
      shortName: "Framework",
      subChapters: [
        { id: "chapter-1", name: "Introduction to Wind Energy Contracting & Procurement", shortName: "Ch 1" },
        { id: "chapter-2", name: "Pre-Construction Activities", shortName: "Ch 2" },
        { id: "chapter-3", name: "Construction Phase Activities", shortName: "Ch 3" },
        { id: "chapter-4", name: "Commissioning & Performance Testing", shortName: "Ch 4" },
        { id: "chapter-5", name: "Operations & Maintenance", shortName: "Ch 5" }
      ]
    },
    {
      id: "certification",
      name: "Certification",
      shortName: "Certification"
    }
  ];

  useEffect(() => {
    localStorage.setItem(`activePhase-${id}`, activePhase);
  }, [activePhase, id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      
      {/* Navigation */}
      <ModernNavigation 
        chapters={chapters}
        activePhase={activePhase}
        onPhaseChange={setActivePhase}
      />

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <ModernTabs defaultValue="processes" value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="processes">
            <ProcessSteps 
              playbookId="wind-cp"
              activePhase={activePhase}
              searchQuery={searchQuery}
            />
          </TabsContent>
          
          <TabsContent value="raci">
            <RACIMatrix 
              playbookId="wind-cp"
              activePhase={activePhase}
              searchQuery={searchQuery}
            />
          </TabsContent>
          
          <TabsContent value="process-map">
            <ProcessMap 
              playbookId="wind-cp"
              activePhase={activePhase}
            />
          </TabsContent>
        </ModernTabs>
      </div>
    </div>
  );
};

export default WindCPDashboard;
