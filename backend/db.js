import mongoose from "mongoose";
import env from "dotenv";
env.config();
const URL = process.env.MONGO_URL;
export default function connectDB(){
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('MongoDB connected successfully');
      })
      .catch((err) => {
        console.error('MongoDB connection error:', err);
      });
}
