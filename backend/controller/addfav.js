import { Favourite } from "../models/Favourite.js";
import { User } from "../models/User.js";
export const addFavourite = async(req,res) =>{
    const user = req.user
    const {mealId} = req.body;
    console.log(user)
    
    try{
        const existFavMeal = await Favourite.findOne({userId:user._id,mealId:mealId})
        if(existFavMeal) {
            return res.status(400).json({message:"Meal already exists in favourites"})
        }
        await Favourite.create({
            userId: user._id,
            mealId: mealId
        })
        return res.status(201).json({message:"Meal added to favourites successfully"})
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}

export const getUserFavMeal = async(req,res) =>{
    const user = req.user
    try{
        const userFav = await Favourite.find({userId:user._id}).sort({createdAt:-1})
        
        if (!userFav) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(201).json({favourites:userFav})

    }catch(err){
        console.error(err)
        return res.status(500).json({message:"Internal server error"});
    }
}