const Submission = require('../models/Submission');
const User = require('../models/User');

const getLeaderboard = async (req, res) => {
  try {
    // Aggregate rankings: Top 20 users by total score
    const leaderboard = await Submission.aggregate([
      {
        $group: {
          _id: "$userId",
          totalXP: { $sum: "$score" },
          problemsSolved: { 
            $sum: { $cond: [{ $eq: ["$type", "coding"] }, 1, 0] } 
          },
          quizzesTaken: { 
            $sum: { $cond: [{ $eq: ["$type", "quiz"] }, 1, 0] } 
          },
          avgAccuracy: { $avg: { $multiply: ["$score", 10] } } // Assuming score is 0-10
        }
      },
      { $sort: { totalXP: -1 } },
      { $limit: 20 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 1,
          totalXP: 1,
          problemsSolved: 1,
          quizzesTaken: 1,
          avgAccuracy: { $round: ["$avgAccuracy", 1] },
          name: "$userDetails.name",
          username: "$userDetails.username"
        }
      }
    ]);

    res.status(200).json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getLeaderboard };
