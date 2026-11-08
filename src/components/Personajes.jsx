import { useState, useEffect } from "react";
import "./Personajes.css";

function Personajes() {
    const [personajes, setPersonajes] = useState([]);
    const [cantidad, setCantidad] = useState(6);
    const [cargado, setCargado] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const obtenerPersonajes = async () => {
            try {
                setCargado(true);
                setError("");

                // Esta API trae 20 por página, cortamos con slice para usar tu cantidad
                const url = `https://rickandmortyapi.com/api/character?page=1`;
                const respuesta = await fetch(url);

                if (!respuesta.ok) {
                    throw new Error("No se pudieron cargar los personajes");
                }

                const datos = await respuesta.json();
                const lista = datos.results.slice(0, cantidad).map(p => ({
                    nombre: p.name,
                    url: p.image,
                    especie: p.species,
                    estado: p.status
                }));

                setPersonajes(lista || []);
            }
            catch (err) {
                setError(err.message);
                setPersonajes([]);
            }
            finally {
                setCargado(false);
            }
        };

        obtenerPersonajes();
    }, [cantidad]);

    return (
        <div className="gatos-galeria">
            <h1 className="gatos-titulo">Personajes de Rick y Morty 🛸</h1>

            {error && <p className="gatos-error">{error}</p>}
            {cargado && <p>Cargando personajes... 🔄</p>}

            <div className="gatos-grid">
                {personajes.map((item, i) => (
                    <div className="gato-card" key={item.nombre}>
                        <div className="gato-imagen-wrapper">
                            <img src={item.url} alt={item.nombre} />
                        </div>
                        <div className="gato-info">
                            <small className="gato-etiqueta">🛸 {item.especie} - {item.estado}</small>
                            <h3 className="gato-nombre">{item.nombre}</h3>
                            <p className="gato-descripcion">Personaje obtenido de la API de Rick y Morty. Haz clic abajo para ver la imagen en pantalla completa.</p>
                            <a href={item.url} target="_blank" rel="noreferrer" className="gato-enlace">Ver Imagen Completa</a>
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
                    {cargado ? "Buscando personajes... 🔄" : "Ver más personajes 🛸"}
                </button>
            </div>
        </div>
    );
}

export default Personajes;