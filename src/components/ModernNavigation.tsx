
import { useState, useEffect } from "react";
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
    setExpandedChapters(prev => {
      // Close all other dropdowns and toggle current one
      const isCurrentlyExpanded = prev.includes(chapterId);
      return isCurrentlyExpanded ? [] : [chapterId];
    });
  };

  const isExpanded = (chapterId: string) => expandedChapters.includes(chapterId);

  // Auto-expand Chapter 1 if any of its subsections are active
  useEffect(() => {
    const chapter1 = chapters.find(ch => ch.id === 'chapter-1');
    if (chapter1 && chapter1.subChapters) {
      const isSubsectionActive = chapter1.subChapters.some(sub => sub.id === activePhase);
      if (isSubsectionActive && !expandedChapters.includes('chapter-1')) {
        setExpandedChapters(['chapter-1']);
      }
    }
  }, [activePhase, chapters, expandedChapters]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setExpandedChapters([]);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSubChapterClick = (subChapterId: string, event: React.MouseEvent) => {
    // Stop event propagation to prevent any interference
    event.stopPropagation();
    event.preventDefault();
    
    // Navigate to the section first
    onPhaseChange(subChapterId);
    
    // Force immediate collapse of all dropdowns
    setExpandedChapters([]);
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm relative z-40">
      <div className="container mx-auto px-6">
        <div className="flex items-center gap-1 py-4 flex-wrap">
          {chapters.map((chapter) => {
            const hasSubChapters = chapter.subChapters && chapter.subChapters.length > 0;
            const isActive = activePhase === chapter.id || 
              (hasSubChapters && chapter.subChapters?.some(sub => sub.id === activePhase));
            
            return (
              <div key={chapter.id} className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
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
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400 shadow-lg' 
                      : 'bg-white/90 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 text-gray-700 border-blue-200 hover:border-blue-300 hover:shadow-md'
                    }
                    transition-all duration-300 font-bold text-xs px-3 py-2 rounded-xl
                    ${hasSubChapters ? 'pr-6' : ''}
                    transform hover:scale-105 hover:-translate-y-0.5 whitespace-nowrap relative
                  `}
                >
                  {chapter.shortName}
                  {hasSubChapters && (
                    <div className="absolute right-1.5 top-1/2 transform -translate-y-1/2">
                      {isExpanded(chapter.id) ? (
                        <ChevronDown className="h-3 w-3 transition-transform duration-200" />
                      ) : (
                        <ChevronRight className="h-3 w-3 transition-transform duration-200" />
                      )}
                    </div>
                  )}
                </Button>
                
                {/* Sub-chapters dropdown */}
                {hasSubChapters && isExpanded(chapter.id) && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-blue-200 rounded-xl shadow-2xl z-[9999] min-w-[500px] max-w-[700px] overflow-hidden">
                    {chapter.subChapters?.map((subChapter) => {
                      return (
                        <Button
                          key={subChapter.id}
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleSubChapterClick(subChapter.id, e)}
                          className={`
                            w-full justify-start text-left px-4 py-4 text-xs rounded-none border-b border-blue-50 last:border-b-0 relative
                            ${activePhase === subChapter.id 
                              ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 font-semibold' 
                              : 'text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-blue-700'
                            }
                            transition-all duration-200 h-auto min-h-[60px] leading-tight
                          `}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 mr-3 flex-shrink-0 mt-1" />
                          <span className="text-wrap break-words whitespace-normal">{subChapter.name}</span>
                        </Button>
                      );
                    })}
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
