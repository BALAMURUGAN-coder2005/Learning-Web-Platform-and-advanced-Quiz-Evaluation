import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Eye, EyeOff } from 'lucide-react';

const ProblemModal = ({ isOpen, onClose, onSave, problem }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    constraints: '',
    inputDescription: '',
    outputDescription: '',
    language: 'Python',
    topic: 'Variables',
    difficulty: 'Easy',
    testCases: [{ input: '', output: '', isHidden: false }]
  });

  const languages = ['Python', 'Java', 'C'];
  const topics = ['Variables', 'Loops', 'Arrays', 'Functions', 'Strings'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  useEffect(() => {
    if (problem) {
      setFormData({
        ...problem,
        testCases: problem.testCases || [{ input: '', output: '', isHidden: false }]
      });
    } else {
      setFormData({
        title: '',
        description: '',
        constraints: '',
        inputDescription: '',
        outputDescription: '',
        language: 'Python',
        topic: 'Variables',
        difficulty: 'Easy',
        testCases: [{ input: '', output: '', isHidden: false }]
      });
    }
  }, [problem, isOpen]);

  const handleTestCaseChange = (index, field, value) => {
    const newTestCases = [...formData.testCases];
    newTestCases[index][field] = value;
    setFormData({ ...formData, testCases: newTestCases });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: '', output: '', isHidden: false }]
    });
  };

  const removeTestCase = (index) => {
    if (formData.testCases.length === 1) return;
    const newTestCases = formData.testCases.filter((_, i) => i !== index);
    setFormData({ ...formData, testCases: newTestCases });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 text-white rounded-lg">
              <Plus size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{problem ? 'Edit Problem' : 'New Coding Problem'}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white hover:text-red-500 rounded-lg transition-all text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-8">
          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50 border border-gray-100 p-6 rounded-2xl">
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Problem Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:border-indigo-500 transition-all outline-none"
                  placeholder="e.g., Reverse a String"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white"
              >
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-white"
              >
                {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>

          {/* Description & Constraints */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description (Markdown supported)</label>
                <textarea
                  required
                  rows="10"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:border-indigo-500 transition-all outline-none font-mono"
                  placeholder="Problem details..."
                />
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 text-indigo-600 uppercase text-xs">Technical Details</label>
                <div className="space-y-4">
                  <textarea
                    rows="2"
                    value={formData.constraints}
                    onChange={(e) => setFormData({ ...formData, constraints: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none"
                    placeholder="Constraints (e.g., 0 <= N <= 1000)"
                  />
                  <textarea
                    rows="2"
                    value={formData.inputDescription}
                    onChange={(e) => setFormData({ ...formData, inputDescription: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none"
                    placeholder="Input Format"
                  />
                  <textarea
                    rows="2"
                    value={formData.outputDescription}
                    onChange={(e) => setFormData({ ...formData, outputDescription: e.target.value })}
                    className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none"
                    placeholder="Output Format"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Test Cases */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <label className="text-lg font-black text-gray-900">Test Cases</label>
              <button
                type="button"
                onClick={addTestCase}
                className="flex items-center space-x-2 text-indigo-600 font-bold hover:text-indigo-700 transition-colors"
              >
                <Plus size={18} />
                <span>Add Case</span>
              </button>
            </div>
            <div className="space-y-4">
              {formData.testCases.map((tc, index) => (
                <div key={index} className="flex flex-col md:flex-row gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50/50">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Input</label>
                    <input
                      type="text"
                      required
                      value={tc.input}
                      onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1">Expected Output</label>
                    <input
                      type="text"
                      required
                      value={tc.output}
                      onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                      className="w-full px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex items-center space-x-4 pt-5">
                    <button
                      type="button"
                      onClick={() => handleTestCaseChange(index, 'isHidden', !tc.isHidden)}
                      className={`p-2 rounded-lg transition-colors flex items-center space-x-1 ${
                        tc.isHidden ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-600'
                      }`}
                      title={tc.isHidden ? 'Hidden Case (Not visible to students)' : 'Public Case'}
                    >
                      {tc.isHidden ? <EyeOff size={16} /> : <Eye size={16} />}
                      <span className="text-[10px] font-bold uppercase">{tc.isHidden ? 'Hidden' : 'Public'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => removeTestCase(index)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end space-x-3">
          <button onClick={onClose} className="px-6 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-8 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            {problem ? 'Update Problem' : 'Create Problem'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProblemModal;
