import { useEffect } from 'react';
import { getAll } from './services/tarea.service';

function App() {
  useEffect(() => {
    getAll()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error al obtener tareas:', error);
      });
  }, []);

  return (
    <h1>Hola Mundo</h1>
  );
}

export default App;