import { useEffect, useState } from 'react';
import CategoriaList from './CategoriaList';
import EtiquetaList from './EtiquetaList';
import TareaList from './TareaList';
import Login from './Login';
import { isAuthenticated, logout } from './services/auth.service';

function App() {
  const [autenticado, setAutenticado] = useState(isAuthenticated());

  useEffect(() => {
    const revisarSesion = () => {
      setAutenticado(isAuthenticated());
    };

    revisarSesion();
    window.addEventListener('auth:sesionExpirada', revisarSesion);

    const intervalo = setInterval(revisarSesion, 30000);

    return () => {
      window.removeEventListener('auth:sesionExpirada', revisarSesion);
      clearInterval(intervalo);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setAutenticado(false);
  };

  if (!autenticado) {
    return <Login onLoginExitoso={() => setAutenticado(true)} />;
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Tu espacio de trabajo</p>
          <h1>Mis tareas</h1>
        </div>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </header>
      <TareaList />
      <CategoriaList />
      <EtiquetaList />
    </div>
  );
}

export default App;