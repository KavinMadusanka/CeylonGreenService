// CartController.js
import express from 'express';
import { addToCart, deleteCartItem, getCart, updateCartItemQuantity } from '../controllers/CartController.js';
//import userAuthMiddleware from '../middlewares/userAuthMiddleware.js'

const router = express.Router(); // Define the router

//router.use(userAuthMiddleware); // Use the userAuthMiddleware with the router

// Define your routes
router.post('/add-to-cart', addToCart);
router.get('/get-cart', getCart);
router.patch('/update-item/:itemId', updateCartItemQuantity);
router.delete('/delete-cart-item/:itemId', deleteCartItem);

export default router;
  