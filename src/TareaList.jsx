import { useEffect, useState } from 'react';
import { getAll, deleteTask } from './services/tarea.service';
import TareaForm from './TareaForm';
import TareaDetalle from './TareaDetalle';

function TareaList() {
  const [tareas, setTareas] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [tareaEditar, setTareaEditar] = useState(null);
  const [tareaDetalleId, setTareaDetalleId] = useState(null);
  const [tareaAEliminar, setTareaAEliminar] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 5;

  const cargarTareas = () => {
    getAll()
      .then((data) => {
        setTareas(data);
        setPaginaActual(1);
      })
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

  const confirmarEliminar = async () => {
    try {
      await deleteTask(tareaAEliminar.id);
      setTareaAEliminar(null);
      cargarTareas();
    } catch (error) {
      console.error('Error al eliminar tarea:', error);
    }
  };

  const handleVer = (tarea) => {
    setTareaDetalleId(tarea.id);
  };

  const handleNueva = () => {
    setTareaEditar(null);
    setMostrarForm(!mostrarForm);
  };

  const totalPaginas = Math.max(1, Math.ceil(tareas.length / itemsPorPagina));
  const inicio = (paginaActual - 1) * itemsPorPagina;
  const tareasPaginadas = tareas.slice(inicio, inicio + itemsPorPagina);

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
          {tareasPaginadas.map((tarea) => (
            <tr key={tarea.id}>
              <td>{tarea.id}</td>
              <td>{tarea.titulo}</td>
              <td>{tarea.estado ? 'Hecha' : 'Pendiente'}</td>
              <td>
                <button onClick={() => handleVer(tarea)}>Ver</button>
                <button onClick={() => handleEditar(tarea)}>Editar</button>
                <button onClick={() => setTareaAEliminar(tarea)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          disabled={paginaActual === 1}
          onClick={() => setPaginaActual((p) => p - 1)}
        >
          Anterior
        </button>
        <span>Página {paginaActual} de {totalPaginas}</span>
        <button
          disabled={paginaActual === totalPaginas}
          onClick={() => setPaginaActual((p) => p + 1)}
        >
          Siguiente
        </button>
      </div>

      {tareaAEliminar && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#222', padding: '20px', borderRadius: '8px' }}>
            <p>¿Seguro que quieres eliminar "{tareaAEliminar.titulo}"?</p>
            <button onClick={confirmarEliminar}>Sí, eliminar</button>
            <button onClick={() => setTareaAEliminar(null)}>Cancelar</button>
          </div>
        </div>
      )}

      <TareaDetalle
        tareaId={tareaDetalleId}
        onCerrar={() => setTareaDetalleId(null)}
      />
    </div>
  );
}

export default TareaList;