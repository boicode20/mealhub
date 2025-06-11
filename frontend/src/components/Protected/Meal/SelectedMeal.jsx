import React,{useState,useEffect} from 'react'
import { useParams,Link } from 'react-router-dom'
import axios from 'axios'
import './meal.css'
import MealHead from './MealHead'
import MealDesc from './MealDesc'
import MealVid from './MealVid'
import MealSimilar from './MealSimilar'
import { MdOutlineArrowBack } from "react-icons/md";
import RenderSidebar from '../Sidebar/RenderSidebar'

const SelectedMeal = () => {
    const [meal,setMeal] = useState({})
    const [loading,setLoading] = useState(true)
    const {mealId} = useParams()
    useEffect(()=>{
        const fetchMealData = async () => {
            setLoading(true)
            try {
                const response = 
                await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
                setMeal(response.data.meals[0])
            } catch (error) {
                console.error('Error fetching meal data:', error)
            }finally{
                setLoading(false)
            }   
        }
        fetchMealData()
    },[mealId])
  return (
    <>
        {
            loading?<div className='w-full h-full bg-[#2f2f2f] flex items-center justify-center rounded-0 md:rounded-[60px_0_0_60px] '><div className="loader"></div></div>:
            <div className='w-full h-full bg-[#2f2f2f] rounded-0 md:rounded-[60px_0_0_60px] grid grid-cols-1 grid-rows-[50px_auto] py-2 px-4 md:px-6 relative  overflow-y-hidden '>
                <RenderSidebar/>
                <div className=" body-head overflow-y-auto scrollbar-hidden w-full h-auto grid grid-cols-1 grid-rows-[50px_auto_auto_auto_auto] gap-4 pt-4">
                    <div className="back-home row-1 w-full h-auto relative  flex items-center justify-baseline">
                        <Link className='w-auto' to={`/meal/${meal.strCategory}`}><MdOutlineArrowBack className='text-3xl text-[#4b9769] w-[60px] ' /></Link>
                    </div>
                    <MealHead meal={meal}/>
                    <MealDesc meal={meal}/>
                    <MealVid meal={meal}/>
                    <MealSimilar meal={meal}/>
                </div>
            </div>
        }
    </>
  )
}

export default SelectedMeal
