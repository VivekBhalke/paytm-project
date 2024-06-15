

import jwt from "jsonwebtoken";
import env from "dotenv";
import bcrypt from "bcrypt";

const SECERT = process.env.SECERT;

export default function tokenVerify(req , res, next){
    const token = req.headers.token;
    console.log("into the token verify");
    if(!token)
    {
        return res.json({message : "please provide the token"});
    }
        
    jwt.verify(token, SECERT , (err , decoded)=>{
        if(err){
            return res.json({message : "wrong token"});
        }
        const array = decoded.split(":");
        req.user_id = array[0];
        req.email = array[1];
        console.log(array);
        next();
    })

}