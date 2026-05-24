import useAuth from "../../Hooks/useAuth";
import NavUsuario from "./NavUsuario";
import NavAdmin from "./NavAdmin";



function Nav() {

  const { rol } = useAuth();

  return rol === "admin"
    ? <NavAdmin />
    : <NavUsuario />;
}

export default Nav;