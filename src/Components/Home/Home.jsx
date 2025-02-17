import axios, { all } from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Pcard from '../Pcard/Pcard'
import { Oval } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react';
import Slider1 from '../../assets/images/slider-image-1.jpeg'
import Slider2 from '../../assets/images/slider-image-2.jpeg'
import blogImg1 from '../../assets/images/blog-img-1.jpeg'
import blogImg2 from '../../assets/images/blog-img-2.jpeg'
import useCategories from '../../Hooks/useCategories'
import { Toaster } from 'react-hot-toast'
export default function Home() {
 const {allCat,catLoading} = useCategories()
 async function getAllProducts(){
    
    return  axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }


const {data,isLoading} = useQuery({
  queryKey:'allProducts',
  queryFn:getAllProducts,
  cacheTime: 10000 * 60,
  refetchOnWindowFocus:false
})
const allProductsData = data?.data.data

  return <>

  

{/* slider  */}

<div className="grid grid-cols-6">
  <div className=" col-span-4">
    <Swiper slidesPerView={1} loop={true}>
      <SwiperSlide>
        <img src={Slider2} className='w-full h-full block' alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src={Slider1} className='w-full h-full block' alt="" />
      </SwiperSlide>
    </Swiper>
  </div>
  <div className="bg-green-500 col-span-2">
    
    <img src={blogImg1} className='h-1/2' alt=""/>
    <img src={blogImg2} className='h-1/2' alt=""/>
    </div>
</div>


{/* slider  */}




{/* category skider */}

  <h2 className='text-6xl text-center my-5 text-blue-900 italic'>New Local Brands</h2>
<Swiper slidesPerView={6} loop='true'>
  {allCat?.data.data.map((cat)=><SwiperSlide key={cat._id} className='py-10 px-3'>
    <img src={cat.image} className='h-[200px] w-full' alt="" />
    <div>{cat.name}</div>
  </SwiperSlide>)}
</Swiper>

{/* category skider */}




<h2 className='text-6xl text-center my-5 text-blue-900 italic'>Our best selling Products</h2>

  {isLoading ? <div className='bg-green-100 h-screen flex justify-center items-center'> <Oval
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>: <div className="container">
  <div className='grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center'>
  {allProductsData.map((prod)=><Pcard product={prod} key={prod._id} />)}
  </div>
  </div> }
 
{/* Pagination */}
<div className="container">
  <div aria-label="Page navigation example" className='text-center my-3'>
  <ul className="inline-flex -space-x-px text-2xl p-3">
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
    </li>
    <li>
      <a href="#" aria-current="page" className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
    </li>
    <li>
      <a href="#" className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
    </li>
  </ul>
</div>
</div>





    </>
}
