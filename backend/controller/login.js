import { User } from "../models/User.js";
import { checkPassword } from "../Hashing/checkPassword.js";
import { genToken } from "../middleware/middleware.js";

export const login = async(req,res) =>{
    const {username,password} = req.body;
    if(!username||!password) 
        return res.status(400)
        .json({status:"failed",mesesage:"Please fill all the fields"});
    try{
        const user = await User.findOne({username})
        console.log(user)
        if(!user) return res.status(400)
            .json({status:"failed",message:"Username not found"})
        const isMatch = checkPassword(password,user.password)
        if(!isMatch) {return res.status(400).json({status:"failed",message:"Password is incorrect"})}
        genToken(res,user)
        res.status(201).json({message:"Login seccessful!"})
        }catch(err){
        console.log(err)
        res.status(400).json({status:"failed",message:err.message})
    }
}