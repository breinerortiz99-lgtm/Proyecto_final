import Formulario from "../../Components/Formulario/Formulario";

import "./CrearIncidente.css";

function CrearIncidente() {
  return (
    <div className="pagina-incidente">


      <div className="contenedor-incidente">

        <div className="encabezado-incidente">
          <h1>Registrar Incidente</h1>

          <p>
            Reporte incidentes de manera rápida
            y organizada dentro del sistema.
          </p>
        </div>

        <div className="card-incidente">
          <Formulario />
        </div>

      </div>
    </div>
  );
}

export default CrearIncidente;