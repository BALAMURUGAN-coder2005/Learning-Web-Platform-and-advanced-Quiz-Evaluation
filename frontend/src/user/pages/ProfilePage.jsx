import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Calendar, MapPin, Edit3, 
  Trophy, Target, Zap, Clock, ChevronRight,
  Brain, Compass, Sword, Star, Award, BookOpen, Code, Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { profileService } from '../../common/services/api';
import { useAuth } from '../../common/context/AuthContext';

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await profileService.getProfile(authUser.id);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    if (authUser?.id) fetchProfile();
  }, [authUser]);

  if (loading || !profile) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const badgeIcon = (iconName) => {
    switch (iconName) {
      case 'Compass': return <Compass className="text-blue-500" size={24} />;
      case 'Brain': return <Brain className="text-purple-500" size={24} />;
      case 'Zap': return <Zap className="text-amber-500" size={24} />;
      case 'Sword': return <Sword className="text-red-500" size={24} />;
      case 'Trophy': return <Trophy className="text-amber-500" size={24} />;
      default: return <Award className="text-indigo-500" size={24} />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: User Card */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
            <div className="px-8 pb-8">
              <div className="relative -mt-16 mb-6">
                <div className="w-32 h-32 rounded-3xl border-4 border-white overflow-hidden shadow-2xl bg-white">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.user.username}`} alt="avatar" />
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-xl shadow-lg hover:bg-indigo-700 transition-colors">
                  <Edit3 size={18} />
                </button>
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-1">{profile.user.name}</h1>
              <p className="text-gray-400 font-bold mb-6">@{profile.user.username}</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-gray-600 font-medium">
                  <Mail size={18} className="text-gray-400" />
                  <span>{profile.user.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 font-medium">
                  <Calendar size={18} className="text-gray-400" />
                  <span>Joined {new Date(profile.user.memberSince).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 font-medium">
                  <MapPin size={18} className="text-gray-400" />
                  <span>Earth, Milky Way</span>
                </div>
              </div>

              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 italic text-gray-500 text-sm leading-relaxed">
                "{profile.user.bio}"
              </div>
            </div>
          </div>

          {/* Achievements / Badges */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <Award className="text-indigo-600" /> Achievements
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {profile.badges.map(badge => (
                <div key={badge.id} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center text-center group hover:bg-indigo-50 hover:border-indigo-100 transition-all cursor-help">
                  <div className="mb-3 p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    {badgeIcon(badge.icon)}
                  </div>
                  <p className="text-xs font-black text-gray-900 mb-1 uppercase tracking-tighter">{badge.name}</p>
                  <span className="text-[10px] text-gray-400 leading-tight">{badge.description}</span>
                </div>
              ))}
              {profile.badges.length === 0 && (
                <p className="col-span-2 text-center text-gray-400 text-sm font-medium py-4">
                  No badges earned yet. Keep learning!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total XP', value: profile.stats.totalXP, icon: <Flame className="text-orange-500" />, bg: 'bg-orange-50' },
              { label: 'Solved', value: profile.stats.solved, icon: <Sword className="text-red-500" />, bg: 'bg-red-50' },
              { label: 'Quizzes', value: profile.stats.quizzes, icon: <Target className="text-blue-500" />, bg: 'bg-blue-50' },
              { label: 'Accuracy', value: `${profile.stats.avgAccuracy}%`, icon: <Zap className="text-amber-500" />, bg: 'bg-amber-50' },
            ].map((stat, idx) => (
              <div key={idx} className={`${stat.bg} p-6 rounded-3xl border border-white shadow-sm flex flex-col items-center text-center`}>
                <div className="p-3 bg-white rounded-2xl shadow-sm mb-3">
                  {stat.icon}
                </div>
                <p className="text-2xl font-black text-gray-900">{stat.value}</p>
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Performance by Topic */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8">
            <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-2">
              <Brain className="text-indigo-600" /> Skill Proficiency
            </h3>
            <div className="space-y-6">
              {profile.performance.map((p, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="font-black text-gray-700">{p.topic}</span>
                    <span className="text-sm font-bold text-indigo-600">{p.accuracy}%</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden border border-gray-50">
                    <div 
                      className={`h-full bg-gradient-to-r ${p.accuracy > 70 ? 'from-green-400 to-emerald-500' : p.accuracy > 40 ? 'from-amber-400 to-orange-500' : 'from-red-400 to-rose-500'}`}
                      style={{ width: `${p.accuracy}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              {profile.performance.length === 0 && (
                <p className="text-center text-gray-400 font-bold py-10 uppercase tracking-widest text-sm">
                  Start your first lesson to see skill metrics!
                </p>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Clock className="text-indigo-600" /> Activity Feed
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              {profile.recentActivity.map(activity => (
                <div key={activity.id} className="p-8 hover:bg-gray-50/50 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-2xl shadow-sm ${activity.type === 'quiz' ? 'bg-blue-50 text-blue-600' : 'bg-red-50 text-red-600'}`}>
                      {activity.type === 'quiz' ? <BookOpen size={24} /> : <Code size={24} />}
                    </div>
                    <div>
                      <p className="text-lg font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {activity.type === 'quiz' ? 'Quiz Completed' : 'Problem Solved'}
                      </p>
                      <p className="text-sm font-bold text-gray-400">
                        {activity.topic} • {activity.difficulty} • {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1 justify-end">
                      <span className={`text-sm font-black ${activity.correct || activity.score > 5 ? 'text-green-600' : 'text-red-500'}`}>
                        {activity.type === 'quiz' ? `${activity.score * 10}%` : (activity.correct ? 'PASSED' : 'FAILED')}
                      </span>
                    </div>
                    <Link to={activity.type === 'quiz' ? '/quiz' : '/coding'} className="text-[10px] font-black text-indigo-400 uppercase tracking-widest hover:text-indigo-600 flex items-center gap-1 justify-end">
                      Details <ChevronRight size={10} />
                    </Link>
                  </div>
                </div>
              ))}
              {profile.recentActivity.length === 0 && (
                <div className="p-16 text-center text-gray-400 font-bold uppercase tracking-widest text-sm">
                  Your journey starts now. Take the first step!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
