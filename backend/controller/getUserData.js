export const userData = async(req, res) => {
    const user = req.user;
    res.status(201).json({message:"User data fetched successfully", user})
}