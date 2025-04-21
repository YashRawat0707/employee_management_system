import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectToDatabase = async() => {
      try{
            await mongoose.connect(process.env.MONGODB_URL || "mongodb://localhost:27017/employee_management")
      }catch(error){
            console.log(error);
      }
}

export default connectToDatabase;