const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Пожалуйста, добавьте название поста'],
    trim: true,
    maxlength: [100, 'Название не может быть длиннее 100 символов']
  },
  content: {
    type: String,
    required: [true, 'Пожалуйста, добавьте содержание поста']
  },
  author: {
    type: String,
    default: 'Anonymous',
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);