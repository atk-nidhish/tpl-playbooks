import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search, Wind, ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { createWindPlanningPlaybook } from '@/services/wind-planning/wind-planning-orchestrator';
import { ProcessSteps } from '@/components/ProcessSteps';
import { RACIMatrix } from '@/components/RACIMatrix';
import { PlaybookCertification } from '@/components/PlaybookCertification';
import { Leaderboard } from '@/components/Leaderboard';
import { ModernTabs, TabsContent } from '@/components/ModernTabs';
import { ModernNavigation } from '@/components/ModernNavigation';
import { toast } from "@/components/ui/use-toast"

const WindPlanningDashboard = () => {
  const [playbookId, setPlaybookId] = useState<string | null>(null);
  const [activePhase, setActivePhase] = useState('section-1-1');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('processes');
  const [isInitialized, setIsInitialized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initializePlaybook = async () => {
      try {
        console.log('Initializing Wind Planning playbook...');
        const storedPlaybookId = localStorage.getItem('windPlanningPlaybookId');
        if (storedPlaybookId) {
          setPlaybookId(storedPlaybookId);
        } else {
          const newPlaybookId = await createWindPlanningPlaybook();
          localStorage.setItem('windPlanningPlaybookId', newPlaybookId);
          setPlaybookId(newPlaybookId);
        }
        setIsInitialized(true);
        console.log('Wind Planning playbook initialized successfully');
      } catch (error) {
        console.error('Error initializing Wind Planning playbook:', error);
        setIsInitialized(true);
      }
    };

    initializePlaybook();
  }, []);

  const chapters = [
    {
      id: 'chapter-1',
      name: 'Chapter 1 - Plan Integration Management',
      shortName: 'Chapter 1',
      subChapters: [
        {
          id: 'section-1-1',
          name: 'Section 1.1 - Project Plan Preparation During Bidding',
          shortName: 'Section 1.1'
        },
        {
          id: 'section-1-2',
          name: 'Section 1.2 - Project Schedule and Execution Approach',
          shortName: 'Section 1.2'
        },
        {
          id: 'section-1-3',
          name: 'Section 1.3 - Land Finalization Plan',
          shortName: 'Section 1.3'
        },
        {
          id: 'section-1-4',
          name: 'Section 1.4 - Engineering Plan',
          shortName: 'Section 1.4'
        },
        {
          id: 'section-1-5',
          name: 'Section 1.5 - Procurement Plan',
          shortName: 'Section 1.5'
        },
        {
          id: 'section-1-6',
          name: 'Section 1.6 - Construction Plan',
          shortName: 'Section 1.6'
        },
        {
          id: 'section-1-7',
          name: 'Section 1.7 - Commissioning Plan',
          shortName: 'Section 1.7'
        },
        {
          id: 'section-1-8',
          name: 'Section 1.8 - Plan Integration',
          shortName: 'Section 1.8'
        },
        {
          id: 'section-1-9',
          name: 'Section 1.9 - Plan Update',
          shortName: 'Section 1.9'
        }
      ]
    },
    {
      id: 'chapter-2',
      name: 'Chapter 2 - Scope Management Plan',
      shortName: 'Chapter 2'
    },
    {
      id: 'chapter-3',
      name: 'Chapter 3 - Cost Management Plan',
      shortName: 'Chapter 3'
    },
    {
      id: 'chapter-4',
      name: 'Chapter 4 - Quality Management Plan',
      shortName: 'Chapter 4'
    },
    {
      id: 'chapter-5',
      name: 'Chapter 5 - Statutory Approval Management Plan',
      shortName: 'Chapter 5'
    },
    {
      id: 'chapter-6',
      name: 'Chapter 6 - Risk Management Plan',
      shortName: 'Chapter 6'
    },
    {
      id: 'certification',
      name: 'Playbook Certification',
      shortName: 'Certification'
    },
    {
      id: 'leaderboard',
      name: 'Certification Leaderboard',
      shortName: 'Leaderboard'
    }
  ];

  // Updated process map images mapping to handle new chapter structure
  const processMapImages = {
    'section-1-1': '/lovable-uploads/24724d00-6df0-446b-a7a7-b50904c3c720.png',
    'section-1-2': '/lovable-uploads/80b2c685-97ca-460f-8b5f-ef4312be4cd9.png',
    'section-1-3': '/lovable-uploads/7c770988-9bc7-44c4-b83c-875d7731fe58.png',
    'section-1-4': '/lovable-uploads/5988e549-2352-4c27-9380-24fdc2e14575.png',
    'section-1-5': '/lovable-uploads/cf1df77d-9d73-477d-a4ce-0951cf30cd2d.png',
    'section-1-6': '/lovable-uploads/c001ac3c-9c89-4a42-bff5-1398d7d09a81.png',
    'section-1-7': '/lovable-uploads/f739e138-b2b3-4141-a9c7-ac28baffb6f5.png',
    'section-1-8': '/lovable-uploads/417ddd1a-6c8f-4dc9-97ef-ee95d52436f6.png',
    'section-1-9': '/lovable-uploads/990d1667-520a-4fd3-985f-2556234eba0b.png',
    // Chapter 2 now uses section-2-1 data but displays as chapter-2
    'chapter-2': '/lovable-uploads/7850b53b-86d8-44eb-8325-17ac3366fc82.png',
    'chapter-3': '/lovable-uploads/71524ea3-8a3b-4d64-9b58-fcd71dd2686b.png',
    'chapter-4': '/lovable-uploads/5e46933c-2d70-4645-9dff-41e747b607c8.png',
    'chapter-5': '/lovable-uploads/fdfc5fa1-d50b-48ce-9551-e1f9090574ef.png'
  };

  // Map the current activePhase to the correct data source
  const getDataPhaseId = (phaseId: string) => {
    if (phaseId === 'chapter-2') {
      return 'section-2-1'; // Chapter 2 uses section-2-1 data
    }
    return phaseId;
  };

  const handleRefreshData = async () => {
    try {
      const newPlaybookId = await createWindPlanningPlaybook();
      localStorage.setItem('windPlanningPlaybookId', newPlaybookId);
      setPlaybookId(newPlaybookId);
      toast({
        title: "Data Refreshed",
        description: "Successfully refreshed Wind Planning Playbook data.",
      })
    } catch (error) {
      console.error("Error refreshing data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh Wind Planning Playbook data.",
      })
    }
  };

  const handleNavigateToRaci = () => {
    setActiveTab("raci");
  };

  const downloadProcessMap = (phaseId: string) => {
    const imageUrl = processMapImages[phaseId as keyof typeof processMapImages];
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `Process-Map-${phaseId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Initializing Wind Planning Playbook...</p>
        </div>
      </div>
    );
  }

  // Handle leaderboard section
  if (activePhase === "leaderboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100">
        <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                  <Wind className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Wind - Planning</h1>
                  <p className="text-sm text-gray-600">Project Planning Playbook</p>
                </div>
              </div>
              <Button 
                onClick={handleRefreshData}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100">
        <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                  <ArrowLeft className="h-5 w-5 text-gray-600" />
                </Link>
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                  <Wind className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Wind - Planning</h1>
                  <p className="text-sm text-gray-600">Project Planning Playbook</p>
                </div>
              </div>
              <Button 
                onClick={handleRefreshData}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
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
            playbookId={playbookId || ''}
            playbookName="Wind - Planning"
            chapters={chapters}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-50 to-blue-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="p-2 hover:bg-blue-100 rounded-lg transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </Link>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-2 rounded-lg">
                <Wind className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Wind - Planning</h1>
                <p className="text-sm text-gray-600">Comprehensive wind project planning methodology and execution framework</p>
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
              <Button 
                onClick={handleRefreshData}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Data
              </Button>
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
        {/* Show placeholder message for chapters without data */}
        {(['chapter-6'].includes(activePhase)) ? (
          <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
            <CardContent className="p-8 text-center">
              <p className="text-gray-600">
                This section is ready for data population. Please provide the content for {
                  chapters.find(ch => ch.id === activePhase)?.name || 
                  chapters.find(ch => ch.subChapters?.some(sub => sub.id === activePhase))?.subChapters?.find(sub => sub.id === activePhase)?.name
                }.
              </p>
            </CardContent>
          </Card>
        ) : (
          <ModernTabs value={activeTab} onValueChange={setActiveTab}>
            <TabsContent value="processes">
              <ProcessSteps 
                playbookId={playbookId || ''} 
                activePhase={getDataPhaseId(activePhase)} 
                searchQuery={searchQuery}
                onNavigateToRaci={handleNavigateToRaci}
              />
            </TabsContent>

            <TabsContent value="raci">
              <RACIMatrix 
                playbookId={playbookId || ''} 
                activePhase={getDataPhaseId(activePhase)} 
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
                      <Button 
                        onClick={() => downloadProcessMap(activePhase)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex justify-center">
                      {processMapImages[activePhase as keyof typeof processMapImages] ? (
                        <img 
                          src={processMapImages[activePhase as keyof typeof processMapImages]}
                          alt={`Process Map for ${activePhase}`}
                          className="max-w-full h-auto rounded-lg shadow-lg border border-blue-200"
                        />
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No process map available for this section</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </ModernTabs>
        )}
      </div>
    </div>
  );
};

export default WindPlanningDashboard;
