import { useEffect, useState } from "react";

import {
  Navigate
} from "react-router-dom";

import {
  onAuthStateChanged
} from "firebase/auth";

import {
  doc,
  getDoc
} from "firebase/firestore";

import {
  auth,
  db
} from "../FireBase/config";



function AdminRoute({ children }) {

  const [cargando, setCargando] =
    useState(true);

  const [esAdmin, setEsAdmin] =
    useState(false);




  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(

        auth,

        async (usuario) => {

          if (!usuario) {

            setCargando(false);

            return;
          }




          const referencia =
            doc(
              db,
              "usuarios",
              usuario.uid
            );



          const documento =
            await getDoc(referencia);




          if (
            documento.exists()
          ) {

            setEsAdmin(

              documento.data().rol
              ===
              "admin"
            );
          }

          setCargando(false);
        }
      );



    return () => unsubscribe();

  }, []);




  if (cargando) {

    return <h2>Cargando...</h2>;
  }




  if (!esAdmin) {

    return <Navigate to="/" />;
  }




  return children;
}

export default AdminRoute;