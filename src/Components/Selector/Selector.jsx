import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "./Selector.css";

function Selector({ valor, setValor, opciones = [], ancho = 220}) {

  return (
    <FormControl
      className="selector-general"
      size="small"
      sx={{ minWidth: ancho }}
    >

      <Select
        value={valor}
        onChange={(e) =>
          setValor(e.target.value)
        }
      >


        {opciones.map((opcion, index) => (
          <MenuItem
            key={index}
            value={opcion.valor}
          >
            {opcion.label}
          </MenuItem>

        ))}

      </Select>

    </FormControl>
  );
}

export default Selector;