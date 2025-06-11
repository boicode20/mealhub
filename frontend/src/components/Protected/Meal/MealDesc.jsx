import React, { useState } from 'react'

const MealDesc = ({meal}) => {
    const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='w-full h-auto '>
      <h1 className=' text-[#4b9769] font-semibold'>Instructions</h1>
        <div
      className={`description text-[#fff] text-[.9rem] ${isExpanded ? 'expanded' : 'collapsed'}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {meal.strInstructions}
    </div>
    </div>
  )
}

export default MealDesc
