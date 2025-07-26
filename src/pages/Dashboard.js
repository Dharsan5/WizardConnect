import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  TrophyIcon, 
  BookOpenIcon, 
  SparklesIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { addActiveQuest, updateRecommendations } from '../store/slices/learningSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user, house = 'Gryffindor', points = 1250, level = 5, experience = 75 } = useSelector(state => state.user);
  const { houses = {
    gryffindor: { points: 2450, members: [] },
    hufflepuff: { points: 2380, members: [] },
    ravenclaw: { points: 2420, members: [] },
    slytherin: { points: 2400, members: [] }
  } } = useSelector(state => state.game);
  const { activeQuests = [], recommendations = [] } = useSelector(state => state.learning);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Update time every minute for dynamic greeting
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const getTimeGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  useEffect(() => {
    // Simulate fetching personalized recommendations
    const mockRecommendations = [
      {
        id: 1,
        title: "React Hooks Mastery",
        description: "Master modern React patterns",
        difficulty: "Intermediate",
        estimatedTime: "2 hours",
        type: "course"
      },
      {
        id: 2,
        title: "JavaScript Algorithms",
        description: "Strengthen your problem-solving skills",
        difficulty: "Advanced",
        estimatedTime: "3 hours",
        type: "practice"
      },
      {
        id: 3,
        title: "Node.js Backend Development",
        description: "Build scalable server applications",
        difficulty: "Intermediate",
        estimatedTime: "4 hours",
        type: "project"
      }
    ];
    
    dispatch(updateRecommendations(mockRecommendations));
  }, [dispatch]);

  const quickActions = [
    {
      title: "Start a Duel",
      description: "Challenge another wizard",
      icon: TrophyIcon,
      link: "/duels",
      color: "#ff6b6b",
      gradient: "linear-gradient(135deg, #ff6b6b, #ee5a52)"
    },
    {
      title: "Visit Library",
      description: "Explore learning resources",
      icon: BookOpenIcon,
      link: "/library",
      color: "#4ecdc4",
      gradient: "linear-gradient(135deg, #4ecdc4, #44a08d)"
    },
    {
      title: "Join Holo-Class",
      description: "Immersive AR learning",
      icon: SparklesIcon,
      link: "/holo-classes",
      color: "#45b7d1",
      gradient: "linear-gradient(135deg, #45b7d1, #3a9bc1)"
    },
    {
      title: "Find Mentors",
      description: "Connect with experts",
      icon: UserGroupIcon,
      link: "/network",
      color: "#96ceb4",
      gradient: "linear-gradient(135deg, #96ceb4, #85c9a3)"
    }
  ];

  const experiencePercentage = ((experience % 100) / 100) * 100;

  return (
    <div className="dashboard">
      {/* Floating magical elements */}
      <div className="magical-particles">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 40 - 20, 0],
              rotate: [0, 360],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
            style={{
              position: 'absolute',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              background: `hsl(${45 + Math.random() * 15}, 100%, ${70 + Math.random() * 20}%)`,
              borderRadius: '50%',
              boxShadow: `0 0 ${8 + Math.random() * 12}px currentColor`,
              zIndex: 1,
            }}
          />
        ))}
      </div>

      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="welcome-section">
          <h1 className="wizard-title">{getTimeGreeting()}, Wizard!</h1>
          <p className="wizard-text">Ready to continue your magical learning journey?</p>
        </div>
        
        {house && (
          <motion.div 
            className={`house-display house-${house.toLowerCase()}`}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="house-info">
              <div className="house-header">
                <div className="house-icon-display">
                  {house.toLowerCase() === 'gryffindor' && '🦁'}
                  {house.toLowerCase() === 'hufflepuff' && '🦡'}
                  {house.toLowerCase() === 'ravenclaw' && '🦅'}
                  {house.toLowerCase() === 'slytherin' && '🐍'}
                </div>
                <h3 className="house-name">{house}</h3>
              </div>
              <div className="house-stats">
                <span>Level {level}</span>
                <span>{points} Points</span>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="dashboard-grid">
        {/* Stats Overview */}
        <motion.div 
          className="stats-overview magical-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="wizard-title card-title">Your Progress</h3>
          <div className="stats-content">
            <div className="level-progress">
              <div className="level-info">
                <span className="wizard-text">Level {level}</span>
                <span className="wizard-text">{experience}/100 XP</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${experiencePercentage}%` }}
                />
              </div>
            </div>
            
            <div className="streak-display">
              <ClockIcon className="streak-icon" />
              <span className="wizard-text">
                {dailyStreak} day learning streak! 🔥
              </span>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          className="quick-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="wizard-title section-title">Quick Actions</h3>
          <div className="actions-grid">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                className="action-card magical-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={action.link} className="action-link">
                  <div 
                    className="action-icon" 
                    style={{ 
                      background: action.gradient,
                      color: '#ffffff'
                    }}
                  >
                    <action.icon />
                  </div>
                  <h4 className="wizard-title action-title">{action.title}</h4>
                  <p className="wizard-text action-description">{action.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Recommendations */}
        <motion.div 
          className="recommendations magical-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="wizard-title card-title">
            <SparklesIcon className="title-icon" />
            AI Recommendations
          </h3>
          <div className="recommendations-list">
            {recommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                className="recommendation-item"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <div className="rec-header">
                  <h4 className="wizard-title rec-title">{rec.title}</h4>
                  <span className={`difficulty-badge ${rec.difficulty.toLowerCase()}`}>
                    {rec.difficulty}
                  </span>
                </div>
                <p className="wizard-text rec-description">{rec.description}</p>
                <div className="rec-meta">
                  <span className="wizard-text">⏱️ {rec.estimatedTime}</span>
                  <span className="wizard-text">📚 {rec.type}</span>
                </div>
                <button 
                  className="magical-button rec-button"
                  onClick={() => {
                    dispatch(addActiveQuest({
                      ...rec,
                      startDate: new Date(),
                      progress: 0,
                      isActive: true
                    }));
                    // You could also navigate to the quest/course page here
                    // navigate(`/quest/${rec.id}`);
                  }}
                >
                  Start Quest
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* House Leaderboard */}
        <motion.div 
          className="house-leaderboard magical-card"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="wizard-title card-title">
            <ChartBarIcon className="title-icon" />
            House Championship
          </h3>
          <div className="leaderboard-list">
            {Object.entries(houses)
              .sort((a, b) => b[1].points - a[1].points)
              .map(([houseName, houseData], index) => (
                <div key={houseName} className={`leaderboard-item ${houseName}`}>
                  <span className="house-position">#{index + 1}</span>
                  <span className="house-name">{houseName}</span>
                  <span className="house-points">{houseData.points} pts</span>
                </div>
            ))}
          </div>
        </motion.div>

        {/* Active Quests */}
        <motion.div 
          className="active-quests magical-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="wizard-title card-title">Active Quests</h3>
          {activeQuests.length > 0 ? (
            <div className="quests-list">
              {activeQuests.map((quest) => (
                <div key={quest.id} className="quest-item">
                  <h4 className="wizard-title quest-title">{quest.title}</h4>
                  <p className="wizard-text quest-description">{quest.description}</p>
                  <div className="quest-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '40%' }} />
                    </div>
                    <span className="wizard-text">40% Complete</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-quests">
              <p className="wizard-text">No active quests. Start a new learning adventure!</p>
              <Link to="/library" className="magical-button">
                Explore Library
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
