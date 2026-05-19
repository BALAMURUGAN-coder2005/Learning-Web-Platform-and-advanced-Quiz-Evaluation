import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dashboardService } from '../../common/services/api';
import { Brain, Trophy, Activity, AlertTriangle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../common/context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await dashboardService.getStats(user.id);
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-20 text-center">Loading your progress...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome back, {stats?.user?.name || 'Student'}!</h2>
          <p className="text-gray-500 mt-1">Here's a summary of your learning journey.</p>
        </div>
        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
          <Activity className="text-blue-600" size={18} />
          <span className="text-blue-700 font-bold">5 Day Streak</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Quizzes Taken</h3>
          <p className="text-3xl font-black mt-2">{stats?.quizzesTaken || 0}</p>
        </div>
        <div className="card">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Coding Solved</h3>
          <p className="text-3xl font-black mt-2">{stats?.codingSolved || 0}</p>
        </div>
        <div className="card">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Overall Accuracy</h3>
          <p className={`text-3xl font-black mt-2 ${stats?.accuracy > 70 ? 'text-green-600' : 'text-blue-600'}`}>
            {stats?.accuracy || 0}%
          </p>
        </div>
        <div className="card">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Rank</h3>
          <p className="text-3xl font-black mt-2 text-yellow-600">#42</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Progress / Weak Topics */}
        <div className="lg:col-span-2 space-y-8">
          <div className="card">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <AlertTriangle className="text-orange-500" size={22} />
              <span>Weak Topics Identification</span>
            </h3>
            
            {stats?.weakTopics?.length > 0 ? (
              <div className="space-y-4">
                {stats.weakTopics.map(topic => (
                  <div key={topic} className="flex items-center justify-between p-4 bg-orange-50 border border-orange-100 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">!</div>
                      <div>
                        <h4 className="font-bold text-gray-900">{topic}</h4>
                        <p className="text-xs text-gray-500">You need more practice in these specific levels.</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => {
                        const topicName = topic.split(' (')[0].toLowerCase();
                        navigate(`/learn/python/${topicName}/select-difficulty`);
                      }}
                      className="px-4 py-2 bg-white text-orange-600 border border-orange-200 rounded-lg text-sm font-bold hover:bg-orange-600 hover:text-white transition-all shadow-sm"
                    >
                      Improve Now
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-green-50 rounded-xl border border-green-100">
                <p className="text-green-700 font-medium">You're doing great! No weak topics identified yet.</p>
              </div>
            )}
          </div>

          <div className="card">
            <h3 className="text-xl font-bold mb-6 flex items-center space-x-2">
              <Brain className="text-blue-600" size={22} />
              <span>Performance by Topic</span>
            </h3>
            <div className="space-y-6">
              {stats?.accuracyByTopic?.length > 0 ? stats.accuracyByTopic.map(item => (
                <div key={item.topic}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-bold text-gray-700">{item.topic}</span>
                    <span className="font-bold text-blue-600">{item.accuracy}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        item.accuracy < 50 ? 'bg-orange-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${item.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              )) : (
                <p className="text-gray-400 text-center py-4">Finish some quizzes to see topic performance.</p>
              )}
            </div>
          </div>
        </div>

        {/* Recommendations & Sidebar */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2 flex items-center space-x-2">
                <Trophy size={22} className="text-yellow-400" />
                <span>Smart Suggestion</span>
              </h3>
              <p className="text-blue-100 mb-6 font-medium">
                {stats?.weakTopics?.length > 0 
                  ? `Improve your ${stats.weakTopics[0]} and Arrays to boost your score!`
                  : "Keep up the momentum! Try the Master Quiz to challenge yourself."}
              </p>
              <button 
                onClick={() => navigate('/learn')}
                className="w-full py-4 bg-white text-blue-600 rounded-xl font-black flex items-center justify-center space-x-3 hover:bg-blue-50 transition-all shadow-lg"
              >
                <span>Continue Journey</span>
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          <div className="card">
            <h3 className="font-bold text-gray-900 mb-4 uppercase text-xs tracking-widest text-gray-400">Activity History</h3>
            <div className="space-y-4">
              {stats?.recentActivity?.length > 0 ? stats.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center space-x-3 border-l-2 border-blue-500 pl-3">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800">
                      {activity.type === 'quiz' ? 'Completed Quiz' : 'Solved Problem'}
                    </p>
                    <p className="text-xs text-gray-500">{activity.topic} • {activity.language || 'Code'}</p>
                  </div>
                  <span className={`text-xs font-bold ${activity.type === 'quiz' ? (activity.score >= 70 ? 'text-green-600' : 'text-blue-600') : (activity.correct ? 'text-green-600' : 'text-red-500')}`}>
                    {activity.type === 'quiz' ? `${activity.score}%` : (activity.correct ? 'PASSED' : 'FAILED')}
                  </span>
                </div>
              )) : (
                <p className="text-gray-400 text-sm text-center py-2">No recent activity.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
