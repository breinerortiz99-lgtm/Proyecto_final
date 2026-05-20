import React from 'react'
import { FcGoogle } from "react-icons/fc";
import "./BotonGoogle.css"

const BotonGoogle = ({onClick}) => {
  return (
    <button
      className="boton-google"
      onClick={onClick}
      type="button"
    >
      <span className="icono-google">
        <FcGoogle size={24} />
      </span>

      <span className="texto-google">
        Continuar con Google
      </span>
    </button>
  )
}

export default BotonGoogle
