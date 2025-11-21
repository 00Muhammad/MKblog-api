const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

// Подключение к базе данных
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', require('./routes/posts'));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Blog API is running!',
    endpoints: {
      getPosts: 'GET /api/posts',
      getPost: 'GET /api/posts/:id',
      createPost: 'POST /api/posts',
      updatePost: 'PUT /api/posts/:id',
      deletePost: 'DELETE /api/posts/:id'
    }
  });
});

// Handle 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  });
});

const PORT = process.env.PORT || 5888;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('MongoDB Connected: localhost');
});