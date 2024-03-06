// Question.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['boolean', 'multiple_choice_single_answer', 'multiple_choice_multiple_answers']
  },
  options: [{
    text: String,
    isCorrect: Boolean
  }],
  correctAnswers: [{
    type: String
  }],
  score: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Question', questionSchema);
