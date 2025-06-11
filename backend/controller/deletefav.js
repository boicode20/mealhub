import { Favourite } from "../models/Favourite.js";

export const deleteFavourite = async (req, res) => {
    const user = req.user;
    const  {mealId}  = req.body;
    console.log(mealId)
    try{

        const existFavMeal = await Favourite.findOne({ userId: user._id, mealId: mealId });
        if (!existFavMeal) {
            return res.status(404).json({ message: "Meal not found in favourites" });
        }
        
        await Favourite.deleteOne({ userId: user._id, mealId: mealId });
        return res.status(200).json({ message: "Meal removed from favourites successfully" });
    }catch(err){
        console.error(err);
        return res.status(500).json({message:"Internal server error"});
    }
}