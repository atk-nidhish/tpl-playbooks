
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { CertificateActions } from "./CertificateActions";

interface UserInfo {
  fullName: string;
  employeeId: string;
}

interface QuizResultsProps {
  scorePercentage: number;
  certificateEarned: boolean;
  userInfo: UserInfo;
  playbookName: string;
  playbookId: string;
  onResetQuiz: () => void;
  playbookType?: string;
}

export const QuizResults = ({ 
  scorePercentage, 
  certificateEarned, 
  userInfo, 
  playbookName, 
  playbookId, 
  onResetQuiz,
  playbookType = "solar"
}: QuizResultsProps) => {
  const isWindPlaybook = playbookType.toLowerCase().includes('wind');
  
  const gradientClass = isWindPlaybook 
    ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700" 
    : "bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600";

  return (
    <div className="text-center space-y-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Exam Completed!</h3>
        <div className={`text-4xl font-bold ${scorePercentage >= 75 ? 'text-green-600' : 'text-red-600'}`}>
          {scorePercentage}%
        </div>
        <p className="text-gray-600 mt-2">
          {certificateEarned ? '🎉 Congratulations! You have earned your certification!' : 
           scorePercentage >= 60 ? 'Close! You need 75% to pass. Try again!' : 
           'Keep studying and try again!'}
        </p>
      </div>

      {certificateEarned && (
        <CertificateActions
          userInfo={userInfo}
          playbookName={playbookName}
          playbookId={playbookId}
          scorePercentage={scorePercentage}
          playbookType={playbookType}
        />
      )}

      <Button
        onClick={onResetQuiz}
        className={gradientClass}
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Retake Exam
      </Button>
    </div>
  );
};
