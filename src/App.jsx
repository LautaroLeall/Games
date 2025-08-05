// src/App.jsx
import { useState } from 'react';
import RoutesApp from './routes/routes';
import Footer from './components/Footer/Footer';

export default function App() {
  // Estado global para controlar la visibilidad del Footer
  const [mostrarFooter, setMostrarFooter] = useState(true);

  return (
    <div className="app-wrapper">
      <main className="main-content">
        {/* Pasamos setMostrarFooter para que los componentes hijos puedan mostrar u ocultar el footer */}
        <RoutesApp setMostrarFooter={setMostrarFooter} />
      </main>

      {/* Footer visible solo si mostrarFooter es true */}
      {mostrarFooter && <Footer />}
    </div>
  );
}
