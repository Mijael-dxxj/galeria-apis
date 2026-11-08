import Navbar from "./components/Navbar";
import "./App.css";
import Noticias from "./components/Noticias";
import Perros from "./components/Perros"
import Gatos from "./components/Gatos";
import Pokemones from "./components/Pokemones";
import Personajes from "./components/Personajes";
import { useState } from "react";

function App() {
  const [seccion, setseccion] = useState("Inicio");

  return (
    <div className="app">
      <Navbar seccion={seccion} cambiarSeccion={setseccion} />
      
      <main className="contenido">
        {seccion === "Inicio" && (
          <div className="bienvenido">
            <div className="hero-section">
              <h1>Bienvenido a la Galería de APIs 📦</h1>
              <p>Aquí encontrarás una diversidad de servicios integrados para tus proyectos web de forma gratuita.</p>
            </div>
            
            <div className="api-grid-preview">
              <div className="api-card-preview" onClick={() => setseccion("Noticias")}>
                <div className="icon">📰</div>
                <h3>API de Noticias</h3>
                <p>Consulta titulares en tiempo real filtrados por país y categorías como tecnología o deportes usando GNews.</p>
                <span className="badge">Disponible</span>
              </div>

              <div className="api-card-preview" onClick={() => setseccion("Perros")}>
                <div className="icon">🐾</div>
                <h3>API de Perros</h3>
                <p>Mira las mascotas favoritas del hombre</p>
                <span className="badge">Disponible</span>
              </div>
              <div className="api-card-preview" onClick={() => setseccion("Gatos")}>
                <div className="icon">🐈</div>
                <h3>API de Gatos</h3>
                <p>Mira los felinos favoritos del hombre</p>
                <span className="badge">Disponible</span>
              </div>

              {/* NUEVO 1 */}
              <div className="api-card-preview" onClick={() => setseccion("Pokemones")}>
                <div className="icon">⚡</div>
                <h3>API de Pokemones</h3>
                <p>Mira los pokemones con su imagen oficial usando PokeAPI</p>
                <span className="badge">Disponible</span>
              </div>

              {/* NUEVO 2 */}
              <div className="api-card-preview" onClick={() => setseccion("Personajes")}>
                <div className="icon">🛸</div>
                <h3>API de Rick y Morty</h3>
                <p>Mira los personajes de Rick y Morty con su especie y estado</p>
                <span className="badge">Disponible</span>
              </div>

            </div>
          </div>
        )}

        {seccion === "Noticias" && <Noticias/>}

        {seccion === "Perros" && <Perros/>}
        
        {seccion === "Gatos" && <Gatos/>}

        {seccion === "Pokemones" && <Pokemones/>}

        {seccion === "Personajes" && <Personajes/>}
      </main>
    </div>
  );
}

export default App;