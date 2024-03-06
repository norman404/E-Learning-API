const Lesson = require('../models/Lesson');
const Question = require('../models/Question');

// Function to consistently handle errors
const handleError = (res, error, message = 'Error processing request') => {
    console.error(message, error);
    res.status(400).json({ message, details: error.message });
};

// Create a new question and link it to a lesson
exports.createQuestion = async (req, res) => {
    const { lessonId, content, type, options, correctAnswers, score } = req.body;

    try {
        // Find the lesson by its ID
        const lesson = await Lesson.findById(lessonId);
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

        // Create the new question
        const question = new Question({ lesson: lessonId, content, type, options, correctAnswers, score });
        const savedQuestion = await question.save();

        // Link the created question to the corresponding lesson
        lesson.questions.push(savedQuestion._id);
        await lesson.save();

        // Respond with the saved question
        res.status(201).json(savedQuestion);
    } catch (error) {
        // Handle any errors that occur during question creation
        handleError(res, error, 'Error creating question');
    }
};

// Get all questions associated with a specific lesson
exports.getQuestionsByLesson = async (req, res) => {
    try {
        // Extract the lesson ID from the request parameters
        const { lessonId } = req.params;
        
        // Find questions belonging to the specified lesson
        const questions = await Question.find({ lesson: lessonId });
        
        // Respond with the questions
        res.status(200).json(questions);
    } catch (error) {
        // Handle any errors that occur during question retrieval by lesson
        handleError(res, error, 'Error getting questions by lesson');
    }
};

// Get a specific question by its ID
exports.getQuestionById = async (req, res) => {
    try {
        // Find the question with the provided ID
        const question = await Question.findById(req.params.id);
        
        // If the question is not found, respond with a 404 error
        if (!question) return res.status(404).json({ message: 'Question not found' });

        // Respond with the found question
        res.status(200).json(question);
    } catch (error) {
        // Handle any errors that occur during question retrieval by ID
        handleError(res, error, 'Error getting question by ID');
    }
};

// Update the details of a specific question by its ID
exports.updateQuestion = async (req, res) => {
    try {
        // Find and update the question with the provided ID
        const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        // If the question is not found, respond with a 404 error
        if (!updatedQuestion) return res.status(404).json({ message: 'Question not found' });

        // Respond with the updated question
        res.status(200).json(updatedQuestion);
    } catch (error) {
        // Handle any errors that occur during question update
        handleError(res, error, 'Error updating question');
    }
};

// Delete a specific question by its ID
exports.deleteQuestion = async (req, res) => {
    try {
        // Find and delete the question with the provided ID
        const deletedQuestion = await Question.findByIdAndDelete(req.params.id);
        
        // If the question is not found, respond with a 404 error
        if (!deletedQuestion) return res.status(404).json({ message: 'Question not found' });

        // Optionally: Consider removing the reference to the question in the corresponding lesson
        
        // Respond with a success message
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during question deletion
        handleError(res, error, 'Error deleting question');
    }
};
