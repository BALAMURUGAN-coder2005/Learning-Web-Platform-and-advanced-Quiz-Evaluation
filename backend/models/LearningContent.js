const mongoose = require('mongoose');

const learningContentSchema = new mongoose.Schema({
  language: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
  estimatedTime: { type: String, default: "5 mins" },
  title: { type: String, required: true },
  introduction: { type: String, required: true },
  definition: { type: String, required: true },
  syntax: { type: String, required: true },
  examples: [{
    code: { type: String, required: true },
    explanation: { type: String, required: true }
  }],
  keyPoints: [{ type: String }],
  mistakes: [{ type: String }],
  practiceTip: { type: String },
  summary: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LearningContent', learningContentSchema);
