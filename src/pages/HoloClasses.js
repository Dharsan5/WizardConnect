import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import { 
  CubeIcon, 
  EyeIcon,
  PlayIcon,
  PauseIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const HoloClasses = () => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [isARActive, setIsARActive] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(0);
  const canvasRef = useRef();

  const arModules = [
    {
      id: 1,
      title: "Data Structures Visualization",
      description: "Explore arrays, linked lists, and trees in 3D space",
      category: "Computer Science",
      duration: "45 minutes",
      difficulty: "Intermediate",
      lessons: [
        "Introduction to Arrays",
        "Linked Lists in 3D",
        "Binary Tree Traversal",
        "Stack and Queue Operations"
      ],
      thumbnail: "📊",
      color: "#4ecdc4"
    },
    {
      id: 2,
      title: "Algorithm Complexity",
      description: "Visualize Big O notation and algorithm performance",
      category: "Algorithms",
      duration: "60 minutes",
      difficulty: "Advanced",
      lessons: [
        "Big O Basics",
        "Sorting Algorithms",
        "Search Complexity",
        "Space vs Time Trade-offs"
      ],
      thumbnail: "⚡",
      color: "#ffd700"
    },
    {
      id: 3,
      title: "React Component Lifecycle",
      description: "Interactive 3D journey through React component states",
      category: "Frontend",
      duration: "30 minutes",
      difficulty: "Beginner",
      lessons: [
        "Component Mounting",
        "State Updates",
        "Props Flow",
        "Unmounting Process"
      ],
      thumbnail: "⚛️",
      color: "#61dafb"
    },
    {
      id: 4,
      title: "Network Protocols",
      description: "Visualize how data travels through networks",
      category: "Networking",
      duration: "50 minutes",
      difficulty: "Intermediate",
      lessons: [
        "TCP/IP Stack",
        "HTTP Requests",
        "DNS Resolution",
        "Load Balancing"
      ],
      thumbnail: "🌐",
      color: "#96ceb4"
    },
    {
      id: 5,
      title: "Machine Learning Models",
      description: "3D representations of neural networks and ML algorithms",
      category: "AI/ML",
      duration: "75 minutes",
      difficulty: "Advanced",
      lessons: [
        "Neural Network Structure",
        "Training Process",
        "Feature Selection",
        "Model Evaluation"
      ],
      thumbnail: "🧠",
      color: "#ff6b6b"
    },
    {
      id: 6,
      title: "Database Relationships",
      description: "Explore database schemas and relationships in 3D",
      category: "Database",
      duration: "40 minutes",
      difficulty: "Intermediate",
      lessons: [
        "Table Relationships",
        "JOIN Operations",
        "Indexing Strategies",
        "Query Optimization"
      ],
      thumbnail: "🗄️",
      color: "#dda0dd"
    }
  ];

  // 3D Scene Component
  const ARScene = ({ module }) => {
    return (
      <>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* Sample 3D objects representing learning content */}
        <Box position={[-2, 0, 0]} args={[1, 1, 1]}>
          <meshStandardMaterial color="#4ecdc4" />
        </Box>
        
        <Sphere position={[2, 0, 0]} args={[0.8]}>
          <meshStandardMaterial color="#ffd700" />
        </Sphere>
        
        <Text
          position={[0, 2, 0]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          {module?.title || "AR Learning Module"}
        </Text>
        
        <OrbitControls enableZoom={true} />
      </>
    );
  };

  const startARModule = (module) => {
    setSelectedModule(module);
    setIsARActive(true);
    setCurrentLesson(0);
  };

  const nextLesson = () => {
    if (currentLesson < selectedModule.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    }
  };

  const prevLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    }
  };

  const exitAR = () => {
    setIsARActive(false);
    setSelectedModule(null);
    setCurrentLesson(0);
  };

  if (isARActive && selectedModule) {
    return (
      <div className="ar-learning-interface">
        <motion.div 
          className="ar-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="ar-header">
            <h2 className="wizard-title ar-title">{selectedModule.title}</h2>
            <div className="lesson-progress">
              <span className="wizard-text">
                Lesson {currentLesson + 1} of {selectedModule.lessons.length}
              </span>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${((currentLesson + 1) / selectedModule.lessons.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="ar-content">
            <div className="ar-viewport">
              <Canvas ref={canvasRef} className="ar-canvas">
                <ARScene module={selectedModule} />
              </Canvas>
            </div>

            <div className="ar-sidebar">
              <div className="lesson-info magical-card">
                <h3 className="wizard-title current-lesson">
                  {selectedModule.lessons[currentLesson]}
                </h3>
                <p className="wizard-text lesson-description">
                  Interactive 3D visualization of {selectedModule.lessons[currentLesson].toLowerCase()}. 
                  Rotate, zoom, and explore the concept in immersive detail.
                </p>
                
                <div className="ar-controls">
                  <button 
                    className="magical-button"
                    onClick={prevLesson}
                    disabled={currentLesson === 0}
                  >
                    Previous
                  </button>
                  <button 
                    className="magical-button"
                    onClick={nextLesson}
                    disabled={currentLesson === selectedModule.lessons.length - 1}
                  >
                    Next
                  </button>
                </div>
              </div>

              <div className="ar-tools magical-card">
                <h4 className="wizard-title">AR Tools</h4>
                <div className="tool-buttons">
                  <button className="tool-btn">
                    <AdjustmentsHorizontalIcon className="tool-icon" />
                    Adjust View
                  </button>
                  <button className="tool-btn">
                    <SparklesIcon className="tool-icon" />
                    Add Effects
                  </button>
                  <button className="tool-btn">
                    <EyeIcon className="tool-icon" />
                    Toggle X-Ray
                  </button>
                </div>
              </div>

              <button 
                className="magical-button exit-ar"
                onClick={exitAR}
              >
                Exit AR Mode
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="holo-classes">
      <motion.div 
        className="holo-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="wizard-title page-title">
          <CubeIcon className="title-icon" />
          Holo-Classes Academy
        </h1>
        <p className="wizard-text page-description">
          Immersive AR learning experiences that bring concepts to life
        </p>
      </motion.div>

      <div className="ar-info-banner magical-card">
        <motion.div 
          className="ar-info-content"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="ar-icon">🥽</div>
          <div className="ar-text">
            <h3 className="wizard-title">Augmented Reality Learning</h3>
            <p className="wizard-text">
              Experience learning like never before with 3D visualizations, 
              interactive models, and immersive environments.
            </p>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="modules-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {arModules.map((module, index) => (
          <motion.div
            key={module.id}
            className="module-card magical-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="module-header">
              <div 
                className="module-thumbnail"
                style={{ backgroundColor: module.color }}
              >
                {module.thumbnail}
              </div>
              <div className="module-meta">
                <span className="category-tag">{module.category}</span>
                <span className={`difficulty-badge ${module.difficulty.toLowerCase()}`}>
                  {module.difficulty}
                </span>
              </div>
            </div>

            <div className="module-content">
              <h3 className="wizard-title module-title">{module.title}</h3>
              <p className="wizard-text module-description">{module.description}</p>
              
              <div className="module-info">
                <div className="info-item">
                  <ClockIcon className="info-icon" />
                  <span className="wizard-text">{module.duration}</span>
                </div>
                <div className="info-item">
                  <CubeIcon className="info-icon" />
                  <span className="wizard-text">{module.lessons.length} Lessons</span>
                </div>
              </div>

              <div className="lessons-preview">
                <h4 className="wizard-title lessons-title">Lessons:</h4>
                <ul className="lessons-list">
                  {module.lessons.slice(0, 3).map((lesson, i) => (
                    <li key={i} className="wizard-text lesson-item">
                      {lesson}
                    </li>
                  ))}
                  {module.lessons.length > 3 && (
                    <li className="wizard-text lesson-item">
                      +{module.lessons.length - 3} more...
                    </li>
                  )}
                </ul>
              </div>
            </div>

            <div className="module-actions">
              <button 
                className="magical-button module-btn"
                onClick={() => startARModule(module)}
              >
                <PlayIcon className="btn-icon" />
                Start AR Experience
              </button>
              <button className="magical-button secondary">
                Preview
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="ar-requirements magical-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h3 className="wizard-title">AR Requirements</h3>
        <div className="requirements-grid">
          <div className="requirement-item">
            <EyeIcon className="req-icon" />
            <span className="wizard-text">WebXR compatible browser</span>
          </div>
          <div className="requirement-item">
            <CubeIcon className="req-icon" />
            <span className="wizard-text">Stable internet connection</span>
          </div>
          <div className="requirement-item">
            <SparklesIcon className="req-icon" />
            <span className="wizard-text">Camera permissions (optional)</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HoloClasses;
