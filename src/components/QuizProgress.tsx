
import { Badge } from "@/components/ui/badge";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  chapter: string;
}

export const QuizProgress = ({ currentQuestion, totalQuestions, chapter }: QuizProgressProps) => {
  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-gray-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <div className="w-64 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Chapter Badge */}
      <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
        {chapter}
      </Badge>
    </div>
  );
};
