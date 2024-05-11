import express from 'express';
import {
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    updateProductController,
    productPhotoController,
    getReorderAlertsController,
    handleReorderEmail,
    updateProductQuantity,
} from '../controllers/InventoryController.js';
import formidable from "express-formidable";

const router = express.Router();

// Create a new product
router.post("/dashboard/admin/create-product",createProductController);

// Get all products
router.get('/get-products', getProductController);

//single product
router.get("/get-product/:slug",getSingleProductController);

//get photo
router.get("/product-photo/:pid",productPhotoController);

// Update a product
router.put("/update-product/:pid",formidable(),updateProductController);

// Delete a product
router.delete('/delete-product/:pid', deleteProductController);

// Route to fetch reorder alerts
router.get('/reorder-alerts', getReorderAlertsController);

// Route to handle sending reorder emails
router.post("/reorder-email", handleReorderEmail);

//update product quantity
router.put('/update-product-quantity/:pid',updateProductQuantity)

export default router;