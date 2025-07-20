import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  TrophyIcon, 
  ClockIcon,
  UserIcon,
  BoltIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { startDuel, endDuel, addPoints } from '../store/slices/gameSlice';

const Duels = () => {
  const dispatch = useDispatch();
  const { user, house, level } = useSelector(state => state.user);
  const { currentDuel, duelHistory } = useSelector(state => state.game);
  const [availableDuels, setAvailableDuels] = useState([]);
  const [duelType, setDuelType] = useState('coding');
  const [showDuelScreen, setShowDuelScreen] = useState(false);
  const [duelTimer, setDuelTimer] = useState(600); // 10 minutes

  useEffect(() => {
    // Simulate fetching available opponents
    const mockOpponents = [
      {
        id: 1,
        name: "Alex Wizard",
        house: "ravenclaw",
        level: 5,
        winRate: 75,
        specialty: "JavaScript",
        status: "online"
      },
      {
        id: 2,
        name: "Sarah Enchanter",
        house: "gryffindor",
        level: 7,
        winRate: 82,
        specialty: "Python",
        status: "online"
      },
      {
        id: 3,
        name: "Mike Sorcerer",
        house: "hufflepuff",
        level: 4,
        winRate: 68,
        specialty: "React",
        status: "in-duel"
      },
      {
        id: 4,
        name: "Luna Mystique",
        house: "slytherin",
        level: 8,
        winRate: 90,
        specialty: "Algorithms",
        status: "online"
      }
    ];
    
    setAvailableDuels(mockOpponents);
  }, []);

  useEffect(() => {
    let timer;
    if (showDuelScreen && duelTimer > 0) {
      timer = setTimeout(() => {
        setDuelTimer(duelTimer - 1);
      }, 1000);
    } else if (duelTimer === 0) {
      handleDuelEnd();
    }
    return () => clearTimeout(timer);
  }, [showDuelScreen, duelTimer]);

  const handleStartDuel = (opponent) => {
    const newDuel = {
      id: Date.now(),
      opponent,
      type: duelType,
      startTime: new Date(),
      status: 'active'
    };
    
    dispatch(startDuel(newDuel));
    setShowDuelScreen(true);
    setDuelTimer(600);
  };

  const handleDuelEnd = (result = 'timeout') => {
    const duelResult = {
      ...currentDuel,
      endTime: new Date(),
      result,
      pointsEarned: result === 'win' ? 100 : result === 'draw' ? 50 : 25
    };
    
    dispatch(endDuel(duelResult));
    dispatch(addPoints(duelResult.pointsEarned));
    setShowDuelScreen(false);
    setDuelTimer(600);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const duelTypes = [
    {
      id: 'coding',
      name: 'Coding Duel',
      description: 'Solve coding challenges faster than your opponent',
      icon: '💻',
      color: '#4ecdc4'
    },
    {
      id: 'quiz',
      name: 'Knowledge Quiz',
      description: 'Answer tech questions correctly and quickly',
      icon: '🧠',
      color: '#45b7d1'
    },
    {
      id: 'debug',
      name: 'Bug Hunt',
      description: 'Find and fix bugs faster than anyone else',
      icon: '🐛',
      color: '#ff6b6b'
    },
    {
      id: 'design',
      name: 'Design Challenge',
      description: 'Create the best UI/UX solution',
      icon: '🎨',
      color: '#dda0dd'
    }
  ];

  if (showDuelScreen && currentDuel) {
    return (
      <div className="duel-screen">
        <motion.div 
          className="duel-arena"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="duel-header">
            <div className="duel-timer">
              <ClockIcon className="timer-icon" />
              <span className="timer-text">{formatTime(duelTimer)}</span>
            </div>
            <h2 className="wizard-title duel-title">
              {duelType.charAt(0).toUpperCase() + duelType.slice(1)} Duel
            </h2>
          </div>

          <div className="duel-participants">
            <div className="participant you">
              <div className={`participant-card house-${house?.toLowerCase()}`}>
                <UserIcon className="participant-icon" />
                <h3 className="wizard-title">You</h3>
                <p className="wizard-text">Level {level}</p>
                <div className="health-bar">
                  <div className="health-fill" style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            <div className="vs-divider">
              <BoltIcon className="vs-icon" />
              <span className="wizard-title">VS</span>
            </div>

            <div className="participant opponent">
              <div className={`participant-card house-${currentDuel.opponent.house}`}>
                <UserIcon className="participant-icon" />
                <h3 className="wizard-title">{currentDuel.opponent.name}</h3>
                <p className="wizard-text">Level {currentDuel.opponent.level}</p>
                <div className="health-bar">
                  <div className="health-fill" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="duel-challenge">
            <div className="challenge-container magical-card">
              <h3 className="wizard-title">Challenge: React Component Optimization</h3>
              <p className="wizard-text challenge-description">
                Optimize the given React component to reduce unnecessary re-renders 
                and improve performance. You have 10 minutes to complete this task.
              </p>
              
              <div className="code-editor">
                <textarea 
                  className="code-input"
                  placeholder="Write your optimized code here..."
                  rows={15}
                />
              </div>
              
              <div className="duel-actions">
                <button 
                  className="magical-button"
                  onClick={() => handleDuelEnd('win')}
                >
                  Submit Solution
                </button>
                <button 
                  className="magical-button secondary"
                  onClick={() => handleDuelEnd('forfeit')}
                >
                  Forfeit Duel
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="duels-page">
      <motion.div 
        className="duels-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="wizard-title page-title">
          <TrophyIcon className="title-icon" />
          Magical Duels Arena
        </h1>
        <p className="wizard-text page-description">
          Challenge fellow wizards and prove your coding prowess!
        </p>
      </motion.div>

      <div className="duels-content">
        {/* Duel Types */}
        <motion.section 
          className="duel-types"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="wizard-title section-title">Choose Your Battle</h2>
          <div className="duel-types-grid">
            {duelTypes.map((type) => (
              <motion.div
                key={type.id}
                className={`duel-type-card magical-card ${duelType === type.id ? 'selected' : ''}`}
                onClick={() => setDuelType(type.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="type-icon" style={{ color: type.color }}>
                  {type.icon}
                </div>
                <h3 className="wizard-title type-name">{type.name}</h3>
                <p className="wizard-text type-description">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Available Opponents */}
        <motion.section 
          className="available-opponents"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="wizard-title section-title">Available Opponents</h2>
          <div className="opponents-list">
            {availableDuels.map((opponent, index) => (
              <motion.div
                key={opponent.id}
                className={`opponent-card magical-card house-${opponent.house}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <div className="opponent-info">
                  <div className="opponent-avatar">
                    <UserIcon className="avatar-icon" />
                    <div className={`status-indicator ${opponent.status}`} />
                  </div>
                  <div className="opponent-details">
                    <h3 className="wizard-title opponent-name">{opponent.name}</h3>
                    <p className="wizard-text opponent-house">{opponent.house}</p>
                    <div className="opponent-stats">
                      <span className="stat">
                        <ShieldCheckIcon className="stat-icon" />
                        Level {opponent.level}
                      </span>
                      <span className="stat">
                        <TrophyIcon className="stat-icon" />
                        {opponent.winRate}% Win Rate
                      </span>
                    </div>
                    <p className="wizard-text specialty">
                      Specialty: {opponent.specialty}
                    </p>
                  </div>
                </div>
                
                <div className="challenge-actions">
                  {opponent.status === 'online' ? (
                    <button 
                      className="magical-button challenge-btn"
                      onClick={() => handleStartDuel(opponent)}
                    >
                      <BoltIcon className="btn-icon" />
                      Challenge
                    </button>
                  ) : (
                    <button className="magical-button disabled" disabled>
                      {opponent.status === 'in-duel' ? 'In Duel' : 'Offline'}
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Duel History */}
        <motion.section 
          className="duel-history"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h2 className="wizard-title section-title">Recent Duels</h2>
          {duelHistory.length > 0 ? (
            <div className="history-list">
              {duelHistory.slice(-5).map((duel, index) => (
                <div key={duel.id} className="history-item magical-card">
                  <div className="duel-participants-mini">
                    <span className="wizard-text">You vs {duel.opponent.name}</span>
                    <span className={`result-badge ${duel.result}`}>
                      {duel.result}
                    </span>
                  </div>
                  <div className="duel-details">
                    <span className="wizard-text">{duel.type} Duel</span>
                    <span className="wizard-text">+{duel.pointsEarned} pts</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-history magical-card">
              <p className="wizard-text">No duels yet. Challenge someone to get started!</p>
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
};

export default Duels;
