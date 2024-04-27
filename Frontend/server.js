import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/KAauthRoute.js';

import appointmentRoutes from './routes/appointmentRoutes.js';
import empRoutes from "./routes/employeeRoutes.js";
import fileUpload from 'express-fileupload'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import UserRoutes from './routes/UserRegisterRoutes.js';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose';
import tokenRoutes from './routes/tokenRoutes.js';
import CartRoutes from './routes/CartRoutes.js';

//configure env
dotenv.config();

//database config
connectDB();

//resr object
const app = express();

app.use(cors());
app.use(bodyParser.json())

//get the access of file upload
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use("/Assets", express.static(__dirname + "/Assets"));
app.use(fileUpload());

//middelwares
app.use(express.json());
// app.use(morgan("dev"));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/user', UserRoutes);
app.use('/api/v1/appointment',appointmentRoutes);

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use('/api/v1/auth', authRoutes);
app.use('api/v1/product',tokenRoutes);
app.use('/api/user', UserRoutes);
<<<<<<< Updated upstream
app.use("/api/v1/employee", empRoutes);
=======
app.use("/api/v1/employees", empRoutes);
app.use("/api/vi/Cart", CartRoutes);
>>>>>>> Stashed changes


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
            .white);
});