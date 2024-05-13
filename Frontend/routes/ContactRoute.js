import express from 'express';
import { SaveMessage, getAllContactDetails } from '../controllers/ContactController.js';

const ContactRouter = express.Router();

//save message
ContactRouter.post('/saveMessage', SaveMessage);

//get all contact details
ContactRouter.get('/getContact', getAllContactDetails);

export default ContactRouter;