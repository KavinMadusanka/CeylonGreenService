import express from 'express';
import {cardController} from '../controllers/KAauthController.js';
//router object
const router = express.Router();

//routing
//Method POST
router.post("/KAddcard", cardController);

export default router;

