import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../FireBase/config";
import CardIncidenteAdmin from "../../Components/CardIncidenteAdmin/CardIncidenteAdmin";
import SelectorAdmin from "../../Components/SelectorAdmin/SelectorAdmin";
import Swal from "sweetalert2";
import Boton from "../../Components/Boton/Boton";
import "./GestionIncidentesAdmin.css";

function GestionIncidentesAdmin() {
  const [nombre, setNombre] = useState("");
  const [incidentes, setIncidentes] = useState([]);
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [seleccionados, setSeleccionados] = useState([]);
  const [gruposAbiertos, setGruposAbiertos] = useState({});



  useEffect(() => {

    const obtenerNombre = async () => {
      const usuario = auth.currentUser;

      if (!usuario) return;
      const referencia = doc(db, "usuarios", usuario.uid);
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

    const unsubscribe = onSnapshot(collection(db, "incidentes"), (snapshot) => {
      const datos = snapshot.docs.map((doc) => ({
        id: doc.id, ...doc.data(),
      }));
      setIncidentes(datos);
    }
    );

    return () => unsubscribe();

  }, []);




  const incidentesFiltrados =
    incidentes.filter((incidente) => {
      const cumpleEstado = estadoFiltro === "Todos" || incidente.estado === estadoFiltro;
      const texto =

        `${incidente.tipo}
         ${incidente.descripcion}
         ${incidente.ubicacion}`

          .toLowerCase();
      const cumpleBusqueda = texto.includes(busqueda.toLowerCase());

      return (
        cumpleEstado &&
        cumpleBusqueda
      );
    });

  const seleccionarIncidente = (id) => {
    if (seleccionados.includes(id)) {
      setSeleccionados(seleccionados.filter((item) => item !== id));
    } else {
      setSeleccionados([...seleccionados, id]);
    }
  };



  const agruparIncidentes = async () => {

    if (seleccionados.length < 2) {

      Swal.fire({
        icon: "warning",
        title: "Seleccione mínimo 2 incidentes"
      });

      return;
    }



    try {

      const grupoId = `grupo_${Date.now()}`;

      for (const incidente of incidentes) {

        if (
          seleccionados.includes(incidente.id)
        ) {

          await updateDoc(doc(db, "incidentes", incidente.id),

            {
              grupoId
            }
          );
        }
      }

      setSeleccionados([]);

    } catch {

      Swal.fire({
        icon: "error",
        title: "Error al agrupar"
      });
    }
  };




  const toggleGrupo = (grupoId) => {
    setGruposAbiertos({ ...gruposAbiertos, [grupoId]: !gruposAbiertos[grupoId] });
  };

  const desagruparIncidentes = async () => {
    if (
      seleccionados.length === 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "Seleccione incidentes"
      });

      return;
    }


    try {

      for (const id of seleccionados) {
        await updateDoc(doc(db, "incidentes", id),
          {
            grupoId: null
          }
        );
      }
      setSeleccionados([]);

    } catch {

      Swal.fire({
        icon: "error",
        title: "Error al desagrupar"

      });
    }
  };


  const incidentesAgrupados = incidentesFiltrados.reduce((grupos, incidente) => {
    const key = incidente.grupoId || incidente.id;

    if (!grupos[key]) {
      grupos[key] = [];
    }

    grupos[key].push(
      incidente
    );

    return grupos;

  },

    {}

  );


  const grupos = Object.values(incidentesAgrupados).filter(
    (grupo) => grupo.length > 1);

  const individuales = Object.values(incidentesAgrupados).filter(
    (grupo) => grupo.length === 1);



  return (

    <div className="gestion-admin">

      <div className="contenedor-gestion-admin">

        <div className="encabezado-gestion">

          <h1>
            Gestión de Incidentes
          </h1>

          <p>
            Hola {nombre},
            Bienvenido al sistema
            de gestión de incidentes
          </p>

        </div>

        <div className="filtros-admin">

          <input
            type="text"
            placeholder="Buscar incidente..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <SelectorAdmin
            valor={estadoFiltro}
            opciones={[
              "Todos",
              "Reportado",
              "En proceso",
              "Resuelto"
            ]}
            onChange={setEstadoFiltro}
          />



          <button
            className="boton-agrupar"
            onClick={agruparIncidentes}
          >
            Agrupar
          </button>

        </div>

        <div className="grid-admin">

          {/* INCIDENTES INDIVIDUALES */}

          {

            individuales.map((grupo) => (
              <CardIncidenteAdmin
                key={grupo[0].id}
                id={grupo[0].id}
                tipo={grupo[0].tipo}
                descripcion={grupo[0].descripcion}
                ubicacion={grupo[0].ubicacion}
                estado={grupo[0].estado}
                foto={grupo[0].foto}
                fecha={grupo[0].fecha}
                seleccionado={seleccionados.includes(grupo[0].id)}
                onSeleccionar={seleccionarIncidente}

              />

            ))
          }



          {/* GRUPOS */}

          {

            grupos.map((grupo) => (

              <div key={grupo[0].grupoId} className="grupo-incidentes">

                <div className="encabezado-grupo" onClick={() => toggleGrupo(grupo[0].grupoId)}>
                  <h2>Grupo de incidentes
                    ({grupo.length})

                  </h2>

                  <span>

                    {

                      gruposAbiertos[
                        grupo[0].grupoId
                      ]

                        ? "−"

                        : "+"

                    }

                  </span>

                </div>
{

  gruposAbiertos[
    grupo[0].grupoId
  ] && (

    <div className="grupo-cards">

      <div className="contenedor-boton-desagrupar">

        <Boton
          texto="Desagrupar seleccionados"
          onClick={desagruparIncidentes}
        />

      </div>

      {

        grupo.map((incidente) => (

          <CardIncidenteAdmin

            key={incidente.id}

            id={incidente.id}

            tipo={incidente.tipo}

            descripcion={incidente.descripcion}

            ubicacion={incidente.ubicacion}

            estado={incidente.estado}

            foto={incidente.foto}

            fecha={incidente.fecha}

            seleccionado={
              seleccionados.includes(
                incidente.id
              )
            }

            onSeleccionar={
              seleccionarIncidente
            }

          />

        ))
      }

    </div>
  )
}
                
              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
}

export default GestionIncidentesAdmin;