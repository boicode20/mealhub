import mongoose from "mongoose";
import { Schema,model } from "mongoose";

const UserSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password must be at least 8 characters"],
    },
},{timestamps:true});

export const User = model("User",UserSchema);