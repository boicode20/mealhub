import React from 'react'
import RenderMeal from './RenderMeal'
import { useLocation } from 'react-router-dom'
const MealLists = ({filter}) => {
  const path = useLocation().pathname.split('/')[2];
  return (
    <div className='w-full h-full grid grid-cols-1 grid-rows-[auto_1fr]'>
      <div className="meal-head p-2">
        <h1 className='meal-categ-name text-[#4b9769] font-bold text-2xl'>{path}</h1>
      </div>
      <div className='render-meal-container w-full h-full '>
        <RenderMeal filter={filter}/>
      </div>
    </div>
  )
}

export default MealLists 
