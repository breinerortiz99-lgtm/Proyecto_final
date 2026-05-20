import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './CardRegistro.css';

function CardRegistro({
  titulo,
  subtitulo,
  children: formulario,
  pie = 'Universidad de la Amazonia'
}) {
  return (
    <div className="contenedor">
      <Card className="tarjeta-autenticacion">
        <CardContent>
          
          <div className="encabezado-tarjeta">
            <Typography
              variant="h4"
              component="h1"
              className="titulo-tarjeta"
            >
              {titulo}
            </Typography>

            {subtitulo && (
              <Typography
                variant="body1"
                className="subtitulo-tarjeta"
              >
                {subtitulo}
              </Typography>
            )}
          </div>

          <div className="formulario-tarjeta">
            {formulario}
          </div>

          <div className="universidad">
            <Typography
              variant="body2"
              className="texto-universidad"
            >
              {pie}
            </Typography>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export default CardRegistro;