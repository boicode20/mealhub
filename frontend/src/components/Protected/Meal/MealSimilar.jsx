import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './meal.css'
import Loader from './Loader'
import { Link } from 'react-router-dom'
const MealSimilar = ({meal}) => {
  const [similarCateg, setSimilarCateg] = useState([])
  const [imgLoader, setImgLoader] = useState(true)
  useEffect(()=>{
    const categMealsData = async()=>{
      setImgLoader(true)
      try{
        const category = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${meal.strCategory}`)
        setSimilarCateg(category.data.meals)
      }catch(err){
        console.error(err)
      }finally{
        setImgLoader(false)
      }
    }
    categMealsData()
  },[meal])
  return (
    <div className='w-full h-auto mt-5'>
      <h1 className='text-[#4b9769] font-semibold mb-2'>Similar Meals</h1>
      {
        imgLoader ?(<Loader imgLoader={imgLoader} />):(
          <ul className='meals w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-0'>
            
        {
            similarCateg?.map((meal,index)=>{
                return <div className="render-meal flex flex-col gap-2 w-full h-full bg-[#2f2f2f] rounded-[10px] p-2" key={index}>
                    <div className="meal-img">
                      {imgLoader && <Loader imgLoader={imgLoader} />}
                      <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className={`w-full h-full object-cover rounded-[10px] ${imgLoader ? 'hidden' : 'block'}`}
                        onLoad={() => setImgLoader(false)}
                      />
                    </div>
                    <div className="meal-name-area-categ flex flex-col gap-2 w-full h-full">
                      <div className="meal-name ">
                        <h1 className='text-[#dedede] font-bold text-[1rem] overflow-hidden whitespace-nowrap text-ellipsis'>{meal.strMeal}</h1>
                      </div>

                      <div className="meal-button">
                       <Link to={`/meal/id/${meal.idMeal}`} className='w-full h-full'>
                       <button className='w-full h-[35px] bg-[#4b9769] text-[#fff] text-[.7rem] font-semibold rounded-[5px] cursor-pointer'>View Meal</button>
                       </Link>
                      </div>
                    </div>
                  </div>
              
            })  
        }
      </ul>
        )
      }

    </div>
  )
}

export default MealSimilar
