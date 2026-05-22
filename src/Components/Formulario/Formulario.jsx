import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../FireBase/config";
import Swal from "sweetalert2";
import Boton from "../Boton/Boton";
import "./Formulario.css";

function Formulario() {

  const [tipo, setTipo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [foto, setFoto] = useState(null);

  const [latitud, setLatitud] = useState(null);
  const [longitud, setLongitud] = useState(null);

  // GPS
  const obtenerUbicacion = () => {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        setLatitud(position.coords.latitude);

        setLongitud(position.coords.longitude);

        Swal.fire({
          icon: "success",
          title: "Ubicación obtenida",
          confirmButtonText: "Aceptar"
        });

      },
      () => {

        Swal.fire({
          icon: "error",
          title: "No se pudo obtener la ubicación",
          confirmButtonText: "Aceptar"
        });

      }
    );
  };

  // Guardar incidente
  const guardarIncidente = async (e) => {

    e.preventDefault();

    if (
      !tipo ||
      !descripcion ||
      !ubicacion ||
      !foto
    ) {

      Swal.fire({
        icon: "warning",
        title: "Complete todos los campos",
        text: "La fotografía es obligatoria",
        confirmButtonText: "Aceptar"
      });

      return;
    }

    try {

      const usuario = auth.currentUser;

      // Nombre único imagen
      const nombreImagen =
        `${Date.now()}-${foto.name}`;

      // Referencia storage
      const referenciaImagen = ref(
        storage,
        `incidentes/${nombreImagen}`
      );

      // Subir imagen
      await uploadBytes(
        referenciaImagen,
        foto
      );

      // Obtener URL
      const urlFoto =
        await getDownloadURL(
          referenciaImagen
        );

      // Guardar en Firestore
      await addDoc(
        collection(db, "incidentes"),
        {
          tipo,
          descripcion,
          ubicacion,

          foto: urlFoto,

          latitud,
          longitud,

          estado: "Reportado",

          usuario:
            usuario?.displayName ||
            usuario?.email,

          uid: usuario?.uid,

          fecha: serverTimestamp(),
        }
      );

      Swal.fire({
        icon: "success",
        title: "Incidente registrado",
        text: "El reporte fue enviado correctamente",
        confirmButtonText: "Aceptar"
      });

      // Limpiar
      setTipo("");
      setDescripcion("");
      setUbicacion("");
      setFoto(null);

      setLatitud(null);
      setLongitud(null);

    } catch (error) {

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message,
        confirmButtonText: "Aceptar"
      });

    }
  };

  return (

    <form
      className="formulario-incidente"
      onSubmit={guardarIncidente}
    >

      {/* Tipo */}
      <div className="grupo-formulario">

        <label>
          Tipo de incidente
        </label>

        <select
          value={tipo}
          onChange={(e) =>
            setTipo(e.target.value)
          }
        >

          <option value="">
            Seleccione
          </option>

          <option value="Baño">
            Baño
          </option>

          <option value="Electricidad">
            Electricidad
          </option>

          <option value="Infraestructura">
            Infraestructura
          </option>

          <option value="Seguridad">
            Seguridad
          </option>

          <option value="Tecnología">
            Tecnología
          </option>

        </select>

      </div>

      {/* Ubicación */}
      <div className="grupo-formulario">

        <label>
          Ubicación
        </label>

        <input
          type="text"
          placeholder="Ejemplo: Bloque A"
          value={ubicacion}
          onChange={(e) =>
            setUbicacion(e.target.value)
          }
        />

      </div>

      {/* GPS */}
      <div className="grupo-formulario">

        <label>
          Geolocalización (Opcional)
        </label>

        <button
          type="button"
          className="boton-gps"
          onClick={obtenerUbicacion}
        >
          Obtener ubicación GPS
        </button>

        {
          latitud && longitud && (
            <p className="texto-gps">
              GPS obtenido correctamente
            </p>
          )
        }

      </div>

      {/* Foto */}
      <div className="grupo-formulario">

        <label>
          Fotografía
        </label>

        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={(e) =>
            setFoto(e.target.files[0])
          }
        />

      </div>

      {/* Descripción */}
      <div className="grupo-formulario">

        <label>
          Descripción detallada
        </label>

        <textarea
          placeholder="Describa el incidente..."
          value={descripcion}
          onChange={(e) =>
            setDescripcion(
              e.target.value
            )
          }
        />

      </div>

      <Boton texto="Registrar Incidente" />

    </form>
  );
}

export default Formulario;