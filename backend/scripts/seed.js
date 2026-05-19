require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('../models/User');
const Quiz = require('../models/Quiz');
const CodingProblem = require('../models/CodingProblem');
const LearningContent = require('../models/LearningContent');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/smartlearn');
    console.log('MongoDB Connected for Seeding...');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

const languages = ['Python', 'Java', 'C++', 'Javascript', 'C'];
const topics = ['Variables', 'Loops', 'Arrays', 'Functions', 'Strings'];
const difficulties = ['Easy', 'Medium', 'Hard'];

const seedData = async () => {
  await connectDB();

  const isForce = process.argv.includes('--force');
  console.log(`Seeding Mode: ${isForce ? 'FORCE (Overwrite)' : 'SAFE (Incremental)'}`);

  // 1. Handle Users (Always upsert/ensure they exist)
  if (isForce) await User.deleteMany();
  const studentExists = await User.findOne({ username: 'student' });
  if (!studentExists || isForce) {
    await User.create({
      name: 'Student',
      username: 'student',
      email: 'student@smartlearn.com',
      password: 'student123',
      role: 'user'
    });
    console.log('Student user ensured.');
  }

  const adminExists = await User.findOne({ username: 'admin' });
  if (!adminExists || isForce) {
    await User.create({
      name: 'Admin',
      username: 'admin',
      email: 'admin@smartlearn.com',
      password: 'admin123',
      role: 'admin'
    });
    console.log('Admin user ensured.');
  }

  if (isForce) {
    await LearningContent.deleteMany();
    await Quiz.deleteMany();
    await CodingProblem.deleteMany();
    console.log('Existing data cleared.');
  } else {
    const existingCount = await LearningContent.countDocuments();
    if (existingCount > 0) {
      console.log('Data already exists. Skipping seed. Run with --force to overwrite.');
      mongoose.connection.close();
      return;
    }
  }

  const learningData = [];
  const quizzes = [];
  const problems = [];

  for (const lang of languages) {
    for (const topic of topics) {
      for (const diff of difficulties) {
        // Learning Content
        learningData.push({
          language: lang,
          topic: topic,
          difficulty: diff,
          title: `Mastering ${topic} in ${lang} (${diff})`,
          introduction: `Welcome to the ${diff} level guide for ${topic} in ${lang}. This section will cover everything you need to know to master this essential programming concept.`,
          definition: `${topic} in ${lang} allows developers to organize, control, and structure their code efficiently. It is a fundamental building block of the language.`,
          syntax: `// Example ${lang} syntax for ${topic}\n// Varies by difficulty: ${diff}`,
          examples: [
            { code: `// ${diff} example 1 for ${topic} in ${lang}`, explanation: `This demonstrates the core usage of ${topic}.` },
            { code: `// ${diff} example 2 for ${topic} in ${lang}`, explanation: `An advanced trick or common pattern using ${topic}.` }
          ],
          mistakes: [
            "Forgetting syntax specific to the language.",
            "Mismanaging memory or scope.",
            "Off-by-one errors (common in arrays and loops)."
          ],
          keyPoints: [
            `${topic} is critical for robust code.`,
            `Always test your ${topic.toLowerCase()} logic.`
          ],
          practiceTip: `Try writing 3 different variations of a ${topic} construct to solidify your understanding.`,
          summary: `You have successfully reviewed the ${diff} concepts of ${topic} in ${lang}.`,
          estimatedTime: diff === 'Easy' ? '5 mins' : (diff === 'Medium' ? '10 mins' : '15 mins')
        });

        const getTemplates = (tLang, tTopic) => {
          const tmpls = {
            'Variables': [
              { q: `How do you declare a variable in ${tLang}?`, opts: [`var x;`, `let x;`, `declare x;`, `Depends on ${tLang} syntax`], ans: `Depends on ${tLang} syntax` },
              { q: `Which of the following is a valid variable name in ${tLang}?`, opts: [`1_var`, `_var1`, `var-1`, `var 1`], ans: `_var1` },
              { q: `What is the scope of a local variable in ${tLang}?`, opts: [`Global`, `Function/Block level`, `Class level`, `Module level`], ans: `Function/Block level` },
              { q: `Can a variable's type change dynamically in ${tLang}?`, opts: [`Yes, always`, `No, never`, `Depends if ${tLang} is dynamically typed`, `Only for strings`], ans: `Depends if ${tLang} is dynamically typed` },
              { q: `How do you assign a value to a variable in ${tLang}?`, opts: [`x == 5`, `x = 5`, `x := 5`, `assign x 5`], ans: `x = 5` }
            ],
            'Loops': [
              { q: `Which loop executes at least once in ${tLang}?`, opts: [`for loop`, `while loop`, `do-while loop`, `foreach loop`], ans: `do-while loop` },
              { q: `How do you exit a loop early in ${tLang}?`, opts: [`exit`, `break`, `stop`, `return`], ans: `break` },
              { q: `What is the syntax for a 'for' loop in ${tLang}?`, opts: [`for(i=0; i<5; i++)`, `for i in range(5)`, `Both or either depending on ${tLang}`, `loop(5)`], ans: `Both or either depending on ${tLang}` },
              { q: `How do you skip an iteration in a loop in ${tLang}?`, opts: [`continue`, `skip`, `next`, `jump`], ans: `continue` },
              { q: `What is an infinite loop?`, opts: [`A loop that never starts`, `A loop that never terminates`, `A loop with 1000 iterations`, `A syntax error`], ans: `A loop that never terminates` }
            ],
            'Arrays': [
              { q: `How do you access the first element of an array in ${tLang}?`, opts: [`arr[1]`, `arr[0]`, `arr.first()`, `first(arr)`], ans: `arr[0]` },
              { q: `What is the index of the last element in an array of size N in ${tLang}?`, opts: [`N`, `N-1`, `N+1`, `Unknown`], ans: `N-1` },
              { q: `How do you find the length of an array in ${tLang}?`, opts: [`arr.length`, `len(arr)`, `Both are common in different languages`, `arr.size`], ans: `Both are common in different languages` },
              { q: `Can an array hold different data types in ${tLang}?`, opts: [`Yes, in dynamically typed languages`, `No, never`, `Only strings and ints`, `Always`], ans: `Yes, in dynamically typed languages` },
              { q: `How do you add an element to an array in ${tLang}?`, opts: [`push() or append()`, `add()`, `insert()`, `concat()`], ans: `push() or append()` }
            ],
            'Functions': [
              { q: `How do you define a function in ${tLang}?`, opts: [`def func()`, `function func()`, `void func()`, `Varies by ${tLang}`], ans: `Varies by ${tLang}` },
              { q: `How do you return a value from a function in ${tLang}?`, opts: [`give`, `return`, `send`, `output`], ans: `return` },
              { q: `What is a parameter in a function?`, opts: [`A variable in the function definition`, `The value passed to the function`, `The return type`, `The function name`], ans: `A variable in the function definition` },
              { q: `Can a function call itself in ${tLang}?`, opts: [`Yes, it's called recursion`, `No, it causes an error`, `Only in C++`, `Only in Python`], ans: `Yes, it's called recursion` },
              { q: `How do you invoke a function named 'test' in ${tLang}?`, opts: [`call test`, `test()`, `run test`, `execute test`], ans: `test()` }
            ],
            'Strings': [
              { q: `How do you concatenate two strings in ${tLang}?`, opts: [`+ operator`, `concat()`, `Both depending on ${tLang}`, `& operator`], ans: `Both depending on ${tLang}` },
              { q: `Are strings mutable in ${tLang}?`, opts: [`Always`, `Never`, `Depends on ${tLang} (e.g., Python is immutable)`, `Only if declared as var`], ans: `Depends on ${tLang} (e.g., Python is immutable)` },
              { q: `How do you find the length of a string in ${tLang}?`, opts: [`str.length()`, `len(str)`, `Depends on ${tLang}`, `str.size()`], ans: `Depends on ${tLang}` },
              { q: `How do you convert a string to uppercase in ${tLang}?`, opts: [`toUpperCase()`, `upper()`, `Varies by language`, `makeUpper()`], ans: `Varies by language` },
              { q: `How do you access the first character of a string in ${tLang}?`, opts: [`str[0]`, `str.charAt(0)`, `Depends on ${tLang}`, `first(str)`], ans: `Depends on ${tLang}` }
            ]
          };
          return tmpls[tTopic] || [];
        };

        const topicQuestions = getTemplates(lang, topic);
        
        topicQuestions.forEach((t, idx) => {
          quizzes.push({
            question: `${lang} ${topic} (${diff}) - Q${idx + 1}: ${t.q}`,
            options: t.opts,
            correctAnswer: t.ans,
            language: lang,
            topic: topic,
            difficulty: diff,
            type: 'topic',
            explanation: `Review the ${topic} syntax for ${lang} to understand why this is correct.`,
            resource: `Mastering ${topic} in ${lang} (${diff})`
          });
        });

        // Generate 2 Coding Problems per combination
        for (let i = 1; i <= 2; i++) {
          problems.push({
            title: `${lang} ${topic} Challenge ${i} (${diff})`,
            description: `Implement a solution that utilizes ${topic} using ${lang} at the ${diff} difficulty level. Your task is to output the string "Success".`,
            constraints: "Time: 1s, Memory: 256MB",
            inputDescription: "No specific input required for this basic challenge.",
            outputDescription: "Output exactly 'Success'.",
            testCases: [
              { input: "none", output: "Success", isHidden: false },
              { input: "test", output: "Success", isHidden: true }
            ],
            language: lang,
            topic: topic,
            difficulty: diff
          });
        }
      }
    }
  }

  await LearningContent.insertMany(learningData);
  console.log(`${learningData.length} Learning Content entries seeded.`);

  await Quiz.insertMany(quizzes);
  console.log(`${quizzes.length} Quizzes seeded.`);

  await CodingProblem.insertMany(problems);
  console.log(`${problems.length} Coding Problems seeded.`);

  mongoose.connection.close();
  console.log('Comprehensive Seeding process completed successfully.');
};

seedData();
