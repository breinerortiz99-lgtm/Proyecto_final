import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { Link } from "react-router-dom";
import { auth } from "../../FireBase/config";
import CardRegistro from "../../Components/CardRegistro/CardRegistro";
import Boton from "../../Components/Boton/Boton";
import Swal from "sweetalert2";
import "../Login/Login.css";

function RecuperarPassword() {
  const [email, setEmail] = useState("");

  const handleRecuperarPassword = async () => {
    if (!email) {
      Swal.fire({
        icon: "error",
        title: "Ingrese su correo electrónico",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      // Enviar correo de recuperación
      await sendPasswordResetEmail(auth, email);

      await Swal.fire({
        icon: "success",
        title: "Correo enviado",
        text:
          "Se ha enviado un enlace para restablecer su contraseña. Revise su bandeja de entrada.",
        confirmButtonText: "Aceptar",
      });

      setEmail("");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al enviar el correo",
        text: error.message,
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <CardRegistro
      titulo="Recuperar Contraseña"
      subtitulo="Ingrese su correo electrónico"
    >
      <label>Correo electrónico:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Boton
        texto="Enviar enlace de recuperación"
        onClick={handleRecuperarPassword}
      />

      <p className="texto-enlace">
        <Link to="/login">Volver al inicio de sesión</Link>
      </p>
    </CardRegistro>
  );
}

export default RecuperarPassword;