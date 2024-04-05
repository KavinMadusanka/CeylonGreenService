import express from "express"
import { categoryControlller, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "./../controllers/categoryController.js";
//router object
const router = express.Router();

//routes
//create category
router.post("/create-category",createCategoryController);

//update category
router.put("/update-category/:id",updateCategoryController);

//getAll category
router.get("/get-category",categoryControlller);

//single category
router.get("/single-category/:slug",singleCategoryController);

//delete category
router.delete("/delete-category/:id",deleteCategoryController);

export default router;