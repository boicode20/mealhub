import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const FavouriteSchema = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    mealId:{
        type:String,
        required:true
    }
},{timestamps:true});

export const Favourite = model("Favourite",FavouriteSchema);
