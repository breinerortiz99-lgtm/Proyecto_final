import { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SecurityIcon from "@mui/icons-material/Security";
import "./Nav.css";

function Nav() {
    const [abierto, setAbierto] = useState(false);
    const toggleDrawer = (estado) => {
        setAbierto(estado);
    };

    const opciones = [
        { texto: "Inicio", ruta: "/" },
    ];

    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                className="navbar"
            >
                <Toolbar className="toolbar-navbar">
                    {/* Logo */}
                    <Box
                        component={Link}
                        to="/"
                        className="logo-navbar"
                    >
                        <Box className="icono-contenedor">
                            <SecurityIcon className="icono-seguridad" />
                        </Box>

                        <Box>
                            <Typography
                                variant="subtitle1"
                                className="texto-logo-principal"
                            >
                                SGI
                            </Typography>

                            <Typography
                                variant="caption"
                                className="texto-logo-secundario"
                            >
                                Gestión de Incidentes
                            </Typography>
                        </Box>
                    </Box>

                    {/* Menú escritorio */}
                    <Box
                        className="menu-escritorio"
                        sx={{
                            display: { xs: "none", md: "flex" },
                        }}
                    >
                        {opciones.map((item) => (
                            <Button
                                key={item.texto}
                                component={Link}
                                to={item.ruta}
                                className="boton-menu"
                            >
                                {item.texto}
                            </Button>
                        ))}

                        <Button
                            component={Link}
                            to="/login"
                            variant="outlined"
                            className="boton-login"
                        >
                            Iniciar Sesión
                        </Button>

                        <Button
                            component={Link}
                            to="/registro"
                            variant="contained"
                            className="boton-registro"
                        >
                            Registrarse
                        </Button>
                    </Box>

                    {/* Botón menú móvil */}
                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={() => toggleDrawer(true)}
                        sx={{
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Drawer móvil */}
          <Drawer
  anchor="right"
  open={abierto}
  onClose={() => toggleDrawer(false)}
  slotProps={{
    paper: {
      className: "drawer-navbar",
    },
  }}
>
  <Box className="drawer-encabezado">
    <Typography
      variant="h6"
      className="drawer-titulo"
    >
      Gestión de Incidentes
    </Typography>
  </Box>

  <List>
    {opciones.map((item) => (
      <ListItemButton
        key={item.texto}
        component={Link}
        to={item.ruta}
        onClick={() => toggleDrawer(false)}
        className="item-drawer"
      >
        <ListItemText primary={item.texto} />
      </ListItemButton>
    ))}

    <ListItemButton
      component={Link}
      to="/login"
      onClick={() => toggleDrawer(false)}
      className="item-drawer"
    >
      <ListItemText primary="Iniciar Sesión" />
    </ListItemButton>

    <ListItemButton
      component={Link}
      to="/registro"
      onClick={() => toggleDrawer(false)}
      className="item-drawer"
    >
      <ListItemText primary="Registrarse" />
    </ListItemButton>
  </List>
</Drawer>
        </>
    );
}

export default Nav;