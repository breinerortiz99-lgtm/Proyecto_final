import { Link } from "react-router-dom";
import CardGeneral from "../../Components/CardGeneral/CardGeneral";
import "./Inicio.css";

function Inicio() {
  

  return (
    <div className="pagina-inicio">
      {/* HERO PRINCIPAL */}
      <section className="hero">
        <div className="hero-contenido">
          <span className="etiqueta-hero">
            Plataforma Institucional
          </span>

          <h1 className="titulo-hero">
            Sistema Inteligente de
            <span> Gestión de Incidentes</span>
          </h1>

          <p className="descripcion-hero">
            Centralice el reporte, seguimiento y análisis de
            incidentes en una plataforma moderna, segura y
            diseñada para optimizar los procesos de la
            Universidad de la Amazonia.
          </p>

          <div className="botones-hero">
            <Link
              to="/registro"
              className="boton-principal"
            >
              Comenzar Ahora
            </Link>

            <Link
              to="/login"
              className="boton-secundario"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>

        {/* Elementos decorativos */}
        <div className="circulo circulo-uno"></div>
        <div className="circulo circulo-dos"></div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section
        className="seccion-caracteristicas"
        id="caracteristicas"
      >
        <h2 className="titulo-seccion">
          Características Principales
        </h2>

        <p className="subtitulo-seccion">
          Herramientas diseñadas para una gestión eficiente,
          segura y moderna.
        </p>

        <div className="grid-caracteristicas">
          <CardGeneral
            titulo="Seguridad"
            descripcion="Se implementaron medidas de seguridad
            avanzadas para proteger la información de los
            usuarios."
          />

          <CardGeneral
            titulo="Seguimiento"
            descripcion="El sistema proporciona un seguimiento
            detallado de los incidentes, permitiendo a los
            administradores tomar decisiones informadas."
          />

          <CardGeneral
            titulo="Reporte"
            descripcion="Los usuarios tienen acceso a un
            reporte detallado de los incidentes, facilitando
            la toma de decisiones."
          />
        </div>
      </section>
    </div>
  );
}

export default Inicio;