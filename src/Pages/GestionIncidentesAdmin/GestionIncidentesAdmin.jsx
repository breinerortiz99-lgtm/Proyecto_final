import { useEffect, useState } from "react";
import { collection, onSnapshot} from "firebase/firestore";
import {auth,db} from "../../FireBase/config";
import {doc, getDoc} from "firebase/firestore";
import CardIncidenteAdmin from "../../Components/CardIncidenteAdmin/CardIncidenteAdmin";
import SelectorAdmin from "../../Components/SelectorAdmin/SelectorAdmin";
import "./GestionIncidentesAdmin.css";



function GestionIncidentesAdmin() {
  const [nombre, setNombre] = useState("");
  const [incidentes, setIncidentes] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

 useEffect(() => {

  const obtenerNombre = async () => { 
      const usuario = auth.currentUser;

      if (!usuario) return;

      const referencia = doc( db, "usuarios", usuario.uid);
      const documento = await getDoc(referencia);

      if (documento.exists()) {

        setNombre(
          documento.data().nombre
        );
      }
    };

  obtenerNombre();

}, []);

  useEffect(() => {

    const unsubscribe = onSnapshot(collection( db, "incidentes"), (snapshot) => {
          const datos = snapshot.docs.map((doc) => ({
                id: doc.id,...doc.data(),
              })
            );

          setIncidentes(datos);
        }
      );



    return () => unsubscribe();

  }, []);




  const incidentesFiltrados =  incidentes.filter( (incidente) => {

        const cumpleEstado = estadoFiltro === "Todos" || incidente.estado === estadoFiltro;
        const texto =
          `${incidente.tipo}
           ${incidente.descripcion}
           ${incidente.ubicacion}`
          .toLowerCase();


        const cumpleBusqueda = texto.includes( busqueda.toLowerCase() );

        return (cumpleEstado && cumpleBusqueda );
      }
    );





  return (

    <div className="gestion-admin">

      <div className="contenedor-gestion-admin">

        <div className="encabezado-gestion">

          <h1>
            Gestión de Incidentes
          </h1>

          <p>
            Hola {nombre}, Bienvenido al sistema de gestion de incidentes
          </p>

        </div>




        {/* FILTROS */}

        <div className="filtros-admin">

          <input
            type="text"
            placeholder="Buscar incidente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)
            }
          />




          <SelectorAdmin
            valor={estadoFiltro}

            opciones={[
              "Todos",
              "Reportado",
              "En proceso",
              "Resuelto"
            ]}

            onChange={
              setEstadoFiltro
            }
          />

        </div>




        {/* GRID */}

        <div className="grid-admin">

          {
            incidentesFiltrados.map(
              (incidente) => (

                <CardIncidenteAdmin
                  key={incidente.id}
                  id={incidente.id}
                  tipo={ incidente.tipo }
                  descripcion={incidente.descripcion}
                  ubicacion={incidente.ubicacion}
                  estado={incidente.estado}
                  prioridad={incidente.prioridad}
                  foto={incidente.foto}
                  fecha={incidente.fecha}
                />
              )
            )
          }

        </div>

      </div>

    </div>
  );
}

export default GestionIncidentesAdmin;