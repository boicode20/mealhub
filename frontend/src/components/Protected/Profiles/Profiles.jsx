import React,{useState} from 'react'
import RenderSidebar from '../Sidebar/RenderSidebar'
import { useContext } from 'react'
import { AuthContext } from '../../../AuthContext/AuthProvider'
import ProfileDetails from './ProfileDetails'
const Profiles = () => {
    const {accUser,loading} = useContext(AuthContext)
  return (
 <>
        {
            loading?<div className='w-full h-full bg-[#2f2f2f] flex items-center justify-center rounded-0 md:rounded-[60px_0_0_60px] '><div className="loader"></div></div>:
            <div className='w-full h-full bg-[#2f2f2f] rounded-0 md:rounded-[60px_0_0_60px] grid grid-cols-1 grid-rows-[50px_auto] py-2 px-4 md:px-6 relative pt-6  overflow-y-hidden '>
                <RenderSidebar/>
                <div className="body-head overflow-y-auto scrollbar-hidden w-full h-auto flex justify-center items-center pt-4">
                    <ProfileDetails accUser={accUser}/>
                </div>
            </div>
        }
    </>
  )
}

export default Profiles
