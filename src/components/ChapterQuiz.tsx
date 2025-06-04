
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, X, RotateCcw, Loader2 } from "lucide-react";
import { quizGenerator, QuizQuestion } from "@/services/quiz-generator";

interface ChapterQuizProps {
  playbookId: string;
  activePhase: string;
  onQuizComplete?: () => void;
}

export const ChapterQuiz = ({ playbookId, activePhase, onQuizComplete }: ChapterQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuizQuestions();
  }, [playbookId, activePhase]);

  const loadQuizQuestions = async () => {
    if (!playbookId || !activePhase || activePhase === "certification") {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      console.log('Generating quiz questions for:', { playbookId, activePhase });
      
      const questions = await quizGenerator.generateQuestionsForChapter(
        playbookId, 
        activePhase, 
        3
      );
      
      console.log('Generated questions:', questions);
      
      if (questions.length === 0) {
        setError("No questions available for this chapter. Please ensure the chapter has process steps or RACI data.");
      } else {
        setCurrentQuestions(questions);
        resetQuiz();
      }
    } catch (err) {
      console.error('Error loading quiz questions:', err);
      setError("Failed to load quiz questions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
      
      // Save completed quiz to localStorage
      const completedQuizzes = JSON.parse(localStorage.getItem('completed_quizzes') || '[]');
      if (!completedQuizzes.includes(activePhase)) {
        completedQuizzes.push(activePhase);
        localStorage.setItem('completed_quizzes', JSON.stringify(completedQuizzes));
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('completedQuizzesUpdated'));
      }
      
      // Call the onQuizComplete callback if provided
      if (onQuizComplete) {
        onQuizComplete();
      }
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

  const handleRetakeQuiz = async () => {
    // Reset used questions and generate new ones
    quizGenerator.resetUsedQuestions();
    await loadQuizQuestions();
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

  if (loading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-8 text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Generating quiz questions from playbook data...</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={loadQuizQuestions} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (currentQuestions.length === 0) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-orange-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">No quiz questions available for this chapter.</p>
          <p className="text-sm text-gray-500 mt-2">Questions are generated from process steps and RACI matrix data.</p>
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
            Test your knowledge with {currentQuestions.length} questions generated from this chapter's content
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
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                    {currentQuestions[currentQuestion]?.source === 'process_steps' ? 'Process Steps' : 'RACI Matrix'}
                  </Badge>
                </div>
                
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
                onClick={handleRetakeQuiz}
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Take New Quiz
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
