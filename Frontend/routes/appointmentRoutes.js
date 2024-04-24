import express from 'express';
import {appointmentController} from '../controllers/appointmentController.js';

//router object
const router = express.Router();

//routing
//APPOINTMENT || METHOD POST
router.post('/appointment1', appointmentController)

export default router;