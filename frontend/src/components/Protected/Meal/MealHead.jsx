import React,{useState,useEffect} from 'react'
import { CiBookmarkPlus } from "react-icons/ci";
import { CiBookmarkCheck } from "react-icons/ci";
import { API } from '../../api/Api.js';
import { ToastContainer, toast , Bounce} from 'react-toastify';
import { getFlagUrl } from '../Favourites/Countrys.js';

const MealHead = ({meal}) => {
  const [userFav,setUserFav]= useState()
  const [favLoading,setFavLoading]= useState(true)
  const [isAdded,setIsAdded] = useState(false)
  const [showToast,setShowToast] = useState(false)
  let ingredients = []
  for(let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`]
    
    if(ing && ing.trim() !== '') {
      ingredients.push(ing)
    }
  }

  const addFav = async()=>{
    setFavLoading(true)
    try{
      const addFav = await API.post('/add-favourite',{mealId:meal.idMeal})
      
      setIsAdded(true)
      setShowToast(!showToast)
      console.log(addFav)
      toast.success('✓ Saved successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
    }catch(err){
      console.error(err)
    }finally{
      setFavLoading(false)
    }
  }

  useEffect(()=>{
    const getUserFav = async()=>{
            setFavLoading(true)
      try{
        const userFavData = await API.post('/get-favourite')
        
        setUserFav(userFavData.data.favourites)
        const isMealAdded = userFavData.data.favourites.some(fav => fav.mealId === meal.idMeal);
        setIsAdded(isMealAdded);

    
      }catch(err){
        console.error(err)
      }finally{
                    setFavLoading(false)

      }
    }
    getUserFav()
  },[])
 
  return (
    <div className='meal-text w-full h-auto grid grid-cols-1 grid-rows-[auto_auto] lg:grid-cols-2 md:grid-rows-1  gap-3 relative'>
      <div className="absolute top-3 right-2">
        <ToastContainer />
      </div>
      <div className="head-img w-full h-[250px] md:h-[320px]">
        <img className='bg-center bg-cover w-full h-full rounded-2xl' src={meal.strMealThumb} alt={meal.idMeal} />
      </div>
      <div className="head-desc md:mt-[-10px] mt-4 flex flex-col gap-2">
        <h1 className='meal-head-text text-[#fff] font-bold text-[1.2rem] md:text-[1.8rem]'>{meal.strMeal}</h1>
        <div className="meal-add">
         {
    isAdded ? (
      <button className="bg-[#336748] text-white px-2 py-1 rounded cursor-pointer" disabled>
        <CiBookmarkCheck className="inline font-bold text-2xl " /> <span className='text-[.9rem]'>Saved</span></button>
    ) : (
      <button
        className="bg-[#4b9769] text-white px-2 py-1 rounded cursor-pointer"
        onClick={addFav}
        disabled={favLoading}
      >
        <CiBookmarkPlus className="inline font-bold text-2xl mr-1" />
        {
          favLoading?"...":<span className='text-[.9rem]'>Save</span>
        }
      </button>
    )
  }
        </div>
        <div className="head-categ">
          <span className='text-[#4b9769] font-semibold'>Category: </span>
          <span className='text-[#fff]'>{meal.strCategory}</span>
        </div>
        <div className="head-area flex gap-2 items-center">
          <span className='text-[#4b9769] font-semibold'>Area: </span>
          <div className="area-div flex items-center gap-1">
            <img className='w-[20px] h-[20px]' src={`https://flagsapi.com/${getFlagUrl(meal.strArea)}/flat/64.png`} alt="area flag" />
            <span className='text-[#fff]'>{meal.strArea}</span>
          </div>
        </div>
        <div className="head-ing">
          {
            ingredients.length > 0 ? (
              <div>
                <span className='text-[#4b9769] font-semibold'>Ingredients: </span>
                <ul className='list-disc pl-5 text-[#fff] mt-2 text-[.9rem] grid md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-1'>
                  {ingredients.map((ing, index) => (
                    <li key={index}>{ing}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <span className='text-[#fff]'>No ingredients found</span>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default MealHead
