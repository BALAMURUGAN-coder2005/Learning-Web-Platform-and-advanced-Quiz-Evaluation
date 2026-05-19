const Submission = require('../models/Submission');

const createSubmission = async (req, res) => {
  try {
    const { userId, type, topic, difficulty, score, correctAnswers, correct, language } = req.body;
    
    // Basic validation
    if (!userId || !type) {
      return res.status(400).json({ message: 'UserId and Type are required' });
    }

    const submission = new Submission({
      userId,
      type,
      topic,
      difficulty,
      score: score || 0,
      correctAnswers: correctAnswers || 0,
      correct: correct || false,
      language
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubmissions = async (req, res) => {
  try {
    const { userId } = req.query;
    const query = userId ? { userId } : {};
    const submissions = await Submission.find(query).sort({ createdAt: -1 });
    res.status(200).json(submissions || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSubmission, getSubmissions };
