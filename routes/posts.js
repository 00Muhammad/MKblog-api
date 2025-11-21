const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET /api/posts - получить все посты
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

// GET /api/posts/:id - получить один пост по ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Пост не найден'
      });
    }
    
    res.json({
      success: true,
      data: post
    });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Пост не найден'
      });
    }
    
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

// POST /api/posts - создать новый пост
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Валидация
    if (!title || !content) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, добавьте название и содержание поста'
      });
    }

    const newPost = await Post.create({
      title,
      content, 
      author: author || 'Anonymous'
    });

    res.status(201).json({
      success: true,
      message: 'Пост успешно создан',
      data: newPost
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

// PUT /api/posts/:id - обновить пост
router.put('/:id', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    
    // Опциональная валидация при обновлении
    if (!title && !content && !author) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, предоставьте данные для обновления'
      });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author },
      { new: true, runValidators: true }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Пост не найден'
      });
    }

    res.json({
      success: true,
      message: 'Пост успешно обновлен',
      data: post
    });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Пост не найден'
      });
    }
    
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

// DELETE /api/posts/:id - удалить пост
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Пост не найден'
      });
    }
    
    res.json({
      success: true,
      message: 'Пост успешно удален',
      data: {}
    });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Пост не найден'
      });
    }
    
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: 'Ошибка сервера'
    });
  }
});

module.exports = router;