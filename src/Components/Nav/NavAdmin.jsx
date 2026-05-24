import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import "./Nav.css";



function NavAdmin() {
  const [abierto, setAbierto] =useState(false);
  const { nombre,cerrarSesion} = useAuth();
  const navigate = useNavigate();
  const opciones = [

    {
      texto: "Dashboard",
      ruta: "/admin"
    },

    {
      texto: "Incidentes",
      ruta: "/admin/incidentes"
    }

  ];





  const handleLogout =
    async () => { await cerrarSesion();
    Swal.fire({
      icon: "success",
      title: "Sesión cerrada"
    });
    
    navigate("/");
  };




  return (

    <>

      <AppBar
        position="sticky"
        elevation={0}
        className="navbar"
      >

        <Toolbar className="toolbar-navbar">

          <Box
            component={Link}
            to="/admin"
            className="logo-navbar"
          >

            <Box className="icono-contenedor">

              <SecurityIcon
                className="icono-seguridad"
              />

            </Box>



            <Box>

              <Typography
                variant="subtitle1"
                className="texto-logo-principal"
              >

                SGI Admin

              </Typography>



              <Typography
                variant="caption"
                className="texto-logo-secundario"
              >

                Panel Administrativo

              </Typography>

            </Box>

          </Box>




          <Box
            className="menu-escritorio"
            sx={{display: {xs: "none", md: "flex"}}}
          >

            {
              opciones.map((item) => (

                <Button

                  key={item.texto}

                  component={Link}

                  to={item.ruta}

                  className="boton-menu"
                >

                  {item.texto}

                </Button>
              ))
            }



            <Typography
              className="correo-usuario"
            >

              {nombre}

            </Typography>



            <Button

              onClick={handleLogout}

              variant="contained"

              className="boton-cerrar-sesion"
            >

              Cerrar Sesión

            </Button>

          </Box>




          <IconButton

            color="inherit"

            edge="end"

            onClick={() =>
              setAbierto(true)
            }

            sx={{display: {xs: "flex",md: "none"}}}
          >

            <MenuIcon />

          </IconButton>

        </Toolbar>

      </AppBar>




      <Drawer

        anchor="right"

        open={abierto}

        onClose={() =>
          setAbierto(false)
        }

        slotProps={{

          paper: {
            className:
              "drawer-navbar"
          }

        }}
      >

        <Box className="drawer-encabezado">

          <Typography
            variant="h6"
            className="drawer-titulo"
          >

            Panel Admin

          </Typography>

        </Box>




        <List>

          {
            opciones.map((item) => (

              <ListItemButton

                key={item.texto}

                component={Link}

                to={item.ruta}

                onClick={() =>
                  setAbierto(false)
                }

                className="item-drawer"
              >

                <ListItemText
                  primary={item.texto}
                />

              </ListItemButton>
            ))
          }



          <Box
            className="correo-usuario-drawer"
          >

            {nombre}

          </Box>



          <ListItemButton

            onClick={() => {

              setAbierto(false);

              handleLogout();

            }}

            className="item-drawer"
          >

            <ListItemText
              primary="Cerrar Sesión"
            />

          </ListItemButton>

        </List>

      </Drawer>

    </>
  );
}

export default NavAdmin;