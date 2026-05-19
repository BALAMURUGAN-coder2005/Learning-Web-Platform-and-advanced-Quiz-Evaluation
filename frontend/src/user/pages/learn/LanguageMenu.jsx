import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Target } from 'lucide-react';

const LanguageMenu = () => {
  const { language } = useParams();
  const topics = ['Variables', 'Loops', 'Arrays', 'Functions', 'Strings'];

  const capitalizedLang = language.charAt(0).toUpperCase() + language.slice(1);

  return (
    <div>
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <Link to="/learn" className="hover:text-blue-600">Learn</Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-gray-900">{capitalizedLang}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">{capitalizedLang} Roadmap</h2>
          <p className="text-gray-600 mb-8">Follow this structured path to master {capitalizedLang}. Each topic builds on the previous one.</p>

          <div className="space-y-4">
            {topics.map((topic, index) => (
              <Link
                key={topic}
                to={`/learn/${language}/${topic.toLowerCase()}/select-difficulty`}
                className="card flex items-center justify-between group hover:border-blue-300"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{topic}</h3>
                    <p className="text-sm text-gray-500">Master the fundamentals of {topic.toLowerCase()}.</p>
                  </div>
                </div>
                <div className="p-2 rounded-full bg-gray-50 group-hover:bg-blue-50 text-gray-400 group-hover:text-blue-600 transition-colors">
                  <ChevronRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="w-full md:w-80">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-2 text-blue-600 mb-4">
              <Target size={20} />
              <h3 className="font-bold">Module Goals</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-0.5 mt-0.5">✓</span>
                <span>Understand basic syntax</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Solve 5 coding problems</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Pass the Master Quiz</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageMenu;
