
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { UserInfoForm } from "./UserInfoForm";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { QuizNavigation } from "./QuizNavigation";
import { QuizResults } from "./QuizResults";

interface CertificationQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  chapter: string;
}

interface Chapter {
  id: string;
  name: string;
  shortName: string;
  subChapters?: Chapter[];
}

interface UserInfo {
  fullName: string;
  employeeId: string;
}

interface PlaybookCertificationProps {
  playbookId: string;
  playbookName: string;
  chapters: Chapter[];
}

export const PlaybookCertification = ({ playbookId, playbookName, chapters }: PlaybookCertificationProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [certificateEarned, setCertificateEarned] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [showUserForm, setShowUserForm] = useState(true);

  // Determine if this is Wind Planning playbook to show correct questions
  const isWindPlanning = playbookName.toLowerCase().includes('wind') && playbookName.toLowerCase().includes('planning');

  const windPlanningQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who is responsible for appointing the Bid Planner (BP) and sharing the Bid Summary for Final L1 Plan development?",
      options: [
        "Bid Planner",
        "Bid Incharge",
        "Land Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 2,
      question: "What document serves as the input for developing the Preliminary L1 Plan?",
      options: [
        "Final L1 Plan",
        "Wind Project Master Plan",
        "Preliminary Feasibility Report"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 3,
      question: "Who is accountable for analyzing the bid summary and developing delivery milestones and timeline for the project?",
      options: [
        "Land Manager",
        "Bid Planner",
        "Chief Projects"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 4,
      question: "Who is responsible for sharing the Final L1 Plan with functional leads for inputs?",
      options: [
        "Chief Projects",
        "Bid Planner",
        "Project Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 5,
      question: "What document is used as an input for the development of the Project Schedule (PS)?",
      options: [
        "Preliminary L1 Plan",
        "Final L1 Plan",
        "Land Finalization Plan"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 6,
      question: "Who is accountable for preparing the draft Project Schedule (PS) by leveraging the Wind Project Master Plan?",
      options: [
        "Chief Projects",
        "Project Planner",
        "Project Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 7,
      question: "What is the output of the process step where the Project Manager develops the Project Execution Approach (PEA)?",
      options: [
        "Project Schedule",
        "Scope Matrix",
        "Preliminary L1 Plan"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 8,
      question: "Who is responsible for preparing the Basic Engineering Scope (BES)?",
      options: [
        "Chief Engineering",
        "Project Engineering Managers (PEMs)",
        "Quality Managers"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 9,
      question: "What document serves as the input for the development of the Engineering Execution Plans (EEPs)?",
      options: [
        "Project Schedule",
        "Basic Engineering Scope",
        "Final L1 Plan"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    },
    {
      id: 10,
      question: "Who is accountable for sharing the Project Schedule (PS) and Project Execution Approach (PEA) with the engineering team?",
      options: [
        "Chief Engineering",
        "Project Planner",
        "Project Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind Planning Process"
    }
  ];

  const defaultQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "Who is responsible for taking physical control of land covering a minimum of 20 WTG sites and PSS?",
      options: [
        "Land Manager",
        "Site Manager",
        "Project Manager"
      ],
      correctAnswer: 2,
      chapter: "Wind C&P Process"
    },
    {
      id: 2,
      question: "What document does the Project Manager request from the Regulatory Approvals Head to proceed with the construction?",
      options: [
        "Building and Other Construction Works (BOCW) license",
        "Grant of Connectivity and Developer Permission",
        "Notice to Proceed (NTP)"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 3,
      question: "Who is accountable for providing the Grant of Connectivity and Developer Permission to the Project Manager?",
      options: [
        "Contractor SPOC",
        "Regulatory Approvals Head",
        "Site QHSSE Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 4,
      question: "What is the output document when the Project Manager issues the Notice to Proceed to the Contractor SPOC?",
      options: [
        "Compliance Documents Application",
        "Notice to Proceed",
        "BOCW License"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 5,
      question: "Who is responsible for applying for the BOCW license and sharing it with the Project Manager and Regulatory Approvals Head?",
      options: [
        "Site Functional Head",
        "Contractor SPOC",
        "Site Manager"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 6,
      question: "What document does the Contractor SPOC need to apply for compliance documents outlined in the contractor mobilization checklist?",
      options: [
        "Construction Management Plan",
        "Health and Fitness Certificates",
        "Contractor Mobilization Checklist"
      ],
      correctAnswer: 2,
      chapter: "Wind C&P Process"
    },
    {
      id: 7,
      question: "Who verifies the health and fitness certificates of the contractor's manpower?",
      options: [
        "Site QHSSE Manager",
        "Project Manager",
        "Site Functional Head"
      ],
      correctAnswer: 0,
      chapter: "Wind C&P Process"
    },
    {
      id: 8,
      question: "What document does the Site Functional Head raise to the Site QHSSE Lead once a job is completed?",
      options: [
        "Quality Inspection Notice",
        "Job Completion Certificate",
        "Daily Progress Report (DPR)"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 9,
      question: "Who is responsible for conducting the safety induction of all the site manpower and issuing ID cards to them?",
      options: [
        "Site Manager",
        "Site QHSSE Manager",
        "Contractor SPOC"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    },
    {
      id: 10,
      question: "What document does the Site QHSSE Lead issue to the Contractor SPOC upon successful inspection of the completed work?",
      options: [
        "Quality Deviation List",
        "Job Completion Certificate",
        "Notice to Proceed"
      ],
      correctAnswer: 1,
      chapter: "Wind C&P Process"
    }
  ];

  // Use Wind Planning questions if this is the Wind Planning playbook, otherwise use default questions
  const certificationQuestions = isWindPlanning ? windPlanningQuestions : defaultQuestions;

  const handleUserInfoSubmit = (submittedUserInfo: UserInfo) => {
    setUserInfo(submittedUserInfo);
    setShowUserForm(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < certificationQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
      checkCertification();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
    setCertificateEarned(false);
    setShowUserForm(true);
    setUserInfo(null);
  };

  const calculateScore = () => {
    let correct = 0;
    certificationQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScorePercentage = () => {
    return Math.round((calculateScore() / certificationQuestions.length) * 100);
  };

  const checkCertification = () => {
    const percentage = getScorePercentage();
    if (percentage >= 75) {
      setCertificateEarned(true);
      saveCertificate();
    }
  };

  const saveCertificate = async () => {
    if (!userInfo) return;
    
    const score = getScorePercentage();
    
    // Save to localStorage for backwards compatibility
    const certificate = {
      title: `${playbookName} Certification`,
      score: score,
      date: new Date().toLocaleDateString(),
      playbookId: playbookId,
      fullName: userInfo.fullName,
      employeeId: userInfo.employeeId
    };

    const existingCertificates = JSON.parse(localStorage.getItem('user_certificates') || '[]');
    const updatedCertificates = [...existingCertificates.filter((cert: any) => cert.playbookId !== playbookId), certificate];
    localStorage.setItem('user_certificates', JSON.stringify(updatedCertificates));

    // Save to Supabase with real user information
    try {
      const { error } = await supabase
        .from('certification_scores')
        .insert({
          user_name: userInfo.fullName,
          employee_id: userInfo.employeeId,
          user_department: "Not specified", // Keep this field for now
          playbook_name: `${playbookName} Certification`,
          score: score,
        });

      if (error) {
        console.error('Error saving certification to database:', error);
      } else {
        console.log('Certification saved to database successfully');
      }
    } catch (error) {
      console.error('Error saving certification:', error);
    }
  };

  // Show user info form if user hasn't provided their information yet
  if (showUserForm) {
    return (
      <div className="space-y-6">
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-orange-500" />
              Playbook Certification Exam
            </CardTitle>
            <CardDescription>
              Complete this comprehensive exam covering all chapters to earn your {playbookName} certification. 
              A score of 75% or higher is required to pass.
            </CardDescription>
          </CardHeader>
        </Card>

        <UserInfoForm 
          onUserInfoSubmit={handleUserInfoSubmit}
          playbookName={playbookName}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-orange-500" />
            Playbook Certification Exam
          </CardTitle>
          <CardDescription>
            Welcome {userInfo?.fullName} (ID: {userInfo?.employeeId}). Complete this comprehensive exam covering all chapters to earn your {playbookName} certification. 
            A score of 75% or higher is required to pass.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-6">
          {!quizCompleted ? (
            <div className="space-y-6">
              <QuizProgress
                currentQuestion={currentQuestion}
                totalQuestions={certificationQuestions.length}
                chapter={certificationQuestions[currentQuestion].chapter}
                playbookType={playbookName}
              />

              <QuizQuestion
                question={certificationQuestions[currentQuestion].question}
                options={certificationQuestions[currentQuestion].options}
                selectedAnswer={selectedAnswers[currentQuestion]}
                onAnswerSelect={handleAnswerSelect}
                playbookType={playbookName}
              />

              <QuizNavigation
                currentQuestion={currentQuestion}
                totalQuestions={certificationQuestions.length}
                hasSelectedAnswer={selectedAnswers[currentQuestion] !== undefined}
                onPrevious={handlePreviousQuestion}
                onNext={handleNextQuestion}
                playbookType={playbookName}
              />
            </div>
          ) : (
            <QuizResults
              scorePercentage={getScorePercentage()}
              certificateEarned={certificateEarned}
              userInfo={userInfo!}
              playbookName={playbookName}
              playbookId={playbookId}
              onResetQuiz={resetQuiz}
              playbookType={playbookName}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
