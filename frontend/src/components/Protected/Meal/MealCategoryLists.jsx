import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../AuthContext/AuthProvider'
import axios from 'axios'
import { Link, useLocation, useParams } from 'react-router-dom'
import './meal.css'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const MealCategoryLists = () => {
    const [category,setCategory] =useState([])
    const {setFilter,categLoading,setCategLoading,filter}= useContext(AuthContext)
    const location = useLocation().pathname.split('/')[2]
    const [startIndex,setStartIndex] = useState(0)
    const itemsPerPage = 5
    const categ = useParams(name)
    console.log('hello')
    useEffect(()=>{
        const getMealCategory = async()=>{
            setCategLoading(true)
            try{
                const categ = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
                setCategory(categ.data.categories)
            }catch(err){
                console.log(err)
            }finally{
                setCategLoading(false)
            }
        }
        getMealCategory()
    },[])

    
    useEffect(()=>{
        setFilter(location)
    },[location])

    const visibleCategory = category.slice(startIndex, startIndex + itemsPerPage)

    const handlePrev = () =>{
        setStartIndex(prev => Math.max(prev - itemsPerPage , 0))
    }
    const handleNext = () =>{
        setStartIndex(prev => Math.min(prev + itemsPerPage, category.length - itemsPerPage))
    }
  return (
    <div className='w-full h-full'>
      {
        categLoading?<div>Loading</div>:
        <div className='w-full h-full'>
            <div className="categ-header p-1  w-full h-auto flex items-center justify-between">
                <h1 className='text-[#4b9769] font-bold text-[1rem]'>Categories</h1>
                {/* Button for pagination slide here */}
                <div className="categ-butttons flex items-center md:gap-4 gap-2  text-[#ffff]">
                        <button className={`md:text-2xl text-1xl rounded-[5px] px-2 py-1 md:px-4 md:py-2 bg-[#4b9769] ${startIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={startIndex === 0}
                        onClick={handlePrev}>
                            <GrPrevious className=''/>
                        </button>
                        <button className={`md:text-2xl text-1xl px-2 py-1 md:px-4 md:py-2 rounded-[5px] bg-[#4b9769] ${startIndex + itemsPerPage >= category.length ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={startIndex + itemsPerPage >= category.length}
                        onClick={handleNext}>

                            <GrNext className=''/>
                        </button>
                    </div>
            </div>
            <ul className='meal-category-lists gap-5 overflow-x-auto scrollbar-hidden px-1 pt-3 pb-3 '>
                {
                    visibleCategory.map((cat,index)=>{
                        return <Link key={index} className='w-full h-full' onClick={()=>setFilter(cat.strCategory)} to={`/meal/${cat.strCategory}`}>
                            <li  className={`meal-categ-render w-full md:w-[200px] relative p-1 h-auto ${cat.strCategory===filter?'bg-[#26986a]':'bg-[#3e3e3e]'} rounded-[50%] md:rounded-[20px] flex items-center justify-center gap-3 shadow`}>
                                <div className="categ-img ">
                                    <img  src={cat.strCategoryThumb} alt="" className='w-[55px] h-[55px] md:w-[40px] md:h-[40px] rounded-[50%]' />
                                </div>
                                <h1 className={`md:text-1xl md:block  hidden text-[.8rem] font-bold ${cat.strCategory==location?'text-[#ffff]':'text-[#72ce97]'}`} >{cat.strCategory}</h1>
                            </li>
                        </Link>
                    })
                }
            </ul>
        </div>
      }
    </div>
  )
}

export default MealCategoryLists
