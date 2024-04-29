import SupplierModel from "../models/SupplierModel.js";

// Create a new supplier
export const createSupplierController = async (req, res) => {
    try {
        const { name, address, contactNo, email } = req.body;
        const existingSupplier = await SupplierModel.findOne({ email });
        if (existingSupplier) {
            return res.status(400).json({ message: "Supplier already exists" });
        }
        const supplier = new SupplierModel({ name, address, contactNo, email });
        await supplier.save();
        res.status(201).json({ message: "Supplier created successfully", supplier });
    } catch (error) {
        res.status(500).json({ message: "Error creating supplier", error: error.message });
    }
};

// Get all suppliers
export const getSuppliersController = async (req, res) => {
    try {
        const suppliers = await SupplierModel.find();
        res.status(200).json({ suppliers });
    } catch (error) {
        res.status(500).json({ message: "Error getting suppliers", error: error.message });
    }
};

// Update supplier details
export const updateSupplierController = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, contactNo, email } = req.body;
        const updatedSupplier = await SupplierModel.findByIdAndUpdate(id, { name, address, contactNo, email }, { new: true });
        res.status(200).json({ message: "Supplier updated successfully", updatedSupplier });
    } catch (error) {
        res.status(500).json({ message: "Error updating supplier", error: error.message });
    }
};

// Delete a supplier
export const deleteSupplierController = async (req, res) => {
    try {
        const { id } = req.params;
        await SupplierModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Supplier deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting supplier", error: error.message });
    }
};