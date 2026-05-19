import React, { useState, useEffect } from 'react';
import { adminService, problemService } from '../../common/services/api';
import { Plus, Edit2, Trash2, Filter, Search, Code } from 'lucide-react';
import ProblemModal from '../components/ProblemModal';

const AdminProblems = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(null);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    setLoading(true);
    try {
      const response = await problemService.getProblems();
      setProblems(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCurrentProblem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (problem) => {
    setCurrentProblem(problem);
    setIsModalOpen(true);
  };

  const handleSave = async (problemData) => {
    try {
      if (currentProblem) {
        await adminService.updateProblem(currentProblem._id, problemData);
      } else {
        await adminService.createProblem(problemData);
      }
      setIsModalOpen(false);
      fetchProblems();
    } catch (err) {
      alert('Failed to save problem. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this problem?')) return;
    try {
      await adminService.deleteProblem(id);
      fetchProblems();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Manage Problems</h2>
          <p className="text-gray-500 mt-1">Configure coding challenges and test cases for students.</p>
        </div>
        <button 
          onClick={handleCreate}
          className="btn-primary flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100 px-6 py-3 rounded-xl transition-all font-bold text-white"
        >
          <Plus size={20} />
          <span>New Problem</span>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search problems..." className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg outline-none focus:border-indigo-500 w-64 shadow-sm" />
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
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Title</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Topic</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Language</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan="4" className="p-10 text-center text-gray-400">Loading problems...</td></tr>
            ) : problems.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      <Code size={18} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{item.title}</p>
                      <p className="text-[10px] text-gray-400">Difficulty: {item.difficulty}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-lg bg-gray-100 text-gray-600 text-xs font-bold">
                    {item.topic}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">
                  {item.language}
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
        {!loading && problems.length === 0 && (
          <div className="p-20 text-center text-gray-400 bg-white">
            <Code size={48} className="mx-auto mb-4 opacity-10" />
            <p className="font-bold">No problems found.</p>
            <p className="text-sm mt-1">Add your first coding challenge to the platform.</p>
          </div>
        )}
      </div>

      <ProblemModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        problem={currentProblem}
      />
    </div>
  );
};

export default AdminProblems;
