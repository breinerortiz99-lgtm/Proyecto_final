import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./SelectorAdmin.css";



function SelectorAdmin({ valor, opciones, onChange}) {

  return (

    <FormControl
      className="selector-admin"
      size="small"
      >

      <Select
        value={valor}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="selector-admin"
      >

        {
          opciones.map((opcion) => (

            <MenuItem
              key={opcion}
              value={opcion}
            >

              {opcion}

            </MenuItem>
          ))
        }

      </Select>

    </FormControl>
  );
}

export default SelectorAdmin;