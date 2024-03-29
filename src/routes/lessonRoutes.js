// lessonRoutes.js
const express = require('express');
const router = express.Router();
const lessonController = require('../controllers/lessonController');

router.post('/', lessonController.createLesson); 
router.get('/:id', lessonController.getLessonById); 
router.put('/:id', lessonController.updateLesson);
router.delete('/:id', lessonController.deleteLesson);

router.get('/byCourse/:courseId', lessonController.getLessonsByCourse);
router.post('/:lessonId/take', lessonController.takeLesson);

module.exports = router;
