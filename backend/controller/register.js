import { User } from "../models/User.js";
import { hashPassword } from "../Hashing/hashPassword.js";
import validator from 'validator'

export const register = async (req, res) => {
    const { fullname, username, email, password } = req.body;
    if(!validator.isEmail(email)) return res.status(400).json({message:"Invalid email address"});
    try{
        if(!fullname || !username || !email || !password){
            return res.status(400).json({status:"failed",message:"Please fill all the fields"});
        }
        const usernameExist = await User.findOne({username})
        const emailExist = await User.findOne({email})

        if(usernameExist){
            return res.status(400).json({status:"failed",message:"Username already exists"});
        }
        if(emailExist){
            return res.status(400).json({status:"failed",message:"Email already exists"});
        }

        const hashedPassword = hashPassword(password);
        await User.create({
            fullname,
            username,
            email,
            password:hashedPassword
        });

        return res.status(201).json({status:"success",message:"User created successfully"})
        
    }catch(err){
        return res.status(500).json({status:"failed",message:err.message});
    }

}
