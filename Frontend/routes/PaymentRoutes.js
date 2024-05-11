import express from 'express';
import {paymentController,
    bankpaymentController,
    updateProductQuantityController
} from '../controllers/PaymentController.js'
import { deleteAllCartItem } from '../controllers/CartController.js';

//router object
const router = express.Router();

//Post method
router.post("/KAcardpayment", paymentController);
router.post("/KApaymentForm", bankpaymentController);

//delete part
router.delete("/clear-cart/:email",deleteAllCartItem);

//update quantity
router.patch("/update-quantity/:productId", updateProductQuantityController);


export default router;