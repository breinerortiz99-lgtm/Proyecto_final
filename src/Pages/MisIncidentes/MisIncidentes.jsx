import { useEffect, useState } from "react";

import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy
} from "firebase/firestore";

import {
  auth,
  db
} from "../../FireBase/config";

import Nav from "../../Components/Nav/Nav";

import CardIncidente from "../../Components/CardIncidente/CardIncidente";

import "./MisIncidentes.css";

function MisIncidentes() {

  const [incidentes, setIncidentes] =
    useState([]);

  useEffect(() => {

    const usuario = auth.currentUser;

    if (!usuario) return;

    const consulta = query(
      collection(db, "incidentes"),

      where(
        "uid",
        "==",
        usuario.uid
      ),

      orderBy("fecha", "desc")
    );

    const unsubscribe = onSnapshot(
      consulta,
      (snapshot) => {

        const datos =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setIncidentes(datos);
      }
    );

    return () => unsubscribe();

  }, []);

  return (

    <div className="pagina-incidentes">

      <div className="contenedor-incidentes">

        <div className="encabezado-mis-incidentes">

          <h1>
            Mis Incidentes
          </h1>

          <p>
            Consulte el estado de sus
            reportes realizados.
          </p>

        </div>

        <div className="grid-incidentes">

          {
            incidentes.map((incidente) => (

              <CardIncidente
                key={incidente.id}

                tipo={incidente.tipo}
                descripcion={
                  incidente.descripcion
                }

                ubicacion={
                  incidente.ubicacion
                }

                estado={incidente.estado}

                foto={incidente.foto}

                fecha={incidente.fecha}
              />

            ))
          }

        </div>

      </div>

    </div>
  );
}

export default MisIncidentes;