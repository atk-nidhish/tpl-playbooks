
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, ArrowLeft, BookOpen, Grid3X3, Users, Award } from "lucide-react";
import { ModernTabs } from "@/components/ModernTabs";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { seedSolarEngineeringData } from "@/services/solar-engineering-playbook-seeder";

const SolarEngineeringDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSeeding, setIsSeeding] = useState(false);

  // Define the playbook structure based on the table of contents
  const chapters = [
    {
      id: 'chapter-1',
      name: 'Chapter 1 - Basic Engineering Design Preparation',
      shortName: 'Ch 1',
      subChapters: [
        { id: 'chapter-1-1', name: '1.1 Process Steps', shortName: '1.1' },
        { id: 'chapter-1-2', name: '1.2 RACI', shortName: '1.2' },
        { id: 'chapter-1-3', name: '1.3 Process Map', shortName: '1.3' }
      ]
    },
    {
      id: 'chapter-2-1',
      name: 'Chapter 2.1 - Owner\'s Engineer Finalization',
      shortName: 'Ch 2.1',
      subChapters: [
        { id: 'chapter-2-1-1', name: '2.1.1 Process Steps', shortName: '2.1.1' },
        { id: 'chapter-2-1-2', name: '2.1.2 RACI', shortName: '2.1.2' },
        { id: 'chapter-2-1-3', name: '2.1.3 Process Map', shortName: '2.1.3' }
      ]
    },
    {
      id: 'chapter-2-2a',
      name: 'Chapter 2.2A - Site Survey Consultant Finalization',
      shortName: 'Ch 2.2A',
      subChapters: [
        { id: 'chapter-2-2a-1', name: '2.2A.1 Process Steps', shortName: '2.2A.1' },
        { id: 'chapter-2-2a-2', name: '2.2A.2 RACI', shortName: '2.2A.2' },
        { id: 'chapter-2-2a-3', name: '2.2A.3 Process Map', shortName: '2.2A.3' }
      ]
    },
    {
      id: 'chapter-2-2b',
      name: 'Chapter 2.2B - Preliminary Works Execution',
      shortName: 'Ch 2.2B',
      subChapters: [
        { id: 'chapter-2-2b-1', name: '2.2B.1 Process Steps', shortName: '2.2B.1' },
        { id: 'chapter-2-2b-2', name: '2.2B.2 RACI', shortName: '2.2B.2' },
        { id: 'chapter-2-2b-3', name: '2.2B.3 Process Map', shortName: '2.2B.3' }
      ]
    },
    {
      id: 'chapter-3',
      name: 'Chapter 3 - Detailed Engineering Design Preparation',
      shortName: 'Ch 3',
      subChapters: [
        { id: 'chapter-3-1', name: '3.1 Process Steps', shortName: '3.1' },
        { id: 'chapter-3-2', name: '3.2 RACI', shortName: '3.2' },
        { id: 'chapter-3-3', name: '3.3 Process Map', shortName: '3.3' }
      ]
    },
    {
      id: 'chapter-4',
      name: 'Chapter 4 - Sign-Off for Detailed Engineering Design',
      shortName: 'Ch 4',
      subChapters: [
        { id: 'chapter-4-1', name: '4.1 Process Steps', shortName: '4.1' },
        { id: 'chapter-4-2', name: '4.2 RACI', shortName: '4.2' },
        { id: 'chapter-4-3', name: '4.3 Process Map', shortName: '4.3' }
      ]
    },
    {
      id: 'chapter-5',
      name: 'Chapter 5 - Issue Resolution for Detailed Engineering Design',
      shortName: 'Ch 5',
      subChapters: [
        { id: 'chapter-5-1', name: '5.1 Process Steps', shortName: '5.1' },
        { id: 'chapter-5-2', name: '5.2 RACI', shortName: '5.2' },
        { id: 'chapter-5-3', name: '5.3 Process Map', shortName: '5.3' }
      ]
    },
    {
      id: 'chapter-6',
      name: 'Chapter 6 - Assessment of OE Empanelment Requirements',
      shortName: 'Ch 6',
      subChapters: [
        { id: 'chapter-6-1', name: '6.1 Process Steps', shortName: '6.1' },
        { id: 'chapter-6-2', name: '6.2 RACI', shortName: '6.2' },
        { id: 'chapter-6-3', name: '6.3 Process Map', shortName: '6.3' }
      ]
    }
  ];

  const playbookId = "solar-engineering-playbook-2024";
  const playbookName = "Engineering - Solar";

  // Process map images (placeholder - would need actual images)
  const processMapImages = {
    'chapter-1-3': '/placeholder.svg',
    'chapter-2-1-3': '/placeholder.svg',
    'chapter-2-2a-3': '/placeholder.svg',
    'chapter-2-2b-3': '/placeholder.svg',
    'chapter-3-3': '/placeholder.svg',
    'chapter-4-3': '/placeholder.svg',
    'chapter-5-3': '/placeholder.svg',
    'chapter-6-3': '/placeholder.svg'
  };

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

  const tabsData = [
    {
      id: "process-steps",
      label: "Process Steps",
      icon: <BookOpen className="h-4 w-4" />,
      content: (
        <ProcessSteps 
          playbookId={playbookId}
          chapters={chapters}
          isLoading={isLoading}
        />
      )
    },
    {
      id: "raci-matrix",
      label: "RACI Matrix", 
      icon: <Grid3X3 className="h-4 w-4" />,
      content: (
        <RACIMatrix 
          playbookId={playbookId}
          chapters={chapters}
          isLoading={isLoading}
        />
      )
    },
    {
      id: "process-map",
      label: "Process Map",
      icon: <FileText className="h-4 w-4" />,
      content: (
        <ProcessMap 
          playbookId={playbookId}
          chapters={chapters}
          processMapImages={processMapImages}
          isLoading={isLoading}
        />
      )
    },
    {
      id: "certification",
      label: "Certification",
      icon: <Award className="h-4 w-4" />,
      content: (
        <PlaybookCertification
          playbookId={playbookId}
          playbookName={playbookName}
          chapters={chapters}
        />
      )
    }
  ];

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
                  <div className="font-semibold text-orange-700">6 Chapters</div>
                  <div className="text-gray-600">Complete Coverage</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="font-semibold text-orange-700">24 Sub-Sections</div>
                  <div className="text-gray-600">Detailed Breakdown</div>
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

        <ModernTabs tabs={tabsData} />
      </main>
    </div>
  );
};

export default SolarEngineeringDashboard;
