import express from 'express';
import {
    createCommentController,
    getCommentsByEmployeeController,
    getCommentByIdController,
    updateCommentController,
    deleteCommentController,
} from '../controllers/commentController.js';

const router = express.Router();

// Create a new comment
router.post('/create-comment', createCommentController);

// Get all comments for a specific employee
router.get('/get-comments/:employeeId', getCommentsByEmployeeController);

// Get a single comment by its ID
router.get('/get-comment/:commentId', getCommentByIdController);

// Update a comment
router.patch('/update-comment/:commentId', updateCommentController);

// Delete a comment
router.delete('/delete-comment/:commentId', deleteCommentController);

export default router;
