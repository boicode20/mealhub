import { User } from "../models/User.js";
import { checkPassword } from "../Hashing/checkPassword.js";
import { hashPassword } from "../Hashing/hashPassword.js";
import { genToken } from "../middleware/middleware.js";

export const updateUserProfiles = async(req,res) =>{
    const {fullname,email,oldPassword,newPassword} = req.body
    const {username} = req.user
    
    const updatedDataUser = {}
    if(!fullname&&!email&&!oldPassword&&!newPassword){
        return res.status(400).json({messag:"Please input new data"});
    } 
    try{
        const checkUser = await User.findOne({username})
        if(fullname){
            updatedDataUser.fullname = fullname;
        }
        if(email){
            const isEmailExist = await User.findOne({email})
            if(isEmailExist) return res.status(401).json({message:"Please try another email."});
            updatedDataUser.email = email
        }
        if (oldPassword && newPassword) {
            const isPasswordCorrect = checkPassword(oldPassword, checkUser.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "Old password not matched!" });
            }

            updatedDataUser.password = hashPassword(newPassword); 
            }
        const updatedUser = await User.findOneAndUpdate({username:username},
        
            updatedDataUser,
        {
            new:true
        })
        genToken(res,updatedUser)
        return res.status(200).json({message:"Updated user data successful!"})
    }catch(err){
        console.error(err);
        return res.status(500).json({ message: "Server error while updating user." });
    }
}