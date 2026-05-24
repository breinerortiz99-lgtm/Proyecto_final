import { useEffect, useState } from "react";

import {
  collection,
  onSnapshot
} from "firebase/firestore";

import { db } from "../../FireBase/config";

import CardIncidente from "../../Components/CardIncidente/CardIncidente";

import "./AdminDashboard.css";



function AdminDashboard() {

  const [incidentes, setIncidentes] =
    useState([]);




  useEffect(() => {

    const unsubscribe =
      onSnapshot(

        collection(
          db,
          "incidentes"
        ),

        (snapshot) => {

          const datos =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setIncidentes(datos);
        }
      );

    return () => unsubscribe();

  }, []);




  const total =
    incidentes.length;



  const reportados =
    incidentes.filter(
      (i) =>
        i.estado === "Reportado"
    ).length;



  const proceso =
    incidentes.filter(
      (i) =>
        i.estado === "En proceso"
    ).length;



  const resueltos =
    incidentes.filter(
      (i) =>
        i.estado === "Resuelto"
    ).length;





  return (

    <div className="admin-dashboard">

      <div className="admin-contenedor">

        <div className="admin-encabezado">

          <h1>
            Panel Administrativo
          </h1>

          <p>
            Gestión general de incidentes
            reportados en el sistema.
          </p>

        </div>




        {/* RESUMEN */}

        <div className="admin-resumen">

          <div className="admin-card-resumen">

            <h3>Total</h3>

            <span>{total}</span>

          </div>



          <div className="admin-card-resumen">

            <h3>Reportados</h3>

            <span>{reportados}</span>

          </div>



          <div className="admin-card-resumen">

            <h3>En Proceso</h3>

            <span>{proceso}</span>

          </div>



          <div className="admin-card-resumen">

            <h3>Resueltos</h3>

            <span>{resueltos}</span>

          </div>

        </div>




        {/* INCIDENTES */}

        <div className="admin-incidentes">

          <h2>
            Últimos Incidentes
          </h2>



          <div className="grid-incidentes-admin">

            {
              incidentes.map(
                (incidente) => (

                  <CardIncidente
                    key={incidente.id}

                    tipo={incidente.tipo}

                    descripcion={
                      incidente.descripcion
                    }

                    ubicacion={
                      incidente.ubicacion
                    }

                    estado={
                      incidente.estado
                    }

                    foto={
                      incidente.foto
                    }

                    fecha={
                      incidente.fecha
                    }
                  />
                )
              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;