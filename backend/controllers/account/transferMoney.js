
import User from "../../models/User.js";
import Account from "../../models/Account.js";
import mongoose from "mongoose";


export default async function transferMoney(req ,res){
    const {to , amount} = req.body;
    if( amount < 0)
    {
        return res.json({message : "do not send negative money"})
    }
    if(!to)
    {
        return res.json({message : "provide another user to send money"})
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    //this is like a synchronized block of java , where only one thread can execute
    //this code from session.startTransaction() to session.commitTransaction()
    //works at a time for only one thread 
    const account = await Account.findOne({ userId : req.user_id}).session(session);
    //this is the account form which the withdrawal takes place
    if(!account || account.balance < amount)
    {
        await session.abortTransaction();
        return res.json({message : "you don't have the amount"})

    } 
    const toAccount = await Account.findOne({userId : to}).session(session);
    if(!toAccount)
    {
        await session.abortTransaction();
        return res.json({message : "there is no other user of such id"});
    }

    if(account == toAccount)
    {
        return res.json({message : "cannot send money to yourself"});
    }
    await Account.updateOne({userId : req.user_id } , {$inc : { balance : -amount}}).session(session)
    
    await Account.updateOne({userId : to } , {$inc : { balance : amount}}).session(session)

    session.commitTransaction();
    res.json({message : "Transaction done successfully"});


}