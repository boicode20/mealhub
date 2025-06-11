import express from 'express';
import { register } from '../controller/register.js';
import { login } from '../controller/login.js';
import { userData } from '../controller/getUserData.js';
import { authMid } from '../middleware/middleware.js';
import { addFavourite, getUserFavMeal } from '../controller/addfav.js';
import { deleteFavourite } from '../controller/deletefav.js';
import { updateUserProfiles } from '../controller/update.js';
import { logoutUser } from '../controller/logout.js';

const route = express.Router();

route.post('/register',register)
route.post('/login',login)
route.get('/user',authMid,userData)
route.post('/add-favourite',authMid,addFavourite)
route.post('/get-favourite',authMid,getUserFavMeal)
route.delete('/delete-favourite',authMid,deleteFavourite)
route.put('/update-user-data',authMid,updateUserProfiles)
route.post('/logout',authMid,logoutUser)
export default route;