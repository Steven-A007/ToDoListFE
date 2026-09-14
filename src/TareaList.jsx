import { useEffect, useState } from 'react';
import { getAll } from './services/tarea.service';
import TareaForm from './TareaForm';

function TareaList() {
  const [tareas, setTareas] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [tareaEditar, setTareaEditar] = useState(null);

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
    setTareaEditar(null);
    cargarTareas();
  };

  const handleEditar = (tarea) => {
    setTareaEditar(tarea);
    setMostrarForm(true);
  };

  const handleNueva = () => {
    setTareaEditar(null);
    setMostrarForm(!mostrarForm);
  };

  return (
    <div>
      <h2>Tareas</h2>
      <button onClick={handleNueva}>
        {mostrarForm ? 'Cancelar' : 'Nueva Tarea'}
      </button>

      {mostrarForm && <TareaForm tareaEditar={tareaEditar} onTareaCreada={handleTareaCreada} />}

      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea.id}>
              <td>{tarea.id}</td>
              <td>{tarea.titulo}</td>
              <td>{tarea.estado ? 'Hecha' : 'Pendiente'}</td>
              <td>
                <button onClick={() => handleEditar(tarea)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TareaList;