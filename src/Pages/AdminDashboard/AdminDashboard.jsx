import { useEffect, useState } from "react";
import {collection,onSnapshot} from "firebase/firestore";
import {db} from "../../FireBase/config";
import TarjetaResumen from "../../Components/TarjetaResumen/TarjetaResumen";
import {ResponsiveContainer,PieChart,Pie,Cell,Tooltip,Legend,BarChart,Bar,XAxis,YAxis,CartesianGrid} from "recharts";
import CardIncidenteAdmin from "../../Components/CardIncidenteAdmin/CardIncidenteAdmin";
import "./AdminDashboard.css";



function DashboardAdmin() {

  const [incidentes, setIncidentes] =useState([]);

  useEffect(() => {

    const consulta =collection(  db,  "incidentes");

    const unsubscribe =onSnapshot(consulta, (snapshot) => {
          const datos = snapshot.docs.map((doc) => ({
                id: doc.id,...doc.data()
              })
            );
          setIncidentes(datos);
        }
      );

    return () => unsubscribe();

  }, []);



// Contadores de estados e incidentes////////////////////////////////////////////////
  const total = incidentes.length;
  const reportados = incidentes.filter( (i) => i.estado === "Reportado").length;
  const proceso = incidentes.filter( (i) => i.estado ===   "En proceso").length;
  const resueltos =incidentes.filter((i) =>  i.estado === "Resuelto"  ).length;

  const datosEstados = [

    {
      nombre: "Reportados",
      valor: reportados,
      color: "#facc15"
    },

    {
      nombre: "En proceso",
      valor: proceso,
      color: "#60a5fa"
    },

    {
      nombre: "Resueltos",
      valor: resueltos,
      color: "#4ade80"
    }

  ];
  const tiposMap = {};



  incidentes.forEach((incidente) => {

    if (!tiposMap[incidente.tipo]) {

      tiposMap[incidente.tipo] = 0;
    }

    tiposMap[incidente.tipo]++;
  });




  const datosTipos =
    Object.entries(tiposMap).map(

      ([tipo, cantidad]) => ({

        tipo,
        cantidad

      })
    );




  return (

    <div className="dashboard-admin">

      <div className="encabezado-dashboard-admin">

        <h1>
          Dashboard Admin
        </h1>

        <p>
          Estadísticas generales
          del sistema.
        </p>

      </div>




      <div className="grid-resumen-admin">

        <TarjetaResumen
          titulo="Total"
          valor={total}
        />

        <TarjetaResumen
          titulo="Reportados"
          valor={reportados}
        />

        <TarjetaResumen
          titulo="En proceso"
          valor={proceso}
        />

        <TarjetaResumen
          titulo="Resueltos"
          valor={resueltos}
        />

      </div>




      <div className="grid-graficas-admin">

        <div className="grafica-card">

          <h2>
            Estados
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={datosEstados}
                dataKey="valor"
                nameKey="nombre"
                outerRadius={110}
                label
              >

                {
                  datosEstados.map(
                    (item, index) => (

                      <Cell
                        key={index}
                        fill={item.color}
                      />
                    )
                  )
                }

              </Pie>

              <Tooltip />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        </div>




        <div className="grafica-card">

          <h2>
            Tipos de Incidentes
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart
              data={datosTipos}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="tipo" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="cantidad"
                fill="#60a5fa"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>
      <div className="seccion-incidentes-admin">

        <h2>
          Últimos Incidentes
        </h2>

        <div className="grid-incidentes-admin">

          {
            incidentes
              .slice()
              .reverse()
              .slice(0, 6)

              .map((incidente) => (

                <CardIncidenteAdmin

                  key={incidente.id}

                  id={incidente.id}

                  tipo={incidente.tipo}

                  descripcion={ incidente.descripcion}

                  ubicacion={ incidente.ubicacion}

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

export default DashboardAdmin;