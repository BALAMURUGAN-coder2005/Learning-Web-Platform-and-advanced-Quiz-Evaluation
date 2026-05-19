import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Zap, Target, Award } from 'lucide-react';

const DifficultySelect = () => {
  const { language, topic } = useParams();
  const navigate = useNavigate();

  const capitalizedLang = language.charAt(0).toUpperCase() + language.slice(1);
  const capitalizedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

  const levels = [
    {
      id: 'easy',
      name: 'Easy',
      desc: 'Simple syntax, basic concepts, and clear examples.',
      icon: <Zap className="text-green-500" size={24} />,
      color: 'green'
    },
    {
      id: 'medium',
      name: 'Medium',
      desc: 'Common patterns, nested logic, and practical applications.',
      icon: <Target className="text-blue-500" size={24} />,
      color: 'blue'
    },
    {
      id: 'hard',
      name: 'Hard',
      desc: 'Advanced optimizations, complex logic, and edge cases.',
      icon: <Award className="text-purple-500" size={24} />,
      color: 'purple'
    }
  ];

  return (
    <div className="pb-20">
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link to="/learn" className="hover:text-blue-600">Learn</Link>
        <ChevronRight size={14} />
        <Link to={`/learn/${language}`} className="hover:text-blue-600">{capitalizedLang}</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-gray-900">{capitalizedTopic}</span>
      </div>

      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Choose Your Level</h1>
        <p className="text-xl text-gray-600">
          Ready to master <span className="text-blue-600 font-bold">{capitalizedTopic}</span>? Select a difficulty to begin your training.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => navigate(`/learn/${language}/${topic}/${level.id}`)}
            className="group relative bg-white border-2 border-transparent hover:border-blue-500 rounded-2xl p-8 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2 text-left flex flex-col items-center text-center"
          >
            <div className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-${level.color}-50 group-hover:scale-110 transition-transform`}>
              {level.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{level.name}</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              {level.desc}
            </p>
            <div className="mt-8 px-6 py-2 bg-gray-100 group-hover:bg-blue-600 group-hover:text-white rounded-lg text-sm font-bold transition-colors">
              Select Level
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelect;
