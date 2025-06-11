import React, { useContext, useEffect, useState } from 'react'
import RenderSidebar from '../Sidebar/RenderSidebar'
import { AuthContext } from '../../../AuthContext/AuthProvider'
import Loader from '../Meal/Loader'
import { API } from '../../api/Api.js'
import './favourites.css'

import FavLists from './FavLists.jsx'
const Favourites = () => {
    const  {accUser,loading} = useContext(AuthContext)
    const [favourites,setFavourites] = useState()
    const [favLoad,setFavLoad] = useState(true)
    useEffect(()=>{
        const getAllFav = async() =>{
            setFavLoad(true)
            try{    
                const allFav = await API.post('get-favourite')
                setFavourites(allFav.data.favourites)
            }catch(err){
                console.error(err)
            }finally{
                setFavLoad(false)
            }
        }
        getAllFav()
    },[])
  return (
    <div className='w-full h-full bg-[#2f2f2f] rounded-0 md:rounded-[60px_0_0_60px] grid grid-cols-1 grid-rows-[auto_1fr] py-5 px-2  md:p-[30px_15px] gap-4 relative overflow-hidden '>
      <div className="head-fav-container">
        <RenderSidebar/>
      </div>
      {
        loading?(<Loader imgLoader={loading}/>):
        (
        <div className="fav-text-font body-fav overflow-y-scroll scrollbar-hidden  w-full h-full rows-2">
            <div className="fav-head flex flex-col gap-3">
                <h1 className='mt-2 text-2xl text-[#5abc81] font-semibold'>Hello <span className='text-[#ededed]'>{accUser.fullname}!</span></h1>
                {
                    favourites && favourites.length > 0 ? (
                        <h1 className='text-[#ededed] text-[.9rem] '>Your Favourite Meals</h1>
                    ) : (
                        <h1 className='text-[#ededed] text-[.9rem] '>You have no favourite meals yet</h1>
                    )
                }
            </div>
            <div className="fav-lists mt-5  w-full h-full">
                 {
                        favLoad?(
                            <div className="w-full h-full flex justify-center items-center"><div className="loader"></div></div>
                        ):(
                           <FavLists favourites={favourites} />
                        )
                    }
            </div>
        </div>
        
        )
      }
    </div>
  )
}

export default Favourites
