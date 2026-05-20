import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";

import MenuIcon from "@mui/icons-material/Menu";

function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  const logout = () => {
    localStorage.removeItem("usuarios");
    navigate("/login");
  };

  const menuItemsPublic = [
    { text: "Home", path: "/" },
    { text: "Features", path: "/features" },
    { text: "Login", path: "/login" },
    { text: "Registro", path: "/registro" },
  ];

  const menuItemsPrivate = [
    { text: "Home", path: "/" },
    { text: "Dashboard", path: "/dashboard" },
    { text: "Profile", path: "/profile" },
  ];

  const menuItems = user ? menuItemsPrivate : menuItemsPublic;

  const drawerContent = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}

        {user && (
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>

          {/* HAMBURGUESA */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            onClick={toggleDrawer(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          {/* LOGO */}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MiApp
          </Typography>

          {/* BOTONES DESKTOP */}
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/registro">
                Registro    
              </Button>
            </>
          ) : (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          )}

        </Toolbar>
      </AppBar>

      {/* DRAWER (MENU LATERAL) */}
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
}

export default Nav;