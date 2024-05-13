import express from 'express';
import {appointmentController, 
    deleteAppointmentController, 
    getAppointmentController, 
    singleAppointmentController, 
    updateAppointmentController,
    getAdminAppointmentController,
    downloadPDFController} from '../controllers/appointmentController.js';
import { ASPController,
    getASPController,
    deleteASPController,
    getSingleASPSController} from '../controllers/ASPController.js';

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




//==================================
// Service Packages

//create service package
router.post('/create-sp', ASPController);

//read service packages
router.get('/read-sp', getASPController);

//get single package
router.get('/getsingle-sp/:id', getSingleASPSController)

//delete service package
router.delete('/delete-sp/:id', deleteASPController);





export default router;