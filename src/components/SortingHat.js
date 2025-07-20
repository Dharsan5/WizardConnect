import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { setHouse, updatePreferences, addPoints } from '../store/slices/userSlice';
import { SparklesIcon, StarIcon } from '@heroicons/react/24/outline';

const SortingHat = () => {
  const dispatch = useDispatch();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [assignedHouse, setAssignedHouse] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What type of learning environment motivates you most?",
      options: [
        { text: "Collaborative group projects", house: "hufflepuff", style: "collaborative" },
        { text: "Competitive challenges", house: "gryffindor", style: "competitive" },
        { text: "Independent research", house: "ravenclaw", style: "analytical" },
        { text: "Strategic problem-solving", house: "slytherin", style: "strategic" }
      ]
    },
    {
      id: 2,
      question: "Which programming concept excites you most?",
      options: [
        { text: "Building user interfaces", house: "hufflepuff", interest: "frontend" },
        { text: "Solving algorithms", house: "ravenclaw", interest: "algorithms" },
        { text: "Creating systems", house: "slytherin", interest: "backend" },
        { text: "Mobile development", house: "gryffindor", interest: "mobile" }
      ]
    },
    {
      id: 3,
      question: "How do you prefer to learn new technologies?",
      options: [
        { text: "Hands-on projects", house: "gryffindor", method: "practical" },
        { text: "Reading documentation", house: "ravenclaw", method: "theoretical" },
        { text: "Video tutorials", house: "hufflepuff", method: "visual" },
        { text: "Mentorship & guidance", house: "slytherin", method: "guided" }
      ]
    },
    {
      id: 4,
      question: "What's your ideal project outcome?",
      options: [
        { text: "Helping others solve problems", house: "hufflepuff", goal: "helpful" },
        { text: "Pushing technological boundaries", house: "ravenclaw", goal: "innovative" },
        { text: "Building successful products", house: "slytherin", goal: "commercial" },
        { text: "Creating something impactful", house: "gryffindor", goal: "impactful" }
      ]
    },
    {
      id: 5,
      question: "Which difficulty level do you prefer?",
      options: [
        { text: "Gradual progression", house: "hufflepuff", difficulty: "beginner" },
        { text: "Balanced challenges", house: "gryffindor", difficulty: "intermediate" },
        { text: "Complex problems", house: "ravenclaw", difficulty: "advanced" },
        { text: "Adaptive difficulty", house: "slytherin", difficulty: "adaptive" }
      ]
    }
  ];

  const houses = {
    gryffindor: {
      name: "Gryffindor",
      description: "Bold and brave learners who thrive on challenges and innovative projects!",
      traits: ["Courageous", "Determined", "Innovative", "Leadership"],
      color: "#740001",
      icon: "🦁"
    },
    hufflepuff: {
      name: "Hufflepuff",
      description: "Collaborative and patient learners who excel in team environments!",
      traits: ["Loyal", "Patient", "Collaborative", "Supportive"],
      color: "#ecb939",
      icon: "🦡"
    },
    ravenclaw: {
      name: "Ravenclaw",
      description: "Analytical and curious learners who love deep technical knowledge!",
      traits: ["Wise", "Analytical", "Creative", "Curious"],
      color: "#0e1a40",
      icon: "🦅"
    },
    slytherin: {
      name: "Slytherin",
      description: "Strategic and ambitious learners who excel at systematic problem-solving!",
      traits: ["Ambitious", "Strategic", "Resourceful", "Leadership"],
      color: "#1a472a",
      icon: "🐍"
    }
  };

  const handleAnswer = (option) => {
    setAnswers([...answers, option]);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      analyzeAnswers([...answers, option]);
    }
  };

  const analyzeAnswers = (allAnswers) => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const houseScores = {
        gryffindor: 0,
        hufflepuff: 0,
        ravenclaw: 0,
        slytherin: 0
      };

      // Calculate house scores based on answers
      allAnswers.forEach(answer => {
        if (answer.house) {
          houseScores[answer.house]++;
        }
      });

      // Find the house with highest score
      const sortedHouses = Object.entries(houseScores).sort((a, b) => b[1] - a[1]);
      const selectedHouse = sortedHouses[0][0];
      
      // Extract learning preferences
      const preferences = {
        learningStyle: allAnswers.find(a => a.style)?.style || 'balanced',
        interests: allAnswers.filter(a => a.interest).map(a => a.interest),
        difficulty: allAnswers.find(a => a.difficulty)?.difficulty || 'intermediate',
        method: allAnswers.find(a => a.method)?.method || 'mixed',
        goal: allAnswers.find(a => a.goal)?.goal || 'general'
      };

      setAssignedHouse(selectedHouse);
      dispatch(setHouse(selectedHouse));
      dispatch(updatePreferences(preferences));
      dispatch(addPoints(50)); // Bonus points for completing sorting
      
      setIsAnalyzing(false);
      setShowResult(true);
    }, 3000);
  };

  const resetSorting = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setAssignedHouse(null);
    setIsAnalyzing(false);
  };

  if (isAnalyzing) {
    return (
      <div className="sorting-hat-container">
        <motion.div 
          className="analyzing-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="hat-icon"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity
            }}
          >
            🎩
          </motion.div>
          <h2 className="wizard-title">The Sorting Hat is analyzing your responses...</h2>
          <motion.div
            className="thinking-dots"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <SparklesIcon className="sparkle-icon" />
          </motion.div>
          <p className="wizard-text">Considering your learning style, interests, and goals...</p>
        </motion.div>
      </div>
    );
  }

  if (showResult && assignedHouse) {
    const house = houses[assignedHouse];
    
    return (
      <div className="sorting-hat-container">
        <motion.div 
          className="result-screen"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="house-announcement"
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h1 className="wizard-title">🎉 Congratulations! 🎉</h1>
            <motion.div
              className={`house-result house-${assignedHouse}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="house-icon">{house.icon}</div>
              <h2 className="wizard-title house-name">{house.name}</h2>
              <p className="wizard-text house-description">{house.description}</p>
            </motion.div>
          </motion.div>

          <motion.div
            className="house-traits"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <h3 className="wizard-title">Your Traits:</h3>
            <div className="traits-list">
              {house.traits.map((trait, index) => (
                <motion.span
                  key={trait}
                  className="trait-badge"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                >
                  <StarIcon className="trait-icon" />
                  {trait}
                </motion.span>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="action-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
          >
            <button className="magical-button" onClick={() => window.location.href = '/dashboard'}>
              Enter Your House
            </button>
            <button className="magical-button secondary" onClick={resetSorting}>
              Take Quiz Again
            </button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="sorting-hat-container">
      <motion.div 
        className="sorting-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hat-header">
          <motion.div
            className="hat-icon"
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity
            }}
          >
            🎩
          </motion.div>
          <h1 className="wizard-title">The Sorting Hat</h1>
          <p className="wizard-text">
            Let me analyze your learning style and assign you to the perfect house!
          </p>
        </div>

        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            className="question-container"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="wizard-title question-title">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="wizard-text question-text">
              {questions[currentQuestion].question}
            </p>
            
            <div className="options-container">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  className="option-button magical-card"
                  onClick={() => handleAnswer(option)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SortingHat;
