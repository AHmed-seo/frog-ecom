import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import { AuthContext } from '../Context/AuthContext'
import { jwtDecode } from 'jwt-decode'

export default function Login() {
  let [msg,setMsg] = useState(null)
  let [successMsg,setsuccessMsg] = useState(null)
  let [loading,setLoading] = useState(false)
  const navigate =  useNavigate()
  const {setToken} = useContext(AuthContext)


 const validationSchema = yup.object().shape({
  email:yup.string().required('email is required').email('pls enter valid email'),
  password:yup.string().required('password is required').matches(/^[A-z0-9_]{6,30}$/, 'min 6 - 30 max'),
  
 })




  async function login(values){
    setMsg(null)
    setsuccessMsg(null)
    setLoading(true)
   try{
   const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
   console.log(res);
   setsuccessMsg(res.data.message)
   setToken(res.data.token)
   localStorage.setItem('token',res.data.token)
   console.log( jwtDecode(res.data.token));
   
   setTimeout(()=>{
    navigate('/')
   },1000)
   }catch(err){
    setMsg(err.response.data.message)
   }finally{
    setLoading(false)
   }
  }
const formik = useFormik({
initialValues:{
  email:'',
  password:'',
},

onSubmit:login,
validationSchema
});

  return <>
  {/* htmlFormik */}
  

<form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto py-5">
  
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
