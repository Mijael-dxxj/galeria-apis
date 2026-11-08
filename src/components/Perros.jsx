import { useState, useEffect } from "react";
import "./Perros.css";

function Perros() {
    const [perros, setPerros] = useState([]); 
    const [cantidad, setCantidad] = useState(6); 
    const [cargado, setCargado] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const obtenerPerros = async () => {
            try {
                setCargado(true);
                setError("");
                
                const url = "https://dog.ceo/api/breeds/image/random/" + cantidad;
                const respuesta = await fetch(url);
                const datos = await respuesta.json();
                
                if (!respuesta.ok || datos.status !== "success") {
                    throw new Error("No se pudieron cargar las imágenes de los perritos");
                }
                
                setPerros(datos.message || []);
            }
            catch (err) {
                setError(err.message);
                setPerros([]);
            }
            finally {
                setCargado(false);
            }
        };
        
        obtenerPerros();
    }, [cantidad]); 

    const extraerRaza = (urlImagen) => {
        try {
            const parteRaza = urlImagen.split("/breeds/")[1].split("/")[0];
            return parteRaza.replace("-", " ").toUpperCase();
        } catch {
            return "RAZA DESCONOCIDA";
        }
    };

    return (
        <div className="perros-galeria">
            <h1 className="perros-titulo">Galería de Perritos 🐾</h1>
            
            {error && <p className="perros-error">{error}</p>}
            
            <div className="perros-grid">
                {perros.map((item, i) => (
                    <div className="perro-card" key={item || i}>
                        <div className="perro-imagen-wrapper">
                            <img src={item} alt="Perrito Adorable" />
                        </div>
                        <div className="perro-info">
                            <small className="perro-raza">🐕 {extraerRaza(item)}</small>
                            <h3 className="perro-nombre">Amigo Fiel #{i + 1}</h3>
                            <p className="perro-descripcion">Un hermoso ejemplar obtenido aleatoriamente. Haz clic abajo para expandir la fotografía en alta resolución.</p>
                            <a href={item} target="_blank" rel="noreferrer" className="perro-enlace">Ver Imagen Completa</a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="perros-acciones">
                <button 
                    className="perros-btn-ver-mas"
                    onClick={() => setCantidad(prev => prev + 3)}
                    disabled={cargado}
                >
                    {cargado ? "Buscando cachorros... 🔄" : "Ver más 🐕"}
                </button>
            </div>
        </div>
    );
}

export default Perros;
