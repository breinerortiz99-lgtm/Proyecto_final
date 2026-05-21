import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import Registro from './Pages/Registro/Registro.jsx'
import Login from './Pages/Login/Login.jsx'
import DashBoard from './Pages/DashBoard/DashBoard.jsx'
import RecuperarPassword from './Pages/RecuperarPassword/RecuperarPassword.jsx'
import Nav from './Components/Nav/Nav.jsx'
import Header from './Components/Header/Header.jsx'
import Inicio from './Pages/Inicio/Inicio.jsx'
import CrearIncidente from './Pages/CrearIncidente/CrearIncidente.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
          <Route path="/crear-incidente" element={<CrearIncidente />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
