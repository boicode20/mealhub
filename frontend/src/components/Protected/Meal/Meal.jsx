import React, { useContext, useEffect, useState } from 'react'
import MealCategoryLists from './MealCategoryLists'
import MealLists from './MealLists'
import './meal.css'
import { AuthContext } from '../../../AuthContext/AuthProvider'
import SwiperCateg from './SwiperCateg'
import { MdOutlineFilterAlt } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { countries } from './country'
import { Link, useParams } from 'react-router-dom'
import RenderSidebar from '../Sidebar/RenderSidebar'
const Meal = () => {
      const {filter,setFilter}= useContext(AuthContext)
      const [categ,setCateg] = useState([])
      const categName = useParams(name)
  useEffect(()=>{
    const fetchCateg = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        setCateg(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCateg();
  },[])
    return (
    <div className='w-full h-full bg-[#2f2f2f]
    rounded-0 md:rounded-[60px_0_0_60px] grid grid-cols-1 
    grid-rows-[auto_1fr] py-5 px-2  md:p-[30px_15px] relative overflow-hidden '>
      <div className="meal-header md:p-4 p-1 w-full flex flex-wrap  
      justify-between items-center gap-1 pb-2 col-1 row-1 ">
        <RenderSidebar/>
        <div className="category-container w-full h-auto overflow-x-auto scrollbar-hidden">
  <ul className='meal-category-lists flex gap-5 pt-3 pb-3 px-4'>
    {
      categ.map((cat, index) => {
        return (
          <Link 
            key={index} 
            className='flex-shrink-0' 
            onClick={() => setFilter(cat.strCategory)} 
            to={`/meal/${cat.strCategory}`}
          >
            <li className={`meal-categ-render w-14 h-14 lg:w-16 lg:h-16 relative p-1 ${
              cat.strCategory === categName.name ? 'active-categ' : 'bg-[#3e3e3e]'
            } rounded-full flex items-center justify-center shadow`}>
              <div className="categ-img">
                <img 
                  src={cat.strCategoryThumb} 
                  alt="" 
                  className='w-full h-full rounded-full object-cover' 
                />
              </div>
            </li>
          </Link>
        )
      })
    }
  </ul>
</div>
      </div>
      {/* <MealCategoryLists setFilter={setFilter}/> */}
      <div className="rendermeal w-full scrollbar-hidden h-full col-1 row-2 overflow-y-scroll relative">
      <MealLists filter={filter}/>
      </div>        
      

    </div>
  )
}

export default Meal
