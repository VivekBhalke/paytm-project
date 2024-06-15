
import User from "../../models/User.js";
import bcrypt from "bcrypt";
import env from "dotenv";
export default async function updateUser(req ,res){
    try {
        const user_id = req.user_id;
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const password = req.body.password;
        console.log(password);
        const saltRounds = parseInt(process.env.saltRounds);
        bcrypt.hash(password,saltRounds,async(err , hash)=>{
            if(err){
                console.log("error while hasing the password : " ,err);
                return res.json({message : "error hasing the password"})
            }
            else{
                const object = {first_name,last_name,password : hash};
                await User.updateOne({ _id : user_id } , object);
                return res.json({success : "updated successfully"})
            }
        })
        
    } catch (error) {
        console.log("error in the controller :",error);
        return res.json({message : "there was an error"})
    }   

}


