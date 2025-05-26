
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Search, Sun, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { ProcessSteps } from "@/components/ProcessSteps";
import { RACIMatrix } from "@/components/RACIMatrix";
import { ProcessMap } from "@/components/ProcessMap";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activePhase, setActivePhase] = useState("construction");

  const projectPhases = [
    {
      id: "construction",
      name: "Construction & Erection Inspection",
      description: "Physical completion verification through joint inspections",
      progress: 85,
      status: "in-progress",
      steps: 11,
      completedSteps: 9
    },
    {
      id: "precommissioning",
      name: "Pre-commissioning Testing",
      description: "Functionality and safety validation through structured testing",
      progress: 60,
      status: "in-progress",
      steps: 11,
      completedSteps: 7
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "pending":
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-2 rounded-lg">
                <Sun className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Solar Project Execution Tracker</h1>
                <p className="text-sm text-gray-600">Pre-Commissioning Playbook - Interactive Edition</p>
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
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Project Phases</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectPhases.map((phase) => (
              <Card 
                key={phase.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activePhase === phase.id 
                    ? 'ring-2 ring-orange-400 bg-white' 
                    : 'bg-white/90 backdrop-blur-sm border-orange-200'
                }`}
                onClick={() => setActivePhase(phase.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{phase.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(phase.status)}
                      <Badge className={getStatusColor(phase.status)}>
                        {phase.status}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{phase.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <Progress value={phase.progress} />
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{phase.completedSteps} of {phase.steps} steps completed</span>
                    </div>
                  </div>
                </CardContent>
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
            <ProcessSteps activePhase={activePhase} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="raci">
            <RACIMatrix activePhase={activePhase} searchQuery={searchQuery} />
          </TabsContent>

          <TabsContent value="process-map">
            <ProcessMap activePhase={activePhase} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
