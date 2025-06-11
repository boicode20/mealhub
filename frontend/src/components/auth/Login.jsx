import React, { useState, useEffect, useContext } from 'react';
import { GiHotMeal } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../AuthContext/AuthProvider';
import { API } from '../api/Api.js';
import './auth.css';


const Login = () => {
  const navigate = useNavigate();
  const { accUser, setAccUser } = useContext(AuthContext);

  const [user, setUser] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user.username || !user.password) {
      alert('Please fill all fields');
      return;
    }
    try {
      const res = await API.post('/login', user);
              console.log(res)

      if (res.status===201) {
        // setAccUser(res.data.user);
        window.location.href = '/meal';
      }
    } catch (error) {
      if (error.response?.data?.status === 'failed') {
        Swal.fire({
          title: error.response.data.message,
          icon: 'error'
        });
      }
      console.error('Login error:', error);
    }
  };

  useEffect(() => {

    if (accUser) {
      navigate('/meal');
    }
  }, [accUser]);
  return (
    <div className="login w-full h-screen flex items-center justify-center">
      <div className="inner-container sm:w-[400px] w-full sm:h-auto h-full">   
        <div className="col1 w-full h-full flex items-center justify-center flex-col px-2 relative gap-4">
          <GiHotMeal className="md:text-7xl text-5xl" />
          <h1 className="login-header-title text-3xl font-bold text-[var(--text-color-dark)]">
            Meal<span className='text-[var(--green-btn)]'>Hub</span>
          </h1>
          
          <form className="flex flex-col gap-4 mt-5 w-full" onSubmit={handleSubmit}>
            <input
              value={user.username}
              type="text"
              name="username"
              placeholder="Username"
              className="p-2 border border-gray-300 rounded w-full"
              onChange={handleChange}
            />
            <input
              value={user.password}
              type="password"
              placeholder="Password"
              name="password"
              className="p-2 border border-gray-300 rounded w-full"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-[#313131] text-white p-2 rounded"
            >
              Login
            </button>
          </form>
          
          <div className="forgot flex items-center gap-2 w-full">
            <span className="w-full h-[1px] bg-[#929292]" />
            <p className="text-[.8rem] text-[#434343]">or</p>
            <span className="w-full h-[1px] bg-[#929292]" />            
          </div>
          
          <Link className="w-full" to="/register">
            <button className="w-full p-2 rounded bg-[var(--green-btn)] text-[#fff]">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;