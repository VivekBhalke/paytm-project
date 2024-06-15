import express from 'express';
import mongoose from  'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './db.js';
import mainRouter from "./routes/index.js"
const app = express();
const port = 3000;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


connectDB();

app.use("/api/v1" , mainRouter);
app.listen(port ,()=>{
    console.log("server started")
} );

