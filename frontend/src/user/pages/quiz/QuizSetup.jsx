import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Settings, Target, Zap, Rocket } from 'lucide-react';

const QuizSetup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [config, setConfig] = React.useState({
    language: 'Python',
    difficulty: 'Easy',
    mode: 'topic',
    topic: 'Variables'
  });

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const topicParam = params.get('topic');
    const diffParam = params.get('difficulty');
    
    if (topicParam || diffParam) {
      setConfig(prev => ({
        ...prev,
        topic: topicParam ? topicParam.charAt(0).toUpperCase() + topicParam.slice(1).toLowerCase() : prev.topic,
        difficulty: diffParam ? diffParam.charAt(0).toUpperCase() + diffParam.slice(1).toLowerCase() : prev.difficulty
      }));
    }
  }, [location.search]);

  const languages = ['Python', 'Java', 'C'];
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const topics = ['Variables', 'Loops', 'Arrays', 'Functions', 'Strings'];

  const startQuiz = () => {
    navigate(`/quiz/run?lang=${config.language}&diff=${config.difficulty}&mode=${config.mode}&topic=${config.topic}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Quiz Configuration</h2>
        <p className="text-gray-500 mt-2">Personalize your test session to match your current level.</p>
      </div>

      <div className="card space-y-8">
        {/* Language Selection */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Select Language</label>
          <div className="grid grid-cols-3 gap-3">
            {languages.map(lang => (
              <button
                key={lang}
                onClick={() => setConfig({ ...config, language: lang })}
                className={`px-4 py-3 rounded-xl border-2 transition-all font-semibold ${
                  config.language === lang 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-gray-100 hover:border-gray-200 text-gray-600'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-3">Select Difficulty</label>
          <div className="grid grid-cols-3 gap-3">
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => setConfig({ ...config, difficulty: diff })}
                className={`px-4 py-3 rounded-xl border-2 transition-all font-semibold ${
                  config.difficulty === diff 
                    ? 'border-blue-600 bg-blue-50 text-blue-600' 
                    : 'border-gray-100 hover:border-gray-200 text-gray-600'
                }`}
              >
                {diff}
              </button>
            ))}
          </div>
        </div>

        {/* Mode Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div 
            onClick={() => setConfig({ ...config, mode: 'topic' })}
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
              config.mode === 'topic' ? 'border-blue-600 bg-blue-50' : 'border-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Target size={20} className={config.mode === 'topic' ? 'text-blue-600' : 'text-gray-400'} />
              <span className={`font-bold ${config.mode === 'topic' ? 'text-blue-600' : 'text-gray-700'}`}>Topic Practice</span>
            </div>
            <p className="text-xs text-gray-500">Focus on one specific topic (5-10 questions).</p>
          </div>
          <div 
            onClick={() => setConfig({ ...config, mode: 'master' })}
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${
              config.mode === 'master' ? 'border-blue-600 bg-blue-50' : 'border-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <Zap size={20} className={config.mode === 'master' ? 'text-blue-600' : 'text-gray-400'} />
              <span className={`font-bold ${config.mode === 'master' ? 'text-blue-600' : 'text-gray-700'}`}>Master Quiz</span>
            </div>
            <p className="text-xs text-gray-500">Random mix from all topics (10 questions).</p>
          </div>
        </div>

        {/* Topic Selection (only if Topic mode) */}
        {config.mode === 'topic' && (
          <div className="animate-in fade-in slide-in-from-top-2">
            <label className="block text-sm font-bold text-gray-700 mb-3">Select Topic</label>
            <select 
              value={config.topic}
              onChange={(e) => setConfig({ ...config, topic: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-600 outline-none transition-all"
            >
              {topics.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        )}

        <button 
          onClick={startQuiz}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-blue-700 transition-all shadow-lg text-lg"
        >
          <Rocket size={24} />
          <span>Launch Quiz</span>
        </button>
      </div>
    </div>
  );
};

export default QuizSetup;
