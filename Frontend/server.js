import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";


//configure env
dotenv.config();

//database config
connectDB();

//resr object
const app = express();

//middelwares
app.use(express.json);
app.use(morgan("dev"));


//rest api
app.get("/",(req,res) => {
    res.send("<h1>Welcome to CeylonGreen</h1>");
});

//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT} `.bgCyan.white);
});