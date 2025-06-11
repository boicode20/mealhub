import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar/Sidebar'

const Protected = () => {

  return (
    <div 
    className='w-full h-screen 
    grid md:grid-cols-[auto_1fr] grid-cols-1 
    relative' 
    style={{background:'var(--green)'}}>
      <Sidebar/>
      <Outlet />
    </div>
  )
}

export default Protected
