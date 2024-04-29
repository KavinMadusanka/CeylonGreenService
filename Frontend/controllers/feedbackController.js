import mongoose from 'mongoose';
import Feedback from '../models/feedbackModel.js';
import Employee from '../models/employeeModel.js';
import User from '../models/userModel.js';

// Create feedback for a new employee
export const createFeedbackForEmployee = async (employeeId) => {
    try {
        // Create a new feedback record for the employee
        const newFeedback = new Feedback({ employeeId });
        await newFeedback.save();
        return { success: true, message: 'Feedback created successfully', feedback: newFeedback };
    } catch (error) {
        return { success: false, message: 'Error creating feedback', error };
    }
};

// Function to get feedback by employee ID
export const getFeedbackByEmployeeId = async (req, res) => {
    const { employeeId } = req.params;

    try {
        const feedback = await Feedback.findOne({ employeeId });
        if (!feedback) {
            return res.status(404).json({ success: false, message: 'Feedback not found for employee' });
        }
        res.status(200).json({ success: true, feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching feedback', error });
    }
};

// Function to handle adding a like
export const addLike = async (req, res) => {
    const { employeeId, userId } = req.params;

    // Validate employeeId and userId
    if (!mongoose.Types.ObjectId.isValid(employeeId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid employeeId or userId format' });
    }

    try {
        const employee = await Employee.findById(employeeId);
        const user = await User.findById(userId);

        if (!employee || !user) {
            return res.status(404).json({ success: false, message: 'Employee or user not found' });
        }

        // Find feedback document or create a new one
        let feedback = await Feedback.findOne({ employeeId });
        if (!feedback) {
            feedback = new Feedback({ employeeId });
        }

        // Check if the user has already liked the employee
        if (feedback.likedBy.includes(userId)) {
            return res.status(400).json({ success: false, message: 'User has already liked the employee' });
        }

        // Remove user from dislikedBy list if they have disliked the employee
        if (feedback.dislikedBy.includes(userId)) {
            feedback.dislikedBy.pull(userId);
            feedback.dislikes -= 1;
        }

        // Add user to likedBy list
        feedback.likedBy.push(userId);
        feedback.likes += 1;

        await feedback.save();

        res.status(200).json({ success: true, message: 'Like added successfully', feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding like', error });
    }
};

// Function to handle adding a dislike
export const addDislike = async (req, res) => {
    const { employeeId, userId } = req.params;

    // Validate employeeId and userId
    if (!mongoose.Types.ObjectId.isValid(employeeId) || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid employeeId or userId format' });
    }

    try {
        const employee = await Employee.findById(employeeId);
        const user = await User.findById(userId);

        if (!employee || !user) {
            return res.status(404).json({ success: false, message: 'Employee or user not found' });
        }

        // Find feedback document or create a new one
        let feedback = await Feedback.findOne({ employeeId });
        if (!feedback) {
            feedback = new Feedback({ employeeId });
        }

        // Check if the user has already disliked the employee
        if (feedback.dislikedBy.includes(userId)) {
            return res.status(400).json({ success: false, message: 'User has already disliked the employee' });
        }

        // Remove user from likedBy list if they have liked the employee
        if (feedback.likedBy.includes(userId)) {
            feedback.likedBy.pull(userId);
            feedback.likes -= 1;
        }

        // Add user to dislikedBy list
        feedback.dislikedBy.push(userId);
        feedback.dislikes += 1;

        await feedback.save();

        res.status(200).json({ success: true, message: 'Dislike added successfully', feedback });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding dislike', error });
    }
};
