
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Award, Brain, CheckCircle, X, RotateCcw, Download, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  const certificationQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "What is the primary objective of project initiation in solar planning?",
      options: [
        "To define project scope and objectives",
        "To start construction immediately",
        "To finalize procurement contracts",
        "To complete commissioning activities"
      ],
      correctAnswer: 0,
      chapter: "Chapter 1"
    },
    {
      id: 2,
      question: "Which phase involves developing the land acquisition and site preparation strategy?",
      options: [
        "Project Initiation",
        "Land Plan",
        "Engineering Plan",
        "Construction Plan"
      ],
      correctAnswer: 1,
      chapter: "Chapter 1"
    },
    {
      id: 3,
      question: "What is the key focus of the engineering plan in solar projects?",
      options: [
        "Financial planning",
        "Technical design and specifications",
        "Resource allocation",
        "Risk assessment only"
      ],
      correctAnswer: 1,
      chapter: "Chapter 1"
    },
    {
      id: 4,
      question: "Which component is essential in the procurement plan?",
      options: [
        "Site survey only",
        "Vendor selection and contract management",
        "Construction scheduling",
        "Commissioning procedures"
      ],
      correctAnswer: 1,
      chapter: "Chapter 1"
    },
    {
      id: 5,
      question: "What is the primary purpose of the commissioning plan?",
      options: [
        "To start construction",
        "To ensure system performance and handover",
        "To acquire land",
        "To design the system"
      ],
      correctAnswer: 1,
      chapter: "Chapter 1"
    },
    {
      id: 6,
      question: "Why is plan integration crucial in solar project planning?",
      options: [
        "To reduce costs only",
        "To coordinate all project elements and ensure alignment",
        "To speed up construction",
        "To simplify documentation"
      ],
      correctAnswer: 1,
      chapter: "Chapter 1"
    },
    {
      id: 7,
      question: "What is the significance of scope management in solar projects?",
      options: [
        "Controlling project boundaries and deliverables",
        "Managing only financial aspects",
        "Handling construction activities",
        "Focusing on technical design only"
      ],
      correctAnswer: 0,
      chapter: "Chapter 2"
    },
    {
      id: 8,
      question: "How should cost management be approached in solar projects?",
      options: [
        "Focus only on initial costs",
        "Consider lifecycle costs and value optimization",
        "Minimize all expenses regardless of quality",
        "Ignore maintenance costs"
      ],
      correctAnswer: 1,
      chapter: "Chapter 3"
    }
  ];

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
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswers[currentQuestion] === index
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 bg-white hover:border-orange-300 hover:bg-orange-25'
                      }`}
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
                  {getScorePercentage()}%
                </div>
                <p className="text-gray-600 mt-2">
                  {certificateEarned ? '🎉 Congratulations! You have earned your certification!' : 
                   getScorePercentage() >= 60 ? 'Close! You need 75% to pass. Try again!' : 
                   'Keep studying and try again!'}
                </p>
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
