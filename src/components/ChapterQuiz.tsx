
import { useState } from "react";
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

  // Sample quiz questions - in a real app, these would come from your database
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      question: "What is the primary purpose of cost estimation in PPA bid submission?",
      options: [
        "To maximize profit margins",
        "To provide competitive and accurate pricing for project bids",
        "To reduce project scope",
        "To delay project timelines"
      ],
      correctAnswer: 1,
      explanation: "Cost estimation in PPA bid submission ensures competitive and accurate pricing to win contracts while maintaining profitability."
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
      explanation: "Senior Management is typically accountable for strategic vendor empanelment decisions as they impact long-term business relationships."
    },
    {
      id: 3,
      question: "What is the key difference between project-specific and framework agreements?",
      options: [
        "Project-specific agreements are more expensive",
        "Framework agreements cover multiple projects over time",
        "Project-specific agreements require more documentation",
        "Framework agreements are always preferred"
      ],
      correctAnswer: 1,
      explanation: "Framework agreements establish terms for multiple projects over a period, while project-specific agreements are tailored for individual projects."
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
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
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestions.forEach((question, index) => {
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

  if (!activePhase) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Please select a chapter to view quiz.</p>
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
            Test your knowledge of the processes and concepts covered in this chapter
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
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <div className="w-64 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {quizQuestions[currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
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
                  {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next'}
                </Button>
              </div>
            </div>
          ) : (
            /* Results */
            <div className="text-center space-y-6">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Completed!</h3>
                <div className={`text-4xl font-bold ${getScoreColor(calculateScore(), quizQuestions.length)}`}>
                  {calculateScore()} / {quizQuestions.length}
                </div>
                <p className="text-gray-600 mt-2">
                  {calculateScore() === quizQuestions.length ? 'Perfect score! 🎉' : 
                   calculateScore() >= quizQuestions.length * 0.8 ? 'Great job! 👏' :
                   calculateScore() >= quizQuestions.length * 0.6 ? 'Good effort! 👍' : 'Keep studying! 📚'}
                </p>
              </div>

              {/* Detailed Results */}
              <div className="space-y-4 mb-6">
                {quizQuestions.map((question, index) => {
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
