const Quiz = require('../models/Quiz');

const getQuizzes = async (req, res) => {
  try {
    const { language, topic, difficulty, type } = req.query;
    const query = {};
    if (language) query.language = language;
    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;
    if (type) query.type = type;

    const quizzes = await Quiz.find(query);
    res.status(200).json(quizzes || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getQuizzes, getQuizById };
