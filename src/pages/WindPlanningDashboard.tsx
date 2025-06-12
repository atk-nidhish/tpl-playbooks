import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RefreshCw, Search } from "lucide-react";
import { createWindPlanningPlaybook } from '@/services/wind-planning/wind-planning-orchestrator';
import { ProcessSteps } from '@/components/ProcessSteps';
import { RACIMatrix } from '@/components/RACIMatrix';
import { ModernTabs, TabsContent } from '@/components/ModernTabs';
import { ProcessMap } from '@/components/ProcessMap';
import { toast } from "@/components/ui/use-toast"

const chapters = [
  {
    id: 'section-1-1',
    title: 'Section 1.1 - Project Plan Preparation During Bidding',
    description: 'This section covers Planning for project phases from RFP participation to conceptualization up to execution & delivery',
    processMapImage: '/lovable-uploads/24724d00-6df0-446b-a7a7-b50904c3c720.png'
  },
  {
    id: 'section-1-2',
    title: 'Section 1.2 - Project Schedule and Execution Approach',
    description: 'This section covers project schedule development and execution approach planning',
    processMapImage: '/lovable-uploads/80b2c685-97ca-460f-8b5f-ef4312be4cd9.png'
  },
  {
    id: 'section-1-3',
    title: 'Section 1.3 - Land Finalization Plan',
    description: 'Plan to be created only if Land Parcel hasn\'t already been leased yet',
    processMapImage: '/lovable-uploads/7c770988-9bc7-44c4-b83c-875d7731fe58.png'
  },
  {
    id: 'section-1-4',
    title: 'Section 1.4 - Engineering Plan',
    description: 'This section covers engineering execution planning and quality requirements',
    processMapImage: '/lovable-uploads/5988e549-2352-4c27-9380-24fdc2e14575.png'
  },
  {
    id: 'section-1-5',
    title: 'Section 1.5 - Procurement Plan',
    description: 'This section covers procurement planning and package strategy development',
    processMapImage: '/lovable-uploads/cf1df77d-9d73-477d-a4ce-0951cf30cd2d.png'
  },
  {
    id: 'section-1-6',
    title: 'Section 1.6 - Construction Plan',
    description: 'This section covers construction management planning and execution approach',
    processMapImage: '/lovable-uploads/c001ac3c-9c89-4a42-bff5-1398d7d09a81.png'
  },
  {
    id: 'section-1-7',
    title: 'Section 1.7 - Commissioning Plan',
    description: 'This section covers commissioning planning and pre-commissioning activities',
    processMapImage: '/lovable-uploads/f739e138-b2b3-4141-a9c7-ac28baffb6f5.png'
  },
  {
    id: 'section-1-8',
    title: 'Section 1.8 - Plan Integration',
    description: 'This section covers integration of all detailed plans into a comprehensive project schedule',
    processMapImage: '/lovable-uploads/417ddd1a-6c8f-4dc9-97ef-ee95d52436f6.png'
  },
  {
    id: 'section-2-1',
    title: 'Section 2.1 - Scope Management Plan',
    description: 'This section covers the development of Work Breakdown Structure (WBS) and project scope management',
    processMapImage: '/lovable-uploads/7850b53b-86d8-44eb-8325-17ac3366fc82.png'
  }
];

const WindPlanningDashboard = () => {
  const [playbookId, setPlaybookId] = useState<string | null>(null);
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('processes');
  const router = useRouter();

  useEffect(() => {
    // Fetch playbook ID from local storage on component mount
    const storedPlaybookId = localStorage.getItem('windPlanningPlaybookId');
    if (storedPlaybookId) {
      setPlaybookId(storedPlaybookId);
    } else {
      // If no playbook ID in local storage, create a new playbook
      handleRefreshData();
    }
  }, []);

  const handleChapterClick = (chapterId: string) => {
    setActiveChapter(chapterId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleRefreshData = async () => {
    try {
      // Call the function to create or refresh the Wind Planning Playbook
      const newPlaybookId = await createWindPlanningPlaybook();

      // Store the new playbook ID in local storage
      localStorage.setItem('windPlanningPlaybookId', newPlaybookId);

      // Update the state with the new playbook ID
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

  const navigateToQuiz = () => {
    if (activeChapter) {
      router.push(`/quiz?chapter=${activeChapter}`);
    } else {
      toast({
        title: "Error",
        description: "Please select a chapter before navigating to the quiz.",
      })
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wind Project Planning Playbook</h1>
          <p className="text-gray-500">Explore the essential processes for successful wind project planning.</p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleRefreshData}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-1">
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Project Phases</CardTitle>
              <CardDescription>Select a phase to view details</CardDescription>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                {chapters.map((chapter) => (
                  <Button
                    key={chapter.id}
                    variant="outline"
                    className={`w-full justify-start text-gray-800 hover:bg-orange-100 ${activeChapter === chapter.id ? 'bg-orange-50 border-orange-500' : ''}`}
                    onClick={() => handleChapterClick(chapter.id)}
                  >
                    {chapter.title}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-3 space-y-6">
          <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                {activeChapter ? chapters.find(chapter => chapter.id === activeChapter)?.title : 'Select a Project Phase'}
              </CardTitle>
              <CardDescription>
                {activeChapter ? chapters.find(chapter => chapter.id === activeChapter)?.description : 'Explore the details of each project phase.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Search className="w-5 h-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search processes..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="flex-1"
                />
              </div>
            </CardContent>
          </Card>

          <ModernTabs defaultValue="processes" value={activeTab} onValueChange={handleTabChange}>
            <TabsContent value="processes">
              <ProcessSteps 
                playbookId={playbookId || ''} 
                activePhase={activeChapter || ''} 
                searchQuery={searchQuery}
                onNavigateToRaci={() => setActiveTab('raci')}
              />
            </TabsContent>
            <TabsContent value="raci">
              <RACIMatrix 
                playbookId={playbookId || ''} 
                activePhase={activeChapter || ''} 
                searchQuery={searchQuery}
                onNavigateToQuiz={navigateToQuiz}
              />
            </TabsContent>
            <TabsContent value="process-map">
              <ProcessMap playbookId={playbookId || ''} activePhase={activeChapter || ''} />
            </TabsContent>
          </ModernTabs>
        </div>
      </div>
    </div>
  );
};

export default WindPlanningDashboard;
