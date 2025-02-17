import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'

export default function useCategories() {

    async function getAllCategories(){
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        }
    
    const {data:allCat,isLoading:catLoading} = useQuery({
      queryFn:'allCategories',
      queryFn:getAllCategories
    })
  return {allCat,catLoading}
}
