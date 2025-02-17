import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { Oval } from 'react-loader-spinner'



export default function ProductDetails() {

let {details,setDetails} = useState()
const x = useParams();
async function getProductDetails(){
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${x.id}`)

}

const {data,isLoading} = useQuery({
    queryKey:['details',x.id],
    queryFn:getProductDetails,
    // cacheTime:0
})
const detailsProduct = data?.data.data

  return <>
  
  {isLoading?<div className='bg-green-100 h-screen flex justify-center items-center'> <Oval
    visible={true}
    height="80"
    width="80"
    color="#4fa94d"
    ariaLabel="oval-loading"
    wrapperStyle={{}}
    wrapperClass=""
    /></div>:<div className='grid grid-cols-6'> 
    <div className='col-span-2'>
        <img src={detailsProduct?.imageCover} alt="" />        
    </div>
    <div className='col-span-4'>
        <h2>{detailsProduct?.title}</h2>
        <p>{detailsProduct?.description}</p>
        <span>{detailsProduct?.price}$</span>
        <button className='bg-green-500 block w-full rounded text-white my-4 py-3 text-xl'>Add to Cart</button>
    </div>
  </div>}
  
  
  </>
}
