import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  SparklesIcon,
  BookOpenIcon,
  TrophyIcon,
  UserGroupIcon,
  CubeIcon,
  EnvelopeIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: 'Dashboard', link: '/dashboard' },
      { name: 'Sorting Hat', link: '/sorting-hat' },
      { name: 'Magical Library', link: '/library' },
      { name: 'Duels Arena', link: '/duels' },
      { name: 'Holo-Classes', link: '/holo-classes' },
      { name: 'Wizard Network', link: '/network' }
    ],
    learn: [
      { name: 'JavaScript', link: '/library?category=javascript' },
      { name: 'React', link: '/library?category=react' },
      { name: 'Python', link: '/library?category=python' },
      { name: 'Data Science', link: '/library?category=data-science' },
      { name: 'AI/ML', link: '/library?category=ai-ml' },
      { name: 'Web Development', link: '/library?category=web-dev' }
    ],
    community: [
      { name: 'Find Mentors', link: '/network?type=mentors' },
      { name: 'Study Groups', link: '/network?type=groups' },
      { name: 'Leaderboards', link: '/dashboard#leaderboard' },
      { name: 'Help Center', link: '/help' },
      { name: 'Contact Us', link: '/contact' },
      { name: 'Discord', link: 'https://discord.gg/wizardconnect' }
    ]
  };

  return (
    <footer className="wizard-footer">
      <div className="footer-content">
        <div className="footer-main">
          {/* Brand Section */}
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="brand-header">
              <SparklesIcon className="brand-icon" />
              <h3 className="wizard-title brand-title">WizardConnect</h3>
            </div>
            <p className="wizard-text brand-description">
              Master the art of coding through magical learning experiences. 
              Join thousands of wizards on their journey to programming mastery.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Twitter">
                <span>🐦</span>
              </a>
              <a href="#" className="social-link" aria-label="GitHub">
                <span>🐱</span>
              </a>
              <a href="#" className="social-link" aria-label="Discord">
                <span>💬</span>
              </a>
              <a href="#" className="social-link" aria-label="LinkedIn">
                <span>💼</span>
              </a>
            </div>
          </motion.div>

          {/* Links Sections */}
          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="link-column">
              <h4 className="wizard-title link-title">Platform</h4>
              <ul className="link-list">
                {footerLinks.platform.map((item, index) => (
                  <li key={item.name}>
                    <Link to={item.link} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-column">
              <h4 className="wizard-title link-title">Learn</h4>
              <ul className="link-list">
                {footerLinks.learn.map((item, index) => (
                  <li key={item.name}>
                    <Link to={item.link} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="link-column">
              <h4 className="wizard-title link-title">Community</h4>
              <ul className="link-list">
                {footerLinks.community.map((item, index) => (
                  <li key={item.name}>
                    <Link to={item.link} className="footer-link">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div 
            className="footer-newsletter"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="wizard-title newsletter-title">
              <EnvelopeIcon className="newsletter-icon" />
              Magical Updates
            </h4>
            <p className="wizard-text newsletter-description">
              Get the latest spells, quests, and magical learning content delivered to your owl post.
            </p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your magical email..."
                className="newsletter-input"
              />
              <button className="magical-button newsletter-button">
                Subscribe ✨
              </button>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="footer-bottom-content">
            <p className="wizard-text copyright">
              © 2025 WizardConnect. Made with <HeartIcon className="heart-icon" /> for magical learning.
            </p>
            <div className="footer-legal">
              <Link to="/privacy" className="legal-link">Privacy Policy</Link>
              <Link to="/terms" className="legal-link">Terms of Service</Link>
              <Link to="/cookies" className="legal-link">Cookie Policy</Link>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
