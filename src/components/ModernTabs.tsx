
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle, Users, Map, Brain } from "lucide-react";

interface ModernTabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export const ModernTabs = ({ defaultValue, children }: ModernTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} className="space-y-6">
      <div className="flex justify-center">
        <TabsList className="bg-white/90 backdrop-blur-sm border border-orange-200 p-2 rounded-xl shadow-lg">
          <TabsTrigger 
            value="processes" 
            className="flex items-center gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white transition-all duration-300"
          >
            <CheckCircle className="h-4 w-4" />
            <span className="font-medium">Process Steps</span>
          </TabsTrigger>
          <TabsTrigger 
            value="raci" 
            className="flex items-center gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white transition-all duration-300"
          >
            <Users className="h-4 w-4" />
            <span className="font-medium">RACI Matrix</span>
          </TabsTrigger>
          <TabsTrigger 
            value="process-map" 
            className="flex items-center gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white transition-all duration-300"
          >
            <Map className="h-4 w-4" />
            <span className="font-medium">Process Map</span>
          </TabsTrigger>
          <TabsTrigger 
            value="quiz" 
            className="flex items-center gap-2 px-6 py-3 rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500 data-[state=active]:text-white transition-all duration-300"
          >
            <Brain className="h-4 w-4" />
            <span className="font-medium">Quiz</span>
          </TabsTrigger>
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
};

export { TabsContent };
