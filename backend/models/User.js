const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false  // Don't include password in queries by default
  },
  profile: {
    avatar: {
      type: String,
      default: '🧙‍♂️'
    },
    house: {
      type: String,
      enum: ['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'],
      default: null
    },
    level: {
      type: Number,
      default: 1,
      min: 1,
      max: 100
    },
    experience: {
      type: Number,
      default: 0,
      min: 0
    },
    points: {
      type: Number,
      default: 0,
      min: 0
    },
    achievements: [{
      id: String,
      name: String,
      description: String,
      dateEarned: {
        type: Date,
        default: Date.now
      },
      icon: String
    }],
    preferences: {
      learningStyle: {
        type: String,
        enum: ['visual', 'auditory', 'kinesthetic', 'reading', 'collaborative', 'competitive', 'analytical', 'strategic'],
        default: null
      },
      interests: [{
        type: String,
        enum: ['frontend', 'backend', 'mobile', 'ai', 'devops', 'algorithms', 'databases', 'cybersecurity']
      }],
      difficulty: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced', 'adaptive'],
        default: 'intermediate'
      },
      languages: [{
        type: String
      }],
      timezone: {
        type: String,
        default: 'Asia/Kolkata'
      }
    },
    stats: {
      coursesCompleted: {
        type: Number,
        default: 0
      },
      duelsWon: {
        type: Number,
        default: 0
      },
      duelsLost: {
        type: Number,
        default: 0
      },
      studyStreak: {
        type: Number,
        default: 0
      },
      lastActiveDate: {
        type: Date,
        default: Date.now
      }
    }
  },
  learningPath: {
    currentCourses: [{
      courseId: String,
      progress: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
      },
      startDate: {
        type: Date,
        default: Date.now
      },
      lastAccessed: Date,
      timeSpent: {
        type: Number,
        default: 0  // in minutes
      }
    }],
    completedCourses: [{
      courseId: String,
      completionDate: Date,
      finalScore: Number,
      timeSpent: Number,
      rating: {
        type: Number,
        min: 1,
        max: 5
      }
    }],
    recommendations: [{
      courseId: String,
      reason: String,
      confidence: Number,
      createdAt: {
        type: Date,
        default: Date.now
      }
    }]
  },
  social: {
    mentors: [{
      mentorId: String,
      status: {
        type: String,
        enum: ['requested', 'accepted', 'declined'],
        default: 'requested'
      },
      requestDate: {
        type: Date,
        default: Date.now
      }
    }],
    mentees: [{
      menteeId: String,
      status: {
        type: String,
        enum: ['requested', 'accepted', 'declined'],
        default: 'requested'
      },
      requestDate: {
        type: Date,
        default: Date.now
      }
    }],
    studyGroups: [{
      groupId: String,
      role: {
        type: String,
        enum: ['member', 'moderator', 'leader'],
        default: 'member'
      },
      joinDate: {
        type: Date,
        default: Date.now
      }
    }],
    friends: [{
      userId: String,
      connectionDate: {
        type: Date,
        default: Date.now
      }
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  emailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Indexes for better query performance
userSchema.index({ email: 1 });
userSchema.index({ username: 1 });
userSchema.index({ 'profile.house': 1 });
userSchema.index({ 'profile.level': 1 });
userSchema.index({ createdAt: -1 });

// Virtual for user's current house rank
userSchema.virtual('houseRank').get(function() {
  // This would be calculated based on points within the house
  return Math.floor(this.profile.points / 100) + 1;
});

// Method to add experience and handle level ups
userSchema.methods.addExperience = function(amount) {
  this.profile.experience += amount;
  
  // Level up logic
  const experienceForNextLevel = this.profile.level * 100;
  if (this.profile.experience >= experienceForNextLevel) {
    this.profile.level += 1;
    this.profile.experience = 0;
    
    // Award level up points
    this.profile.points += this.profile.level * 10;
    
    return { leveledUp: true, newLevel: this.profile.level };
  }
  
  return { leveledUp: false };
};

// Method to add achievement
userSchema.methods.addAchievement = function(achievement) {
  const exists = this.profile.achievements.some(ach => ach.id === achievement.id);
  if (!exists) {
    this.profile.achievements.push(achievement);
    this.profile.points += achievement.points || 50;
    return true;
  }
  return false;
};

// Method to update learning streak
userSchema.methods.updateStreak = function() {
  const today = new Date();
  const lastActive = this.profile.stats.lastActiveDate;
  const daysDiff = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));
  
  if (daysDiff === 1) {
    // Consecutive day
    this.profile.stats.studyStreak += 1;
  } else if (daysDiff > 1) {
    // Streak broken
    this.profile.stats.studyStreak = 1;
  }
  // If daysDiff === 0, same day, don't change streak
  
  this.profile.stats.lastActiveDate = today;
};

module.exports = mongoose.model('User', userSchema);
