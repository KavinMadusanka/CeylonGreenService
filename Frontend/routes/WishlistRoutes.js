// CartController.js
import express from 'express';
import { getWishlist, addToWishlist ,deleteWishlistItem} from '../controllers/WishlistController.js';
//import userAuthMiddleware from '../middlewares/userAuthMiddleware.js'

const router = express.Router(); // Define the router

//router.use(userAuthMiddleware); // Use the userAuthMiddleware with the router

// Define your routes
router.post('/add-to-wishlist', addToWishlist);
router.get('/get-wishlist/:email', getWishlist);
router.delete('/delete-wishlist/:id', deleteWishlistItem);


export default router;
  