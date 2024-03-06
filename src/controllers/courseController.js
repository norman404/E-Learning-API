const Course = require('../models/Course');

// Function to handle errors during request processing
const handleError = (res, error, message = 'Error processing request') => {
    console.error(message, error);
    res.status(400).json({ message, details: error.message });
};

// Create a new course
exports.createCourse = async (req, res) => {
    try {
        // Extract title and description from request body
        const { title, description } = req.body;

        // Create a new course instance
        const course = new Course({ title, description });
        
        // Save the course to the database
        const savedCourse = await course.save();

        // Respond with the saved course
        res.status(201).json(savedCourse);
    } catch (error) {
        // Handle any errors that occur during course creation
        handleError(res, error, 'Error creating course');
    }
};

// Retrieve all courses from the database
exports.getCourses = async (req, res) => {
    try {
        // Find all courses and populate the 'lessons' field
        const courses = await Course.find().populate('lessons');
        
        // Respond with the list of courses
        res.status(200).json(courses);
    } catch (error) {
        // Handle any errors that occur during course retrieval
        handleError(res, error, 'Error getting courses');
    }
};

// Retrieve a course by its ID from the database
exports.getCourseById = async (req, res) => {
    try {
        // Find the course with the provided ID and populate the 'lessons' field
        const course = await Course.findById(req.params.id).populate('lessons');
        
        // If the course is not found, respond with a 404 error
        if (!course) return res.status(404).json({ message: 'Course not found' });

        // Respond with the found course
        res.status(200).json(course);
    } catch (error) {
        // Handle any errors that occur during course retrieval by ID
        handleError(res, error, 'Error getting course by ID');
    }
};

// Update a course by its ID in the database
exports.updateCourse = async (req, res) => {
    try {
        // Find and update the course with the provided ID, then populate the 'lessons' field
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('lessons');
        
        // If the course is not found, respond with a 404 error
        if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });

        // Respond with the updated course
        res.status(200).json(updatedCourse);
    } catch (error) {
        // Handle any errors that occur during course update
        handleError(res, error, 'Error updating course');
    }
};

// Delete a course by its ID from the database
exports.deleteCourse = async (req, res) => {
    try {
        // Find and delete the course with the provided ID
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);
        
        // If the course is not found, respond with a 404 error
        if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });

        // Respond with a success message
        res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during course deletion
        handleError(res, error, 'Error deleting course');
    }
};
