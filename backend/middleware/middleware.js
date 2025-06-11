import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const authMid = async(req,res,next)=>{
    const token = req.cookies.token;
    if (!token) {
            return res.status(401).json({ message: "Access Denied. No token provided." });
        }
    
        try {
            const secretKey = process.env.JWT_SECRET||
            "jjsjsnnvnvhvhv*12357575kakajxjnxjxujsndndndndaj@1231231244885858";
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded; 
            next();
        } catch (error) {
            res.status(403).json({ message: "Invalid or expired token" });
        }
}

export const genToken =async (res,user)=>{
    const secretKey = process.env.JWT_SECRET||
    "assdaskjvj781273$ashcujhjasd%23995000Sschvbbch1231333555*%123"
    const {_id,fullname,email,username} = user

    const token = jwt.sign(
        {
            _id:_id,
            fullname:fullname,
            email:email,
            username:username
        },
        secretKey,
        { expiresIn: "7d" }
    );

      res.cookie("token", token, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    
}