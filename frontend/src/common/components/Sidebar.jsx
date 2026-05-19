import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, BookOpen, PenTool, Trophy, User, 
  ShieldCheck, Users, ListChecks, Code, LogOut, ArrowLeft 
} from 'lucide-react';

const Sidebar = ({ accentColor = '#3b82f6', module = 'user' }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const userNav = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Learn', path: '/learn', icon: <BookOpen size={20} /> },
    { name: 'Quizzes', path: '/quiz', icon: <PenTool size={20} /> },
    { name: 'Coding', path: '/coding', icon: <PenTool size={20} /> },
    { name: 'Leaderboard', path: '/leaderboard', icon: <Trophy size={20} /> },
    { name: 'Profile', path: '/profile', icon: <User size={20} /> },
    ...(user?.role === 'admin' ? [{ name: 'Admin Panel', path: '/admin/dashboard', icon: <ShieldCheck size={20} /> }] : [])
  ];

  const adminNav = [
    { name: 'Admin Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Manage Quizzes', path: '/admin/quizzes', icon: <ListChecks size={20} /> },
    { name: 'Manage Problems', path: '/admin/problems', icon: <Code size={20} /> },
    { name: 'Manage Users', path: '/admin/users', icon: <Users size={20} /> },
    { name: 'Back to Platform', path: '/dashboard', icon: <ArrowLeft size={20} /> }
  ];

  const navItems = module === 'admin' ? adminNav : userNav;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center space-x-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-indigo-100 italic" style={{ backgroundColor: accentColor }}>
          SL
        </div>
        <h1 className="text-xl font-bold tracking-tight" style={{ color: accentColor }}>
          SmartLearn {module === 'admin' && <span className="text-xs uppercase align-middle ml-1 opacity-70">Admin</span>}
        </h1>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-opacity-10 font-bold'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
            style={({ isActive }) => 
              isActive ? { backgroundColor: `${accentColor}1A`, color: accentColor } : {}
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: accentColor }}>
              {user?.name?.charAt(0) || 'S'}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'Student'}</p>
              <p className="text-[10px] text-gray-500 truncate">{user?.email || 'student@smartlearn.com'}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            title="Logout" 
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
