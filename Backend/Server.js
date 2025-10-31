import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import "dotenv/config";
import cookieParser from "cookie-parser";
import Router from './Routes/Authroutes.js';
import storemodel from "./Models/AddStore.js";
import Addusermodel from "./Models/Adduser.js";
import ratingModel from "./Models/Rating.js";
import { rating } from "./Controllers/AuthController.js";

const app = express();
const port = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000']
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }))

//mongodb connection
const connectDB = async () => {
    mongoose.connection.on("connected", () => console.log("mongodb connected"));
    await mongoose.connect(`${process.env.MONGO_URL}/Roxtel`);
}
connectDB();

//routes
app.get('/', (req, res) =>
    res.send("Api working")
);

app.get('/getstores', (req, res) => {
    storemodel.find()
        .then(store => res.json(store))
        .catch(err => res.json(err))
}
);
app.get('/getusers', (req, res) => {
    Addusermodel.find()
        .then(user => res.json(user))
        .catch(err => res.json(err))
})

app.use('/api/auth', Router)

//PORT listening
app.listen(port, () => {
    console.log(`server running at ${port}`)
})
