import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';

const QuizModal = ({ isOpen, onClose, onSave, quiz }) => {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    language: 'Python',
    topic: 'Variables',
    difficulty: 'Easy',
    type: 'topic'
  });

  const languages = ['Python', 'Java', 'C'];
  const topics = ['Variables', 'Loops', 'Arrays', 'Functions', 'Strings'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  useEffect(() => {
    if (quiz) {
      setFormData({
        ...quiz,
        options: quiz.options || ['', '', '', '']
      });
    } else {
      setFormData({
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        language: 'Python',
        topic: 'Variables',
        difficulty: 'Easy',
        type: 'topic'
      });
    }
  }, [quiz, isOpen]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.correctAnswer || !formData.options.includes(formData.correctAnswer)) {
      alert('Correct answer must be one of the options.');
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-600 text-white rounded-lg">
              <Save size={20} />
            </div>
            <h3 className="text-xl font-bold text-gray-900">{quiz ? 'Edit Quiz' : 'Add New Quiz'}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white hover:text-red-500 rounded-lg transition-all text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-6">
          {/* Question */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Question Text</label>
            <textarea
              required
              rows="3"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm"
              placeholder="e.g., What is the output of print(2 + 2)?"
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {formData.options.map((opt, i) => (
              <div key={i}>
                <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Option {i + 1}</label>
                <input
                  type="text"
                  required
                  value={opt}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm"
                  placeholder={`Option ${i + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Correct Answer */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center space-x-2">
              <span>Correct Answer</span>
              <AlertCircle size={14} className="text-gray-400" />
            </label>
            <select
              required
              value={formData.correctAnswer}
              onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 focus:bg-white transition-all text-sm"
            >
              <option value="">Select Correct Option</option>
              {formData.options.map((opt, i) => (
                opt && <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          {/* Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Language</label>
              <select
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:border-indigo-500 transition-all"
              >
                {languages.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Topic</label>
              <select
                value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:border-indigo-500 transition-all"
              >
                {topics.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm bg-white focus:border-indigo-500 transition-all"
              >
                {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end space-x-3">
          <button onClick={onClose} className="px-6 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-lg transition-all">
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-8 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
            {quiz ? 'Update Quiz' : 'Create Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
