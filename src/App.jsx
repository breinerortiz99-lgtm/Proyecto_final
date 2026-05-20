import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Registro from './Pages/Registro/Registro.jsx'
import Login from './Pages/Login/Login.jsx'
import DashBoard from './Pages/DashBoard/DashBoard.jsx'
import RecuperarPassword from './Pages/RecuperarPassword/RecuperarPassword.jsx'
import Nav from './Components/Nav/Nav.jsx'
import Header from './Components/Header/Header.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
