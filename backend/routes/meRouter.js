import express from "express";
import tokenVerify from "../middlewares/tokenVerify.js";
import User from "../models/User.js";
import Account from "../models/Account.js";
const router = express.Router();


router.get("/myId" , tokenVerify ,async (req ,res)=>{
    try {
        const user = await User.findOne({_id : req.user_id});
        const account = await Account.findOne({userId: req.user_id});
        return res.json({user : {
            email : user.email,
            user_id : user._id,
            first_name : user.first_name,
            last_name : user.last_name,
            balance : Math.floor(account.balance)
    }});
    } catch (error) {
        return res.json({message  : "no user"})
    }
})




export default router;