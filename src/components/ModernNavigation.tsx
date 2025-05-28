
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Chapter {
  id: string;
  name: string;
  shortName: string;
  subChapters?: Chapter[];
}

interface ModernNavigationProps {
  chapters: Chapter[];
  activePhase: string;
  onPhaseChange: (phaseId: string) => void;
}

export const ModernNavigation = ({ chapters, activePhase, onPhaseChange }: ModernNavigationProps) => {
  const [expandedChapters, setExpandedChapters] = useState<string[]>([]);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  const isExpanded = (chapterId: string) => expandedChapters.includes(chapterId);

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-40">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap items-center gap-2 py-4">
          {chapters.map((chapter) => {
            const hasSubChapters = chapter.subChapters && chapter.subChapters.length > 0;
            const isActive = activePhase === chapter.id || 
              (hasSubChapters && chapter.subChapters?.some(sub => sub.id === activePhase));
            
            return (
              <div key={chapter.id} className="relative">
                <Button
                  variant={isActive ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (hasSubChapters) {
                      toggleChapter(chapter.id);
                    } else {
                      onPhaseChange(chapter.id);
                    }
                  }}
                  className={`
                    ${isActive 
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white border-orange-400' 
                      : 'bg-white hover:bg-orange-50 text-gray-700 border-orange-200'
                    }
                    transition-all duration-200 font-medium text-sm px-4 py-2 rounded-lg
                    ${hasSubChapters ? 'pr-8' : ''}
                  `}
                >
                  {chapter.shortName}
                  {hasSubChapters && (
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                      {isExpanded(chapter.id) ? (
                        <ChevronDown className="h-3 w-3" />
                      ) : (
                        <ChevronRight className="h-3 w-3" />
                      )}
                    </div>
                  )}
                </Button>
                
                {/* Sub-chapters dropdown */}
                {hasSubChapters && isExpanded(chapter.id) && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-orange-200 rounded-lg shadow-lg z-50 min-w-[250px]">
                    {chapter.subChapters?.map((subChapter) => (
                      <Button
                        key={subChapter.id}
                        variant="ghost"
                        size="sm"
                        onClick={() => onPhaseChange(subChapter.id)}
                        className={`
                          w-full justify-start text-left px-4 py-2 text-sm rounded-none
                          ${activePhase === subChapter.id 
                            ? 'bg-orange-100 text-orange-800 font-medium' 
                            : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
                          }
                        `}
                      >
                        <div className="w-2 h-2 rounded-full bg-orange-300 mr-3 flex-shrink-0" />
                        {subChapter.shortName}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
