
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserInfoForm } from "./UserInfoForm";
import { QuizQuestion } from "./QuizQuestion";
import { QuizNavigation } from "./QuizNavigation";
import { QuizProgress } from "./QuizProgress";
import { QuizResults } from "./QuizResults";
import { solarPlanningQuestions } from "@/data/solarPlanningQuestions";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Chapter {
  id: string;
  name: string;
  shortName: string;
}

interface PlaybookCertificationProps {
  playbookId: string;
  playbookName: string;
  chapters: Chapter[];
}

interface UserInfo {
  fullName: string;
  employeeId: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  chapter: string;
}

// Default questions for other playbooks
const defaultQuestions: QuizQuestion[] = [
  {
    id: "1",
    question: "What is the primary purpose of project planning?",
    options: [
      "To define project scope and objectives",
      "To allocate resources efficiently",
      "To establish timelines and milestones",
      "All of the above"
    ],
    correctAnswer: 3,
    chapter: "Introduction"
  },
  {
    id: "2",
    question: "Which of the following is NOT a key component of a project plan?",
    options: [
      "Risk management strategy",
      "Communication plan",
      "Resource allocation",
      "Marketing budget"
    ],
    correctAnswer: 3,
    chapter: "Introduction"
  },
  {
    id: "3",
    question: "What does RACI stand for in project management?",
    options: [
      "Responsible, Accountable, Consulted, Informed",
      "Reliable, Accountable, Consulted, Informed",
      "Responsible, Accurate, Consulted, Innovative",
      "Reliable, Accurate, Consulted, Innovative"
    ],
    correctAnswer: 0,
    chapter: "Roles and Responsibilities"
  },
  {
    id: "4",
    question: "What is a Work Breakdown Structure (WBS)?",
    options: [
      "A hierarchical decomposition of the total scope of work",
      "A list of project stakeholders",
      "A detailed budget for the project",
      "A communication plan for the project team"
    ],
    correctAnswer: 0,
    chapter: "Project Scope"
  },
  {
    id: "5",
    question: "Which technique is used to estimate the total project duration?",
    options: [
      "Critical Path Method (CPM)",
      "SWOT analysis",
      "Pareto chart",
      "Gantt chart"
    ],
    correctAnswer: 0,
    chapter: "Project Timeline"
  }
];

export const PlaybookCertification = ({ playbookId, playbookName, chapters }: PlaybookCertificationProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Select questions based on playbook type
  const getQuestions = () => {
    if (playbookId === "solar-planning" || playbookName.toLowerCase().includes("planning") && playbookName.toLowerCase().includes("solar")) {
      return solarPlanningQuestions;
    }
    return defaultQuestions;
  };

  const questions = getQuestions();
  const playbookType = playbookName.toLowerCase().includes('wind') ? 'wind' : 'solar';

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }, [userInfo]);

  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = async () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const scorePercentage = Math.round((correctAnswers / questions.length) * 100);
    setScore(scorePercentage);
    setShowResults(true);

    // Save score to database
    if (userInfo) {
      try {
        const { error } = await supabase
          .from('certification_scores')
          .insert({
            user_name: userInfo.fullName,
            employee_id: userInfo.employeeId,
            playbook_name: playbookName,
            score: scorePercentage,
            completed_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error saving score:', error);
          toast.error("Failed to save certification score");
        } else {
          toast.success("Certification score saved successfully!");
        }
      } catch (error) {
        console.error('Error saving score:', error);
        toast.error("Failed to save certification score");
      }
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (!userInfo) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Certification Information</CardTitle>
          <CardDescription>
            Please provide your information to begin the {playbookName} certification exam
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserInfoForm onUserInfoSubmit={setUserInfo} playbookName={playbookName} />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{playbookName} Certification Exam</CardTitle>
          <CardDescription>
            Complete this exam to earn your certification. You need 75% to pass.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!showResults ? (
            <>
              <QuizProgress 
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                chapter={questions[currentQuestion]?.chapter || "General"}
                playbookType={playbookType}
              />
              
              <QuizQuestion
                question={questions[currentQuestion]?.question || ""}
                options={questions[currentQuestion]?.options || []}
                selectedAnswer={answers[currentQuestion]}
                onAnswerSelect={handleAnswerSelect}
                playbookType={playbookType}
              />

              <QuizNavigation
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                hasSelectedAnswer={answers[currentQuestion] !== undefined}
                onPrevious={handlePrevious}
                onNext={handleNext}
                playbookType={playbookType}
              />
            </>
          ) : (
            <QuizResults
              scorePercentage={score}
              certificateEarned={score >= 75}
              userInfo={userInfo}
              playbookName={playbookName}
              playbookId={playbookId}
              onResetQuiz={resetQuiz}
              playbookType={playbookType}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
