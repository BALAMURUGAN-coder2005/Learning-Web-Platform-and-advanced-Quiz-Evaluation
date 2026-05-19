const Quiz = require('../models/Quiz');
const CodingProblem = require('../models/CodingProblem');
const User = require('../models/User');

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalProblems = await CodingProblem.countDocuments();
    
    res.status(200).json({
      totalUsers,
      totalQuizzes,
      totalProblems
    });
  } catch (error) {
    console.error('getAdminStats error:', error);
    res.status(500).json({ message: error.message });
  }
};

// User Management
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); 
    res.status(200).json(users || []);
  } catch (error) {
    console.error('getUsers error:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('deleteUser error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Quiz CRUD
const createQuiz = async (req, res) => {
  try {
    console.log('Creating Quiz Payload:', req.body);
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    console.error('createQuiz error:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(quiz);
  } catch (error) {
    console.error('updateQuiz error:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Quiz deleted' });
  } catch (error) {
    console.error('deleteQuiz error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Problem CRUD
const createProblem = async (req, res) => {
  try {
    console.log('Creating Problem Payload:', req.body);
    const problem = new CodingProblem(req.body);
    await problem.save();
    res.status(201).json(problem);
  } catch (error) {
    console.error('createProblem error:', error);
    res.status(500).json({ message: error.message });
  }
};

const updateProblem = async (req, res) => {
  try {
    const problem = await CodingProblem.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(problem);
  } catch (error) {
    console.error('updateProblem error:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProblem = async (req, res) => {
  try {
    await CodingProblem.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Problem deleted' });
  } catch (error) {
    console.error('deleteProblem error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAdminStats,
  getUsers, deleteUser,
  createQuiz, updateQuiz, deleteQuiz,
  createProblem, updateProblem, deleteProblem
};
