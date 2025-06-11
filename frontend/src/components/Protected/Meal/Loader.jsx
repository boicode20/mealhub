import React from 'react'
import './meal.css'
import { bouncy } from 'ldrs'
bouncy.register()
const Loader = ({imgLoader}) => {
  return (
    <div className={`${imgLoader ? 'flex' : 'hidden'} w-full h-full justify-center items-center`}> 
   <l-bouncy
     size="45"
     speed="1.75" 
     color="#55E299" 
   />
    </div>
  )
}

export default Loader
