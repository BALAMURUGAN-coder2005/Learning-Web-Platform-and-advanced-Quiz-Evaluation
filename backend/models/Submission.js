const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // For simplicity, using String as requested for the default user
  type: { type: String, required: true, enum: ['quiz', 'coding'] },
  topic: { type: String },
  difficulty: { type: String },
  score: { type: Number, default: 0 },
  correctAnswers: { type: Number, default: 0 }, // For quizzes
  correct: { type: Boolean }, // For coding
  language: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Submission', submissionSchema);
