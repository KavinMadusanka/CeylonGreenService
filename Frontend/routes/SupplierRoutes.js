import express from "express";
import { createSupplierController, deleteSupplierController, getSuppliersController,getSingleSupplierController, updateSupplierController } from "../controllers/SupplierController.js";

const router = express.Router();

// Create a new supplier
router.post("/dashboard/admin/create-supplier", createSupplierController);

// Get all suppliers
router.get("/get-supplier", getSuppliersController);

// Get single supplier
router.get("/get-supplier/:id", getSingleSupplierController);


// Update supplier details
router.put("/update-supplier/:id", updateSupplierController);

// Delete a supplier
router.delete("/delete-supplier/:id", deleteSupplierController);

export default router;