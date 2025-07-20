import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { 
  HomeIcon, 
  BookOpenIcon, 
  CubeIcon, 
  UsersIcon,
  TrophyIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const location = useLocation();
  const { user, house, points, level } = useSelector(state => state.user);

  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/dashboard', icon: SparklesIcon, label: 'Dashboard' },
    { path: '/library', icon: BookOpenIcon, label: 'Magical Library' },
    { path: '/duels', icon: TrophyIcon, label: 'Duels' },
    { path: '/holo-classes', icon: CubeIcon, label: 'Holo-Classes' },
    { path: '/network', icon: UsersIcon, label: 'Wizard Network' }
  ];

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <SparklesIcon className="logo-icon" />
          <span className="wizard-title">WizardConnect</span>
        </Link>
        
        <div className="nav-menu">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <IconComponent className="nav-icon" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {user && (
          <div className="user-info">
            <div className={`house-badge ${house?.toLowerCase()}`}>
              <span className="house-name">{house}</span>
            </div>
            <div className="level-display">
              Level {level}
            </div>
            <div className="points-display">
              {points} pts
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
