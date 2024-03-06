// questionRoutes.js
const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/', questionController.createQuestion); 
router.get('/:id', questionController.getQuestionById);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

router.get('/byLesson/:lessonId', questionController.getQuestionsByLesson);

module.exports = router;
