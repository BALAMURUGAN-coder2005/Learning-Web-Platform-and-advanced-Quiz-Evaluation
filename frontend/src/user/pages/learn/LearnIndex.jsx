import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Coffee, Code, FileJson, Braces } from 'lucide-react';

const LearnIndex = () => {
  const languages = [
    {
      name: 'Python',
      icon: <Terminal className="text-yellow-500" size={40} />,
      desc: 'Great for beginners. Simple and powerful.',
      color: 'hover:border-yellow-400'
    },
    {
      name: 'Java',
      icon: <Coffee className="text-red-500" size={40} />,
      desc: 'Robust and widely used in industry.',
      color: 'hover:border-red-400'
    },
    {
      name: 'C++',
      icon: <Braces className="text-blue-600" size={40} />,
      desc: 'High performance and system level control.',
      color: 'hover:border-blue-600'
    },
    {
      name: 'Javascript',
      icon: <FileJson className="text-yellow-400" size={40} />,
      desc: 'The language of the web.',
      color: 'hover:border-yellow-300'
    },
    {
      name: 'C',
      icon: <Code className="text-blue-500" size={40} />,
      desc: 'The mother of all languages. Understand memory.',
      color: 'hover:border-blue-400'
    }
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-2">Master Your Language</h2>
      <p className="text-gray-500 mb-8">Choose a language and start your journey from basics to advanced topics.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {languages.map((lang) => (
          <Link
            key={lang.name}
            to={`/learn/${lang.name.toLowerCase()}`}
            className={`card flex flex-col items-center text-center p-8 border-2 border-transparent ${lang.color}`}
          >
            <div className="mb-4">{lang.icon}</div>
            <h3 className="text-xl font-bold mb-2">{lang.name}</h3>
            <p className="text-gray-600 text-sm">{lang.desc}</p>
            <div className="mt-6 font-semibold text-blue-600">Start Learning &rarr;</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LearnIndex;
