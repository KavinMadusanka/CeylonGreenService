import express from "express";
import { createSupplierController, deleteSupplierController, getSuppliersController, updateSupplierController } from "../controllers/SupplierController.js";

const router = express.Router();

// Create a new supplier
router.post("/create-supplier", createSupplierController);

// Get all suppliers
router.get("/get-supplier", getSuppliersController);

// Update supplier details
router.put("/update-supplier/:id", updateSupplierController);

// Delete a supplier
router.delete("/delete-supplier/:id", deleteSupplierController);

export default router;