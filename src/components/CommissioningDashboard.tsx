
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, AlertCircle, Users, FileText, BarChart3 } from "lucide-react";

export const CommissioningDashboard = () => {
  const [activePhase, setActivePhase] = useState("phase-1");

  const phases = [
    {
      id: "phase-1",
      name: "Pre-Commissioning",
      status: "completed",
      progress: 100,
      tasks: [
        { name: "Safety documentation review", status: "completed" },
        { name: "Equipment inspection", status: "completed" },
        { name: "Site preparation", status: "completed" }
      ]
    },
    {
      id: "phase-2", 
      name: "System Verification",
      status: "in-progress",
      progress: 65,
      tasks: [
        { name: "Electrical systems check", status: "completed" },
        { name: "Mechanical systems verification", status: "in-progress" },
        { name: "Control systems testing", status: "pending" }
      ]
    },
    {
      id: "phase-3",
      name: "Performance Testing", 
      status: "pending",
      progress: 0,
      tasks: [
        { name: "Power curve verification", status: "pending" },
        { name: "Noise level testing", status: "pending" },
        { name: "Grid compliance check", status: "pending" }
      ]
    },
    {
      id: "phase-4",
      name: "Final Commissioning",
      status: "pending", 
      progress: 0,
      tasks: [
        { name: "Final documentation", status: "pending" },
        { name: "Handover to operations", status: "pending" },
        { name: "Training completion", status: "pending" }
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Wind Commissioning Playbook</h1>
          <p className="text-gray-600">Track progress through wind turbine commissioning phases</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {phases.map((phase) => (
            <Card 
              key={phase.id}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                activePhase === phase.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setActivePhase(phase.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  {getStatusIcon(phase.status)}
                  <Badge className={getStatusColor(phase.status)}>
                    {phase.status.replace('-', ' ')}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{phase.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{phase.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${phase.progress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Phase Details</CardTitle>
                <CardDescription>
                  {phases.find(p => p.id === activePhase)?.name} activities and tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="tasks" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="tasks">Tasks</TabsTrigger>
                    <TabsTrigger value="process">Process</TabsTrigger>
                    <TabsTrigger value="raci">RACI</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="tasks" className="space-y-4">
                    {phases.find(p => p.id === activePhase)?.tasks.map((task, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(task.status)}
                          <span>{task.name}</span>
                        </div>
                        <Badge className={getStatusColor(task.status)}>
                          {task.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="process" className="space-y-4">
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Process documentation for {phases.find(p => p.id === activePhase)?.name}</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="raci" className="space-y-4">
                    <div className="text-center py-8 text-gray-500">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>RACI matrix for {phases.find(p => p.id === activePhase)?.name}</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Overall Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">41%</div>
                    <p className="text-sm text-gray-600">Commissioning Complete</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '41%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  View Documentation
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Team Assignment
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Progress Report
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
