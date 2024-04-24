import express from 'express';
import {
    createEmployeeController,
    getEmployeeController,
    getEmployeeByIdController,
    updateEmployeeController,
    deleteEmployeeController,

} from '../controllers/employeeController.js';

const router = express.Router();

// Create a new employee
router.post('/create-employee', createEmployeeController);

// Get all employees
router.get('/get-employees', getEmployeeController);

// Get a single employee by ID
router.get('/get-employee/:id', getEmployeeByIdController);

// Update an existing employee
router.put('/update-employee/:id', updateEmployeeController);

// Delete an existing employee
router.delete('/delete-employee/:id', deleteEmployeeController);

export default router;
