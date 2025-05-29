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

export const PlaybookCertification = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [certificateEarned, setCertificateEarned] = useState(false);

  const certificationQuestions: CertificationQuestion[] = [
    {
      id: 1,
      question: "What is the primary goal of cost estimation in PPA bid submissions?",
      options: [
        "To ensure competitive and accurate pricing",
        "To maximize profit margins only",
        "To reduce project scope",
        "To delay project timelines"
      ],
      correctAnswer: 0,
      chapter: "Chapter 1"
    },
    {
      id: 2,
      question: "Which stakeholder is typically accountable for vendor empanelment decisions?",
      options: [
        "Project Manager",
        "Procurement Team",
        "Senior Management",
        "Legal Department"
      ],
      correctAnswer: 2,
      chapter: "Chapter 2"
    },
    {
      id: 3,
      question: "What distinguishes project-specific agreements from framework agreements?",
      options: [
        "Project-specific are more expensive",
        "Framework agreements cover multiple projects",
        "Project-specific require more documentation",
        "Framework agreements are always preferred"
      ],
      correctAnswer: 1,
      chapter: "Chapter 3"
    },
    {
      id: 4,
      question: "What is the key benefit of proper contractor management?",
      options: [
        "Reduced costs only",
        "Better project outcomes and risk mitigation",
        "Faster project completion",
        "Simplified documentation"
      ],
      correctAnswer: 1,
      chapter: "Chapter 4"
    },
    {
      id: 5,
      question: "How should cost estimates be maintained throughout the bidding process?",
      options: [
        "Never updated after initial calculation",
        "Updated only at project completion",
        "Regularly updated as conditions change",
        "Updated only when client requests"
      ],
      correctAnswer: 2,
      chapter: "Chapter 1"
    },
    {
      id: 6,
      question: "What is essential for effective vendor performance evaluation?",
      options: [
        "Price comparison only",
        "Regular monitoring and feedback",
        "Annual reviews only",
        "Technical specifications only"
      ],
      correctAnswer: 1,
      chapter: "Chapter 2"
    },
    {
      id: 7,
      question: "What is the most critical factor in contract award decisions?",
      options: [
        "Lowest bid price",
        "Balance of price, quality, and capability",
        "Vendor location",
        "Previous relationship"
      ],
      correctAnswer: 1,
      chapter: "Chapter 3"
    },
    {
      id: 8,
      question: "How should scope changes be handled in contractor management?",
      options: [
        "Automatically approved",
        "Through formal change control process",
        "Rejected by default",
        "Handled informally"
      ],
      correctAnswer: 1,
      chapter: "Chapter 4"
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
      title: "Wind C&P Playbook Certification",
      score: score,
      date: new Date().toLocaleDateString(),
      playbookId: "wind-cp"
    };

    const existingCertificates = JSON.parse(localStorage.getItem('user_certificates') || '[]');
    const updatedCertificates = [...existingCertificates.filter((cert: any) => cert.playbookId !== 'wind-cp'), certificate];
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
          playbook_name: "Wind C&P Playbook Certification",
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
    ctx.fillText('Wind C&P Playbook Certification', canvas.width / 2, 170);

    // Content
    ctx.font = '18px Arial';
    ctx.fillStyle = '#374151';
    ctx.fillText('This certifies that the bearer has successfully completed', canvas.width / 2, 250);
    ctx.fillText('the Wind Contracting & Procurement Playbook', canvas.width / 2, 280);
    ctx.fillText(`with a score of ${getScorePercentage()}%`, canvas.width / 2, 310);

    // Date
    ctx.font = '16px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText(`Issued on: ${new Date().toLocaleDateString()}`, canvas.width / 2, 450);

    // Download
    const link = document.createElement('a');
    link.download = 'wind-cp-certificate.png';
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
            Complete this comprehensive exam covering all chapters to earn your Wind C&P Playbook certification. 
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
                  <p className="text-gray-700 mb-4">Wind C&P Playbook Certified Professional</p>
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
