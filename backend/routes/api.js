const express = require('express');
const router = express.Router();

const { getQuizzes, getQuizById } = require('../controllers/quizController');
const { getProblems, getProblemById } = require('../controllers/problemController');
const { createSubmission, getSubmissions } = require('../controllers/submissionController');
const { register, login } = require('../controllers/authController');
const { verifyToken, checkAdmin } = require('../middleware/authMiddleware');
const { getDashboardStats } = require('../controllers/dashboardController');
const {
  getAdminStats,
  getUsers, deleteUser,
  createQuiz, updateQuiz, deleteQuiz,
  createProblem, updateProblem, deleteProblem
} = require('../controllers/adminController');
const { getContent, getTopics, getLevels } = require('../controllers/learningController');
const { getLeaderboard } = require('../controllers/leaderboardController');
const { getUserProfile } = require('../controllers/profileController');

// Auth Routes
router.post('/auth/register', register);
router.post('/auth/login', login);

// Protected Routes (Required for all further access)
router.use(verifyToken);

// User Routes
router.get('/dashboard', getDashboardStats);
router.get('/learn', getContent);
router.get('/learn/topics', getTopics);
router.get('/learn/levels', getLevels);
router.get('/learning/:language/:topic/:difficulty', getContent);
router.get('/leaderboard', getLeaderboard);
router.get('/user/profile', getUserProfile);
router.get('/quizzes', getQuizzes);
router.get('/quizzes/:id', getQuizById);
router.get('/coding', getProblems);
router.get('/coding/:id', getProblemById);
router.get('/submissions', getSubmissions);
router.post('/submissions', createSubmission);

// Admin Routes (Protected)
router.use('/admin', checkAdmin);
router.get('/admin/stats', getAdminStats);
router.get('/admin/users', getUsers);
router.delete('/admin/users/:id', deleteUser);
router.post('/admin/quizzes', createQuiz);
router.put('/admin/quizzes/:id', updateQuiz);
router.delete('/admin/quizzes/:id', deleteQuiz);
router.post('/admin/problems', createProblem);
router.put('/admin/problems/:id', updateProblem);
router.delete('/admin/problems/:id', deleteProblem);

// Stub for Leaderboard & Profile if needed
router.get('/leaderboard', async (req, res) => {
  // Logic to rank users by score + accuracy
  res.json([]);
});

router.get('/user/profile', async (req, res) => {
  // Simple profile stats
  res.json({});
});

module.exports = router;
