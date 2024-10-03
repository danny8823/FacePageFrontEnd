import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import Timeline from './components/Timeline/Timeline'
import { useSelector } from 'react-redux'
import SinglePost from './components/Timeline/SinglePost/SinglePost'
import Dashboard from './components/Dashboard/Dashboard'

const App = () => {

   return (
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Home/>}/>
        <Route path = '/timeline' element = {<Timeline/>}/>
        <Route path = '/post/:_id' element = {<SinglePost/>}/>
        <Route path = '/dashboard' element = {<Dashboard/>}/>
      </Routes>
    </BrowserRouter>
  ) 
  }
  

export default App