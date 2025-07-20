const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

// @route   GET api/duels/active
// @desc    Get active duels
// @access  Private
router.get('/active', auth, async (req, res) => {
  try {
    // Mock active duels data
    const activeDuels = [
      {
        id: 1,
        opponent: "Harry Potter",
        opponentHouse: "Gryffindor",
        type: "Coding Challenge",
        timeLeft: "5:30",
        difficulty: "Medium",
        prize: 150
      },
      {
        id: 2,
        opponent: "Hermione Granger",
        opponentHouse: "Gryffindor", 
        type: "Algorithm Race",
        timeLeft: "3:15",
        difficulty: "Hard",
        prize: 250
      }
    ];
    res.json(activeDuels);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/duels/create
// @desc    Create a new duel
// @access  Private
router.post('/create', auth, async (req, res) => {
  const { type, difficulty, prize } = req.body;

  try {
    // Here you would create a new duel in the database
    const newDuel = {
      id: Date.now(),
      creator: req.user.id,
      type,
      difficulty,
      prize,
      status: 'waiting',
      createdAt: new Date()
    };

    res.json({ 
      message: 'Duel created successfully',
      duel: newDuel
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/duels/join
// @desc    Join a duel
// @access  Private
router.post('/join/:id', auth, async (req, res) => {
  try {
    const duelId = req.params.id;
    
    // Here you would update the duel to add the joining user
    res.json({ 
      message: 'Successfully joined the duel',
      duelId
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/duels/history
// @desc    Get user's duel history
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    // Mock duel history
    const history = [
      {
        id: 1,
        opponent: "Ron Weasley",
        result: "Won",
        points: 100,
        type: "JavaScript Quiz",
        date: "2025-07-19"
      },
      {
        id: 2,
        opponent: "Draco Malfoy",
        result: "Lost",
        points: -50,
        type: "Algorithm Challenge",
        date: "2025-07-18"
      }
    ];
    res.json(history);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
