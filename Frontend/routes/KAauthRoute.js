import express from 'express';
import {cardController} from '../controllers/KAauthController.js';
import {addressController} from '../controllers/KAauthController.js';

//router object
const router = express.Router();

//routing
//Method POST
router.post("/KAddcard", cardController);
router.post("/KAddaddress", addressController);

//LOGIN || POST
router.post('/login',)

export default router;

