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



function NavUsuario() {

    const [abierto, setAbierto] = useState(false);
    const navigate = useNavigate();
    const {usuario, nombre, cerrarSesion } = useAuth();
    const opciones = [
        {
            texto: "Inicio",
            ruta: "/"
        }
    ];




    const handleCerrarSesion = async () => {

            try {

                await cerrarSesion();

                Swal.fire({
                    icon: "success",
                    title: "Sesión cerrada",
                    text: "Ha cerrado sesión correctamente.",
                    confirmButtonText: "Aceptar",
                });

                navigate("/");

            } catch (error) {

                Swal.fire({
                    icon: "error",
                    title: "Error al cerrar sesión",
                    text: error.message,
                    confirmButtonText: "Aceptar",
                });
            }
        };




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
                        to={
                            usuario
                                ? "/mis-incidentes"
                                : "/"
                        }
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
                        sx={{ display: { xs: "none",md: "flex",},}}
                    >

                        {
                            !usuario ? (

                                <>

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

                                </>

                            ) : (

                                <>

                                    <Typography
                                        className="correo-usuario"
                                    >

                                        {nombre}

                                    </Typography>



                                    <Button
                                        component={Link}
                                        to="/mis-incidentes"
                                        className="boton-menu"
                                    >

                                        Mis Incidentes

                                    </Button>



                                    <Button
                                        component={Link}
                                        to="/crear-incidente"
                                        className="boton-menu"
                                    >

                                        Crear Incidente

                                    </Button>



                                    <Button
                                        onClick={
                                            handleCerrarSesion
                                        }
                                        variant="contained"
                                        className="boton-cerrar-sesion"
                                    >

                                        Cerrar Sesión

                                    </Button>

                                </>

                            )
                        }

                    </Box>




                    {/* Botón móvil */}

                    <IconButton
                        color="inherit"
                        edge="end"
                        onClick={() =>
                            setAbierto(true)
                        }
                        sx={{display: {xs: "flex",md: "none",}, }}
                    >

                        <MenuIcon />

                    </IconButton>

                </Toolbar>

            </AppBar>




            {/* Drawer móvil */}

            <Drawer
                anchor="right"
                open={abierto}
                onClose={() =>
                    setAbierto(false)
                }
                slotProps={{
                    paper: {
                        className:
                            "drawer-navbar",
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

                    {
                        !usuario ? (

                            <>

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
                                                primary={
                                                    item.texto
                                                }
                                            />

                                        </ListItemButton>
                                    ))
                                }



                                <ListItemButton
                                    component={Link}
                                    to="/login"
                                    onClick={() =>
                                        setAbierto(false)
                                    }
                                    className="item-drawer"
                                >

                                    <ListItemText
                                        primary="Iniciar Sesión"
                                    />

                                </ListItemButton>



                                <ListItemButton
                                    component={Link}
                                    to="/registro"
                                    onClick={() =>
                                        setAbierto(false)
                                    }
                                    className="item-drawer"
                                >

                                    <ListItemText
                                        primary="Registrarse"
                                    />

                                </ListItemButton>

                            </>

                        ) : (

                            <>

                                <Box
                                    className="correo-usuario-drawer"
                                >

                                    {nombre}

                                </Box>



                                <ListItemButton
                                    component={Link}
                                    to="/mis-incidentes"
                                    onClick={() =>
                                        setAbierto(false)
                                    }
                                    className="item-drawer"
                                >

                                    <ListItemText
                                        primary="Mis Incidentes"
                                    />

                                </ListItemButton>



                                <ListItemButton
                                    component={Link}
                                    to="/crear-incidente"
                                    onClick={() =>
                                        setAbierto(false)
                                    }
                                    className="item-drawer"
                                >

                                    <ListItemText
                                        primary="Crear Incidente"
                                    />

                                </ListItemButton>



                                <ListItemButton
                                    onClick={() => {

                                        setAbierto(false);

                                        handleCerrarSesion();

                                    }}
                                    className="item-drawer"
                                >

                                    <ListItemText
                                        primary="Cerrar Sesión"
                                    />

                                </ListItemButton>

                            </>

                        )
                    }

                </List>

            </Drawer>

        </>
    );
}

export default NavUsuario;