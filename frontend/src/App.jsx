import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Context
import { AuthProvider } from './common/context/AuthContext';

// Components
import ProtectedRoute from './common/components/ProtectedRoute';

// Layouts
import UserLayout from './user/layouts/UserLayout';
import AdminLayout from './admin/layouts/AdminLayout';

// Common Pages
import LandingPage from './common/pages/LandingPage';
import Login from './common/pages/Login';
import Register from './common/pages/Register';

// User Pages
import Dashboard from './user/pages/Dashboard';
import LearnIndex from './user/pages/learn/LearnIndex';
import LanguageMenu from './user/pages/learn/LanguageMenu';
import TopicPage from './user/pages/learn/TopicPage';
import QuizSetup from './user/pages/quiz/QuizSetup';
import QuizRun from './user/pages/quiz/QuizRun';
import ProblemList from './user/pages/coding/ProblemList';
import ProblemEditor from './user/pages/coding/ProblemEditor';
import DifficultySelect from './user/pages/learn/DifficultySelect';
import LeaderboardPage from './user/pages/LeaderboardPage';
import ProfilePage from './user/pages/ProfilePage';

// Admin Pages
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminQuizzes from './admin/pages/AdminQuizzes';
import AdminProblems from './admin/pages/AdminProblems';
import AdminUsers from './admin/pages/AdminUsers';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Module Routes (Protected) */}
          <Route element={
            <ProtectedRoute requiredRole="user">
              <UserLayout />
            </ProtectedRoute>
          }>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="learn">
              <Route index element={<LearnIndex />} />
              <Route path=":language" element={<LanguageMenu />} />
              <Route path=":language/:topic/select-difficulty" element={<DifficultySelect />} />
              <Route path=":language/:topic/:difficulty" element={<TopicPage />} />
            </Route>
            <Route path="quiz">
              <Route index element={<QuizSetup />} />
              <Route path="run" element={<QuizRun />} />
            </Route>
            <Route path="coding">
              <Route index element={<ProblemList />} />
              <Route path=":id" element={<ProblemEditor />} />
            </Route>
            <Route path="leaderboard" element={<LeaderboardPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Module Routes (Protected) */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="quizzes" element={<AdminQuizzes />} />
            <Route path="problems" element={<AdminProblems />} />
            <Route path="users" element={<AdminUsers />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
