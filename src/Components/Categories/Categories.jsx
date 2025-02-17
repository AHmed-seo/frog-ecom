import { Axios } from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import useCategories from '../../Hooks/useCategories'

export default function Categories() {
  const {allCat,catLoading} = useCategories()

  return <>
  <div className="container">
  <h1 className='text-4xl text-center my-5 text-blue-900 italic'>Our best selling Products & Categrories</h1>
  <p className='text-xl'>the store features a dedicated electronics section that showcases the latest tech devices, including smartphones, laptops, home appliances, and more, meeting the needs of modern life. Whether you're looking to upgrade your technology or replace an old device, you'll find everything you need with the latest specifications.</p>
  </div>
  <div className='grid grid-cols-3 text-center'>

  {allCat?.data.data.map((cat)=><div key={cat._id} className='py-10 px-3'>
    <img src={cat.image} className='h-[400px] w-full' alt="" />
    <div className='text-center'>{cat.name}</div>
  </div>)}
  </div>
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
