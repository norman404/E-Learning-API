// Import necessary models
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');

// Helper function to handle errors during request processing
const handleError = (res, error, message = 'Error processing request') => {
    console.error(message, error);
    res.status(400).json({ message, details: error.message });
};

// Create a new lesson
exports.createLesson = async (req, res) => {
    const { courseId, title, content, approvalThreshold } = req.body;

    try {
        // Find the course by its ID
        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Create and save the new lesson
        const lesson = await new Lesson({ course: courseId, title, content, approvalThreshold }).save();
        res.status(201).json(lesson);
    } catch (error) {
        // Handle any errors that occur during lesson creation
        handleError(res, error, 'Error creating lesson');
    }
};

// Allow students to take a lesson
exports.takeLesson = async (req, res) => {
    // Implementation will depend on specific logic for evaluating answers
    res.status(501).json({ message: 'Lesson taking not implemented yet' });
};

// Get lessons of a specific course
exports.getLessonsByCourse = async (req, res) => {
    try {
        // Extract the course ID from the request parameters
        const { courseId } = req.params;
        
        // Find lessons belonging to the specified course and populate the 'questions' field
        const lessons = await Lesson.find({ course: courseId }).populate('questions');
        
        // Respond with the lessons
        res.status(200).json(lessons);
    } catch (error) {
        // Handle any errors that occur during lesson retrieval by course
        handleError(res, error, 'Error getting lessons by course');
    }
};

// Get a specific lesson by its ID
exports.getLessonById = async (req, res) => {
    try {
        // Find the lesson with the provided ID
        const lesson = await Lesson.findById(req.params.id);
        
        // If the lesson is not found, respond with a 404 error
        if (!lesson) return res.status(404).json({ message: 'Lesson not found' });

        // Respond with the found lesson
        res.status(200).json(lesson);
    } catch (error) {
        // Handle any errors that occur during lesson retrieval by ID
        handleError(res, error, 'Error getting lesson by ID');
    }
};

// Update a specific lesson by its ID
exports.updateLesson = async (req, res) => {
    try {
        // Find and update the lesson with the provided ID
        const updatedLesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        // If the lesson is not found, respond with a 404 error
        if (!updatedLesson) return res.status(404).json({ message: 'Lesson not found' });

        // Respond with the updated lesson
        res.status(200).json(updatedLesson);
    } catch (error) {
        // Handle any errors that occur during lesson update
        handleError(res, error, 'Error updating lesson');
    }
};

// Delete a specific lesson by its ID
exports.deleteLesson = async (req, res) => {
    try {
        // Find and delete the lesson with the provided ID
        const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);
        
        // If the lesson is not found, respond with a 404 error
        if (!deletedLesson) return res.status(404).json({ message: 'Lesson not found' });

        // Respond with a success message
        res.status(200).json({ message: 'Lesson deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during lesson deletion
        handleError(res, error, 'Error deleting lesson');
    }
};
