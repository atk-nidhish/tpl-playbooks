
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sun, ArrowLeft, Download, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ChapterQuiz } from "@/components/ChapterQuiz";
import { PlaybookCertification } from "@/components/PlaybookCertification";
import { Leaderboard } from "@/components/Leaderboard";
import { ModernNavigation } from "@/components/ModernNavigation";
import { ModernTabs, TabsContent } from "@/components/ModernTabs";
import { createPlanningSolarPlaybook, seedSection11Data, seedSection13Data } from "@/services/planning-solar-playbook-seeder";

const PlanningSolarDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePhase, setActivePhase] = useState("section-1.1");
  const [playbookId, setPlaybookId] = useState<string>("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("processes");

  useEffect(() => {
    // Load completed quizzes from localStorage
    const saved = localStorage.getItem('completed_quizzes_planning_solar');
    if (saved) {
      setCompletedQuizzes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    const initializePlaybook = async () => {
      try {
        console.log('Initializing Planning - Solar playbook...');
        const newPlaybookId = await createPlanningSolarPlaybook();
        await seedSection11Data(newPlaybookId);
        await seedSection13Data(newPlaybookId);
        setPlaybookId(newPlaybookId);
        setIsInitialized(true);
        console.log('Planning - Solar playbook initialized successfully');
      } catch (error) {
        console.error('Error initializing Planning - Solar playbook:', error);
        setIsInitialized(true);
      }
    };

    initializePlaybook();
  }, []);

  const chapters = [
    {
      id: "chapter-1",
      name: "Chapter 1 - Plan Integration Management",
      shortName: "Chapter 1 - Plan Integration",
      subChapters: [
        {
          id: "section-1.1",
          name: "Section 1.1 - Project Plan Preparation During Bidding",
          shortName: "Section 1.1 - Project Plan Prep"
        },
        {
          id: "section-1.2",
          name: "Section 1.2 - Project Schedule and Execution Approach",
          shortName: "Section 1.2 - Schedule & Execution"
        },
        {
          id: "section-1.3",
          name: "Section 1.3 - Land Finalization Plan",
          shortName: "Section 1.3 - Land Finalization"
        },
        {
          id: "section-1.4",
          name: "Section 1.4 - Engineering Plan",
          shortName: "Section 1.4 - Engineering"
        },
        {
          id: "section-1.5",
          name: "Section 1.5 - Procurement Plan",
          shortName: "Section 1.5 - Procurement"
        },
        {
          id: "section-1.6",
          name: "Section 1.6 - Construction Plan",
          shortName: "Section 1.6 - Construction"
        },
        {
          id: "section-1.7",
          name: "Section 1.7 - Commissioning Plan",
          shortName: "Section 1.7 - Commissioning"
        },
        {
          id: "section-1.8",
          name: "Section 1.8 - Plan Integration",
          shortName: "Section 1.8 - Integration"
        },
        {
          id: "section-1.9",
          name: "Section 1.9 - Plan Update",
          shortName: "Section 1.9 - Plan Update"
        }
      ]
    },
    {
      id: "chapter-2",
      name: "Chapter 2 - Scope Management Plan",
      shortName: "Chapter 2 - Scope Mgmt"
    },
    {
      id: "chapter-3",
      name: "Chapter 3 - Cost Management Plan",
      shortName: "Chapter 3 - Cost Mgmt"
    },
    {
      id: "chapter-4",
      name: "Chapter 4 - Quality Management Plan",
      shortName: "Chapter 4 - Quality Mgmt"
    },
    {
      id: "chapter-5",
      name: "Chapter 5 - Statutory Approval Management Plan",
      shortName: "Chapter 5 - Statutory"
    },
    {
      id: "chapter-6",
      name: "Chapter 6 - Risk Management Plan",
      shortName: "Chapter 6 - Risk Mgmt"
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

  // Check if all quizzes are completed
  const allQuizzesCompleted = chapters
    .filter(ch => ch.id !== "certification" && ch.id !== "leaderboard")
    .every(chapter => {
      if (chapter.subChapters) {
        return chapter.subChapters.every(sub => completedQuizzes.includes(sub.id));
      }
      return completedQuizzes.includes(chapter.id);
    });

  const handleNavigateToRaci = () => {
    setActiveTab("raci");
  };

  const handleNavigateToQuiz = () => {
    setActiveTab("quiz");
  };

  const getNextChapter = (currentPhase: string) => {
    const allChapterIds = chapters.reduce((acc, ch) => {
      if (ch.subChapters) {
        return [...acc, ...ch.subChapters.map(sub => sub.id)];
      }
      return [...acc, ch.id];
    }, [] as string[]);
    
    const currentIndex = allChapterIds.indexOf(currentPhase);
    if (currentIndex >= 0 && currentIndex < allChapterIds.length - 1) {
      return allChapterIds[currentIndex + 1];
    }
    return null;
  };

  const handleQuizComplete = () => {
    const nextChapter = getNextChapter(activePhase);
    if (nextChapter && nextChapter !== "certification" && nextChapter !== "leaderboard") {
      setActivePhase(nextChapter);
      setActiveTab("processes");
    }
  };

  const getProcessMapImage = (phaseId: string) => {
    switch (phaseId) {
      case "section-1.1":
        return "/lovable-uploads/7850b53b-86d8-44eb-8325-17ac3366fc82.png";
      case "section-1.3":
        return "/lovable-uploads/2289e97c-b60f-4e79-b555-017b1a434121.png";
      default:
        return "/lovable-uploads/02ea28df-7aa0-437b-8db2-15769af9665c.png";
    }
  };

  const downloadProcessMap = (phaseId: string) => {
    const imageUrl = getProcessMapImage(phaseId);
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `Process-Map-${phaseId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Initializing Planning - Solar Playbook...</p>
        </div>
      </div>
    );
  }

  // Handle leaderboard section
  if (activePhase === "leaderboard") {
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
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                  <Sun className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Planning - Solar</h1>
                  <p className="text-sm text-gray-600">Solar Project Planning Playbook</p>
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
          <Leaderboard />
        </div>
      </div>
    );
  }

  // Handle certification section
  if (activePhase === "certification") {
    if (!allQuizzesCompleted) {
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
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                    <Sun className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Planning - Solar</h1>
                    <p className="text-sm text-gray-600">Solar Project Planning Playbook</p>
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
            <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
              <CardContent className="p-12 text-center">
                <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Certification Locked</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Complete all chapter quizzes to unlock the playbook certification exam.
                </p>
                <div className="max-w-md mx-auto">
                  <div className="bg-gray-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(completedQuizzes.length / 15) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Progress: {completedQuizzes.length} of 15 quizzes completed
                  </p>
                </div>
              </CardContent>
            </Card>
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
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                  <Sun className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Planning - Solar</h1>
                  <p className="text-sm text-gray-600">Solar Project Planning Playbook</p>
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
          <PlaybookCertification />
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
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Planning - Solar</h1>
                <p className="text-sm text-gray-600">Solar Project Planning Playbook</p>
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
        <ModernTabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="processes">
            <ProcessSteps 
              playbookId={playbookId} 
              activePhase={activePhase} 
              searchQuery={searchQuery}
              onNavigateToRaci={handleNavigateToRaci}
            />
          </TabsContent>

          <TabsContent value="raci">
            <RACIMatrix 
              playbookId={playbookId} 
              activePhase={activePhase} 
              searchQuery={searchQuery}
              onNavigateToQuiz={handleNavigateToQuiz}
            />
          </TabsContent>

          <TabsContent value="process-map">
            <div className="space-y-6">
              <Card className="bg-white/90 backdrop-blur-sm border-yellow-200">
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
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-center">
                    <img 
                      src={getProcessMapImage(activePhase)}
                      alt={`Process Map for ${activePhase}`}
                      className="max-w-full h-auto rounded-lg shadow-lg border border-yellow-200"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quiz">
            <ChapterQuiz 
              activePhase={activePhase} 
              onQuizComplete={handleQuizComplete}
            />
          </TabsContent>
        </ModernTabs>
      </div>
    </div>
  );
};

export default PlanningSolarDashboard;
