const Submission = require('../models/Submission');
const User = require('../models/User');

const getDashboardStats = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'UserId is required' });
    }

    const submissions = await Submission.find({ userId });
    const user = await User.findOne({ email: 'student@smartlearn.com' }); // Default user fallback

    const stats = {
      user: user || { name: 'Student', email: 'student@smartlearn.com' },
      quizzesTaken: submissions.filter(s => s.type === 'quiz').length,
      codingSolved: submissions.filter(s => s.type === 'coding' && s.correct).length,
      accuracy: 0,
      accuracyByTopic: [],
      accuracyByLevel: [],
      weakTopics: []
    };

    if (submissions.length > 0) {
      // Calculate overall accuracy
      const totalScore = submissions.reduce((acc, curr) => acc + (curr.score || 0), 0);
      const possibleScore = submissions.length * 10; // Assuming 10 is max per quiz/problem for simple math
      stats.accuracy = Math.round((totalScore / possibleScore) * 100);

      // Group by topic
      const topicsMap = {};
      submissions.forEach(s => {
        if (!s.topic) return;
        if (!topicsMap[s.topic]) topicsMap[s.topic] = { total: 0, correct: 0 };
        topicsMap[s.topic].total += 1;
        topicsMap[s.topic].correct += (s.type === 'quiz' ? (s.score / 10) : (s.correct ? 1 : 0));
      });

      stats.accuracyByTopic = Object.keys(topicsMap).map(topic => ({
        topic,
        accuracy: Math.round((topicsMap[topic].correct / topicsMap[topic].total) * 100)
      }));

      // Group by level
      const levelsMap = {};
      submissions.forEach(s => {
        if (!s.difficulty) return;
        if (!levelsMap[s.difficulty]) levelsMap[s.difficulty] = { total: 0, correct: 0 };
        levelsMap[s.difficulty].total += 1;
        levelsMap[s.difficulty].correct += (s.type === 'quiz' ? (s.score / 10) : (s.correct ? 1 : 0));
      });

      stats.accuracyByLevel = Object.keys(levelsMap).map(level => ({
        level,
        accuracy: Math.round((levelsMap[level].correct / levelsMap[level].total) * 100)
      }));

      // Group by topic and difficulty for granular analysis
      const topicDifficultyMap = {};
      submissions.forEach(s => {
        if (!s.topic || !s.difficulty) return;
        const key = `${s.topic}|${s.difficulty}`;
        if (!topicDifficultyMap[key]) topicDifficultyMap[key] = { total: 0, correct: 0 };
        topicDifficultyMap[key].total += 1;
        topicDifficultyMap[key].correct += (s.type === 'quiz' ? (s.score / 10) : (s.correct ? 1 : 0));
      });

      // Identify Weak Areas (Topic + Level where accuracy < 50%)
      const weakAreas = [];
      Object.keys(topicDifficultyMap).forEach(key => {
        const [topic, difficulty] = key.split('|');
        const accuracy = Math.round((topicDifficultyMap[key].correct / topicDifficultyMap[key].total) * 100);
        if (accuracy < 50) {
          weakAreas.push({ topic, difficulty, accuracy });
        }
      });

      // Format weakTopics for the UI: "Topic (Level1, Level2)"
      const groupedWeak = {};
      weakAreas.forEach(wa => {
        if (!groupedWeak[wa.topic]) groupedWeak[wa.topic] = [];
        groupedWeak[wa.topic].push(wa.difficulty);
      });

      stats.weakTopics = Object.keys(groupedWeak).map(topic => 
        `${topic} (${groupedWeak[topic].join(', ')})`
      );

      stats.recentActivity = submissions.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5).map(s => ({
        id: s._id,
        type: s.type,
        topic: s.topic,
        language: s.language,
        score: s.score,
        correct: s.correct,
        date: s.createdAt
      }));
    }

    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };
