import User from "../../models/User.js";
import Account from "../../models/Account.js";

export default async function getBalance(req ,res){
    //req.user_id has the user._id
    //and there would be one Account document , which would have userId as req.user_id

    const account = await Account.findOne({userId : req.user_id});
    res.json({balance : account.balance});
}