import { useState, useEffect } from "react";
import "./Noticias.css";

function Noticias() {
    const [noticias, setNoticias] = useState([]); 
    const [categoria, setCategoria] = useState("general");
    const [cargado, setCargado] = useState(false);
    const [error, setError] = useState("");
    const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

    useEffect(() => {
        const obtenerNoticias = async () => {
            try {
                setCargado(true);
                setError("");
                const url = `https://gnews.io/api/v4/top-headlines?category=${categoria}&lang=es&country=pe&max=10&apikey=${API_KEY}`;
                const respuesta = await fetch(url);
                const datos = await respuesta.json();
                
                if (!respuesta.ok) {
                    throw new Error(datos.errors ? datos.errors[0] : "No se pudieron cargar las noticias");
                }
                
                setNoticias(datos.articles || []);
            }
            catch (err) {
                setError(err.message);
                setNoticias([]);
            }
            finally {
                setCargado(false);
            }
        };
        
        if (API_KEY) {
            obtenerNoticias();
        } else {
            setError("Falta la configuración de la API KEY en tu archivo .env");
        }
    }, [categoria, API_KEY]); 

    return (
        <div className="noticias">
            <h1>Últimas Noticias 📰</h1>
            
            <div className="categorias">
                <button onClick={() => setCategoria("general")}>General 🌎</button>
                <button onClick={() => setCategoria("technology")}>Tecnología 💻</button>
                <button onClick={() => setCategoria("sports")}>Deportes 🏐</button>
            </div>

            {cargado && <p>Cargando Noticias ...</p>}
            {error && <p className="error">{error}</p>}
            
            {!cargado && !error && (
                <div className="noticias-lista">
                    {noticias.map((item, i) => (
                        <div className="noticias-card" key={item.url || i}>
                            <img src={item.image || "https://placehold.co/600x400?text=Noticia"} alt={item.title} />
                            <div className="noticia-info">
                                <small>{item.source?.name}</small>
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                                <a href={item.url} target="_blank" rel="noreferrer">Leer Más</a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Noticias;
