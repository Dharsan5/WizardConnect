import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  SparklesIcon, 
  BookOpenIcon, 
  UserGroupIcon,
  CubeIcon,
  TrophyIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';
import Footer from '../components/Footer';

const HomePage = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: "Smart Sorting Hat",
      description: "AI-powered personalized learning recommendations tailored to your unique learning style and goals.",
      link: "/sorting-hat",
      color: "#ffd700"
    },
    {
      icon: TrophyIcon,
      title: "Magical Duels",
      description: "Challenge fellow wizards in 1v1 coding battles and quiz competitions to test your skills.",
      link: "/duels",
      color: "#ff6b6b"
    },
    {
      icon: BookOpenIcon,
      title: "Enchanted Library",
      description: "Explore curated learning resources, quests, and magical knowledge from across the realm.",
      link: "/library",
      color: "#4ecdc4"
    },
    {
      icon: CubeIcon,
      title: "Holo-Classes",
      description: "Immersive AR learning experiences that bring complex concepts to life in 3D space.",
      link: "/holo-classes",
      color: "#45b7d1"
    },
    {
      icon: UserGroupIcon,
      title: "Wizard Network",
      description: "Connect with mentors and peers, form study groups, and collaborate on magical projects.",
      link: "/network",
      color: "#96ceb4"
    },
    {
      icon: AcademicCapIcon,
      title: "House System",
      description: "Join a house, earn points, and compete in the ultimate quest for knowledge supremacy.",
      link: "/dashboard",
      color: "#dda0dd"
    }
  ];

  return (
    <div className="homepage">
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1 
            className="wizard-title hero-title"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to WizardConnect
          </motion.h1>
          <motion.p 
            className="wizard-text hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Where Learning Becomes Magical ✨
          </motion.p>
          <motion.p 
            className="wizard-text hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            Join thousands of students across India in a personalized, gamified learning journey. 
            Discover your unique learning path, compete in magical duels, and connect with fellow wizards!
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
          >
            <Link to="/sorting-hat" className="magical-button cta-button">
              Begin Your Journey
            </Link>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className="features-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
      >
        <h2 className="wizard-title section-title">Magical Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card magical-card"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="feature-icon" style={{ color: feature.color }}>
                <feature.icon />
              </div>
              <h3 className="wizard-title feature-title">{feature.title}</h3>
              <p className="wizard-text feature-description">{feature.description}</p>
              <Link to={feature.link} className="feature-link">
                Explore →
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="stats-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <div className="stats-container">
          <div className="stat-item">
            <h3 className="wizard-title stat-number">10,000+</h3>
            <p className="wizard-text">Student Wizards</p>
          </div>
          <div className="stat-item">
            <h3 className="wizard-title stat-number">500+</h3>
            <p className="wizard-text">Learning Quests</p>
          </div>
          <div className="stat-item">
            <h3 className="wizard-title stat-number">1,000+</h3>
            <p className="wizard-text">Duels Completed</p>
          </div>
          <div className="stat-item">
            <h3 className="wizard-title stat-number">50+</h3>
            <p className="wizard-text">AR Modules</p>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default HomePage;
