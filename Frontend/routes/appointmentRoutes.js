import express from 'express';
import {appointmentController, 
    deleteAppointmentController, 
    getAppointmentController, 
    singleAppointmentController, 
    updateAppointmentController,
    getAdminAppointmentController,
    downloadPDFController} from '../controllers/appointmentController.js';

//router object
const router = express.Router();

//routing
//APPOINTMENT || METHOD POST
router.post('/appointment1', appointmentController);

// update appointment
router.put('/update-appointment/:id', updateAppointmentController);

// get all appointment
router.get('/get-appointment/:id', getAppointmentController);
router.get('/get-admin-appointment', getAdminAppointmentController);

// single appointment
router.get('/single-appointment/:id', singleAppointmentController);

// delete appointment
router.delete('/delete-appointment/:id',deleteAppointmentController);

// Get appointment PDF
router.get('/download-pdf/:id', downloadPDFController);


export default router;