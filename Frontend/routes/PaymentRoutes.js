import express from 'express';
import {paymentController} from '../controllers/PaymentController.js'

//router object
const router = express.Router();

//Post method
router.post("/KApaymentForm", paymentController);

export default router;