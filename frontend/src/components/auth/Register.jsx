import React,{useState,useEffect, useContext} from 'react'
import './auth.css'
import Swal from 'sweetalert2'

import { GiHotMeal } from "react-icons/gi";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { API } from '../api/Api.js';
const Register = () => {
  const {accUser} = useContext(AuthContext)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirm: ''
  })

  const handleChange = (e) => {
    setUser((prev)=>{
      return {...prev, [e.target.name]: e.target.value}
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(user.fullname === '' || user.email === '' || user.username === '' || user.password === '' || user.confirm === ''){
    Swal.fire({
              title: "Please fill all fields",
              icon: "warning"
            });      return
      }
    if(user.password !== user.confirm){
      
        Swal.fire({
          title: "Password not matched",
          icon: "error"
        });
      return
    }
    try {
      const res = await API.post('/register', user)
      console.log(res.data)
      if(res.data.status === 'success'){
 
        Swal.fire({
          title: res.data.message,
          icon: "success"
        });

        setUser({
          fullname: '',
          email: '',
          username: '',
          password: '',
          confirm: ''
        })
        navigate('/')
      }
    } catch (error) {
      console.log(error)
       Swal.fire({
          title: error.response.data.message,
          icon: "warning"
        });
    }
    
  }

  useEffect(()=>{
    if(accUser){
      navigate('/')
    }
  },[])
  console.log(user)
  return (
  <div className='register w-full h-screen flex items-center justify-center'>
          <div className="inner-container  md:w-[400px] w-full h-auto">   
          
            <div className="col1 w-full h-full flex items-center justify-center flex-col px-2 relative gap-4">
            <GiHotMeal className='md:text-7xl text-5xl'/>
            <h1 className="login-header-title text-3xl font-bold text-[var(--text-color-dark)]">
              Meal<span className='text-[var(--green-btn)]'>Hub</span>
            </h1>
              <form className='flex flex-col gap-4 mt-5 w-full' onSubmit={(e)=>handleSubmit(e)}>
                  <input value={user.fullname} type="text" placeholder='Fullname' name='fullname' className='p-2 border border-gray-300 rounded w-full' onChange={handleChange}/>
                  <input value={user.email} type="text" placeholder='Email' name='email' className='p-2 border border-gray-300 rounded w-full' onChange={handleChange}/>
                  <input value={user.username} type="text" placeholder='Username' name='username' className='p-2 border border-gray-300 rounded w-full]' onChange={handleChange}/>
                  <input value={user.password} type="password" placeholder='Password' name='password' className='p-2 border border-gray-300 rounded w-full' onChange={handleChange}/>
                  <input value={user.confirm} type="password" placeholder='Confirm password' name='confirm' className='p-2 border border-gray-300 rounded w-full' onChange={handleChange}/>

                  <button className='w-full p-2 rounded bg-[var(--green-btn)] text-[#fff]'
                  >Register</button>
                  </form>
              <div className="forgot flex items-center gap-2 w-full">
              <span className="w-full h-[1px] bg-[#929292]" />
              <p className="text-[.8rem] text-[#434343]">or</p>
              <span className="w-full h-[1px] bg-[#929292]" />                       
              </div>
              <Link className='w-full' to={'/'}><button className='w-full p-2 rounded bg-[#313131] text-[#fff]'>Login</button></Link>
              </div>
          
          </div>
      </div>
  )
}

export default Register
