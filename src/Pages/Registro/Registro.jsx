import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../FireBase/config";
import Boton from "../../Components/Boton/Boton";
import CardRegistro from "../../Components/CardRegistro/CardRegistro";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import "./Registro.css";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!nombre || !email || !password) {
      Swal.fire({
        icon: "error",
        title: "Complete todos los campos",
        confirmButtonText: "Aceptar"
      });
      return;
    }


    try {
      // Crear usuario en Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Guardar el usuario en Firestore también
      await setDoc(doc(db, "usuarios", user.uid), {
        uid: user.uid,
        nombre: nombre,
        correo: email,
        rol: "usuario",
        fechaRegistro: new Date(),
      });

      Swal.fire({
        title: "Usuario registrado exitosamente",
        icon: "success",
        draggable: true
      });

      setNombre("");
      setEmail("");
      setPassword("");

      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al registrarse",
        text: error.message,
        confirmButtonText: "Aceptar"
      });
    }
  };


  
  return (

    <CardRegistro titulo="Registro" subtitulo="Crea una cuenta">

      <label>Nombre completo:</label>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <label>Correo electrónico:</label>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Contraseña:</label>
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Boton texto="Registrarse" onClick={handleRegister} />
    </CardRegistro>

  );
}

export default Registro;