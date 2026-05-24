import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../FireBase/config";
import CardIncidente from "../../Components/CardIncidente/CardIncidente";
import Selector from "../../Components/Selector/Selector";
import "./MisIncidentes.css";

function MisIncidentes() {

  const [incidentes, setIncidentes] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const opcionesFiltro = [

    {
      valor: "Todos",
      label: "Todos"
    },

    {
      valor: "Reportado",
      label: "Reportados"
    },

    {
      valor: "En proceso",
      label: "En Proceso"
    },

    {
      valor: "Resuelto",
      label: "Resueltos"
    }

  ];



  useEffect(() => {

    const unsubscribeAuth = auth.onAuthStateChanged((usuario) => {

      if (!usuario) return;

      const consulta = query(collection(db, "incidentes"),

        where("uid", "==", usuario.uid)

      );

      const unsubscribeFirestore =

        onSnapshot(
          consulta,

          (snapshot) => {

            const datos =
              snapshot.docs.map(
                (doc) => ({

                  id: doc.id,

                  ...doc.data(),

                }));

            setIncidentes(datos);
          }
        );

      return () =>
        unsubscribeFirestore();
    });

    return () =>
      unsubscribeAuth();

  }, []);




  const incidentesFiltrados =

    incidentes.filter(
      (incidente) => {

        if (filtro === "Todos") {
          return true;
        }

        return (
          incidente.estado === filtro
        );
      });




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



        <div className="contenedor-filtro">

          <Selector

            valor={filtro}

            setValor={setFiltro}

            opciones={opcionesFiltro}

          />

        </div>



        <div className="grid-incidentes">

          {
            incidentesFiltrados.map(
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

              ))
          }

        </div>

      </div>

    </div>
  );
}

export default MisIncidentes;