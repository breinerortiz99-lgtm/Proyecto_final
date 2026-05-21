import { useState, useEffect } from "react";
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
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db } from "../../FireBase/config";
import { doc, getDoc } from "firebase/firestore";

import Swal from "sweetalert2";
import "./Nav.css";

function Nav() {
    const [abierto, setAbierto] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [nombre, setNombre] = useState("");
    const navigate = useNavigate();

    // Detectar si hay un usuario autenticado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUsuario(user);
        });


        return () => unsubscribe();
    }, []);

    const toggleDrawer = (estado) => {
        setAbierto(estado);
    };

    const cerrarSesion = async () => {
        try {
            await signOut(auth);

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

    const opciones = [
        { texto: "Inicio", ruta: "/" }
    ];


    // Consultar el nombre del usuario
    useEffect(() => {
        const consultarNombre = async () => {
            if (usuario) {
                const referenciaUsuario = doc(db, "usuarios", usuario.uid);
                const documentoUsuario = await getDoc(referenciaUsuario);
                if (documentoUsuario.exists()) {
                    setNombre(documentoUsuario.data().nombre);
                }
            }
        };
        consultarNombre(); 
    })


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
                        to={usuario ? "/dashboard" : "/"}
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
                        {/* Si NO hay usuario autenticado */}
                        {!usuario ? (
                            <>
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
                            </>
                        ) : (
                            /* Si SÍ hay usuario autenticado */
                            <>
                                <Typography className="correo-usuario">
                                    {nombre}
                                </Typography>

                                <Button
                                    component={Link}
                                    to="/dashboard"
                                    className="boton-menu"
                                >
                                    Dashboard
                                </Button>

                                <Button
                                    onClick={cerrarSesion}
                                    variant="contained"
                                    className="boton-cerrar-sesion"
                                >
                                    Cerrar Sesión
                                </Button>
                            </>
                        )}
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
                    {/* Si NO hay usuario autenticado */}
                    {!usuario ? (
                        <>
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
                        </>
                    ) : (
                        <>
                            <Box className="correo-usuario-drawer">
                                {nombre}
                            </Box>

                            <ListItemButton
                                component={Link}
                                to="/dashboard"
                                onClick={() => toggleDrawer(false)}
                                className="item-drawer"
                            >
                                <ListItemText primary="Dashboard" />
                            </ListItemButton>

                            <ListItemButton
                                onClick={() => {
                                    toggleDrawer(false);
                                    cerrarSesion();
                                }}
                                className="item-drawer"
                            >
                                <ListItemText primary="Cerrar Sesión" />
                            </ListItemButton>
                        </>
                    )}
                </List>
            </Drawer>
        </>
    );
}

export default Nav;