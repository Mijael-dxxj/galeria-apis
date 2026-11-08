import { useState, useEffect } from "react";
import "./Pokemones.css";

function Pokemones() {
    const [pokemones, setPokemones] = useState([]);
    const [cantidad, setCantidad] = useState(6);
    const [cargado, setCargado] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const obtenerPokemones = async () => {
            try {
                setCargado(true);
                setError("");

                const url = `https://pokeapi.co/api/v2/pokemon?limit=${cantidad}`;
                const respuesta = await fetch(url);

                if (!respuesta.ok) {
                    throw new Error("No se pudieron cargar los pokemones");
                }

                const datos = await respuesta.json();

                const lista = datos.results.map((poke, i) => ({
                    nombre: poke.name,
                    // La imagen oficial se arma con el ID (i+1)
                    url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i + 1}.png`
                }));

                setPokemones(lista || []);
            }
            catch (err) {
                setError(err.message);
                setPokemones([]);
            }
            finally {
                setCargado(false);
            }
        };

        obtenerPokemones();
    }, [cantidad]);

    return (
        <div className="gatos-galeria">
            <h1 className="gatos-titulo">Galería de Pokemones ⚡</h1>

            {error && <p className="gatos-error">{error}</p>}
            {cargado && <p>Cargando pokemones... 🔄</p>}

            <div className="gatos-grid">
                {pokemones.map((item, i) => (
                    <div className="gato-card" key={item.nombre}>
                        <div className="gato-imagen-wrapper">
                            <img src={item.url} alt={item.nombre} />
                        </div>
                        <div className="gato-info">
                            <small className="gato-etiqueta">⚡ Pokemon #{i + 1}</small>
                            <h3 className="gato-nombre">{item.nombre}</h3>
                            <p className="gato-descripcion">Un pokemon obtenido de la PokeAPI. Haz clic abajo para ver la imagen en pantalla completa.</p>
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
                    {cargado ? "Buscando pokemones... 🔄" : "Ver más pokemones ⚡"}
                </button>
            </div>
        </div>
    );
}

export default Pokemones;