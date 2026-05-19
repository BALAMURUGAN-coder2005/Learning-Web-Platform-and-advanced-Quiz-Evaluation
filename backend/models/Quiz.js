const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  language: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
  type: { type: String, required: true, enum: ['topic', 'master'] },
  explanation: { type: String },
  wrongExplanations: { type: Map, of: String },
  resource: { type: String },
  source: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Quiz', quizSchema);
