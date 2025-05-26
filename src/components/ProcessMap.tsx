
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, ArrowRight, Circle, Square, Diamond, Hexagon } from "lucide-react";

interface ProcessMapProps {
  activePhase: string;
}

export const ProcessMap = ({ activePhase }: ProcessMapProps) => {
  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-orange-500" />
            Process Map - {activePhase === "construction" ? "Construction & Erection" : "Pre-commissioning Testing"}
          </CardTitle>
          <CardDescription>
            Visual representation of key process flows, illustrating the sequence of activities, approval stages, and decision points
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="text-lg">Process Flow Legend</CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="flex items-center gap-2">
              <Circle className="h-6 w-6 fill-purple-500 text-purple-500" />
              <span className="text-sm">Start/End</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-6 w-6 fill-gray-300 text-gray-600" />
              <span className="text-sm">Input</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-6 w-6 fill-yellow-300 text-yellow-600" />
              <span className="text-sm">Output</span>
            </div>
            <div className="flex items-center gap-2">
              <Hexagon className="h-6 w-6 fill-blue-300 text-blue-600" />
              <span className="text-sm">Process</span>
            </div>
            <div className="flex items-center gap-2">
              <Diamond className="h-6 w-6 fill-purple-300 text-purple-600" />
              <span className="text-sm">Approval/Sign-off</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      {activePhase === "construction" ? (
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle>Construction & Erection Inspection Process Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[1200px] space-y-8">
                {/* OEM Row */}
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <Badge className="bg-purple-100 text-purple-800">OEM</Badge>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <Circle className="h-8 w-8 fill-purple-500 text-white" />
                      <span className="text-xs mt-1">Start</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Hexagon className="h-8 w-8 fill-blue-300 text-blue-800" />
                      <span className="text-xs mt-1 text-center">Inform PM<br/>WTG Complete</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Hexagon className="h-8 w-8 fill-blue-300 text-blue-800" />
                      <span className="text-xs mt-1 text-center">Appoint<br/>Engineers</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Hexagon className="h-8 w-8 fill-blue-300 text-blue-800" />
                      <span className="text-xs mt-1 text-center">Close Punch<br/>Points</span>
                    </div>
                  </div>
                </div>

                {/* Project Team Row */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <Badge className="bg-green-100 text-green-800">Project</Badge>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <Hexagon className="h-8 w-8 fill-blue-300 text-blue-800" />
                      <span className="text-xs mt-1 text-center">Request<br/>CPOC</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Hexagon className="h-8 w-8 fill-blue-300 text-blue-800" />
                      <span className="text-xs mt-1 text-center">Direct<br/>Inspection</span>
                    </div>
                  </div>
                </div>

                {/* Commissioning Row */}
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <Badge className="bg-orange-100 text-orange-800">Commissioning</Badge>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <Hexagon className="h-8 w-8 fill-blue-300 text-blue-800" />
                      <span className="text-xs mt-1 text-center">Conduct<br/>Inspection</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Square className="h-8 w-8 fill-yellow-300 text-yellow-800" />
                      <span className="text-xs mt-1 text-center">Punch Point<br/>List</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Diamond className="h-8 w-8 fill-purple-300 text-purple-800" />
                      <span className="text-xs mt-1 text-center">Approve<br/>Report</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Square className="h-8 w-8 fill-yellow-300 text-yellow-800" />
                      <span className="text-xs mt-1 text-center">Issue<br/>MCC</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Circle className="h-8 w-8 fill-purple-500 text-white" />
                      <span className="text-xs mt-1">End</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle>Pre-commissioning Testing Process Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[1200px] space-y-8">
                {/* Project Team Row */}
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <Badge className="bg-green-100 text-green-800">Project</Badge>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <Circle className="h-8 w-8 fill-purple-500 text-white" />
                      <span className="text-xs mt-1">Start</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Hexagon className="h-8 w-8 fill-blue-300 text-blue-800" />
                      <span className="text-xs mt-1 text-center">Initiate<br/>Testing</span>
                    </div>
                  </div>
                </div>

                {/* OEM Row */}
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <Badge className="bg-purple-100 text-purple-800">OEM</Badge>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <Hexagon className="h-8 w-8 fill-blue-300 text-blue-800" />
                      <span className="text-xs mt-1 text-center">Prepare<br/>Checklist</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Hexagon className="h-8 w-8 fill-blue-300 text-blue-800" />
                      <span className="text-xs mt-1 text-center">Conduct<br/>Tests</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Square className="h-8 w-8 fill-yellow-300 text-yellow-800" />
                      <span className="text-xs mt-1 text-center">Test<br/>Results</span>
                    </div>
                  </div>
                </div>

                {/* Commissioning Row */}
                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <Badge className="bg-orange-100 text-orange-800">Commissioning</Badge>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <Diamond className="h-8 w-8 fill-purple-300 text-purple-800" />
                      <span className="text-xs mt-1 text-center">Approve<br/>Checklist</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Diamond className="h-8 w-8 fill-purple-300 text-purple-800" />
                      <span className="text-xs mt-1 text-center">Review<br/>Results</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Square className="h-8 w-8 fill-yellow-300 text-yellow-800" />
                      <span className="text-xs mt-1 text-center">Final<br/>Report</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                    <div className="flex flex-col items-center">
                      <Circle className="h-8 w-8 fill-purple-500 text-white" />
                      <span className="text-xs mt-1">End</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
