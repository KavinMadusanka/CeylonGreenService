import express from 'express';
import {
  createProgram,
  getAllPrograms,
  getProgramById,
  updateProgram,
  deleteProgram,
} from '../controllers/programController.js';

const router = express.Router();

// Create a new training program
router.post('/create-program', createProgram);

// Get all training programs
router.get('/get-programs', getAllPrograms);

// Get a single training program by ID
router.get('/get-program/:programId', getProgramById);

// Update a training program by ID
router.put('/update-program/:programId', updateProgram);

// Delete a training program by ID
router.delete('/delete-program/:programId', deleteProgram);

export default router;
