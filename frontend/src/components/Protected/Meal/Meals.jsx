import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './meal.css'
import Loader from './Loader'
import { useParams } from 'react-router-dom'


// Default values shown

const Meals = ({meals}) => {
  const [imgLoader,setImgLoader] = useState(true)
  return (
    <div className='w-full h-full meals-p'>
      <ul className='meals w-full h-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-0'>
        {
            meals?.map((meal,index)=>{
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
                        <h1 className='meal-name-render text-[#dedede] font-bold text-1xl overflow-hidden whitespace-nowrap text-ellipsis'>{meal.strMeal}</h1>
                      </div>

                      <div className="meal-button">
                       <Link to={`/meal/id/${meal.idMeal}`} className='w-full h-full '>
                       <button className='meal-button-render w-full h-[35px] bg-[#4b9769] text-[#fff] cursor-pointer text-1xl font-semibold rounded-[5px]'>View Meal</button>
                       </Link>
                      </div>
                    </div>
                  </div>
              
            })  
        }
      </ul>
    </div>
  )
}

export default Meals
