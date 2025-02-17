import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

export default function Register() {
  let [msg,setMsg] = useState(null)
  let [successMsg,setsuccessMsg] = useState(null)
  let [loading,setLoading] = useState(false)
  const navigate =  useNavigate()

 const validationSchema = yup.object().shape({
  name:yup.string().required('name is required').min(3,'min 3 char').max(20,'max 20 chars'),
  email:yup.string().required('email is required').email('pls enter valid email'),
  password:yup.string().required('password is required').matches(/^[A-z0-9_]{6,30}$/, 'min 6 - 30 max'),
  rePassword:yup.string().required('rePassword is required').oneOf([yup.ref('password')],'rePassword not matches password'),
  phone:yup.string().required('phone is required').matches(/^01[1250][0-9]{8}$/, 'egyptian numbers only '),
 })




  async function register(values){
    setMsg(null)
    setsuccessMsg(null)
    setLoading(true)
   try{
    const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
   console.log(res);
   setsuccessMsg(res.data.message)
   setTimeout(()=>{
    navigate('/login')
   },1000)
   }catch(err){
    setMsg(err.response.data.message)

   }finally{
    setLoading(false)
   }
  }

 

const formik = useFormik({
initialValues:{
  name:'',
  email:'',
  password:'',
  rePassword:'',
  phone:'',
},

onSubmit:register,
validationSchema
});

  return <>
  {/* htmlFormik */}
  

<form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto py-5">
  <div className="mb-5">
    <label htmlFor="name" name="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id="name" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="Ahmed Ashraf" required />
  </div>
  {formik.errors.name && formik.touched.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.name}
</div>:null}
  <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id="email" name="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="name@seo.com" required />
  </div>
  {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.email}
</div>:null}
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id="password" name="password" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
  </div>
  {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.password}
</div>:null}
  <div className="mb-5">
    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Repeat password</label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" name="rePassword" id="rePassword" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
  </div>
  {formik.errors.rePassword && formik.touched.rePassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.rePassword}
</div>:null}
  <div className="mb-5">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Phone </label>
    <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id="phone" name="phone" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" required />
  </div>
  {formik.errors.phone && formik.touched.phone? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span> {formik.errors.phone}
</div>:null}
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? 'loading ...': 'Submit'}</button>
  {msg?<div className="my-3 p-4 mb-4 text-lg text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <span className="font-medium">Danger alert!</span>{msg}
</div>: null}
  {successMsg?<div className="my-3 py-3 p-4 mb-4 text-lg text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
  <span className="font-medium">Success alert!</span>{successMsg}
</div>: null}
</form>
  </>
}
