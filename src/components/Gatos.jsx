import { useState, useEffect } from "react";
import "./gatos.css"; 

function Gatos() {
    const [gatos, setGatos] = useState([]); 
    const [cantidad, setCantidad] = useState(6); 
    const [cargado, setCargado] = useState(false);
    const [error, setError] = useState("");

    const apiKey = import.meta.env.VITE_CAT_API_KEY || "";

    useEffect(() => {
        const obtenerGatos = async () => {
            try {
                setCargado(true);
                setError("");
                
                // LINK CORREGIDO - ESTE ERA EL ERROR
                const url = `https://api.thecatapi.com/v1/images/search?limit=${cantidad}`;
                
                const opciones = {
                    method: "GET",
                    headers: apiKey ? { "x-api-key": apiKey } : {}
                };

                const respuesta = await fetch(url, opciones);
                
                if (!respuesta.ok) {
                    throw new Error("No se pudieron cargar las imágenes de los gatitos");
                }
                
                const datos = await respuesta.json();
                
                const urlsGatos = datos.map(gato => gato.url);
                setGatos(urlsGatos || []);
            }
            catch (err) {
                setError(err.message);
                setGatos([]);
            }
            finally {
                setCargado(false);
            }
        };
        
        obtenerGatos();
    }, [cantidad, apiKey]); 

    return (
        <div className="gatos-galeria">
            <h1 className="gatos-titulo">Galería de Gatitos 🐱</h1>
            
            {error && <p className="gatos-error">{error}</p>}
            
            <div className="gatos-grid">
                {gatos.map((item, i) => (
                    <div className="gato-card" key={item || i}>
                        <div className="gato-imagen-wrapper">
                            <img src={item} alt="Gatito Adorable" />
                        </div>
                        <div className="gato-info">
                            <small className="gato-etiqueta">🐱 Felino Doméstico</small>
                            <h3 className="gato-nombre">Michi Consentido #{i + 1}</h3>
                            <p className="gato-descripcion">Un hermoso ejemplar felino obtenido aleatoriamente. Haz clic abajo para ver la imagen en pantalla completa.</p>
                            <a href={item} target="_blank" rel="noreferrer" className="gato-enlace">Ver Imagen Completa</a>
                        </div>
                    </div>
                ))}
            </div>

            <div className="gatos-acciones">
                <button 
                    className="gatos-btn-ver-mas"
                    onClick={() => setCantidad(prev => prev + 3)}
                    disabled={cargado}
                >
                    {cargado ? "Buscando michis... 🔄" : "Ver más gatos 🐈"}
                </button>
            </div>
        </div>
    );
}

export default Gatos;