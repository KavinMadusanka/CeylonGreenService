import express from 'express';
import {
    createEmployeeController,
    getEmployeeController,
    getEmployeeByIdController,
    updateEmployeeController,
    deleteEmployeeByIdController,
    createEmployeeController1,
    getEmployeeController1,
    getEmployeeByIdController1,
    updateEmployeeController1,
    deleteEmployeeController1,
} from '../controllers/employeeController.js';

const empRoutes = express.Router();

empRoutes.post('/addemployee', createEmployeeController);
empRoutes.get('/get-employees', getEmployeeController);
empRoutes.get('/get-employee/:id', getEmployeeByIdController);
empRoutes.put('/update-employee/:id', updateEmployeeController);
empRoutes.delete('/employees/:id', deleteEmployeeByIdController);

// Create a new employee

empRoutes.post('/create-employee', createEmployeeController1);



// Get all employees

empRoutes.get('/get-employees', getEmployeeController1);



// Get a single employee by ID

empRoutes.get('/get-employee/:id', getEmployeeByIdController1);



// Update an existing employee

empRoutes.put('/update-employee/:id', updateEmployeeController1);



// Delete an existing employee

empRoutes.delete('/delete-employee/:id', deleteEmployeeController1);


export default empRoutes;
