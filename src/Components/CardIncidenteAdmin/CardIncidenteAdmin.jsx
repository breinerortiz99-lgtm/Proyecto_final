import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../FireBase/config";
import SelectorAdmin from "../SelectorAdmin/SelectorAdmin";
import Swal from "sweetalert2";
import "./CardIncidenteAdmin.css";

function CardIncidenteAdmin({ id, tipo, descripcion, ubicacion, estado, foto, fecha, seleccionado, onSeleccionar }) {

    const fechaFormateada =
        fecha?.toDate().toLocaleDateString(
            "es-CO",
            {
                year: "numeric",
                month: "short",
                day: "numeric",
            }
        );



    const cambiarEstado = async (nuevoEstado) => {

        try {

            await updateDoc(doc(db, "incidentes", id), { estado: nuevoEstado });
            Swal.fire({
                icon: "success",
                title: "Estado actualizado",
                timer: 1200,
                showConfirmButton: false
            });

        } catch {

            Swal.fire({
                icon: "error",
                title: "Error al actualizar"
            });
        }
    };



    return (

        <Card className="card-incidente-admin">

            <CardContent className= "contenido-card-incidente-admin">

                <div className="contenedor-checkbox">

                    <input
                        type="checkbox"
                        checked={seleccionado}
                        onChange={() =>  onSeleccionar(id)}
                    />

                </div>

                <PhotoProvider>

                    <PhotoView src={foto}>

                        <img
                            src={foto}
                            alt={tipo}
                            className="imagen-incidente-admin"
                        />

                    </PhotoView>

                </PhotoProvider>




                <div className="informacion-incidente-admin">

                    <div className="encabezado-incidente-admin">

                        <h3>{tipo}</h3>

                        <span className={`estado ${estado.replace(" ", "-")}`}>
                            {estado}

                        </span>

                    </div>




                    <p className="descripcion-incidente-admin">

                        {descripcion}

                    </p>


                    <div className="acciones-admin">
                        <label >Actualizar Estado:</label>
                        <SelectorAdmin
                            valor={estado}

                            opciones={[
                                "Reportado",
                                "En proceso",
                                "Resuelto"
                            ]}

                            onChange={
                                cambiarEstado
                            }
                        />

                    </div>

                    <div className="datos-incidente-admin">

                        <span>
                            {ubicacion}
                        </span>

                        <span>
                            {fechaFormateada}
                        </span>

                    </div>


                </div>

            </CardContent>

        </Card>
    );
}

export default CardIncidenteAdmin;