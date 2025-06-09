
interface QuizQuestionProps {
  question: string;
  options: string[];
  selectedAnswer?: number;
  onAnswerSelect: (answerIndex: number) => void;
  playbookType?: string;
}

export const QuizQuestion = ({ question, options, selectedAnswer, onAnswerSelect, playbookType = "solar" }: QuizQuestionProps) => {
  const isWindPlaybook = playbookType.toLowerCase().includes('wind');
  
  const selectedClass = isWindPlaybook 
    ? 'border-blue-500 bg-blue-50' 
    : 'border-orange-500 bg-orange-50';
  
  const hoverClass = isWindPlaybook 
    ? 'hover:border-blue-300 hover:bg-blue-25' 
    : 'hover:border-orange-300 hover:bg-orange-25';
  
  const radioSelectedClass = isWindPlaybook 
    ? 'border-blue-500 bg-blue-500' 
    : 'border-orange-500 bg-orange-500';

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {question}
      </h3>
      
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedAnswer === index
                ? selectedClass
                : `border-gray-200 bg-white ${hoverClass}`
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedAnswer === index
                  ? radioSelectedClass
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === index && (
                  <div className="w-full h-full rounded-full bg-white scale-50"></div>
                )}
              </div>
              <span className="text-gray-800">{option}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
