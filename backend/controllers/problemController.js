const CodingProblem = require('../models/CodingProblem');

const getProblems = async (req, res) => {
  try {
    const { language, topic, difficulty } = req.query;
    const query = {};
    if (language) query.language = language;
    if (topic) query.topic = topic;
    if (difficulty) query.difficulty = difficulty;

    const problems = await CodingProblem.find(query);
    res.status(200).json(problems || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProblemById = async (req, res) => {
  try {
    const problem = await CodingProblem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: 'Problem not found' });
    res.status(200).json(problem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProblems, getProblemById };
