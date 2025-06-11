import mongoose from "mongoose";
import "dotenv/config";
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.CONNECT_STRING)
        console.log("Connected to Database");
    }catch(err){
        console.error(`Error: ${err}`);
    }
}

export default connectDB;