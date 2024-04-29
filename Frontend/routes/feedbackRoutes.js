import express from 'express';
import { addLike, addDislike, getFeedbackByEmployeeId, createFeedbackForEmployee} from '../controllers/feedbackController.js';

const router = express.Router();

// Route to add a like
router.post('/like/:employeeId/:userId', addLike);

// Route to add a dislike
router.post('/dislike/:employeeId/:userId', addDislike);

// Route to create feedback for an employee
router.post('/create/:employeeId', async (req, res) => {
    const { employeeId } = req.params;
    const result = await createFeedbackForEmployee(employeeId);
    if (result.success) {
        res.status(201).send(result);
    } else {
        res.status(500).send(result);
    }
});


// Route to get feedback by employee ID
router.get('/:employeeId', getFeedbackByEmployeeId); // <-- Add this line

export default router;
