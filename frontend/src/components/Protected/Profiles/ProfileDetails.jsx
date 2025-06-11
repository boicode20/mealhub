import React, {useContext, useEffect, useState} from 'react'
import './profiles.css'
import {API} from '../../api/Api.js'
import { AuthContext } from '../../../AuthContext/AuthProvider.jsx'
import Swal from 'sweetalert2'

const ProfileDetails = ({accUser}) => {
  const [updateLoading,setUpdateLoading] = useState(false)
  const {setAccUser} = useContext(AuthContext)
  const [newUserData, setNewUserData] = useState(
    {
      fullname:'',
      email:'',
      oldPassword:'',
      newPassword:''
  })
  const handleNewUserData = (e) =>{
    setNewUserData(prev=> ({...prev,[e.target.name]:e.target.value}))

  }
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const result = await Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    });

    if (result.isConfirmed) {
      setUpdateLoading(true);

      const response = await API.put('/update-user-data', newUserData);

      if (response.status === 200) {
        await Swal.fire("Saved!", "", "success");
      } else if (response.status >= 400) {
        await Swal.fire({
          title: response.data.message || "Something went wrong.",
          icon: "question"
        });
      }

    } else if (result.isDenied) {
      await Swal.fire("Changes are not saved", "", "info");
    }

  } catch (err) {
    console.error(err);
    await Swal.fire("Error occurred", err.message, "error");
  } finally {
    setUpdateLoading(false);
    setNewUserData({
      fullname: '',
      email: '',
      oldPassword: '',
      newPassword: ''
    });
  }
};
  
  return (
    <div className='profile-container w-full md:w-[400px] h-auto p-4 flex items-center justify-center flex-col gap-4  rounded-[20px]'>
      <h1 className='text-2xl text-[#ffff] font-semibold'>My Profiles</h1>
      <div className="acc-details w-full text-[#fff]">
       <form className='w-full flex flex-col gap-2' action={'PUT'} onSubmit={handleSubmit}>
            <div className="form-group w-full flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input  type="text" id="name" name="fullname" defaultValue={accUser.fullname} onChange={(e)=>handleNewUserData((e))}/>
            </div>
            <div className="form-group w-full flex flex-col gap-1">
                <label htmlFor="username">Username</label>
                <input disabled={true}  type="text" id="username" name="username" defaultValue={accUser.username} />
            </div>
            <div className="form-group flex flex-col gap-1">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" defaultValue={accUser.email} onChange={(e)=>handleNewUserData((e))}/>
            </div>
            <div className="form-group flex flex-col gap-2">
                <label htmlFor="old-password">Change Password</label>
                <input type="password" id="old-password" name="oldPassword" placeholder='Old Password' onChange={(e)=>handleNewUserData((e))}/>
                <input type="password" id="new-password" name="newPassword" placeholder='New Password' onChange={(e)=>handleNewUserData((e))}/>
                <input type="password" id="cofirm-new-password" name="password" placeholder='Confirm Password' />
            </div>
            <button type="submit" className='w-full h-[40px] bg-[#3c905e] rounded-[5px] mt-2'>Save changes</button>
        </form>
      </div>
    </div>
  )
}

export default ProfileDetails
