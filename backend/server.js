const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const learningRoutes = require('./routes/learning');
const duelRoutes = require('./routes/duels');
const aiRoutes = require('./routes/ai');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wizardconnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('🧙‍♂️ Connected to MongoDB - The magical database awaits!'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('🔮 A wizard has connected:', socket.id);

  // Handle duel rooms
  socket.on('join-duel', (duelId) => {
    socket.join(`duel-${duelId}`);
    socket.to(`duel-${duelId}`).emit('opponent-joined');
  });

  // Handle duel updates
  socket.on('duel-update', (data) => {
    socket.to(`duel-${data.duelId}`).emit('opponent-progress', data);
  });

  // Handle study group chat
  socket.on('join-study-group', (groupId) => {
    socket.join(`group-${groupId}`);
  });

  socket.on('group-message', (data) => {
    socket.to(`group-${data.groupId}`).emit('new-message', data);
  });

  // Handle mentorship sessions
  socket.on('join-mentorship', (sessionId) => {
    socket.join(`mentor-${sessionId}`);
  });

  socket.on('disconnect', () => {
    console.log('👻 A wizard has disconnected:', socket.id);
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/learning', learningRoutes);
app.use('/api/duels', duelRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: '🧙‍♂️ WizardConnect Backend is running!',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found - the magic is elsewhere!' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🌟 WizardConnect Backend is running on port ${PORT}`);
  console.log(`🔮 Socket.IO enabled for real-time magic`);
});
