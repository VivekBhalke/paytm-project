import User from "../../models/User.js";
import env from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Account from "../../models/Account.js";

env.config();
const SECRET = process.env.SECERT;

/*
1.check for email in db
2. if email exists, check password
    1.take the password whose email is correct
    2.compare it with bcyrpt.compare with the password given by user.
3.if password match then user is correct
4.else user is false.
*/
async function loginController(req  ,res){
    const user_details = req.body;
    console.log(user_details.email);
    const email = user_details.email;
    try {
        const result = await User.find({});
        var user;
        result.forEach((element)=>{
            if(element.email == email)
                {
                    user = element
                }
        });
        if(!user){
            return res.json({message : "improver email"})
            
        }
        else{
            console.log(user);
            // console.log(user.password);
            bcrypt.compare(user_details.password , user.password, async (err , same)=>{
                if(same){
                    const tokenString = user._id + ':' + email;
                    const token = jwt.sign(tokenString , SECRET);
                    const account = await Account.findOne({userId: user._id});
                    return res.json({message : "login successfull" , token : token, user : {
                        email : user.email,
                        user_id : user._id,
                        first_name : user.first_name,
                        last_name : user.last_name,
                        balance : Math.floor(account.balance)
                }});
                    
                }
                else{
                    return res.json({message : "password is incorrect"})
                }

            });
            
        }
    } catch (error) {
        
    }
    // res.json({message : "this is login controller"})
}

export default loginController;