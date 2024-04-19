import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/KAauthRoute.js';
import fileUpload from 'express-fileupload'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import UserRoutes from './routes/UserRegisterRoutes.js';
import cors from 'cors'
import bodyParser from 'body-parser'
import ContactRoutes from "./routes/ContactRoute.js";

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
app.use('/api/contact', ContactRoutes)


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