import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/freshcart-logo.svg'
import { AuthContext } from '../Context/AuthContext';
import { CartContext } from '../Context/CartContext';
export default function Nav() {

const {token,setToken} = useContext(AuthContext)
const {numOfCartItems} = useContext(CartContext)
const navigate = useNavigate()
function logOut(){
  localStorage.removeItem('token');
  setToken(null);
  navigate('/login')
}
  return <>
<nav className='flex items-center py-3 my-6'>
<div className='logo px-4 '>
    <img src={Logo} alt="Logo" className='h-[40px]' />
  </div>
  <div className='links'>
  <ul className='flex space-x-3 text-xl  focus:ring-4 focus:outline-none  font-medium rounded-lg px-5 py-2.5 text-center  dark:focus:ring-blue-800'>
      <li className='hover:text-blue-600 '><Link to="/">Home</Link></li>
      {/* <li><Link to="cart"><i className="fas fa-shopping-cart text-2xl px-3"/>{numOfCartItems}</Link></li> */}
      <li className='hover:text-blue-600'><Link to="categories">Categories</Link></li>
      <li className='hover:text-blue-600'><Link to="brands">Brands</Link></li>
      <li className='hover:text-blue-600'><Link to="products">Products</Link></li>
    </ul>
    
  </div>
  <div className='socials ms-auto space-x-3'>
<Link to="cart">{numOfCartItems}<i className="fas fa-shopping-cart text-2xl px-5 text-blue-600"/></Link>
    <i className='fab fa-linkedin'></i>
    <i className='fab fa-tiktok'></i>
    <i className='fab fa-facebook'></i>
    <i className='fab fa-youtube'></i>
    {token ? <button onClick={logOut}>Log out</button> : <>
      <Link to="login">Log in</Link> 
      <Link to="register">Register</Link>
    </> }

    
  </div>
  
</nav>
  
  </>
}
