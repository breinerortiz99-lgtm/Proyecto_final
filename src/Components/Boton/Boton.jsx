import React from 'react'
import './Boton.css'

const Boton = ({ texto, onClick, disabled = false }) => {
  return (
      <button
            className="boton"
            onClick={onClick}
            disabled={disabled}
        >
            {texto}
        </button>
  )
}

export default Boton
