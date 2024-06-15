import express from "express";
const router = express.Router();
import User from "../../models/User.js";

import jwt from "jsonwebtoken";
import env from "dotenv";
import bcrypt from "bcrypt";
import Account from "../../models/Account.js";

env.config();

export default async function signupController(req,res){
    try {
        const email = req.body.email;
        const password = req.body.password;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const result = await User.find({});
        let presentEmail = false;
        let presentPassword = false;
        result.forEach((element)=>{
            if(element.email == email)
                {
                    presentEmail = true;
                }
            else if(element.password == password)
                {
                    presentPassword = true;

                }
        });

        if(presentEmail)
        {
            return res.json({message : "User already exits"});
        }
        if(presentPassword)
        {
            return res.json({message : "Password Already exists"})
        }

        let saltRounds = process.env.saltRounds;
        console.log("saltROunds" , saltRounds);
        saltRounds = parseInt(saltRounds);
        console.log(typeof saltRounds);
        // return res.json({message : "reached here"})
        bcrypt.hash(password,saltRounds,async(err,hash)=>{
            if(err){
                return res.json({message :"errror generating the hashed password" , error : err});
            }
            else if(!err){
                const hashedPassword = hash;
                if(hashedPassword)
                    {
                        const user_id = result.length + 1;
                        let user = new User({
                            email : email ,
                            password : hashedPassword,
                            first_name,
                            last_name
                            
                        });
            
                        await user.save();

                        await Account.create({
                            userId : user._id,
                            balance : 1 +  Math.random() * 10000
                        })

                        const token = user._id + ':' + email;
                        jwt.sign(token , process.env.SECERT , async (err, token) => {
                                if (err){return res.json({message : "error making the token"})}
                                else{
                                    const account = await Account.findOne({userId: user._id});
                                    return res.json({message : "login successfull" , token : token, user : {
                                        email : user.email,
                                        user_id : user._id,
                                        first_name : user.first_name,
                                        last_name : user.last_name,
                                        balance : Math.floor(account.balance)
                                    }});
                                }
                            }
                        );
                    }
            }
        })

      
        
        // Save user to the database
        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}