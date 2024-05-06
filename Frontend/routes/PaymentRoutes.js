import express from 'express';
import {paymentController} from '../controllers/PaymentController.js'

//router object
const router = express.Router();

//Post method
router.post("/KApaymentForm", paymentController);
router.post("/KAcardpayment", paymentController);

export default router;