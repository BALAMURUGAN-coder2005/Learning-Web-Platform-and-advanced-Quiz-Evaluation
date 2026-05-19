import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, Flame, Award, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { leaderboardService } from '../../common/services/api';

const LeaderboardPage = () => {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankings = async () => {
      try {
        const response = await leaderboardService.getLeaderboard();
        setRankings(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchRankings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const topThree = rankings.slice(0, 3);
  const others = rankings.slice(3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-gray-900 mb-4 tracking-tight">
          Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Leaderboard</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          Compete with the top programmers worldwide. Solve problems, take quizzes, and climb to the top of the pack!
        </p>
      </div>

      {/* Podium Section */}
      <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-16 px-4">
        {/* 2nd Place */}
        {topThree[1] && (
          <div className="order-2 md:order-1 flex flex-col items-center">
            <div className="relative group grayscale hover:grayscale-0 transition-all duration-500">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <Medal className="text-gray-400 group-hover:scale-125 transition-transform" size={40} />
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-gray-200 overflow-hidden shadow-xl mb-4">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[1].username}`} alt="avatar" />
              </div>
            </div>
            <div className="h-32 w-32 bg-white border border-gray-200 rounded-t-2xl shadow-lg flex flex-col items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gray-400"></div>
              <p className="font-black text-gray-900 truncate w-full text-center">{topThree[1].name}</p>
              <p className="text-indigo-600 font-bold">{topThree[1].totalXP} XP</p>
              <div className="mt-2 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">#2</div>
            </div>
          </div>
        )}

        {/* 1st Place */}
        {topThree[0] && (
          <div className="order-1 md:order-2 flex flex-col items-center scale-110 md:-translate-y-4">
            <div className="relative group">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                <Trophy className="text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] animate-bounce" size={56} />
              </div>
              <div className="w-32 h-32 rounded-full border-4 border-amber-400 overflow-hidden shadow-2xl mb-4 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 to-transparent"></div>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[0].username}`} alt="avatar" />
              </div>
            </div>
            <div className="h-40 w-40 bg-white border-2 border-amber-200 rounded-t-3xl shadow-2xl flex flex-col items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-400"></div>
              <p className="font-black text-gray-900 text-lg truncate w-full text-center">{topThree[0].name}</p>
              <p className="text-amber-600 font-black text-xl">{topThree[0].totalXP} XP</p>
              <div className="mt-2 text-sm font-black text-amber-700 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1">
                <Award size={14} /> Rank #1
              </div>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {topThree[2] && (
          <div className="order-3 flex flex-col items-center">
            <div className="relative group grayscale hover:grayscale-0 transition-all duration-500">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <Medal className="text-orange-400 group-hover:scale-125 transition-transform" size={40} />
              </div>
              <div className="w-24 h-24 rounded-full border-4 border-orange-200 overflow-hidden shadow-xl mb-4">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${topThree[2].username}`} alt="avatar" />
              </div>
            </div>
            <div className="h-28 w-32 bg-white border border-gray-200 rounded-t-2xl shadow-lg flex flex-col items-center justify-center p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-orange-400"></div>
              <p className="font-black text-gray-900 truncate w-full text-center">{topThree[2].name}</p>
              <p className="text-indigo-600 font-bold">{topThree[2].totalXP} XP</p>
              <div className="mt-2 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">#3</div>
            </div>
          </div>
        )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
            <TrendingUp className="text-indigo-600" /> Challenger Rankings
          </h3>
          <span className="text-sm font-bold text-gray-400">Updated Real-time</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="px-8 py-5">Rank</th>
                <th className="px-8 py-5">Challenger</th>
                <th className="px-8 py-5">Problems</th>
                <th className="px-8 py-5">Quizzes</th>
                <th className="px-8 py-5">Avg Accuracy</th>
                <th className="px-8 py-5 text-right">Total XP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {others.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50/80 transition-all group">
                  <td className="px-8 py-6">
                    <span className="font-black text-gray-400 group-hover:text-indigo-600 transition-colors">#{index + 4}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full border border-gray-200 overflow-hidden bg-gray-100">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} alt="avatar" />
                      </div>
                      <div>
                        <p className="font-black text-gray-900 group-hover:text-indigo-600 transition-colors">{user.name}</p>
                        <p className="text-xs text-gray-400">@{user.username}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-gray-700">{user.problemsSolved}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-gray-700">{user.quizzesTaken}</span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500" 
                          style={{ width: `${user.avgAccuracy}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-gray-600">{user.avgAccuracy}%</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 rounded-full font-black text-sm">
                      {user.totalXP} XP
                    </span>
                  </td>
                </tr>
              ))}
              {!others.length && (
                <tr>
                  <td colSpan="6" className="px-8 py-10 text-center text-gray-400 font-bold uppercase tracking-widest">
                    The competition is heating up... Be the next to join!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
