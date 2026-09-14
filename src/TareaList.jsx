import { useEffect, useState } from 'react';
import { getAll } from './services/tarea.service';
import TareaForm from './TareaForm';

function TareaList() {
  const [tareas, setTareas] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);

  const cargarTareas = () => {
    getAll()
      .then((data) => setTareas(data))
      .catch((error) => console.error('Error al obtener tareas:', error));
  };

  useEffect(() => {
    cargarTareas();
  }, []);

  const handleTareaCreada = () => {
    setMostrarForm(false);
    cargarTareas();
  };

  return (
    <div>
      <h2>Tareas</h2>
      <button onClick={() => setMostrarForm(!mostrarForm)}>
        {mostrarForm ? 'Cancelar' : 'Nueva Tarea'}
      </button>

      {mostrarForm && <TareaForm onTareaCreada={handleTareaCreada} />}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea.id}>
              <td>{tarea.id}</td>
              <td>{tarea.titulo}</td>
              <td>{tarea.estado ? 'Hecha' : 'Pendiente'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TareaList;