import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface TabData {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface ModernTabsProps {
  tabs?: TabData[];
  defaultTab?: string;
  activePhase?: string;
  onPhaseChange?: (phase: string) => void;
  phases?: any[];
  children?: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const ModernTabs = ({ 
  tabs, 
  defaultTab, 
  activePhase, 
  onPhaseChange, 
  phases,
  children,
  value,
  onValueChange
}: ModernTabsProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(defaultTab || tabs?.[0]?.id || "");

  // If children are provided, use the wrapper pattern
  if (children) {
    return (
      <Tabs value={value || selectedTab} onValueChange={onValueChange || setSelectedTab}>
        {children}
      </Tabs>
    );
  }

  // Otherwise, use the original tabs pattern
  return (
    <div className="space-y-6">
      {/* Phase Selection */}
      {phases && phases.length > 0 && (
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Chapter</h3>
              <div className="text-sm text-gray-600">
                {phases.length} chapters available
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {phases.map((phase) => (
                <button
                  key={phase.id}
                  onClick={() => onPhaseChange?.(phase.id)}
                  className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                    activePhase === phase.id
                      ? 'bg-orange-500 text-white border-orange-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  <div className="font-medium text-sm">{phase.shortName}</div>
                  <div className="text-xs opacity-90 mt-1 truncate">{phase.name.replace(/^Chapter \d+(\.\d+[A-Z]?)? - /, '')}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Bar */}
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search across all content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-orange-200 focus:border-orange-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="bg-white/90 backdrop-blur-sm border border-orange-200 p-1">
          {tabs?.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex items-center gap-2 data-[state=active]:bg-orange-500 data-[state=active]:text-white"
            >
              {tab.icon}
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabs?.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-6">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

// Export TabsContent for use in other components
export { TabsContent };
