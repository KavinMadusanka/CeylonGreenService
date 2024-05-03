// CartController.js
import express from 'express';
import { addToCart, deleteCartItem, getCart, updateCartItemQuantity } from '../controllers/CartController.js';
//import userAuthMiddleware from '../middlewares/userAuthMiddleware.js'

const router = express.Router(); // Define the router

//router.use(userAuthMiddleware); // Use the userAuthMiddleware with the router

// Define your routes
router.post('/add-to-cart', addToCart);
router.get('/get-cart/:email', getCart);
router.put('/update-item/:id', updateCartItemQuantity);
router.delete('/delete-cart-item/:id', deleteCartItem);

export default router;
  