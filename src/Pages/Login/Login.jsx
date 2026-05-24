import { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../FireBase/config";
import CardRegistro from "../../Components/CardRegistro/CardRegistro";
import Boton from "../../Components/Boton/Boton";
import BotonGoogle from "../../Components/BotonGoogle/BotonGoogle";
import Swal from "sweetalert2";
import "./Login.css";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const redireccionarUsuario = (rol) => {
    navigate(
      rol === "admin"
        ? "/admin"
        : "/mis-incidentes"
    );
  };




  const handleLogin = async () => {

    if (!email || !password) {

      Swal.fire({
        icon: "error",
        title: "Complete todos los campos",
        confirmButtonText: "Aceptar",
      });

      return;
    }




    try {

      const credenciales = await signInWithEmailAndPassword(auth, email, password);
      const referenciaUsuario = doc(db, "usuarios", credenciales.user.uid);
      const documentoUsuario = await getDoc(referenciaUsuario);
      const rol = documentoUsuario.data().rol;

      Swal.fire({
        icon: "success",
        title: "Bienvenido al sistema",
        confirmButtonText: "Aceptar",
      });
      redireccionarUsuario(rol);

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Usuario o contraseña incorrectos",
        text: error.message,
        confirmButtonText: "Aceptar",
      });
    }
  };




  const handleGoogleLogin =
    async () => {

      try {

        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const referenciaUsuario = doc(db, "usuarios", user.uid);
        const documentoUsuario = await getDoc(referenciaUsuario);

        if (
          !documentoUsuario.exists()
        ) {

          await setDoc(
            referenciaUsuario,
            {
              uid: user.uid,
              nombre: user.displayName || "",
              correo: user.email,
              foto: user.photoURL || "",
              rol: "usuario",
              fechaRegistro:
                new Date(),
            }
          );
        }




        const rol = documentoUsuario.exists()
            ? documentoUsuario.data().rol
            : "usuario";

        Swal.fire({
          icon: "success",
          title: "Inicio de sesión con Google exitoso",
          confirmButtonText: "Aceptar",
        });

        redireccionarUsuario(rol);

      } catch (error) {

        if (

          error.code === "auth/popup-closed-by-user" || error.code == "auth/cancelled-popup-request"

        ) {
          return;
        }




        Swal.fire({
          icon: "error",
          title:
            "Error al iniciar con Google",
          text: error.message,
          confirmButtonText: "Aceptar",
        });
      }
    };




  return (

    <CardRegistro
      titulo="Bienvenido"
      subtitulo="Ingrese sus credenciales"
    >

      <label>
        Correo electrónico:
      </label>

      <input
        type="email"
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />




      <label>
        Contraseña:
      </label>

      <input
        type="password"
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
      />




      <Boton
        texto="Iniciar sesión"
        onClick={handleLogin}
      />




      <p
        className="texto-enlace"
        id="recuperar"
      >

        <Link
          to="/recuperar-password"
        >

          ¿Olvidaste tu contraseña?

        </Link>

      </p>




      <p id="recuperar">

        O Ingresa con tu cuenta de Google

      </p>




      <BotonGoogle
        onClick={
          handleGoogleLogin
        }
      />




      <p className="texto-enlace">

        ¿No tienes cuenta?{" "}

        <Link to="/registro">

          Regístrate aquí

        </Link>

      </p>

    </CardRegistro>
  );
}

export default Login;