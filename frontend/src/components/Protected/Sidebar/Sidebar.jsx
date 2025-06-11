import React, { useContext, useState } from 'react'
import './sidebar.css'
import { FiSearch } from "react-icons/fi";
import { GiHotMeal } from "react-icons/gi";
import SmList from './SmList';
import MdList from './MdList';
import { AuthContext } from '../../../AuthContext/AuthProvider';
import { IoClose } from "react-icons/io5";
import { API } from '../../api/Api.js';

const Sidebar = () => {
  const {isOpen,setIsOpen} = useContext(AuthContext)
  const toggleSidebar = () => {
    setIsOpen(!true);
  }
 
  return (
    <div className={`sidebar w-auto h-full absolute top-0 left-0 md:relative text-white p-4  ${isOpen?"translate-x-0":"translate-x-[-100%]"} md:transform md:translate-x-0 transition-transform duration-300 ease-in-out z-50`} style={{background:'var(--green)'}}>
      <div className="w-full h-full grid grid-cols-1 grid-rows-[200px_1fr_150px] relative">
      <div className="close-sidebar absolute top-2 right-2 md:hidden block">
        <IoClose className='text-3xl text-[#ffff] cursor-pointer' onClick={toggleSidebar}/>
      </div>
        <div className="search-meal w-full h-full flex justify-center items-center flex-col gap-4 ">
        <div className="logo w-full flex flex-col gap-2 justify-center items-center">
          <GiHotMeal className='text-5xl text-[#ffff]'/>
          <h1 className='render-sidebar-title text-3xl'>MealHub</h1>
        </div>
       <div className="search-meal-input relative w-full h-auto flex justify-center items-center">
                      <input className='sidebar-input w-full h-[40px] bg-[#ffff] pl-2 md:pr-15 pr-10 text-[.9rem] rounded-2xl' type="text" name="meal" id="meal" placeholder='Search meal here...' />
                      <FiSearch className='absolute right-3 z-10 text-[#a2a2a2] text-1xl'/>
        </div>
      </div>
      
      <div className="sidebar-list md:w-[200px] h-full">
        <MdList/>
        <SmList />
      </div>
      <div className="sidebar-footer w-full h-full flex justify-center items-center">
        <h1 className='text-[.8rem]'>MealHub &copy; 2025</h1>
      </div>
      </div>
      
    </div>
  )
}

export default Sidebar
