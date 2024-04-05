import slugify from "slugify";
import InventoryModel from "../models/InventoryModel.js";
import fs from "fs";


export const createProductController = async(req, res) => {
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is Required"});
            case !description:
                return res.status(500).send({error:"Description is Required"});
            case !price:
                return res.status(500).send({error:"Price is Required"});
            case !category:
                return res.status(500).send({error:"Category is Required"});
            case !quantity:
                return res.status(500).send({error:"Quantity is Required"});
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
        .populate("category");
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

//delete controller
export const deleteProductController = async(req,res) => {
    try {
        await InventoryModel.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({
            success:true,
            message: "Product deleted successfully",
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting product",
            error,
        });
    }
};

//update products
export const updateProductController = async(req,res) => {
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files
        //validation
        switch(true){
            case !name:
                return res.status(500).send({error:"Name is Required"});
            case !description:
                return res.status(500).send({error:"Description is Required"});
            case !price:
                return res.status(500).send({error:"Price is Required"});
            case !category:
                return res.status(500).send({error:"Category is Required"});
            case !quantity:
                return res.status(500).send({error:"Quantity is Required"});
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