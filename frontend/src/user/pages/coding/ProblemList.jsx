import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, Filter, Cpu, Code2 } from 'lucide-react';
import { problemService } from '../../../common/services/api';

const ProblemList = () => {
  const location = useLocation();
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    language: '',
    difficulty: '',
    topic: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const topicParam = params.get('topic');
    const diffParam = params.get('difficulty');
    
    if (topicParam || diffParam) {
      setFilters(prev => ({
        ...prev,
        topic: topicParam ? topicParam.charAt(0).toUpperCase() + topicParam.slice(1).toLowerCase() : prev.topic,
        difficulty: diffParam ? diffParam.charAt(0).toUpperCase() + diffParam.slice(1).toLowerCase() : prev.difficulty
      }));
    }
  }, [location.search]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await problemService.getProblems(filters);
        setProblems(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchProblems();
  }, [filters]);

  const difficultyColor = (diff) => {
    switch (diff) {
      case 'Easy': return 'text-green-600 bg-green-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Hard': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold">Coding Challenges</h2>
          <p className="text-gray-500 mt-1">Practice and improve your coding logic with language-specific problems.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search problems..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 shadow-sm">
            <Filter size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <select 
          onChange={(e) => setFilters({...filters, language: e.target.value})}
          className="bg-white border border-gray-200 p-3 rounded-lg outline-none shadow-sm font-medium"
        >
          <option value="">All Languages</option>
          <option value="Python">Python</option>
          <option value="Java">Java</option>
          <option value="C">C</option>
        </select>
        <select 
          onChange={(e) => setFilters({...filters, difficulty: e.target.value})}
          className="bg-white border border-gray-200 p-3 rounded-lg outline-none shadow-sm font-medium"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select 
          onChange={(e) => setFilters({...filters, topic: e.target.value})}
          className="bg-white border border-gray-200 p-3 rounded-lg outline-none shadow-sm font-medium"
          value={filters.topic}
        >
          <option value="">All Topics</option>
          <option value="Variables">Variables</option>
          <option value="Data Types">Data Types</option>
          <option value="Operators">Operators</option>
          <option value="Conditional Statements">Conditions</option>
          <option value="Loops">Loops</option>
          <option value="Functions">Functions</option>
          <option value="Lists">Lists</option>
          <option value="Strings">Strings</option>
          <option value="Dictionaries">Dictionaries</option>
          <option value="Tuples">Tuples</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20">Loading problems...</div>
      ) : (
        <div className="card overflow-hidden p-0">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Topic</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Lang</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {problems.map((problem) => (
                <tr key={problem._id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-200 flex items-center justify-center"></div>
                  </td>
                  <td className="px-6 py-4 font-bold text-gray-900">{problem.title}</td>
                  <td className="px-6 py-4 text-gray-600">{problem.topic}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${difficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center space-x-1 text-gray-500">
                      <Code2 size={14} />
                      <span className="text-sm">{problem.language}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      to={`/coding/${problem._id}`}
                      className="inline-block px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold group-hover:bg-blue-600 group-hover:text-white transition-all text-sm"
                    >
                      Solve
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!problems.length && (
            <div className="p-10 text-center text-gray-500">No problems match your filters.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProblemList;
