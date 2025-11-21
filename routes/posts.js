const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET /api/posts - получить все посты
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
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
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// PUT /api/posts/:id - обновить пост
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
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
      data: post
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

// POST /api/posts - создать новый пост
router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;

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
      data: newPost
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
});

module.exports = router;