const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   POST api/ai/house-prediction
// @desc    Get house prediction for user
// @access  Private
router.post('/house-prediction', auth, async (req, res) => {
  try {
    const { answers } = req.body;
    
    // Mock AI house prediction logic
    const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
    const traits = {
      Gryffindor: ['brave', 'daring', 'chivalrous'],
      Hufflepuff: ['loyal', 'patient', 'kind'],
      Ravenclaw: ['intelligent', 'creative', 'wise'],
      Slytherin: ['ambitious', 'cunning', 'resourceful']
    };

    // Simple logic based on answers (in real implementation, this would use ML)
    let scores = { Gryffindor: 0, Hufflepuff: 0, Ravenclaw: 0, Slytherin: 0 };
    
    answers.forEach(answer => {
      if (answer.includes('brave') || answer.includes('adventure')) {
        scores.Gryffindor += 2;
      }
      if (answer.includes('loyal') || answer.includes('friend')) {
        scores.Hufflepuff += 2;
      }
      if (answer.includes('smart') || answer.includes('study')) {
        scores.Ravenclaw += 2;
      }
      if (answer.includes('ambitious') || answer.includes('success')) {
        scores.Slytherin += 2;
      }
    });

    const predictedHouse = Object.keys(scores).reduce((a, b) => 
      scores[a] > scores[b] ? a : b
    );

    res.json({
      house: predictedHouse,
      confidence: Math.max(...Object.values(scores)) / 10,
      traits: traits[predictedHouse],
      explanation: `Based on your answers, you show strong ${traits[predictedHouse].join(', ')} characteristics.`
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/ai/recommendations
// @desc    Get personalized learning recommendations
// @access  Private
router.get('/recommendations', auth, async (req, res) => {
  try {
    // Mock AI recommendations
    const recommendations = [
      {
        id: 1,
        title: "Advanced React Patterns",
        reason: "Based on your JavaScript progress",
        difficulty: "Intermediate",
        estimatedTime: "3 hours",
        points: 200
      },
      {
        id: 2,
        title: "Node.js Security Best Practices",
        reason: "Recommended for backend developers",
        difficulty: "Advanced",
        estimatedTime: "2 hours",
        points: 180
      },
      {
        id: 3,
        title: "CSS Grid & Flexbox Mastery",
        reason: "Complete your frontend skills",
        difficulty: "Beginner",
        estimatedTime: "4 hours",
        points: 150
      }
    ];

    res.json(recommendations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/ai/analyze-progress
// @desc    Analyze user's learning progress
// @access  Private
router.post('/analyze-progress', auth, async (req, res) => {
  try {
    const { learningData } = req.body;

    // Mock progress analysis
    const analysis = {
      strengths: ["Problem Solving", "JavaScript", "React"],
      improvements: ["Algorithm Optimization", "System Design"],
      nextSteps: [
        "Focus on data structures and algorithms",
        "Practice system design problems",
        "Build a full-stack project"
      ],
      learningStyle: "Visual learner with hands-on preference",
      recommendedPath: "Full-Stack Development Track"
    };

    res.json(analysis);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
