import express from 'express';
import {
    createEmployeeController,
    getEmployeeController,
    getEmployeeByIdController,
    updateEmployeeController,
    deleteEmployeeController,

} from '../controllers/employeeController.js';

const empRoutes= express.Router();

// Create a new employee
empRoutes.post('/smdashboard/addemployee', createEmployeeController);

// Get all employees
empRoutes.get('/get-employees', getEmployeeController);

// Get a single employee by ID
empRoutes.get('/get-employee/:id', getEmployeeByIdController);

// Update an existing employee
empRoutes.put('/update-employee/:id', updateEmployeeController);

// Delete an existing employee
empRoutes.delete('/delete-employee/:id', deleteEmployeeController);

export default empRoutes;
