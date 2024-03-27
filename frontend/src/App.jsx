import React from 'react'
import './App.css'
import Nav from './components/Nav'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import SingUp from './components/SingUp'
import Private from './components/Private'
import Login from './components/Login'
import AddProduct from './components/AddProduct'
import ProductLIst from './components/ProductLIst'
import UpdateProduct from './components/UpdateProduct'




function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<Private />}>
            <Route path='/' element={<ProductLIst/>} />
            <Route path='/add' element={<AddProduct/>} />
            <Route path='/update/:id' element={<UpdateProduct/>} />
            <Route path='/logout' element={<h1>Logout Product Component</h1>} />
            <Route path='/profile' element={<h1>Profile Component</h1>} />
          </Route>
          <Route path="/signup" element={<SingUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </BrowserRouter>
      <Footer />
    </div>

  )
}

export default App