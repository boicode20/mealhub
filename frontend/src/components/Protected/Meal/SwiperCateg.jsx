import React, { useEffect, useState, useRef } from 'react'
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';
const SwiperCateg = () => {
    const [category,setCategory] =useState([])
    const [categLoading,setCategLoading] = useState(false)
    const [activeCateg, setActiveCateg] = useState('Beef')
    const swiperRef = useRef(null)

    const handleCategSlide = ()=>{
        if (swiperRef.current) {
          const activeIndex = swiperRef.current.swiper.activeIndex;
          const activeSlideName = category[activeIndex].strCategory;
          setActiveCateg(activeSlideName);
    }
    }
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


  return (
    <>
      <Swiper
        ref={swiperRef}
        onSlideChange={handleCategSlide}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper w-full h-full"
      >
        {
            categLoading?<div>Loading...</div>:
            category.map((item,index)=>(
                <SwiperSlide key={index} className='w-full h-full flex items-center justify-center '>
                    <div className="categ-item w-full h-full flex flex-col items-center justify-center p-10 relative">
                        <img src={item.strCategoryThumb} alt="" className='w-[100%] h-[90%] object-cover rounded-[10px]'/>
                        <h1 className='text-[#ffff] text-[.8rem] font-bold absolute top-[15px] left-10'>{item.strCategory}</h1>
                    </div>
                </SwiperSlide>
            )) 
        }
      </Swiper>
     
    </>
  )
}

export default SwiperCateg
