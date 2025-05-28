
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, X, RotateCcw } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface ChapterQuizProps {
  activePhase: string;
}

export const ChapterQuiz = ({ activePhase }: ChapterQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);

  // Question pools for each chapter
  const questionPools: { [key: string]: QuizQuestion[] } = {
    "chapter-1": [
      {
        id: 1,
        question: "What is the main purpose of cost estimation in PPA bids?",
        options: [
          "To ensure competitive pricing for project bids",
          "To maximize company profits only",
          "To reduce project timeline",
          "To eliminate competition"
        ],
        correctAnswer: 0,
        explanation: "Cost estimation ensures competitive and accurate pricing to win contracts while maintaining profitability."
      },
      {
        id: 2,
        question: "Which factors are most important in PPA cost estimation?",
        options: [
          "Only material costs",
          "Labor, materials, equipment, and overheads",
          "Only equipment costs",
          "Only overhead costs"
        ],
        correctAnswer: 1,
        explanation: "Comprehensive cost estimation includes all project components: labor, materials, equipment, and overhead costs."
      },
      {
        id: 3,
        question: "How often should cost estimates be updated during bidding?",
        options: [
          "Never after initial calculation",
          "Only at project completion",
          "Regularly as market conditions change",
          "Only when requested by client"
        ],
        correctAnswer: 2,
        explanation: "Cost estimates should be updated regularly to reflect current market conditions and ensure accuracy."
      },
      {
        id: 4,
        question: "What is the typical contingency percentage in wind project estimates?",
        options: [
          "1-2%",
          "5-15%",
          "25-30%",
          "50%"
        ],
        correctAnswer: 1,
        explanation: "Industry standard contingency for wind projects typically ranges from 5-15% depending on project complexity."
      },
      {
        id: 5,
        question: "Which document is essential for accurate cost estimation?",
        options: [
          "Company brochure",
          "Project specifications and requirements",
          "Previous year's budget",
          "Marketing materials"
        ],
        correctAnswer: 1,
        explanation: "Project specifications and requirements are crucial for accurate cost estimation as they define the scope of work."
      }
    ],
    "chapter-2": [
      {
        id: 1,
        question: "What is vendor empanelment?",
        options: [
          "Firing vendors",
          "Process of selecting and approving vendors",
          "Paying vendors",
          "Training vendors"
        ],
        correctAnswer: 1,
        explanation: "Vendor empanelment is the systematic process of evaluating, selecting, and approving vendors for business partnerships."
      },
      {
        id: 2,
        question: "Which criteria is most important for vendor selection?",
        options: [
          "Lowest price only",
          "Technical capability and financial stability",
          "Company size only",
          "Location proximity only"
        ],
        correctAnswer: 1,
        explanation: "Technical capability and financial stability are crucial for ensuring reliable vendor performance."
      },
      {
        id: 3,
        question: "How often should vendor performance be reviewed?",
        options: [
          "Never",
          "Once a year",
          "Regularly throughout the project",
          "Only at project end"
        ],
        correctAnswer: 2,
        explanation: "Regular vendor performance reviews ensure quality standards are maintained throughout the project lifecycle."
      },
      {
        id: 4,
        question: "What documentation is required for vendor empanelment?",
        options: [
          "Business registration and certificates only",
          "Complete compliance and capability documents",
          "Bank statements only",
          "Reference letters only"
        ],
        correctAnswer: 1,
        explanation: "Comprehensive documentation including compliance, capability, and financial documents is required for proper vendor assessment."
      },
      {
        id: 5,
        question: "Who typically approves vendor empanelment decisions?",
        options: [
          "Project manager only",
          "Procurement committee or senior management",
          "Financial team only",
          "Technical team only"
        ],
        correctAnswer: 1,
        explanation: "Vendor empanelment decisions typically require approval from a procurement committee or senior management for accountability."
      }
    ]
  };

  useEffect(() => {
    // Select 3 random questions for the current chapter
    const chapterQuestions = questionPools[activePhase] || questionPools["chapter-1"];
    const shuffled = [...chapterQuestions].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 3));
    resetQuiz();
  }, [activePhase]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
      setShowResults(true);
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
    // Shuffle questions again
    const chapterQuestions = questionPools[activePhase] || questionPools["chapter-1"];
    const shuffled = [...chapterQuestions].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 3));
  };

  const calculateScore = () => {
    let correct = 0;
    currentQuestions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (!activePhase || activePhase === "certification") {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Please select a chapter to view quiz.</p>
        </CardContent>
      </Card>
    );
  }

  if (currentQuestions.length === 0) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Loading quiz questions...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-orange-500" />
            Chapter Quiz - {activePhase}
          </CardTitle>
          <CardDescription>
            Test your knowledge with 3 questions from this chapter
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
                  Question {currentQuestion + 1} of {currentQuestions.length}
                </span>
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {currentQuestions[currentQuestion]?.question}
                </h3>
                
                <div className="space-y-3">
                  {currentQuestions[currentQuestion]?.options.map((option, index) => (
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
                  {currentQuestion === currentQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
                </Button>
              </div>
            </div>
          ) : (
            /* Results */
            <div className="text-center space-y-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
                <div className={`text-4xl font-bold ${getScoreColor(calculateScore(), currentQuestions.length)}`}>
                  {calculateScore()} / {currentQuestions.length}
                </div>
                <p className="text-gray-600 mt-2">
                  {calculateScore() === currentQuestions.length ? 'Perfect score! 🎉' : 
                   calculateScore() >= currentQuestions.length * 0.67 ? 'Great job! 👏' :
                   'Keep studying! 📚'}
                </p>
              </div>

              {/* Detailed Results */}
              <div className="space-y-4 mb-6">
                {currentQuestions.map((question, index) => {
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
                            </p>
                            {!isCorrect && (
                              <p className="text-sm">
                                <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                              </p>
                            )}
                            <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Take Quiz Again
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
