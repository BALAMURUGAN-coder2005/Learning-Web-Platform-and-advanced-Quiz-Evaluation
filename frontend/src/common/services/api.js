import axios from 'axios';

const API_BASE_URL = 'https://learning-web-platform-and-advanced-quiz.onrender.com/api';
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration/invalidation
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized or token expired. Logging out...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const quizService = {
  getQuizzes: (params) => api.get('/quizzes', { params }),
  getQuizById: (id) => api.get(`/quizzes/${id}`),
};

export const learningService = {
  getContent: (language, topic, difficulty) => 
    api.get(`/learning/${language}/${topic}/${difficulty}`),
};

export const problemService = {
  getProblems: (params) => api.get('/coding', { params }),
  getProblemById: (id) => api.get(`/coding/${id}`),
};

export const submissionService = {
  createSubmission: (data) => api.post('/submissions', data),
  getSubmissions: (userId) => api.get('/submissions', { params: { userId } }),
};

export const dashboardService = {
  getStats: (userId) => api.get('/dashboard', { params: { userId } }),
};

export const adminService = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  createQuiz: (data) => api.post('/admin/quizzes', data),
  updateQuiz: (id, data) => api.put(`/admin/quizzes/${id}`, data),
  deleteQuiz: (id) => api.delete(`/admin/quizzes/${id}`),
  createProblem: (data) => api.post('/admin/problems', data),
  updateProblem: (id, data) => api.put(`/admin/problems/${id}`, data),
  deleteProblem: (id) => api.delete(`/admin/problems/${id}`),
};

export const leaderboardService = {
  getLeaderboard: () => api.get('/leaderboard'),
};

export const profileService = {
  getProfile: (userId) => api.get('/user/profile', { params: { userId } }),
};

export default api;
