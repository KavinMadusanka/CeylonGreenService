import Comment from '../models/commentModel.js';

// Create a new comment
export const createCommentController = async (req, res) => {
    try {
        const {employeeId, commentDescription } = req.body;

        // Check for required fields

        if (!employeeId) {
            return res.status(400).send({
                success: false,
                message: 'employeeId is required.',
            });
        }

        if (!commentDescription) {
            return res.status(400).send({
                success: false,
                message: 'commentDescription is required.',
            });
        }

        // Create a new comment instance
        const newComment = new Comment({
            employeeId,
            commentDescription,
        });

        // Save the comment to the database
        const savedComment = await newComment.save();

        // Return the saved comment
        res.status(201).send({
            success: true,
            message: 'Comment created successfully',
            comment: savedComment,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error creating comment',
            error: error.message,
        });
    }
};


// Get all comments for a specific employee
export const getCommentsByEmployeeController = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const comments = await Comment.find({ employeeId }).sort({ createdAt: -1 });
        res.status(200).send({ success: true, comments });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error fetching comments', error });
    }
};

// Get a single comment for a specific employee
export const getCommentByIdController = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).send({ success: false, message: 'Comment not found' });
        }
        res.status(200).send({ success: true, comment });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error fetching comment', error });
    }
};


// Update a comment

export const updateCommentController = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { commentDescription } = req.body; // Use commentDescription explicitly

        // Update the comment
        const updatedComment = await Comment.findByIdAndUpdate(
            commentId,
            { commentDescription },
            { new: true } // Return the updated comment
        );

        // Send response
        res.status(200).send({ success: true, message: 'Comment updated successfully', updatedComment });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error updating comment', error });
    }
};


// Delete a comment
export const deleteCommentController = async (req, res) => {
    try {
        const { commentId } = req.params;
        await Comment.findByIdAndDelete(commentId);
        res.status(200).send({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: 'Error deleting comment', error });
    }
};
