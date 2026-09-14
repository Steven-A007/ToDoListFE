import { useEffect } from 'react';
import { getAll } from './services/tarea.service';
import CategoriaList from './CategoriaList';

function App() {
  useEffect(() => {
    getAll()
      .then((data) => console.log(data))
      .catch((error) => console.error('Error al obtener tareas:', error));
  }, []);

  return (
    <div>
      <h1>Hola Mundo</h1>
      <CategoriaList />
    </div>
  );
}

export default App;