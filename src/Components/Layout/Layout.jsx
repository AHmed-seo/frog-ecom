import React from 'react'
import Footer from '../Footer/Footer'
import Nav from '../Nav/Nav'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
  <Nav/>
<Outlet/>
  <Footer/>
  </>
  
}
