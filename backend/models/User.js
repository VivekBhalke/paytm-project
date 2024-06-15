import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email : {
        required: true,
        type: String,
    },
    password : {
        required: true,
        type: String,
    }
  });
  
const User = mongoose.model('User', UserSchema);
export default User;