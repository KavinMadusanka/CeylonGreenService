import slugify from "slugify";
import InventoryModel from "../models/InventoryModel.js";
import fs from "fs";



export const createProductController = async (req, res) => {
    try {
        const { name, price, quantity, category, supplier, reorderLevel } = req.fields;
        const {photo} = req.files

        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is Required"});
            case !price:
                return res.status(500).send({error:"Price is Required"});
            case !quantity:
                return res.status(500).send({error:"Quantity is Required"});
            case !category:
                return res.status(500).send({error:"Category is Required"});
            case !supplier:
                return res.status(500).send({error:"Supplier is Required"});
            case !reorderLevel:
                return res.status(500).send({error:"reorderLevel is Required"});
            case photo && photo.size > 1000000:
                return res.status(500).send({error:"photo is Required and should be less than 1mb"});
        }

        const products = new InventoryModel({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product created successfully",
            products,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in creating product",
        });
    }
};
//get all products
export const getProductController = async(req,res) =>{
    try {
        const products = await InventoryModel
        .find({})
        .populate("category")
        .populate("supplier")
        .select("-photo")
        .limit(12)
        .sort({createdAt: -1});
        res.status(200).send({
            success:true,
            counTotal: products.length,
            message:"AllProducts",
            products,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error in getting products",
            error: error.message,
        });
    }
};

//get single product
export const getSingleProductController = async(req,res) => {
    try {
        const product = await InventoryModel
        .findOne({slug: req.params.slug})
        .select("-photo")
        .populate("category")
        .populate("supplier");
        res.status(200).send({
            success: true,
            message: "Single product fetched",
            product,
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting single product",
            error,
        });
    }
};

//get photo
export const productPhotoController = async(req,res) => {
    try {
        const product = await InventoryModel.findById(req.params.pid).select("photo");
        if(product.photo.data){
            res.set("Content-type",product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:"Error while getting photo",
            error,
        });
        
    }
};

//update products
export const updateProductController = async(req,res) => {
    try {
        const {name,slug,price, quantity, category, supplier, reorderLevel} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is Required"});
            case !price:
                return res.status(500).send({error:"Price is Required"});
            case !quantity:
                return res.status(500).send({error:"Quantity is Required"});
            case !category:
                return res.status(500).send({error:"Category is Required"});
            case !supplier:
                return res.status(500).send({error:"Supplier is Required"});
            case !reorderLevel:
                return res.status(500).send({error:"reorderLevel is Required"});
            case photo && photo.size > 1000000:
                return res.status(500).send({error:"photo is Required and should be less than 1mb"});
        }
        const products = await InventoryModel.findByIdAndUpdate(req.params.pid,
            {...req.fields,slug:slugify(name)},{new:true}
            );
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        await products.save();
        res.status(201).send({
            success: true,
            message: "Product updated successfully",
            products,
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:"Error in update product",
        });
    }

};
//delete product
export const deleteProductController = async (req, res) => {
    try {
        const deletedProduct = await InventoryModel.findByIdAndDelete(req.params.pid).select("-photo");
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error while deleting product", error: error.message });
    }
};
// Check stock levels and trigger reorder actions
export const getReorderAlertsController = async (req, res) => {
    try {
      // Retrieve all products from the database
      const products = await InventoryModel.find();
  
      // Filter products with quantity below reorder level
      const reorderAlerts = products.filter(product => product.quantity < product.reorderLevel);
  
      res.status(200).json(reorderAlerts);
  
    } catch (error) {
      console.error('Error fetching reorder alerts:', error);
      res.status(500).json({ message: 'Error fetching reorder alerts' });
    }
  };