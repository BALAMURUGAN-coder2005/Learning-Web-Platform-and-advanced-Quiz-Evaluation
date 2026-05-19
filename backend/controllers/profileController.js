const Submission = require('../models/Submission');
const User = require('../models/User');
const LearningContent = require('../models/LearningContent');

const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }

    const user = await User.findById(userId);
    const submissions = await Submission.find({ userId }).sort({ createdAt: -1 });

    // 1. Calculate Core Stats
    const totalXP = submissions.reduce((acc, curr) => acc + (curr.score || 0), 0);
    const solved = submissions.filter(s => s.type === 'coding' && s.correct).length;
    const quizzes = submissions.filter(s => s.type === 'quiz').length;
    const avgAccuracy = submissions.length > 0 
      ? Math.round((submissions.reduce((acc, curr) => acc + (curr.score / 10), 0) / submissions.length) * 100)
      : 0;

    // 2. Performance by Topic (For Radar Chart)
    const topicStats = {};
    submissions.forEach(s => {
      if (!s.topic) return;
      if (!topicStats[s.topic]) topicStats[s.topic] = { total: 0, correct: 0 };
      topicStats[s.topic].total += 1;
      topicStats[s.topic].correct += (s.type === 'quiz' ? (s.score / 10) : (s.correct ? 1 : 0));
    });

    const performance = Object.keys(topicStats).map(topic => ({
      topic,
      accuracy: Math.round((topicStats[topic].correct / topicStats[topic].total) * 100)
    }));

    // 3. Badge Logic
    const badges = [];
    
    // Tutorial progress (Simulated based on topics touched)
    const uniqueTopics = [...new Set(submissions.map(s => s.topic))];
    if (uniqueTopics.length >= 2) badges.push({ id: 1, name: 'Explorer', icon: 'Compass', description: 'Explored at least 2 different topics' });
    if (uniqueTopics.length >= 5) badges.push({ id: 2, name: 'Polymath', icon: 'Brain', description: 'Dived deep into 5+ core topics' });
    
    // Coding progress
    if (solved >= 1) badges.push({ id: 3, name: 'First Blood', icon: 'Zap', description: 'Solved your first coding challenge' });
    if (solved >= 5) badges.push({ id: 4, name: 'Code Warrior', icon: 'Sword', description: 'Resolved 5+ complex coding problems' });
    
    // Quiz progress
    const highAccuracyQuizzes = submissions.filter(s => s.type === 'quiz' && (s.score / 10) >= 0.8).length;
    if (highAccuracyQuizzes >= 3) badges.push({ id: 5, name: 'Quiz Whiz', icon: 'Trophy', description: 'Scored 80% or higher in 3 quizzes' });

    // 4. Recent Activity
    const recentActivity = submissions.slice(0, 5).map(s => ({
      id: s._id,
      type: s.type,
      topic: s.topic,
      difficulty: s.difficulty,
      score: s.score,
      correct: s.correct,
      date: s.createdAt
    }));

    res.status(200).json({
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
        bio: 'Enthusiastic programmer learning Python at SmartLearn.',
        memberSince: user.createdAt
      },
      stats: {
        totalXP,
        solved,
        quizzes,
        avgAccuracy
      },
      performance,
      badges,
      recentActivity
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUserProfile };
