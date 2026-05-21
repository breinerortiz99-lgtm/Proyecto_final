import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./CardGeneral.css";

function CardGeneral({
  titulo,
  descripcion
}) {
  return (
    <Card className="card-general">
      <CardContent className="contenido-card-general">

        <Typography
          gutterBottom
          variant="h5"
          component="div"
          className="titulo-card-general"
        >
          {titulo}
        </Typography>

        <Typography
          variant="body2"
          className="descripcion-card-general"
        >
          {descripcion}
        </Typography>

      </CardContent>
    </Card>
  );
}

export default CardGeneral;