import express from 'express';
import {
  enrollEmployee,
  getAllEnrollments,
  getEnrollmentsByProgram,
  removeEnrollment,
} from '../controllers/enrollmentController.js';

const router = express.Router();

// Enroll an employee into a program
router.post('/enroll', enrollEmployee);

// Get all enrollments
router.get('/enrollments', getAllEnrollments);

// Get enrollments for a specific program
router.get('/enrollments/:programId', getEnrollmentsByProgram);

// Remove an enrollment
router.delete('/enrollment/:enrollmentId', removeEnrollment);

export default router;
