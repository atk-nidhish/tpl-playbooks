
import { Badge } from "@/components/ui/badge";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  playbookType?: string;
}

export const QuizProgress = ({ currentQuestion, totalQuestions, playbookType = "solar" }: QuizProgressProps) => {
  const isWindPlaybook = playbookType.toLowerCase().includes('wind');
  
  const gradientClass = isWindPlaybook 
    ? "bg-gradient-to-r from-blue-500 to-blue-600" 
    : "bg-gradient-to-r from-orange-500 to-yellow-500";

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm font-medium text-gray-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <div className="w-64 bg-gray-200 rounded-full h-2">
          <div 
            className={`${gradientClass} h-2 rounded-full transition-all duration-300`}
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
