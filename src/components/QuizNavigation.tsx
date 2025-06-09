
import { Button } from "@/components/ui/button";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  hasSelectedAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
  playbookType?: string;
}

export const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  hasSelectedAnswer, 
  onPrevious, 
  onNext,
  playbookType = "solar"
}: QuizNavigationProps) => {
  const isWindPlaybook = playbookType.toLowerCase().includes('wind');
  
  const hoverClass = isWindPlaybook 
    ? "border-blue-200 hover:bg-blue-50" 
    : "border-orange-200 hover:bg-orange-50";
  
  const gradientClass = isWindPlaybook 
    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" 
    : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600";

  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className={hoverClass}
      >
        Previous
      </Button>
      <Button
        onClick={onNext}
        disabled={!hasSelectedAnswer}
        className={gradientClass}
      >
        {currentQuestion === totalQuestions - 1 ? 'Complete Exam' : 'Next'}
      </Button>
    </div>
  );
};
