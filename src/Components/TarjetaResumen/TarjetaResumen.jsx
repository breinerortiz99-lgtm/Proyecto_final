import Card from "@mui/material/Card";
import "./TarjetaResumen.css";



function TarjetaResumen({titulo,valor}) {

  return (
    <Card className="tarjeta-resumen">
      <h3> {titulo}</h3>

      <span> {valor} </span>

    </Card>
  );
}

export default TarjetaResumen;