import express from "express";
const router = express.Router();
import User from "../../models/User.js";

import jwt from "jsonwebtoken";
import env from "dotenv";
import bcrypt from "bcrypt";



export default async function getAllUsers(req , res){
    try {
        const filter = req.query.filter || "";
        // const users = await User.find({ first_name: { $regex: '^vi', $options: 'i' } });
        const users = await User.find({
            $or: [
              { first_name: { $regex: filter, $options: 'i' } },
              { last_name: { $regex: filter, $options: 'i' } }
            ]
          });
        return res.json({
            users : users.map((element)=>{
                return{
                    user_id : element._id,
                    email : element.email,
                    first_name : element.first_name,
                    last_name : element.last_name

                }
            })
        });
    } catch (error) {
        console.log("error in the controller is : " , error);
        return res.json({message : "there was an error in the controller`"})
    }
}