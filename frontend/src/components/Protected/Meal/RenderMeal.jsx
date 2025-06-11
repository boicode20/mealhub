import React,{useState,useEffect, useContext, use} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../../AuthContext/AuthProvider'
import Meals from './Meals'
import Loader from './Loader'
import './meal.css'

// Default values shown

const RenderMeal = ({filter}) => {

    const [meals,setMeals] = useState([])
    const {loading,setLoading} = useContext(AuthContext)

    useEffect(()=>{
        const fetchMealData = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`https:/www.themealdb.com/api/json/v1/1/filter.php?c=${filter}`)
                setMeals(response.data.meals)
            } catch (error) {
                console.error('Error fetching meal data:', error)
                setLoading(false)
            }finally{
                setLoading(false)
            }   
        }
        fetchMealData()
    },[filter])

    
  return (
    <div className='w-full h-full p-1 parent-meals'>
      {
        loading?<div className='w-full h-[400px] flex justify-center items-center'><div className='loader'></div></div>:<Meals meals={meals}/>
      }
    </div>
  )
}///
export default RenderMeal
