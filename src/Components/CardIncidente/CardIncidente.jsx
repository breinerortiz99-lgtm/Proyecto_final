import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "./CardIncidente.css";

function CardIncidente({
  tipo,
  descripcion,
  ubicacion,
  estado,
  foto,
  fecha
}) {

  const fechaFormateada =
    fecha?.toDate().toLocaleDateString(
      "es-CO",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );

  return (

    <Card className="card-incidente">

      <CardContent className="contenido-card-incidente">

        <img
          src={foto}
          alt={tipo}
          className="imagen-incidente"
        />

        <div className="informacion-incidente">

          <div className="encabezado-incidente">

            <h3>{tipo}</h3>

            <span className={`estado ${estado}`}>
              {estado}
            </span>

          </div>

          <p className="descripcion-incidente">
            {descripcion}
          </p>

          <div className="datos-incidente">

            <span>
              {ubicacion}
            </span>

            <span>
              {fechaFormateada}
            </span>

          </div>

        </div>

      </CardContent>

    </Card>
  );
}

export default CardIncidente;