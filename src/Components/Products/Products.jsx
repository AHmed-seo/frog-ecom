import axios from 'axios'
import React from 'react'
import { Oval } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import Pcard from '../Pcard/Pcard'


export default function Products() {

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
  
 <h1 className='text-6xl text-center my-5 text-blue-900 italic'>Our best selling Products</h1>
 <p className='text-xl my-5'>the store features a dedicated electronics section that showcases the latest tech devices, including smartphones, laptops, home appliances, and more, meeting the needs of modern life. Whether you're looking to upgrade your technology or replace an old device, you'll find everything you need with the latest specifications.</p>

 
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
