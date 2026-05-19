import React, { useState, useEffect } from 'react';
import { adminService } from '../../common/services/api';
import { 
  Users, ListChecks, Code, TrendingUp, 
  PlusCircle, ShieldCheck, ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await adminService.getStats();
      setStats(response.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) return <div className="p-20 text-center text-indigo-600 font-bold">Loading Admin Insights...</div>;

  const cards = [
    { title: 'Total Students', value: stats?.totalUsers || 0, icon: <Users size={24} />, color: 'bg-blue-50 text-blue-600', path: '/admin/users' },
    { title: 'Live Quizzes', value: stats?.totalQuizzes || 0, icon: <ListChecks size={24} />, color: 'bg-indigo-50 text-indigo-600', path: '/admin/quizzes' },
    { title: 'Coding Challenges', value: stats?.totalProblems || 0, icon: <Code size={24} />, color: 'bg-purple-50 text-purple-600', path: '/admin/problems' }
  ];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 flex items-center space-x-3">
            <ShieldCheck className="text-indigo-600" size={32} />
            <span>Admin Control Center</span>
          </h2>
          <p className="text-gray-500 mt-1">Real-time overview of the SmartLearn educational ecosystem.</p>
        </div>
        <div className="flex items-center space-x-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full font-bold text-sm">
          <TrendingUp size={16} />
          <span>System Healthy</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {cards.map((card, i) => (
          <div 
            key={i} 
            onClick={() => navigate(card.path)}
            className="group cursor-pointer bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 relative overflow-hidden"
          >
            <div className={`p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110 ${card.color}`}>
              {card.icon}
            </div>
            <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">{card.title}</h3>
            <p className="text-4xl font-black text-gray-900 mt-2">{card.value}</p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-100/40 transition-colors"></div>
            <div className="absolute bottom-6 right-8 text-indigo-600 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
              <ArrowRight size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <h3 className="text-xl font-bold mb-6">Management Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/admin/quizzes')}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all group"
            >
              <div className="flex items-center space-x-3">
                <PlusCircle size={20} className="text-indigo-600 group-hover:text-white" />
                <span className="font-bold">Add Quiz</span>
              </div>
              <ArrowRight size={18} className="opacity-0 group-hover:opacity-100" />
            </button>
            <button 
              onClick={() => navigate('/admin/problems')}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all group"
            >
              <div className="flex items-center space-x-3">
                <PlusCircle size={20} className="text-indigo-600 group-hover:text-white" />
                <span className="font-bold">Add Problem</span>
              </div>
              <ArrowRight size={18} className="opacity-0 group-hover:opacity-100" />
            </button>
          </div>
        </div>

        <div className="bg-indigo-600 p-8 rounded-3xl shadow-xl shadow-indigo-100 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Platform Growth</h3>
            <p className="text-indigo-100 mb-8 whitespace-pre-line">
              SmartLearn has seen a 24% increase in student engagement this week. 
              Keep pushing fresh content to maintain momentum!
            </p>
            <button 
              onClick={() => navigate('/admin/quizzes')}
              className="bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all flex items-center space-x-2"
            >
              <span>Manage Content</span>
              <ArrowRight size={18} />
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
