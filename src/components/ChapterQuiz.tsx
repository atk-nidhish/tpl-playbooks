
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, X, RotateCcw, Lock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  sourceStep: string;
  sourceChapter: string;
}

interface RACIData {
  id: string;
  step_id: string;
  task: string;
  responsible: string;
  accountable: string;
  consulted: string;
  informed: string;
}

interface ChapterQuizProps {
  activePhase: string;
  onQuizComplete?: () => void;
}

export const ChapterQuiz = ({ activePhase, onQuizComplete }: ChapterQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [raciData, setRaciData] = useState<RACIData[]>([]);
  const [quizPassed, setQuizPassed] = useState(false);
  const [completedQuizzes, setCompletedQuizzes] = useState<string[]>([]);

  useEffect(() => {
    // Load completed quizzes from localStorage
    const saved = localStorage.getItem('wind_planning_completed_quizzes');
    if (saved) {
      setCompletedQuizzes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (activePhase) {
      fetchRACIDataAndGenerateQuestions();
    }
  }, [activePhase]);

  const fetchRACIDataAndGenerateQuestions = async () => {
    setLoading(true);
    try {
      console.log(`Fetching RACI data for phase: ${activePhase}`);
      
      const { data, error } = await supabase
        .from('raci_matrix')
        .select('*')
        .eq('phase_id', activePhase)
        .order('step_id', { ascending: true });

      if (error) {
        console.error('Error fetching RACI data:', error);
        throw error;
      }

      console.log(`Found ${data?.length || 0} RACI entries:`, data);
      setRaciData(data || []);
      
      if (data && data.length > 0) {
        const questions = generateQuestionsFromRaci(data);
        setCurrentQuestions(questions);
      } else {
        setCurrentQuestions([]);
      }
    } catch (error) {
      console.error('Error fetching RACI data:', error);
      setCurrentQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const generateQuestionsFromRaci = (raciData: RACIData[]): QuizQuestion[] => {
    const questions: QuizQuestion[] = [];
    const usedTasks = new Set<string>();

    // Filter out Start and End steps for question generation
    const validSteps = raciData.filter(item => 
      item.step_id !== "S" && 
      item.step_id !== "E" && 
      item.task && 
      (item.responsible || item.accountable)
    );

    // Generate responsibility questions
    validSteps.forEach((item, index) => {
      if (usedTasks.has(item.task) || questions.length >= 5) return;
      
      const roles = [];
      if (item.responsible) roles.push({ role: item.responsible, type: 'Responsible' });
      if (item.accountable) roles.push({ role: item.accountable, type: 'Accountable' });
      if (item.consulted) roles.push({ role: item.consulted, type: 'Consulted' });
      if (item.informed) roles.push({ role: item.informed, type: 'Informed' });

      if (roles.length > 0) {
        const correctRole = roles[0];
        const otherRoles = validSteps
          .filter(other => other.id !== item.id)
          .flatMap(other => [other.responsible, other.accountable, other.consulted, other.informed])
          .filter(role => role && role !== correctRole.role)
          .slice(0, 2);

        const options = [correctRole.role, ...otherRoles, "None of the above"]
          .filter((role, idx, arr) => role && arr.indexOf(role) === idx)
          .slice(0, 4);

        if (options.length >= 3) {
          // Shuffle options
          const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
          const correctIndex = shuffledOptions.indexOf(correctRole.role);

          questions.push({
            id: `${item.id}-responsibility`,
            question: `Who is ${correctRole.type.toLowerCase()} for: "${item.task}"?`,
            options: shuffledOptions,
            correctAnswer: correctIndex,
            explanation: `${correctRole.role} is ${correctRole.type.toLowerCase()} for this task as defined in the RACI matrix.`,
            sourceStep: item.step_id,
            sourceChapter: activePhase
          });

          usedTasks.add(item.task);
        }
      }
    });

    // Generate sequence questions (which step comes before what)
    if (validSteps.length > 1 && questions.length < 5) {
      for (let i = 0; i < validSteps.length - 1 && questions.length < 5; i++) {
        const currentStep = validSteps[i];
        const nextStep = validSteps[i + 1];
        
        if (currentStep && nextStep) {
          const wrongOptions = validSteps
            .filter(step => step.step_id !== nextStep.step_id && step.step_id !== currentStep.step_id)
            .slice(0, 2)
            .map(step => `Step ${step.step_id}: ${step.task.substring(0, 50)}...`);

          const options = [
            `Step ${nextStep.step_id}: ${nextStep.task.substring(0, 50)}...`,
            ...wrongOptions,
            "No specific next step"
          ].slice(0, 4);

          // Shuffle options
          const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
          const correctIndex = shuffledOptions.indexOf(`Step ${nextStep.step_id}: ${nextStep.task.substring(0, 50)}...`);

          questions.push({
            id: `${currentStep.id}-sequence`,
            question: `What typically follows after "${currentStep.task}"?`,
            options: shuffledOptions,
            correctAnswer: correctIndex,
            explanation: `Step ${nextStep.step_id} follows Step ${currentStep.step_id} in the process sequence.`,
            sourceStep: currentStep.step_id,
            sourceChapter: activePhase
          });
        }
      }
    }

    // Limit to 3-5 questions and shuffle
    return questions.slice(0, Math.min(5, Math.max(3, questions.length)))
      .sort(() => Math.random() - 0.5);
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
      checkQuizPassed();
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
    setQuizPassed(false);
    // Regenerate questions
    if (raciData.length > 0) {
      const questions = generateQuestionsFromRaci(raciData);
      setCurrentQuestions(questions);
    }
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

  const getScorePercentage = () => {
    return Math.round((calculateScore() / currentQuestions.length) * 100);
  };

  const checkQuizPassed = () => {
    const percentage = getScorePercentage();
    const passed = percentage >= 75;
    setQuizPassed(passed);
    
    if (passed) {
      // Save completed quiz to localStorage
      const updatedCompleted = [...completedQuizzes];
      if (!updatedCompleted.includes(activePhase)) {
        updatedCompleted.push(activePhase);
        setCompletedQuizzes(updatedCompleted);
        localStorage.setItem('wind_planning_completed_quizzes', JSON.stringify(updatedCompleted));
        
        // Dispatch custom event to notify other components
        window.dispatchEvent(new CustomEvent('completedQuizzesUpdated'));
      }
      
      // Call the onQuizComplete callback if provided
      if (onQuizComplete) {
        onQuizComplete();
      }
    }
  };

  const getScoreColor = (score: number, total: number) => {
    const percentage = (score / total) * 100;
    if (percentage >= 75) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Loading quiz questions...</p>
        </CardContent>
      </Card>
    );
  }

  if (!activePhase || activePhase === "certification" || activePhase === "leaderboard") {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">Please select a chapter to view quiz.</p>
        </CardContent>
      </Card>
    );
  }

  if (currentQuestions.length === 0) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
        <CardContent className="p-8 text-center">
          <p className="text-gray-600">
            No quiz questions available for this chapter. RACI data may not be loaded yet.
          </p>
          <Button 
            onClick={fetchRACIDataAndGenerateQuestions}
            className="mt-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
          >
            Retry Loading Questions
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-500" />
            Chapter Quiz - {activePhase}
          </CardTitle>
          <CardDescription>
            Test your knowledge with {currentQuestions.length} questions from this chapter's RACI matrix. 
            You need 75% to pass.
          </CardDescription>
        </CardHeader>
      </Card>

      <Card className="bg-white/90 backdrop-blur-sm border-blue-200">
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
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-300"
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
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded-full border-2 ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-blue-500 bg-blue-500'
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
                  className="border-blue-200 hover:bg-blue-50"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswers[currentQuestion] === undefined}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
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
                  {calculateScore()} / {currentQuestions.length} ({getScorePercentage()}%)
                </div>
                <div className="mt-4">
                  <Badge 
                    className={`text-lg px-4 py-2 ${
                      quizPassed 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {quizPassed ? '✅ PASSED' : '❌ FAILED'}
                  </Badge>
                </div>
                <p className="text-gray-600 mt-2">
                  {quizPassed 
                    ? 'Congratulations! You can proceed to the next chapter.' 
                    : 'You need 75% to pass. Please retake the quiz to continue.'}
                </p>
              </div>

              {/* Detailed Results */}
              <div className="space-y-4 mb-6">
                <h4 className="text-lg font-semibold text-gray-900">Detailed Results</h4>
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
                              <p className="text-sm text-green-700">
                                <span className="font-medium">Correct answer:</span> {question.options[question.correctAnswer]}
                              </p>
                            )}
                            <p className="text-sm text-gray-600 mt-2">{question.explanation}</p>
                            <div className="flex gap-2 mt-2">
                              <Badge variant="outline" className="text-xs bg-blue-100 text-blue-700">
                                Step {question.sourceStep}
                              </Badge>
                              <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700">
                                {question.sourceChapter}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <Button
                onClick={resetQuiz}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
