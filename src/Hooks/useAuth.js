import { useEffect, useState } from "react";
import {onAuthStateChanged,  signOut} from "firebase/auth";
import { doc, getDoc} from "firebase/firestore";
import {auth,db} from "../FireBase/config";



function useAuth() {
  const [usuario, setUsuario] = useState(null);
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");




  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(auth,async (user) => {

          if (user) {

            setUsuario(user);

            const referencia =
              doc( db, "usuarios", user.uid);

            const documento = await getDoc(referencia);

            if (documento.exists()) {

              const datos =documento.data();

              setNombre( datos.nombre);

              setRol( datos.rol);
            }

          } else {

            setUsuario(null);

            setNombre("");

            setRol("");
          }
        }
      );

    return () => unsubscribe();

  }, []);




  const cerrarSesion =
    async () => {await signOut(auth);

    };
  return {

    usuario,

    nombre,

    rol,

    cerrarSesion

  };
}

export default useAuth;