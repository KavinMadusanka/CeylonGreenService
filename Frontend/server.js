import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/KAauthRoute.js";

import appointmentRoutes from "./routes/appointmentRoutes.js";
import empRoutes from "./routes/employeeRoutes.js";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import { dirname } from "path";
import UserRoutes from "./routes/UserRegisterRoutes.js";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import tokenRoutes from "./routes/tokenRoutes.js";
import CartRoutes from "./routes/CartRoutes.js";
import PaymentRoutes from "./routes/PaymentRoutes.js";
import InventoryRoutes from "./routes/InventoryRoutes.js";
import categoryModel from "./models/categoryModel.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import SupplierRoutes from "./routes/SupplierRoutes.js";
import programRoutes from "./routes/programRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import ContactRoutes from "./routes/ContactRoute.js"
import WishlistRoutes from "./routes/WishlistRoutes.js"


//configure env
dotenv.config();

//database config
connectDB();

//resr object
const app = express();

app.use(cors());
app.use(bodyParser.json());

//get the access of file upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/Assets", express.static(__dirname + "/Assets"));
app.use(fileUpload());

//middelwares
app.use(express.json());
// app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/payment", PaymentRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/v1/appointment", appointmentRoutes);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
//app.use('api/v1/product',tokenRoutes);
app.use("/api/user", UserRoutes);
app.use("/api/v1/employees", empRoutes);
app.use("/api/v1/Cart", CartRoutes);
app.use("/api/v1/wishlist", WishlistRoutes);

// app.use("/api/v1/Inventory", InventoryRoutes);

app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", InventoryRoutes);
app.use("/api/v1/supplier", SupplierRoutes);

app.use('/api/v1/programs', programRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/enrollments', enrollmentRoutes);
app.use('/api/contact', ContactRoutes);


//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to CeylonGreen</h1>");
});

//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT} `.bgCyan
      .white
  );
});
