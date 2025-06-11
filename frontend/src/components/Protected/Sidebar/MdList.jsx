import React, { useContext } from 'react'
import { GiCookingPot } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { Link } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { API } from '../../api/Api.js';
import { AuthContext } from '../../../AuthContext/AuthProvider';
const MdList = () => {
  const [loading,setLoading] = React.useState(false)
  const navigate = useNavigate()
  const {setAccUser} = useContext(AuthContext)
  const handleLogout = async() =>{
      try{
        setLoading(true)
        await API.post('/logout')
        setAccUser(null)
      }catch(err){
        console.error(err)
      }finally{
        setLoading(false)
       navigate('/')
      }
    }
  return (
    <div className='sidebar-lists w-full h-full md:block hidden'>
      <ul className='sidebar-text-name w-full h-full flex flex-col pt-5 gap-4 justify-start items-baseline pl-2'>
        <Link to={'/meal/Beef'} className='w-full flex items-center gap-3 text-[1.3rem]'><GiCookingPot className='text-2xl'/><li>Meals</li></Link>
        <Link to={'/meal/favourites'} className='w-full flex items-center gap-3 text-[1.3rem]'><MdFavorite className='text-2xl'/><li>Favourites</li></Link>
        <Link to={'/meal/profiles'} className='w-full flex items-center gap-3 text-[1.3rem]'><IoIosSettings className='text-2xl'/><li>Profiles</li></Link>
        <Link onClick={handleLogout} className='w-full flex items-center gap-3 text-[1.3rem]'><MdOutlineLogout className='text-2xl'/><li>Logout</li></Link>
      </ul>
    </div>
  )
}

export default MdList
