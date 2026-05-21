import { Link } from "react-router-dom";
import "./Inicio.css";

function Inicio() {
  const caracteristicas = [
    {
      titulo: "Seguridad Total",
      descripcion:
        "Autenticación segura y protección de la información institucional."
    },
    {
      titulo: "Alertas en Tiempo Real",
      descripcion:
        "Notificaciones automáticas para el seguimiento de incidentes."
    },
    {
      titulo: "Análisis y Reportes",
      descripcion:
        "Estadísticas detalladas para apoyar la toma de decisiones."
    },
    {
      titulo: "Respuesta Rápida",
      descripcion:
        "Gestión eficiente y automatizada de cada incidente reportado."
    }
  ];

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
          {caracteristicas.map((item, index) => (
            <div
              className="tarjeta-caracteristica"
              key={index}
            >
              <div className="numero-caracteristica">
                0{index + 1}
              </div>

              <h3>{item.titulo}</h3>

              <p>{item.descripcion}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Inicio;