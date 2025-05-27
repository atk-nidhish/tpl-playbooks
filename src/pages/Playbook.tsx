
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Sun, CheckCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";
import { PlaybookSidebar } from "@/components/PlaybookSidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { supabase } from "@/integrations/supabase/client";

interface PlaybookData {
  id: string;
  name: string;
  title: string;
  description: string;
  phases: any;
}

const Playbook = () => {
  const { id } = useParams<{ id: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activePhase, setActivePhase] = useState("");
  const [playbook, setPlaybook] = useState<PlaybookData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPlaybook();
    }
  }, [id]);

  const fetchPlaybook = async () => {
    try {
      console.log(`Fetching playbook with ID: ${id}`);
      
      const { data, error } = await supabase
        .from('playbooks')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching playbook:', error);
        throw error;
      }
      
      console.log('Fetched playbook data:', data);
      setPlaybook(data);
      
      // Set the first main chapter as active by default (not sub-chapters)
      if (data.phases && Object.keys(data.phases).length > 0) {
        const phases = Object.entries(data.phases);
        const mainChapters = phases.filter(([key, value]: [string, any]) => !value.parent);
        if (mainChapters.length > 0) {
          const firstMainChapter = mainChapters[0][0];
          console.log('Setting active phase to:', firstMainChapter);
          setActivePhase(firstMainChapter);
        }
      }
    } catch (error) {
      console.error('Error fetching playbook:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    setLoading(true);
    fetchPlaybook();
  };

  const handlePhaseChange = (phaseId: string) => {
    console.log('Setting active phase to:', phaseId);
    setActivePhase(phaseId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading playbook...</p>
      </div>
    );
  }

  if (!playbook) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-4">Playbook not found</p>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const projectPhases = playbook.phases ? Object.entries(playbook.phases).map(([key, value]: [string, any]) => ({
    id: key,
    name: value.name || key,
    description: value.description || "Phase description",
    parent: value.parent || null
  })) : [];

  // Organize phases for display - main chapters first, then sub-chapters in order
  const mainChapters = projectPhases.filter(phase => !phase.parent);
  const subChapters = projectPhases.filter(phase => phase.parent);
  
  const orderedPhases = [];
  mainChapters.forEach(mainChapter => {
    orderedPhases.push(mainChapter);
    const relatedSubChapters = subChapters.filter(sub => sub.parent === mainChapter.id);
    orderedPhases.push(...relatedSubChapters);
  });

  console.log('Available phases:', orderedPhases);
  console.log('Current active phase:', activePhase);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
        <PlaybookSidebar 
          playbook={playbook} 
          activePhase={activePhase} 
          onPhaseChange={handlePhaseChange}
        />
        
        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <SidebarTrigger />
                  <Link to="/" className="p-2 hover:bg-orange-100 rounded-lg transition-colors">
                    <ArrowLeft className="h-5 w-5 text-gray-600" />
                  </Link>
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-2 rounded-lg">
                    <Sun className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{playbook.title}</h1>
                    <p className="text-sm text-gray-600">{playbook.description || "Interactive Playbook Edition"}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={refreshData} 
                    variant="outline"
                    size="sm"
                    className="bg-white/90"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
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
            {orderedPhases.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Phases</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {orderedPhases.map((phase) => (
                    <Card 
                      key={phase.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        phase.parent ? 'ml-6 border-l-4 border-orange-300' : ''
                      } ${
                        activePhase === phase.id 
                          ? 'ring-2 ring-orange-400 bg-white' 
                          : 'bg-white/90 backdrop-blur-sm border-orange-200'
                      }`}
                      onClick={() => handlePhaseChange(phase.id)}
                    >
                      <CardHeader>
                        <CardTitle className={phase.parent ? 'text-base' : 'text-lg'}>
                          {phase.name}
                        </CardTitle>
                        <CardDescription>{phase.description}</CardDescription>
                        <div className="text-xs text-gray-500">Phase ID: {phase.id}</div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Debug Information */}
            <div className="mb-6 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
              <h3 className="font-semibold mb-2">Debug Information:</h3>
              <p>Playbook ID: {playbook.id}</p>
              <p>Playbook Name: {playbook.name}</p>
              <p>Active Phase: {activePhase}</p>
              <p>Available Phases: {orderedPhases.map(p => p.id).join(', ')}</p>
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
                <ProcessSteps playbookId={playbook.id} activePhase={activePhase} searchQuery={searchQuery} />
              </TabsContent>

              <TabsContent value="raci">
                <RACIMatrix playbookId={playbook.id} activePhase={activePhase} searchQuery={searchQuery} />
              </TabsContent>

              <TabsContent value="process-map">
                <ProcessMap playbookId={playbook.id} activePhase={activePhase} />
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Playbook;
