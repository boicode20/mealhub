import React,{useState,useEffect, useContext} from 'react'
import Swal from 'sweetalert2'
import './favourites.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Meal/Loader'
import { FaRegTrashAlt } from "react-icons/fa";
import { getFlagUrl } from './Countrys';
import {API} from '../../api/Api.js'
const FavLists = ({favourites}) => {
    const [allFavs,setAllFavs] = useState([{}])
    const [message,setMessage] = useState('')
    const [favLoad,setFavLoad] = useState(true)
    const [imgLoader,setImgLoader] = useState(true)
    const [showDeleteModal,setShowDeleteModal]= useState(false)
    const [confirmDelete,setConfirmDelete] = useState(false)
    console.log(confirmDelete)

    const handleDelete = (mealId)=>{
        try{
            
            Swal.fire({
                    icon: "question",
                    title: "Do you want to delete this meal?",
                    showCancelButton: true,
                    confirmButtonText: "Delete",
                    }).then(async(result) => {
                    if (result.isConfirmed) {
                        
                        const deleteFav = await API.delete('/delete-favourite',{
                            data:{mealId:mealId}
                        })
                        console.log(deleteFav)
                        if(deleteFav.status === 200){
                            setAllFavs(allFavs.filter(fav => fav[0].idMeal !== mealId))
                            setMessage('Meal removed from favourites')
                            setShowDeleteModal(false)
                            
                        }
                        Swal.fire("Successfuly deleted!", "", "success");
                    } 
                    });

          
        }catch(err){
            console.error(err)
        }finally{
                setConfirmDelete(false)
            }
    }

    useEffect(()=>{
        const getCategFav = async() =>{
            setFavLoad(true)
            try{
                const allFav = await favourites.map(async(fav)=>{
                    const allFavMeals = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${fav.mealId}`)
                    return allFavMeals.data.meals
                })
                setAllFavs(await Promise.all(allFav))
                if(allFavs.length === 0){
                    setMessage('No favourite meals found')
                }
            }catch(err){
                console.error(err)
            }finally{
                setFavLoad(false)
            }
        }
        getCategFav()
    },[])
  return (
     <ul className='w-full h-auto px-4 grid lg:grid-cols-2  grid-cols-1 gap-4 fav-list-container
     relative pb-4'>
        
        {
           favLoad?(
                <div className="w-full flex justify-center items-center absolute top-0 left-0 h-[300px]"><div className="loader"></div></div>
            ):(
                allFavs.length > 0 ? (
                    allFavs.map((fav,index)=>(
                        
                        <li key={index} className='fav-list-item grid grid-cols-[100px_1fr_80px] p-2 '>
                            <div className="w-full h-full">
                                {imgLoader && <Loader imgLoader={imgLoader} />}
                                <img
                                    src={fav[0].strMealThumb}
                                    alt={fav[0].strMeal}
                                    className={`w-full h-full object-cover rounded-[10px] ${imgLoader ? 'hidden' : 'block'}`}
                                    onLoad={() => setImgLoader(false)}
                                />
                            </div>
                            <div className="fav-name w-full h-full flex flex-col  gap-1 justify-center items-start px-2 overflow-hidden">
                                <Link to={`/meal/id/${fav[0].idMeal}`} className='fav-link'>
                               <h1 className="text-[#ffffff] font-bold text-[1.2rem] 
                                whitespace-nowrap overflow-hidden text-ellipsis 
                                 max-w-[170px] sm:max-w-[150px] md:max-w-[300px] block">
                                {fav[0].strMeal}
                                </h1>
                                </Link>
                                <h1 className='fav-categ text-[#5abc81] text-[.9rem]'>{fav[0].strCategory}</h1>
                                <div className="fav-area-container flex items-center gap-2">
                                    <img className='w-[20px] h-[20px]' src={getFlagUrl(fav[0].strArea)} alt="area flag" />
                                    <h1 className='fav-area text-[#5abc81] text-[.9rem]'>{fav[0].strArea}</h1>
                                </div>
                            </div>
                            <div className="fav-trash w-full h-full flex justify-center items-center text-[#ffff] ">
                                <div className="w-[50px] h-[50px] bg-[#b73535] flex justify-center items-center rounded-[50%] cursor-pointer " onClick={()=>handleDelete(fav[0].idMeal)}>
                                    <FaRegTrashAlt className='text-[1.3rem]'/>
                                </div>
                            </div>
                        </li>
                    ))
                ):(
                <div className="w-full h-[300px] flex items-center justify-center absolute top-0 left-0">
                    <h1 className='text-[#ededed] text-center'>No meal</h1>
                </div>                
                )
            )
        }
    </ul>
  )
}

export default FavLists
