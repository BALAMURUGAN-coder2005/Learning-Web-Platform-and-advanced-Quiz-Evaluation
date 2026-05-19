require('dotenv').config();
const mongoose = require('mongoose');
const Quiz = require('./models/Quiz');
const User = require('./models/User');

const test = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to DB');
  const qc = await Quiz.countDocuments();
  const uc = await User.countDocuments();
  console.log(`Quizzes: ${qc}, Users: ${uc}`);
  mongoose.connection.close();
};

test();
