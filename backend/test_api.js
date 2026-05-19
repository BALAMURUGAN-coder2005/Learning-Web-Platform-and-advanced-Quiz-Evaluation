const axios = require('axios');

const test = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@smartlearn.com',
      password: 'admin123'
    });
    console.log('Login successful. Token length:', res.data.token.length);
    const token = res.data.token;
    
    const statsRes = await axios.get('http://localhost:5000/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Stats:', statsRes.data);
    
    const quizRes = await axios.get('http://localhost:5000/api/quizzes', {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log(`Fetched Quizzes: ${quizRes.data.length}`);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
};

test();
