import express from 'express';
import {
    createEmployeeController,
    getEmployeeController,
    getEmployeeByIdController,
    updateEmployeeController,
    deleteEmployeeByIdController,
} from '../controllers/employeeController.js';

const empRoutes = express.Router();

empRoutes.post('/addemployee', createEmployeeController);
empRoutes.get('/get-employees', getEmployeeController);
empRoutes.get('/get-employee/:id', getEmployeeByIdController);
empRoutes.put('/update-employee/:id', updateEmployeeController);
empRoutes.delete('/employees/:id', deleteEmployeeByIdController);

export default empRoutes;
