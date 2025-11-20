const express = require('express');
const router = express.Router();

// Временные данные для теста
const posts = [
  { 
    _id: '1', 
    title: 'Первый пост', 
    content: 'Это наш первый тестовый пост', 
    author: 'Автор 1',
    createdAt: new Date()
  },
  { 
    _id: '2', 
    title: 'Второй пост', 
    content: 'Это второй тестовый пост для проверки API', 
    author: 'Автор 2',
    createdAt: new Date()
  }
];

// GET /api/posts - получить все посты
router.get('/', async (req, res) => {
  try {
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;