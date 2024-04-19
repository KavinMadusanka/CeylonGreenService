import express from 'express';
import { SaveMessage } from '../controllers/ContactController.js';

const ContactRouter = express.Router();

//save message
ContactRouter.post('/saveMessage', SaveMessage);

export default ContactRouter;