import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../AuthContext/AuthProvider'
import { LiaBuromobelexperte } from "react-icons/lia";
import './sidebar.css'
import { useLocation } from 'react-router-dom';
const RenderSidebar = () => {
    const {isOpen,setIsOpen}= useContext(AuthContext)
    const [greet,setGreet] = useState('')
    const loc = useLocation().pathname.split('/')[2]
    
    console.log(loc)
    return (
 <div className="header-left flex items-center gap-4">
            <LiaBuromobelexperte className='md:hidden block text-3xl text-[#5abc81]' onClick={()=>{setIsOpen(!isOpen)}}/>
            {
              loc==='profiles'?<h1 className='head-text md:text-3xl md:block hidden text-2xl text-[#5abc81]'>Welcome to your <span className='font-bold'>profiles!</span></h1> :<h1 className='head-text md:text-3xl md:block hidden text-2xl text-[#5abc81]'>What are we cooking <span className='font-bold'>Today?</span></h1>}
            <h1 className='head-text md:text-2xl text-2xl block md:hidden text-[#5abc81] font-bold'>Meal<span className='text-[#e6e6e6]'>Hub</span></h1>
    </div>
  )
}

export default RenderSidebar
