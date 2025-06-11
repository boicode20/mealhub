import React, { useContext } from 'react'
import { GiCookingPot } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { MdOutlineLogout } from "react-icons/md";
import { AuthContext } from '../../../AuthContext/AuthProvider';
import { API } from '../../api/Api.js';

const SmList = () => {
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
    <div className='sidebar-lists w-full p-4 h-full md:hidden block'>
      <ul className='sidebar-text-name w-full h-full flex flex-col pt-5 gap-4 justify-baseline items-center'>
        <Link to={'/meal/Beef'} className='w-full flex items-center gap-3 text-[1.1rem]'><GiCookingPot className='text-2xl'/><li>Meals</li></Link>
              <Link to={'/meal/favourites'} className='w-full flex items-center gap-3 text-[1.2rem]'><MdFavorite className='text-2xl'/><li>Favourites</li></Link>
              <Link to={'/meal/profiles'} className='w-full flex items-center gap-3 text-[1.2rem]'><IoIosSettings className='text-2xl'/><li>Profiles</li></Link>
              <Link onClick={handleLogout} className='w-full flex items-center gap-3 text-[1.2rem]'><MdOutlineLogout className='text-2xl'/><li>Logout</li></Link>
      </ul>
    </div>
  )
}

export default SmList
