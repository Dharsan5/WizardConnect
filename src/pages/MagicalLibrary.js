import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { 
  BookOpenIcon, 
  MagnifyingGlassIcon,
  TagIcon,
  ClockIcon,
  StarIcon,
  PlayIcon
} from '@heroicons/react/24/outline';
import { addActiveQuest, addResource } from '../store/slices/learningSlice';

const MagicalLibrary = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);

  const categories = [
    { id: 'all', name: 'All Spells', icon: '🌟' },
    { id: 'frontend', name: 'Frontend Magic', icon: '🎨' },
    { id: 'backend', name: 'Backend Sorcery', icon: '⚡' },
    { id: 'mobile', name: 'Mobile Enchantments', icon: '📱' },
    { id: 'ai', name: 'AI Wizardry', icon: '🤖' },
    { id: 'devops', name: 'DevOps Alchemy', icon: '🔧' },
    { id: 'algorithms', name: 'Algorithm Scrolls', icon: '📊' }
  ];

  useEffect(() => {
    // Simulate fetching library resources
    const mockResources = [
      {
        id: 1,
        title: "React Fundamentals Quest",
        description: "Master the basics of React with hands-on projects and interactive challenges.",
        category: "frontend",
        difficulty: "Beginner",
        duration: "4 hours",
        rating: 4.8,
        type: "course",
        tags: ["react", "javascript", "components"],
        progress: 0,
        thumbnail: "🏗️"
      },
      {
        id: 2,
        title: "Node.js Backend Mastery",
        description: "Build scalable backend applications with Node.js and Express.",
        category: "backend",
        difficulty: "Intermediate",
        duration: "6 hours",
        rating: 4.9,
        type: "course",
        tags: ["nodejs", "express", "mongodb"],
        progress: 0,
        thumbnail: "🚀"
      },
      {
        id: 3,
        title: "Algorithm Design Patterns",
        description: "Learn essential algorithms and data structures for coding interviews.",
        category: "algorithms",
        difficulty: "Advanced",
        duration: "8 hours",
        rating: 4.7,
        type: "practice",
        tags: ["algorithms", "data-structures", "optimization"],
        progress: 0,
        thumbnail: "🧮"
      },
      {
        id: 4,
        title: "Mobile App Development with React Native",
        description: "Create beautiful mobile apps that work on both iOS and Android.",
        category: "mobile",
        difficulty: "Intermediate",
        duration: "10 hours",
        rating: 4.6,
        type: "project",
        tags: ["react-native", "mobile", "ios", "android"],
        progress: 0,
        thumbnail: "📱"
      },
      {
        id: 5,
        title: "Machine Learning Fundamentals",
        description: "Dive into the world of AI and machine learning with Python.",
        category: "ai",
        difficulty: "Advanced",
        duration: "12 hours",
        rating: 4.9,
        type: "course",
        tags: ["python", "tensorflow", "ml", "ai"],
        progress: 0,
        thumbnail: "🤖"
      },
      {
        id: 6,
        title: "Docker & Kubernetes Mastery",
        description: "Containerize applications and orchestrate them at scale.",
        category: "devops",
        difficulty: "Advanced",
        duration: "8 hours",
        rating: 4.8,
        type: "course",
        tags: ["docker", "kubernetes", "containers", "devops"],
        progress: 0,
        thumbnail: "🐳"
      }
    ];
    
    setResources(mockResources);
    setFilteredResources(mockResources);
  }, []);

  useEffect(() => {
    let filtered = resources;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(resource => resource.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    setFilteredResources(filtered);
  }, [resources, selectedCategory, searchTerm]);

  const handleStartQuest = (resource) => {
    const quest = {
      ...resource,
      startDate: new Date(),
      status: 'active'
    };
    dispatch(addActiveQuest(quest));
    dispatch(addResource(quest));
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return '#4ecdc4';
      case 'intermediate': return '#ffd700';
      case 'advanced': return '#ff6b6b';
      default: return '#96ceb4';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'course': return '📚';
      case 'practice': return '⚔️';
      case 'project': return '🏗️';
      default: return '📖';
    }
  };

  return (
    <div className="magical-library">
      <motion.div 
        className="library-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="wizard-title page-title">
          <BookOpenIcon className="title-icon" />
          The Enchanted Library
        </h1>
        <p className="wizard-text page-description">
          Discover magical knowledge and embark on legendary learning quests
        </p>
      </motion.div>

      <div className="library-controls">
        {/* Search Bar */}
        <motion.div 
          className="search-container"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="search-input-wrapper">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search for spells, courses, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="category-filter"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="categories-container">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Resources Grid */}
      <motion.div 
        className="resources-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {filteredResources.map((resource, index) => (
          <motion.div
            key={resource.id}
            className="resource-card magical-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            layout
          >
            <div className="resource-header">
              <div className="resource-thumbnail">
                {resource.thumbnail}
              </div>
              <div className="resource-meta">
                <span 
                  className="difficulty-badge"
                  style={{ backgroundColor: getDifficultyColor(resource.difficulty) }}
                >
                  {resource.difficulty}
                </span>
                <span className="type-badge">
                  {getTypeIcon(resource.type)} {resource.type}
                </span>
              </div>
            </div>

            <div className="resource-content">
              <h3 className="wizard-title resource-title">{resource.title}</h3>
              <p className="wizard-text resource-description">{resource.description}</p>
              
              <div className="resource-info">
                <div className="info-item">
                  <ClockIcon className="info-icon" />
                  <span className="wizard-text">{resource.duration}</span>
                </div>
                <div className="info-item">
                  <StarIcon className="info-icon" />
                  <span className="wizard-text">{resource.rating} ⭐</span>
                </div>
              </div>

              <div className="resource-tags">
                {resource.tags.map((tag) => (
                  <span key={tag} className="tag">
                    <TagIcon className="tag-icon" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="resource-actions">
              <button 
                className="magical-button resource-btn"
                onClick={() => handleStartQuest(resource)}
              >
                <PlayIcon className="btn-icon" />
                Start Quest
              </button>
              <button className="magical-button secondary">
                Preview
              </button>
            </div>

            {resource.progress > 0 && (
              <div className="progress-overlay">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${resource.progress}%` }}
                  />
                </div>
                <span className="wizard-text progress-text">
                  {resource.progress}% Complete
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {filteredResources.length === 0 && (
        <motion.div 
          className="no-resources"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="no-resources-content magical-card">
            <h3 className="wizard-title">No spells found</h3>
            <p className="wizard-text">
              Try adjusting your search terms or exploring different categories.
            </p>
            <button 
              className="magical-button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MagicalLibrary;
