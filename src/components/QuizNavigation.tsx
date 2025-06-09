
import { Button } from "@/components/ui/button";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  hasSelectedAnswer: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  hasSelectedAnswer, 
  onPrevious, 
  onNext 
}: QuizNavigationProps) => {
  return (
    <div className="flex justify-between">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentQuestion === 0}
        className="border-orange-200 hover:bg-orange-50"
      >
        Previous
      </Button>
      <Button
        onClick={onNext}
        disabled={!hasSelectedAnswer}
        className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
      >
        {currentQuestion === totalQuestions - 1 ? 'Complete Exam' : 'Next'}
      </Button>
    </div>
  );
};
