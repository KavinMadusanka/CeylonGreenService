import express from 'express';
import {paymentController,
    bankpaymentController
} from '../controllers/PaymentController.js'

//router object
const router = express.Router();

//Post method
router.post("/KAcardpayment", paymentController);
router.post("/KApaymentForm", bankpaymentController);

export default router;