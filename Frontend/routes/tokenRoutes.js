import express from "express";
import {braintreeTokenController} from '../controllers/tokenController.js'

//router object
const router = express.Router();

//token
router.get("/braintree/token", braintreeTokenController);

export default router;