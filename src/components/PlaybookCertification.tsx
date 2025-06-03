import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Brain, CheckCircle, X, RotateCcw, Download, Star, Lock, BookOpen } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CertificationQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  chapter: string;
  explanation: string;
}

interface Chapter {
  id: string;
  name: string;
  shortName: string;
  subChapters?: Chapter[];
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
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);
  const [showQuestionFeedback, setShowQuestionFeedback] = useState(false);
  const [currentQuestionResult, setCurrentQuestionResult] = useState<{
    isCorrect: boolean;
    correctAnswer: string;
    explanation: string;
    chapter: string;
  } | null>(null);

  useEffect(() => {
    // Load completed quizzes from localStorage
    const saved = localStorage.getItem('wind_planning_completed_quizzes');
    if (saved) {
      setCompletedQuizzes(JSON.parse(saved));
    }

    // Listen for quiz completion updates
    const handleQuizUpdate = () => {
      const updated = localStorage.getItem('wind_planning_completed_quizzes');
      if (updated) {
        setCompletedQuizzes(JSON.parse(updated));
      }
    };

    window.addEventListener('completedQuizzesUpdated', handleQuizUpdate);
    return () => window.removeEventListener('completedQuizzesUpdated', handleQuizUpdate);
  }, []);

  const certificationQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "During the project initiation phase, what should be the primary focus to ensure successful wind energy project delivery?",
      options: [
        "Establishing comprehensive project scope, objectives, and stakeholder alignment",
        "Immediately commencing construction and installation activities",
        "Finalizing all equipment procurement contracts and vendor agreements"
      ],
      correctAnswer: 0,
      chapter: "Project Planning Framework",
      explanation: "Project initiation requires establishing clear scope, objectives, and stakeholder alignment to create a solid foundation for project success."
    },
    {
      id: 2,
      question: "When developing a comprehensive land acquisition strategy, which phase should primarily handle this critical activity?",
      options: [
        "Project Initiation and Startup Phase",
        "Land Planning and Site Development Phase", 
        "Engineering Design and Technical Planning Phase"
      ],
      correctAnswer: 1,
      chapter: "Land Planning Framework",
      explanation: "The Land Planning Phase is specifically designed to address land acquisition strategies, site preparation, and related logistical considerations."
    },
    {
      id: 3,
      question: "What represents the core deliverable of the engineering planning phase in wind energy development?",
      options: [
        "Comprehensive financial modeling and budget forecasting",
        "Detailed technical specifications, design drawings, and engineering documentation",
        "Resource scheduling and project timeline optimization"
      ],
      correctAnswer: 1,
      chapter: "Engineering Planning",
      explanation: "Engineering planning focuses on creating detailed technical specifications, design documentation, and engineering deliverables that guide construction."
    },
    {
      id: 4,
      question: "In the context of procurement planning, what strategy ensures optimal project outcomes?",
      options: [
        "Comprehensive site survey documentation and environmental assessments",
        "Strategic vendor evaluation, contract negotiation, and supply chain management",
        "Detailed construction scheduling and timeline development"
      ],
      correctAnswer: 1,
      chapter: "Procurement Management",
      explanation: "Effective procurement planning emphasizes strategic vendor selection, contract management, and supply chain optimization for project success."
    },
    {
      id: 5,
      question: "What is the fundamental objective of developing a comprehensive commissioning strategy?",
      options: [
        "Initiating construction activities and site preparation",
        "Ensuring optimal system performance, testing protocols, and seamless operational handover",
        "Completing final land acquisition and permitting processes"
      ],
      correctAnswer: 1,
      chapter: "Commissioning Planning",
      explanation: "Commissioning planning ensures all systems meet performance specifications and facilitates a smooth transition to operational status."
    },
    {
      id: 6,
      question: "Why is integrated planning coordination essential across all phases of wind energy project development?",
      options: [
        "To minimize initial capital expenditure and reduce project costs",
        "To ensure seamless coordination, strategic alignment, and effective stakeholder communication",
        "To accelerate construction timelines and expedite project delivery"
      ],
      correctAnswer: 1,
      chapter: "Integrated Planning",
      explanation: "Integrated planning ensures all project elements work cohesively, maintains strategic alignment, and facilitates effective stakeholder coordination."
    },
    {
      id: 7,
      question: "What principle should guide effective scope management throughout wind energy project execution?",
      options: [
        "Clearly defined project boundaries, deliverable specifications, and change control processes",
        "Exclusive focus on financial management and cost optimization strategies",
        "Concentration on technical design elements and engineering specifications"
      ],
      correctAnswer: 0,
      chapter: "Scope Management",
      explanation: "Effective scope management requires clear boundary definition, detailed deliverable specifications, and robust change control mechanisms."
    },
    {
      id: 8,
      question: "How should cost management be strategically approached throughout the wind energy project lifecycle?",
      options: [
        "Focus exclusively on initial capital cost minimization",
        "Implement comprehensive lifecycle cost analysis, value engineering, and financial optimization",
        "Prioritize cost reduction regardless of quality or performance impact"
      ],
      correctAnswer: 1,
      chapter: "Cost Management",
      explanation: "Strategic cost management requires comprehensive lifecycle analysis, value engineering principles, and balanced financial optimization approaches."
    }
  ];

  // Check if certification is unlocked
  const isCertificationUnlocked = () => {
    // Get all chapter IDs from the chapters prop
    const allChapterIds = chapters.map(chapter => chapter.id);
    
    // Check if all chapters are completed
    return allChapterIds.every(chapterId => completedQuizzes.includes(chapterId));
  };

  const getCompletionProgress = () => {
    const allChapterIds = chapters.map(chapter => chapter.id);
    const completed = allChapterIds.filter(chapterId => completedQuizzes.includes(chapterId)).length;
    return {
      completed,
      total: allChapterIds.length,
      percentage: Math.round((completed / allChapterIds.length) * 100)
    };
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));

    // Show immediate feedback
    const question = certificationQuestions[currentQuestion];
    const isCorrect = answerIndex === question.correctAnswer;
    setCurrentQuestionResult({
      isCorrect,
      correctAnswer: question.options[question.correctAnswer],
      explanation: question.explanation,
      chapter: question.chapter
    });
    setShowQuestionFeedback(true);
  };

  const handleNextQuestion = () => {
    setShowQuestionFeedback(false);
    setCurrentQuestionResult(null);
    
    if (currentQuestion < certificationQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
      checkCertification();
    }
  };

  const handlePreviousQuestion = () => {
    setShowQuestionFeedback(false);
    setCurrentQuestionResult(null);
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
    setShowQuestionFeedback(false);
    setCurrentQuestionResult(null);
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
    const score = getScorePercentage();
    
    // Save to localStorage for backwards compatibility
    const certificate = {
      title: `${playbookName} Certification`,
      score: score,
      date: new Date().toLocaleDateString(),
      playbookId: playbookId
    };

    const existingCertificates = JSON.parse(localStorage.getItem('user_certificates') || '[]');
    const updatedCertificates = [...existingCertificates.filter((cert: any) => cert.playbookId !== playbookId), certificate];
    localStorage.setItem('user_certificates', JSON.stringify(updatedCertificates));

    // Save to Supabase
    try {
      // For now, we'll use a placeholder user name and department
      // In a real application, this would come from user authentication
      const userName = `User_${Date.now()}`;
      const userDepartment = "Not specified";
      
      const { error } = await supabase
        .from('certification_scores')
        .insert({
          user_name: userName,
          user_department: userDepartment,
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

  const downloadCertificate = () => {
    // Create a simple certificate canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 800;
    canvas.height = 600;

    // Background
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Certificate of Completion', canvas.width / 2, 120);

    // Subtitle
    ctx.font = '24px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`${playbookName} Certification`, canvas.width / 2, 170);

    // Content
    ctx.font = '18px Arial';
    ctx.fillStyle = '#374151';
    ctx.fillText('This certifies that the bearer has successfully completed', canvas.width / 2, 250);
    ctx.fillText(`the ${playbookName}`, canvas.width / 2, 280);
    ctx.fillText(`with a score of ${getScorePercentage()}%`, canvas.width / 2, 310);

    // Date
    ctx.font = '16px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`Issued on: ${new Date().toLocaleDateString()}`, canvas.width / 2, 450);

    // Download
    const link = document.createElement('a');
    link.download = `${playbookId}-certificate.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  // If certification is locked, show progress
  if (!isCertificationUnlocked()) {
    const progress = getCompletionProgress();
    
    return (
      <div className="space-y-6">
        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-orange-500" />
              Certification Exam Locked
            </CardTitle>
            <CardDescription>
              Complete all chapter quizzes to unlock the certification exam.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
          <CardContent className="p-6">
            <div className="text-center space-y-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Certification Progress</h3>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progress.percentage}%` }}
                  ></div>
                </div>
                
                <div className="text-xl font-semibold text-gray-700">
                  {progress.completed} of {progress.total} Chapters Completed
                </div>
                
                <p className="text-gray-600 mt-4">
                  Complete all chapter quizzes with a score of 75% or higher to unlock the certification exam.
                </p>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900">Chapters to Complete:</h4>
                <div className="grid gap-3">
                  {chapters.map(chapter => {
                    const isCompleted = completedQuizzes.includes(chapter.id);
                    return (
                      <div 
                        key={chapter.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        ) : (
                          <BookOpen className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        )}
                        <span className={`font-medium ${isCompleted ? 'text-green-800' : 'text-gray-800'}`}>
                          {chapter.name}
                        </span>
                        <Badge
                          className={`ml-auto ${
                            isCompleted 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {isCompleted ? 'Completed' : 'Pending'}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
            Complete this comprehensive exam covering all chapters to earn your {playbookName} certification. 
            A score of 75% or higher is required to pass.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-6">
          {!quizCompleted ? (
            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm font-medium text-gray-600">
                  Question {currentQuestion + 1} of {certificationQuestions.length}
                </span>
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / certificationQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Chapter Badge */}
              <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                {certificationQuestions[currentQuestion].chapter}
              </Badge>

              {/* Question */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {certificationQuestions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {certificationQuestions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showQuestionFeedback}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-25'
                      } ${showQuestionFeedback ? 'cursor-not-allowed opacity-70' : ''}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-300'
                        }`}>
                          {selectedAnswers[currentQuestion] === index && (
                            <div className="w-full h-full rounded-full bg-white scale-50"></div>
                          )}
                        </div>
                        <span className="text-gray-800">{option}</span>
                      </div>
                    </button>
                  ))}
                </div>
                
                {/* Immediate Feedback */}
                {showQuestionFeedback && currentQuestionResult && (
                  <div className={`mt-4 p-4 rounded-lg border-2 ${
                    currentQuestionResult.isCorrect 
                      ? 'border-green-200 bg-green-50' 
                      : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-start gap-3">
                      {currentQuestionResult.isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div className="flex-1">
                        <p className={`font-medium mb-2 ${
                          currentQuestionResult.isCorrect ? 'text-green-800' : 'text-red-800'
                        }`}>
                          {currentQuestionResult.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                        </p>
                        {!currentQuestionResult.isCorrect && (
                          <p className="text-sm text-gray-700 mb-2">
                            <span className="font-medium">Correct answer:</span> {currentQuestionResult.correctAnswer}
                          </p>
                        )}
                        <p className="text-sm text-gray-600 mb-2">{currentQuestionResult.explanation}</p>
                        <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700">
                          {currentQuestionResult.chapter}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestion === 0}
                  className="border-orange-200 hover:bg-orange-50"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                >
                  {currentQuestion === certificationQuestions.length - 1 ? 'Complete Exam' : 'Next'}
                </Button>
              </div>
            </div>
          ) : (
            /* Results */
            <div className="text-center space-y-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Exam Completed!</h3>
                <div className={`text-4xl font-bold ${getScorePercentage() >= 75 ? 'text-green-600' : 'text-red-600'}`}>
                  {calculateScore()} / {certificationQuestions.length} ({getScorePercentage()}%)
                </div>
                <div className="mt-4">
                  <Badge 
                    className={`text-lg px-4 py-2 ${
                      certificateEarned 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {certificateEarned ? '✅ PASSED' : '❌ FAILED'}
                  </Badge>
                </div>
                <p className="text-gray-600 mt-2">
                  {certificateEarned ? '🎉 Congratulations! You have earned your certification!' : 
                   getScorePercentage() >= 60 ? 'Close! You need 75% to pass. Try again!' : 
                   'Keep studying and try again!'}
                </p>
              </div>

              {/* Detailed Results */}
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-900">Detailed Results</h4>
                {certificationQuestions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <div key={question.id} className="text-left p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 mb-2">{question.question}</p>
                          <div className="space-y-1">
                            <p className="text-sm">
                              <span className="font-medium">Your answer:</span> {question.options[userAnswer]}
                              <span className={`ml-2 font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                              </span>
                            </p>
                            {!isCorrect && (
                              <p className="text-sm text-green-700">
                                <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                              </p>
                            )}
                            <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
                            <Badge variant="outline" className="text-xs bg-orange-100 text-orange-700 mt-2">
                              {question.chapter}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {certificateEarned && (
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Award className="h-8 w-8 text-yellow-500" />
                    <h4 className="text-xl font-bold text-gray-900">Certificate Earned!</h4>
                  </div>
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{playbookName} Certified Professional</p>
                  <Button
                    onClick={downloadCertificate}
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Certificate
                  </Button>
                </div>
              )}

              <Button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Exam
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
