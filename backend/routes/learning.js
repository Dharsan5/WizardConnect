const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/learning/resources
// @desc    Get learning resources
// @access  Public
router.get('/resources', async (req, res) => {
  try {
    // Mock learning resources data
    const resources = [
      {
        id: 1,
        title: "JavaScript Fundamentals",
        description: "Master the basics of JavaScript programming",
        category: "Web Development",
        difficulty: "Beginner",
        points: 100,
        duration: "4 hours",
        type: "Course"
      },
      {
        id: 2,
        title: "React.js Complete Guide",
        description: "Build modern web applications with React",
        category: "Frontend",
        difficulty: "Intermediate",
        points: 200,
        duration: "8 hours",
        type: "Course"
      },
      {
        id: 3,
        title: "Node.js API Development",
        description: "Create powerful backend APIs with Node.js",
        category: "Backend",
        difficulty: "Advanced",
        points: 300,
        duration: "6 hours",
        type: "Course"
      }
    ];
    res.json(resources);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/learning/progress
// @desc    Get user learning progress
// @access  Private
router.get('/progress', auth, async (req, res) => {
  try {
    // Mock progress data
    const progress = {
      completedCourses: 5,
      totalPoints: 1250,
      currentStreak: 7,
      weeklyGoal: 10,
      achievements: [
        "First Steps",
        "Code Warrior",
        "House Champion"
      ]
    };
    res.json(progress);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/learning/complete
// @desc    Mark course as completed
// @access  Private
router.post('/complete', auth, async (req, res) => {
  const { courseId, points } = req.body;

  try {
    // Here you would update the user's progress in the database
    res.json({ 
      message: 'Course completed successfully',
      pointsEarned: points
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
