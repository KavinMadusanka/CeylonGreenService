import express from 'express';
import {cardController} from '../controllers/KAauthController.js';
//router object
const router = express.Router();

//routing
//Method POST
router.post("/KAddcard", cardController);

//LOGIN || POST
router.post('/login',)

export default router;

