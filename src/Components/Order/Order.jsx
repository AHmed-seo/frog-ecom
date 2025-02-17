import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'
import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Order() {
    
const [paymentWay,setPaymentWay] = useState()
const {cartId,setNumOfCartItems} = useContext(CartContext)
const navigate = useNavigate()

function handleSubmit(values){
    console.log(values);
    if(paymentWay == 'cash'){
        cashOrder(values)
    }else if (paymentWay == 'visa'){
        visaOrder(values)
    }
}
    async function cashOrder(values){
        console.log('cashOrder');
        try{
          const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,values,{
                headers:{
                    token:localStorage.getItem('token')
                }
            })
            console.log(res);
            if(res.data.status == 'success' ){
                toast.success('Order Cash success')
                setNumOfCartItems(0)
                navigate('/cart')
            }
            
        }catch(err){
            console.log(err,'errr');
            
        }
       
        
    } 


    async function visaOrder(values){
      try{
       const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`,values,{
          headers:{
            token:localStorage.getItem('token')
          }
        })
        console.log(res);
        window.open(res.data.session.url,'_blank')

        
      }catch(err){
        console.log(err,'errrrr');
        
      }
       


        
    } 
    const formik = useFormik({
    initialValues:{
      'shippingAddress':{
        'details': '',
        'phone': '',
        'city': ''
        }
      
    },
    
    onSubmit:handleSubmit
    });
  return <>
  <form onSubmit={formik.handleSubmit}>  
  <div className="container px-5 my-3">
  <div className="mb-5">
    <input onChange={(e)=>formik.setFieldValue('shippingAddress.details',e.target.value)} type="text" id="details" name="details" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name" required />
    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
  </div> 
  <div className="mb-5">
    <input onChange={(e)=>formik.setFieldValue('shippingAddress.phone',e.target.value)} type="tel" id="phone" name="phone" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="phone" required />
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
  </div> 
  <div className="mb-5">
    <input onChange={(e)=>formik.setFieldValue('shippingAddress.city',e.target.value)} type="text" id="city" name="city" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="City" required />
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
  </div> 
  </div>
  <button onClick={()=>setPaymentWay('cash')} className='bg-green-500 text-center p-3  my-3 rounded'>Cash Order</button>
  <button onClick={()=>setPaymentWay('visa')} className='bg-green-500 text-center p-3 ms-2 rounded'>Visa Order</button>
  </form>
   </>
}
