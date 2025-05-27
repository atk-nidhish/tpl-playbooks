
import { Link, useParams } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Book, FileText } from "lucide-react";

interface PlaybookSidebarProps {
  playbook: {
    id: string;
    title: string;
    phases: any;
  } | null;
  activePhase: string;
  onPhaseChange: (phaseId: string) => void;
}

export function PlaybookSidebar({ playbook, activePhase, onPhaseChange }: PlaybookSidebarProps) {
  const { id } = useParams<{ id: string }>();

  if (!playbook) return null;

  const phases = playbook.phases ? Object.entries(playbook.phases).map(([key, value]: [string, any]) => ({
    id: key,
    name: value.name || key,
    description: value.description || "Phase description",
    parent: value.parent || null
  })) : [];

  // Organize phases into main chapters and sub-chapters
  const mainChapters = phases.filter(phase => !phase.parent);
  const subChapters = phases.filter(phase => phase.parent);

  const getSubChapters = (parentId: string) => {
    return subChapters.filter(phase => phase.parent === parentId);
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-2 rounded-lg">
            <Book className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">{playbook.title}</h2>
            <p className="text-xs text-gray-600">Navigation</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Chapters</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainChapters.map((chapter) => {
                const chapterSubChapters = getSubChapters(chapter.id);
                return (
                  <div key={chapter.id}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => onPhaseChange(chapter.id)}
                        isActive={activePhase === chapter.id}
                        className="w-full justify-start"
                      >
                        <FileText className="h-4 w-4" />
                        <span className="text-sm font-medium">{chapter.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    
                    {/* Sub-chapters */}
                    {chapterSubChapters.length > 0 && (
                      <div className="ml-4 mt-1 space-y-1">
                        {chapterSubChapters.map((subChapter) => (
                          <SidebarMenuItem key={subChapter.id}>
                            <SidebarMenuButton
                              onClick={() => onPhaseChange(subChapter.id)}
                              isActive={activePhase === subChapter.id}
                              className="w-full justify-start text-xs"
                              size="sm"
                            >
                              <div className="w-2 h-2 rounded-full bg-orange-300 mr-2" />
                              <span>{subChapter.name}</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
