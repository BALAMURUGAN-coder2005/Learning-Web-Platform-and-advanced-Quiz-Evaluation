import React, { useState, useEffect } from 'react';
import { adminService, quizService } from '../../common/services/api';
import { Plus, Edit2, Trash2, Filter, Search, ListChecks } from 'lucide-react';
import QuizModal from '../components/QuizModal';

const AdminQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    setLoading(true);
    try {
      const response = await quizService.getQuizzes();
      setQuizzes(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCurrentQuiz(null);
    setIsModalOpen(true);
  };

  const handleEdit = (quiz) => {
    setCurrentQuiz(quiz);
    setIsModalOpen(true);
  };

  const handleSave = async (quizData) => {
    try {
      if (currentQuiz) {
        await adminService.updateQuiz(currentQuiz._id, quizData);
      } else {
        await adminService.createQuiz(quizData);
      }
      setIsModalOpen(false);
      fetchQuizzes();
    } catch (err) {
      alert('Failed to save quiz. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await adminService.deleteQuiz(id);
      fetchQuizzes();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Manage Quizzes</h2>
          <p className="text-gray-500 mt-1">Configure study questions and technical assessments.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="btn-primary flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 px-6 py-3 rounded-xl transition-all font-bold text-white"
        >
          <Plus size={20} />
          <span>New Quiz</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search questions..." className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 w-64 shadow-sm" />
            </div>
            <select className="px-4 py-2 text-sm border border-gray-200 rounded-lg outline-none bg-white shadow-sm">
              <option>All Languages</option>
              <option>Python</option>
              <option>Java</option>
              <option>C</option>
            </select>
          </div>
          <button className="p-2 text-gray-400 hover:bg-white hover:shadow-sm rounded-lg transition-all border border-transparent hover:border-gray-200">
            <Filter size={20} />
          </button>
        </div>

        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Question</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Topic</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan="4" className="p-10 text-center text-gray-400">Loading quizzes...</td></tr>
            ) : quizzes.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="truncate max-w-md font-medium text-gray-900">{item.question}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.language} • {item.type}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold">
                    {item.topic}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                    item.difficulty === 'Easy' ? 'text-green-600 bg-green-50' : 
                    item.difficulty === 'Medium' ? 'text-yellow-600 bg-yellow-50' : 'text-red-600 bg-red-50'
                  }`}>
                    {item.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <button 
                      onClick={() => handleEdit(item)}
                      className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(item._id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && quizzes.length === 0 && (
          <div className="p-20 text-center text-gray-400 bg-white">
            <ListChecks size={48} className="mx-auto mb-4 opacity-10" />
            <p className="font-bold">No quizzes found.</p>
            <p className="text-sm mt-1">Start by creating your first quiz session.</p>
          </div>
        )}
      </div>

      <QuizModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        quiz={currentQuiz}
      />
    </div>
  );
};

export default AdminQuizzes;
