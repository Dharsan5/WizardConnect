import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { 
  UserGroupIcon, 
  UserIcon,
  ChatBubbleLeftRightIcon,
  MagnifyingGlassIcon,
  StarIcon,
  AcademicCapIcon,
  HeartIcon,
  PlusIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { addMentor, joinStudyGroup } from '../store/slices/learningSlice';

const WizardNetwork = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('mentors');
  const [searchTerm, setSearchTerm] = useState('');
  const [mentors, setMentors] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);
  const [peers, setPeers] = useState([]);

  useEffect(() => {
    // Simulate fetching mentors
    const mockMentors = [
      {
        id: 1,
        name: "Gandalf the Code",
        title: "Senior Full-Stack Wizard",
        company: "TechMagic Inc.",
        expertise: ["React", "Node.js", "System Design"],
        rating: 4.9,
        experience: "8 years",
        sessions: 247,
        house: "ravenclaw",
        bio: "Passionate about teaching and helping young wizards master the art of coding.",
        availability: "Weekends",
        languages: ["English", "Hindi"],
        avatar: "🧙‍♂️"
      },
      {
        id: 2,
        name: "Hermione Granger-Dev",
        title: "AI Research Wizard",
        company: "DeepMind",
        expertise: ["Python", "TensorFlow", "Machine Learning"],
        rating: 4.8,
        experience: "6 years",
        sessions: 189,
        house: "gryffindor",
        bio: "Dedicated to advancing AI education and making complex concepts accessible.",
        availability: "Evenings",
        languages: ["English", "Tamil"],
        avatar: "👩‍💻"
      },
      {
        id: 3,
        name: "Dumbledore Debug",
        title: "DevOps Master",
        company: "CloudCast Solutions",
        expertise: ["AWS", "Docker", "Kubernetes"],
        rating: 4.9,
        experience: "12 years",
        sessions: 356,
        house: "hufflepuff",
        bio: "Believes in the magic of automation and infrastructure as code.",
        availability: "Flexible",
        languages: ["English", "Bengali"],
        avatar: "👨‍🔧"
      }
    ];

    // Simulate fetching study groups
    const mockStudyGroups = [
      {
        id: 1,
        name: "React Wizards United",
        description: "Weekly React study sessions with hands-on projects",
        members: 24,
        category: "Frontend",
        meetingTime: "Saturdays 10 AM",
        level: "Intermediate",
        isPrivate: false,
        tags: ["React", "JavaScript", "Projects"],
        leader: "Alex Potter",
        nextMeeting: "This Saturday",
        avatar: "⚛️"
      },
      {
        id: 2,
        name: "Algorithm Aces",
        description: "Solve coding challenges and prepare for interviews together",
        members: 18,
        category: "Algorithms",
        meetingTime: "Tuesdays 7 PM",
        level: "Advanced",
        isPrivate: false,
        tags: ["Algorithms", "Data Structures", "Interviews"],
        leader: "Sarah Code",
        nextMeeting: "Tomorrow",
        avatar: "🧮"
      },
      {
        id: 3,
        name: "AI Apprentices",
        description: "Exploring machine learning and artificial intelligence",
        members: 31,
        category: "AI/ML",
        meetingTime: "Sundays 3 PM",
        level: "Beginner",
        isPrivate: false,
        tags: ["Python", "TensorFlow", "ML"],
        leader: "Mike Neural",
        nextMeeting: "This Sunday",
        avatar: "🤖"
      },
      {
        id: 4,
        name: "Mobile Magic Circle",
        description: "Building amazing mobile apps with React Native and Flutter",
        members: 15,
        category: "Mobile",
        meetingTime: "Thursdays 8 PM",
        level: "Intermediate",
        isPrivate: false,
        tags: ["React Native", "Flutter", "Mobile"],
        leader: "Luna Mobile",
        nextMeeting: "Next Thursday",
        avatar: "📱"
      }
    ];

    // Simulate fetching peers
    const mockPeers = [
      {
        id: 1,
        name: "Ron Code-sley",
        level: 5,
        house: "gryffindor",
        interests: ["Frontend", "Gaming"],
        currentQuest: "React Fundamentals",
        isOnline: true,
        mutualFriends: 3,
        avatar: "👨‍💻"
      },
      {
        id: 2,
        name: "Luna Logic-good",
        level: 7,
        house: "ravenclaw",
        interests: ["AI", "Algorithms"],
        currentQuest: "Neural Networks",
        isOnline: false,
        mutualFriends: 1,
        avatar: "👩‍🔬"
      },
      {
        id: 3,
        name: "Neville Long-code",
        level: 4,
        house: "hufflepuff",
        interests: ["Backend", "Databases"],
        currentQuest: "MongoDB Mastery",
        isOnline: true,
        mutualFriends: 5,
        avatar: "👨‍🌾"
      }
    ];

    setMentors(mockMentors);
    setStudyGroups(mockStudyGroups);
    setPeers(mockPeers);
  }, []);

  const handleRequestMentorship = (mentor) => {
    dispatch(addMentor(mentor));
    // Show success message or redirect
    alert(`Mentorship request sent to ${mentor.name}!`);
  };

  const handleJoinGroup = (group) => {
    dispatch(joinStudyGroup(group));
    alert(`Joined ${group.name}! Check your dashboard for meeting details.`);
  };

  const renderMentors = () => (
    <motion.div 
      className="mentors-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mentors-grid">
        {mentors.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            className={`mentor-card magical-card house-${mentor.house}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="mentor-header">
              <div className="mentor-avatar">{mentor.avatar}</div>
              <div className="mentor-info">
                <h3 className="wizard-title mentor-name">{mentor.name}</h3>
                <p className="wizard-text mentor-title">{mentor.title}</p>
                <p className="wizard-text mentor-company">{mentor.company}</p>
              </div>
              <div className="mentor-rating">
                <StarIcon className="rating-icon" />
                <span className="wizard-text">{mentor.rating}</span>
              </div>
            </div>

            <div className="mentor-content">
              <p className="wizard-text mentor-bio">{mentor.bio}</p>
              
              <div className="mentor-stats">
                <div className="stat-item">
                  <span className="wizard-text stat-label">Experience:</span>
                  <span className="wizard-text stat-value">{mentor.experience}</span>
                </div>
                <div className="stat-item">
                  <span className="wizard-text stat-label">Sessions:</span>
                  <span className="wizard-text stat-value">{mentor.sessions}</span>
                </div>
                <div className="stat-item">
                  <span className="wizard-text stat-label">Available:</span>
                  <span className="wizard-text stat-value">{mentor.availability}</span>
                </div>
              </div>

              <div className="mentor-expertise">
                <span className="wizard-text expertise-label">Expertise:</span>
                <div className="expertise-tags">
                  {mentor.expertise.map((skill) => (
                    <span key={skill} className="expertise-tag">{skill}</span>
                  ))}
                </div>
              </div>

              <div className="mentor-languages">
                <span className="wizard-text">Languages: {mentor.languages.join(', ')}</span>
              </div>
            </div>

            <div className="mentor-actions">
              <button 
                className="magical-button"
                onClick={() => handleRequestMentorship(mentor)}
              >
                <AcademicCapIcon className="btn-icon" />
                Request Mentorship
              </button>
              <button className="magical-button secondary">
                <ChatBubbleLeftRightIcon className="btn-icon" />
                Message
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderStudyGroups = () => (
    <motion.div 
      className="study-groups-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="study-groups-grid">
        {studyGroups.map((group, index) => (
          <motion.div
            key={group.id}
            className="study-group-card magical-card"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="group-header">
              <div className="group-avatar">{group.avatar}</div>
              <div className="group-info">
                <h3 className="wizard-title group-name">{group.name}</h3>
                <p className="wizard-text group-description">{group.description}</p>
              </div>
              <div className={`level-badge ${group.level.toLowerCase()}`}>
                {group.level}
              </div>
            </div>

            <div className="group-content">
              <div className="group-stats">
                <div className="stat-item">
                  <UserGroupIcon className="stat-icon" />
                  <span className="wizard-text">{group.members} members</span>
                </div>
                <div className="stat-item">
                  <ClockIcon className="stat-icon" />
                  <span className="wizard-text">{group.meetingTime}</span>
                </div>
              </div>

              <div className="group-details">
                <div className="detail-item">
                  <span className="wizard-text detail-label">Category:</span>
                  <span className="wizard-text detail-value">{group.category}</span>
                </div>
                <div className="detail-item">
                  <span className="wizard-text detail-label">Leader:</span>
                  <span className="wizard-text detail-value">{group.leader}</span>
                </div>
                <div className="detail-item">
                  <span className="wizard-text detail-label">Next Meeting:</span>
                  <span className="wizard-text detail-value">{group.nextMeeting}</span>
                </div>
              </div>

              <div className="group-tags">
                {group.tags.map((tag) => (
                  <span key={tag} className="group-tag">{tag}</span>
                ))}
              </div>
            </div>

            <div className="group-actions">
              <button 
                className="magical-button"
                onClick={() => handleJoinGroup(group)}
              >
                <PlusIcon className="btn-icon" />
                Join Group
              </button>
              <button className="magical-button secondary">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderPeers = () => (
    <motion.div 
      className="peers-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="peers-grid">
        {peers.map((peer, index) => (
          <motion.div
            key={peer.id}
            className={`peer-card magical-card house-${peer.house}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="peer-header">
              <div className="peer-avatar">
                {peer.avatar}
                <div className={`status-indicator ${peer.isOnline ? 'online' : 'offline'}`} />
              </div>
              <div className="peer-info">
                <h3 className="wizard-title peer-name">{peer.name}</h3>
                <p className="wizard-text peer-house">{peer.house} • Level {peer.level}</p>
              </div>
            </div>

            <div className="peer-content">
              <div className="peer-quest">
                <span className="wizard-text quest-label">Current Quest:</span>
                <span className="wizard-text quest-name">{peer.currentQuest}</span>
              </div>

              <div className="peer-interests">
                <span className="wizard-text interests-label">Interests:</span>
                <div className="interests-tags">
                  {peer.interests.map((interest) => (
                    <span key={interest} className="interest-tag">{interest}</span>
                  ))}
                </div>
              </div>

              <div className="mutual-friends">
                <span className="wizard-text">
                  {peer.mutualFriends} mutual connections
                </span>
              </div>
            </div>

            <div className="peer-actions">
              <button className="magical-button">
                <UserIcon className="btn-icon" />
                Connect
              </button>
              <button className="magical-button secondary">
                <ChatBubbleLeftRightIcon className="btn-icon" />
                Message
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const tabs = [
    { id: 'mentors', name: 'Find Mentors', icon: AcademicCapIcon },
    { id: 'groups', name: 'Study Groups', icon: UserGroupIcon },
    { id: 'peers', name: 'Connect Peers', icon: UserIcon }
  ];

  return (
    <div className="wizard-network">
      <motion.div 
        className="network-header"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="wizard-title page-title">
          <UserGroupIcon className="title-icon" />
          Wizard Network
        </h1>
        <p className="wizard-text page-description">
          Connect, collaborate, and grow with fellow wizards and mentors
        </p>
      </motion.div>

      <div className="network-controls">
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
              placeholder="Search wizards, groups, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        <motion.div 
          className="tab-navigation"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="tab-icon" />
              <span>{tab.name}</span>
            </button>
          ))}
        </motion.div>
      </div>

      <div className="network-content">
        {activeTab === 'mentors' && renderMentors()}
        {activeTab === 'groups' && renderStudyGroups()}
        {activeTab === 'peers' && renderPeers()}
      </div>
    </div>
  );
};

export default WizardNetwork;
