const LearningContent = require('../models/LearningContent');

const getContent = async (req, res) => {
  try {
    // Support both path params and query params
    const language = req.params.language || req.query.language || 'Python';
    const topic = req.params.topic || req.query.topic;
    const difficulty = req.params.difficulty || req.query.difficulty;

    if (!topic || !difficulty) {
      return res.status(400).json({ message: 'Topic and difficulty are required.' });
    }
    
    // Convert to proper casing for matching
    const capLang = language.charAt(0).toUpperCase() + language.slice(1).toLowerCase();
    const capTopic = topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase();
    const capDiff = difficulty.charAt(0).toUpperCase() + difficulty.slice(1).toLowerCase();

    const content = await LearningContent.findOne({ 
      language: capLang, 
      topic: capTopic, 
      difficulty: capDiff 
    });

    if (!content) {
      return res.status(404).json({ message: 'Content not found for this level.' });
    }

    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTopics = async (req, res) => {
  try {
    const language = req.query.language || 'Python';
    const capLang = language.charAt(0).toUpperCase() + language.slice(1).toLowerCase();
    
    const topics = await LearningContent.distinct('topic', { language: capLang });
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLevels = async (req, res) => {
  try {
    const language = req.query.language || 'Python';
    const topic = req.query.topic;
    
    if (!topic) {
      return res.status(400).json({ message: 'Topic is required.' });
    }

    const capLang = language.charAt(0).toUpperCase() + language.slice(1).toLowerCase();
    const capTopic = topic.charAt(0).toUpperCase() + topic.slice(1).toLowerCase();
    
    const levels = await LearningContent.distinct('difficulty', { 
      language: capLang, 
      topic: capTopic 
    });
    
    res.status(200).json(levels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getContent, getTopics, getLevels };
