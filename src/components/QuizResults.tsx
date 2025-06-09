
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
}

export const QuizResults = ({ 
  scorePercentage, 
  certificateEarned, 
  userInfo, 
  playbookName, 
  playbookId, 
  onResetQuiz 
}: QuizResultsProps) => {
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
        />
      )}

      <Button
        onClick={onResetQuiz}
        className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
      >
        <RotateCcw className="h-4 w-4 mr-2" />
        Retake Exam
      </Button>
    </div>
  );
};
