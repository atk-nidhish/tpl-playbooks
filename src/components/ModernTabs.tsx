
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CheckCircle, Users, Map } from "lucide-react";

interface ModernTabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

export const ModernTabs = ({ defaultValue, value, onValueChange, children }: ModernTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} value={value} onValueChange={onValueChange} className="space-y-8">
      <div className="flex justify-center">
        <TabsList className="bg-white/95 backdrop-blur-md border-2 border-blue-100 p-1.5 rounded-2xl shadow-lg">
          <TabsTrigger 
            value="processes" 
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 transform data-[state=active]:scale-105"
          >
            <CheckCircle className="h-4 w-4" />
            <span className="font-semibold">Process Steps</span>
          </TabsTrigger>
          <TabsTrigger 
            value="raci" 
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 transform data-[state=active]:scale-105"
          >
            <Users className="h-4 w-4" />
            <span className="font-semibold">RACI Matrix</span>
          </TabsTrigger>
          <TabsTrigger 
            value="process-map" 
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300 transform data-[state=active]:scale-105"
          >
            <Map className="h-4 w-4" />
            <span className="font-semibold">Process Map</span>
          </TabsTrigger>
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
};

export { TabsContent };
