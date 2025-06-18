




// import { Badge } from "@/components/ui/badge";
// import { FileText, ArrowLeft, BookOpen, Grid3X3, Users, Award } from "lucide-react";
// import { ModernTabs, TabsContent } from "@/components/ModernTabs";
// import { ProcessSteps } from "@/components/ProcessSteps";
// import { RACIMatrix } from "@/components/RACIMatrix";
// import { ProcessMap } from "@/components/ProcessMap";
// import { PlaybookCertification } from "@/components/PlaybookCertification";

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



const SolarEngineeringDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);
  const [activePhase, setActivePhase] = useState('1-1');
  const [activeTab, setActiveTab] = useState('process-steps');

  // Define the playbook structure to match Planning Solar format
  const phases = [
    {
      id: '1-1',
      name: 'Section 1.1 - Basic Engineering Design Preparation',
      shortName: '1.1',
      description: 'Basic Engineering Design Preparation process'
    },
    {
      id: '2-1-1',
      name: 'Section 2.1.1 - Owner\'s Engineer Finalization',
      shortName: '2.1.1',
      description: 'Owner\'s Engineer Finalization process'
    },
    {
      id: '2-2a-1',
      name: 'Section 2.2A.1 - Site Survey Consultant Finalization',
      shortName: '2.2A.1',
      description: 'Site Survey Consultant Finalization process'
    },
    {
      id: '2-2b-1',
      name: 'Section 2.2B.1 - Preliminary Works Execution',
      shortName: '2.2B.1',
      description: 'Preliminary Works Execution process'
    },
    {
      id: '3-1',
      name: 'Section 3.1 - Detailed Engineering Design Preparation',
      shortName: '3.1',
      description: 'Detailed Engineering Design Preparation process'
    },
    {
      id: '4-1',
      name: 'Section 4.1 - Sign-Off for Detailed Engineering Design',
      shortName: '4.1',
      description: 'Sign-Off for Detailed Engineering Design process'
    },
    {
      id: '5-1',
      name: 'Section 5.1 - Issue Resolution for Detailed Engineering Design',
      shortName: '5.1',
      description: 'Issue Resolution for Detailed Engineering Design process'
    },
    {
      id: '6-1',
      name: 'Section 6.1 - Assessment of OE Empanelment Requirements',
      shortName: '6.1',
      description: 'Assessment of OE Empanelment Requirements process'
    }
  ];

  const playbookId = "solar-engineering-playbook-2024";
  const playbookName = "Engineering - Solar";

  useEffect(() => {
    const initializeData = async () => {
      setIsSeeding(true);
      try {
        console.log('Seeding Solar Engineering playbook data...');
        await seedSolarEngineeringData();
        console.log('Solar Engineering playbook data seeded successfully');
      } catch (error) {
        console.error('Error seeding Solar Engineering data:', error);
      } finally {
        setIsSeeding(false);
        setIsLoading(false);
      }
    };
    initializeData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-orange-600 hover:text-orange-700">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 p-2 rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Engineering - Solar</h1>
                  <p className="text-sm text-gray-600">Solar Engineering Execution Playbook</p>
                </div>
              </div>
            </div>
            <Badge className="bg-orange-100 text-orange-800 border-orange-300">
              {isSeeding ? 'Initializing...' : 'Active'}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700">
                <Users className="h-5 w-5" />
                Engineering - Solar Playbook
              </CardTitle>
              <CardDescription className="text-gray-600">
                Comprehensive solar engineering execution playbook covering all phases from basic engineering design preparation through detailed engineering completion and issue resolution.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-700">8 Sections</div>
                  <div className="text-gray-600">Complete Coverage</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-700">Process Steps</div>
                  <div className="text-gray-600">Detailed Workflows</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-700">Process Maps</div>
                  <div className="text-gray-600">Visual Workflows</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-700">RACI Matrix</div>
                  <div className="text-gray-600">Role Clarity</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <ModernTabs 
          phases={phases}
          activePhase={activePhase}
          onPhaseChange={setActivePhase}
          value={activeTab}
          onValueChange={setActiveTab}
        />
          <TabsContent value="process-steps">
            <ProcessSteps 
              playbookId={playbookId}
              activePhase={activePhase}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="raci-matrix">
            <RACIMatrix 
              playbookId={playbookId}
              activePhase={activePhase}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="process-map">
            <ProcessMap 
              playbookId={playbookId}
              activePhase={activePhase}
              isLoading={isLoading}
            />
          </TabsContent>
          
          <TabsContent value="certification">
            <PlaybookCertification
              playbookId={playbookId}
              playbookName={playbookName}
              chapters={phases}
            />
          </TabsContent>
        </ModernTabs>
      </main>
    </div>
  );
};

export default SolarEngineeringDashboard;
