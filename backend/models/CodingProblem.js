const mongoose = require('mongoose');

const codingProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  constraints: { type: String },
  inputDescription: { type: String },
  outputDescription: { type: String },
  testCases: [{
    input: { type: String, required: true },
    output: { type: String, required: true },
    isHidden: { type: Boolean, default: false }
  }],
  language: { type: String, required: true },
  topic: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['Easy', 'Medium', 'Hard'] },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CodingProblem', codingProblemSchema);
