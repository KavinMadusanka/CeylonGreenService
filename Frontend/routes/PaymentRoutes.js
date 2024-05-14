import express from 'express';
import {paymentController,
    bankpaymentController,
    updateProductQuantityController,
    PaymentPriceController,
    orderController
} from '../controllers/PaymentController.js'
import { deleteAllCartItem } from '../controllers/CartController.js';

//router object
const router = express.Router();

//Post method
router.post("/KAcardpayment", paymentController);
router.post("/KApaymentForm", bankpaymentController);

//get all payment details
router.get("/get-paymentdetails",PaymentPriceController) 

//delete part
router.delete("/clear-cart/:email",deleteAllCartItem);

//update quantity
router.patch("/update-quantity/:productId", updateProductQuantityController);

//create order
router.post('/submit-cart', orderController);

export default router;