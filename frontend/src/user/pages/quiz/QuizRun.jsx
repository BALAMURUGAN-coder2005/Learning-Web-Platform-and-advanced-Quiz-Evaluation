import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Timer, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { quizService, submissionService } from '../../../common/services/api';
import { useAuth } from '../../../common/context/AuthContext';

const QuizRun = () => {
  const { user: authUser } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const lang = searchParams.get('lang');
  const diff = searchParams.get('diff');
  const mode = searchParams.get('mode');
  const topic = searchParams.get('topic');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await quizService.getQuizzes({
          language: lang,
          difficulty: diff,
          topic: mode === 'topic' ? topic : undefined,
          type: mode
        });
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [lang, diff, mode, topic]);

  const handleAction = async () => {
    if (!showFeedback) {
      // Step 1: Check Answer
      const correct = selectedOption === questions[currentIndex].correctAnswer;
      setIsCorrect(correct);
      setShowFeedback(true);
      if (correct) {
        setScore(prev => prev + 10);
      }
    } else {
      // Step 2: Move to Next
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setIsFinished(true);
        try {
          const finalScore = isCorrect ? score : score; 
          await submissionService.createSubmission({
            userId: authUser.id,
            type: 'quiz',
            topic: mode === 'topic' ? topic : 'Mixed',
            difficulty: diff,
            score: score, 
            correctAnswers: Math.floor(score / 10),
            language: lang
          });
        } catch (err) {
          console.error('Submission failed', err);
        }
      }
    }
  };

  if (loading) return <div className="text-center p-20">Loading Quiz...</div>;
  if (!questions.length) return <div className="text-center p-20">No questions found for this configuration.</div>;

  if (isFinished) {
    return (
      <div className="max-w-xl mx-auto text-center py-20">
        <div className="card">
          <CheckCircle2 className="mx-auto text-green-500 mb-6" size={64} />
          <h2 className="text-4xl font-bold mb-2">Quiz Completed!</h2>
          <p className="text-gray-500 mb-8">Great job finishing the {mode === 'master' ? 'Master Quiz' : `${topic} Practice`}.</p>
          
          <div className="bg-gray-50 rounded-2xl p-8 mb-8">
            <p className="text-sm text-gray-400 uppercase font-bold tracking-widest mb-1">Your Score</p>
            <p className="text-6xl font-black text-blue-600">{score}%</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200 transition-all"
            >
              Back to Dashboard
            </button>
            <button 
              onClick={() => navigate('/learn')}
              className="px-6 py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg"
            >
              Continue Learning
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{mode === 'master' ? 'Master Quiz' : topic}</h2>
          <p className="text-sm text-gray-500">{lang} • {diff}</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
            <Timer className="text-blue-500" size={18} />
            <span className="font-mono font-bold">Question {currentIndex + 1}/{questions.length}</span>
          </div>
        </div>
      </div>

      <div className="card min-h-[400px] flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8 leading-snug">
            {currentQ.question}
          </h3>

          <div className="space-y-4">
            {currentQ.options.map((option, i) => {
              let variant = 'default';
              if (showFeedback) {
                if (option === currentQ.correctAnswer) variant = 'correct';
                else if (selectedOption === option && !isCorrect) variant = 'wrong';
              }

              return (
                <label 
                  key={i}
                  className={`block p-5 rounded-xl border-2 transition-all ${
                    showFeedback ? 'cursor-default' : 'cursor-pointer'
                  } ${
                    variant === 'correct' 
                      ? 'border-green-500 bg-green-50' 
                      : variant === 'wrong'
                      ? 'border-red-500 bg-red-50'
                      : selectedOption === option 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <input 
                      type="radio" 
                      name="quiz-option" 
                      className="w-5 h-5 text-blue-600"
                      checked={selectedOption === option}
                      onChange={() => !showFeedback && setSelectedOption(option)}
                      disabled={showFeedback}
                    />
                    <span className={`text-lg ${
                      variant === 'correct' ? 'text-green-700 font-bold' :
                      variant === 'wrong' ? 'text-red-700 font-bold' :
                      selectedOption === option ? 'text-blue-700 font-medium' : 'text-gray-700'
                    }`}>
                      {option}
                      {variant === 'correct' && <span className="ml-2 text-sm font-normal">(Correct Answer)</span>}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>

          {showFeedback && (
            <div className={`mt-8 p-6 rounded-xl border ${isCorrect ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'} animate-in fade-in slide-in-from-top-4`}>
              <div className="flex items-start space-x-3">
                {isCorrect ? (
                  <CheckCircle2 className="text-green-600 mt-1 shrink-0" size={20} />
                ) : (
                  <AlertCircle className="text-red-600 mt-1 shrink-0" size={20} />
                )}
                <div>
                  <p className={`font-bold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                    {isCorrect ? 'Excellent! Correct Answer.' : 'Not quite. Here is the correct logic:'}
                  </p>
                  {currentQ.explanation && (
                    <p className={`mt-2 leading-relaxed ${isCorrect ? 'text-green-700' : 'text-gray-700'}`}>
                      {isCorrect ? currentQ.explanation : (
                        <>
                          <span className="font-bold text-red-600 block mb-1">
                            Why your answer was incorrect:
                          </span>
                          {currentQ.wrongExplanations?.[selectedOption] || "This is not the correct approach for this problem."}
                          <span className="font-bold text-gray-800 block mt-3 mb-1">
                            Correct Explanation:
                          </span>
                          {currentQ.explanation}
                        </>
                      )}
                    </p>
                  )}
                  {(currentQ.resource || currentQ.source) && (
                    <div className="mt-4 flex flex-col space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-tight">Resource:</span>
                        <button 
                          onClick={() => navigate(`/learn?topic=${currentQ.topic.toLowerCase()}`)}
                          className="text-blue-600 text-sm font-bold hover:underline flex items-center"
                        >
                          {currentQ.resource || 'Back to Lesson'}
                          <ArrowRight size={14} className="ml-1" />
                        </button>
                      </div>
                      {currentQ.source && (
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-bold text-gray-500 uppercase tracking-tight">External:</span>
                          <a 
                            href={currentQ.source} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-indigo-600 text-sm font-bold hover:underline flex items-center"
                          >
                            Learn on W3Schools
                            <ArrowRight size={14} className="ml-1" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-end">
          <button 
            disabled={!selectedOption}
            onClick={handleAction}
            className={`px-8 py-4 rounded-xl font-bold flex items-center space-x-3 transition-all ${
              selectedOption 
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>
              {!showFeedback 
                ? 'Check Answer' 
                : (currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question')}
            </span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizRun;
