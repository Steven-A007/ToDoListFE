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
    <section className="section-card">
      <div className="section-header">
        <h2>Tareas</h2>
        <span className="section-count">{tareas.length} en total</span>
      </div>

      <button onClick={handleNueva}>
        {mostrarForm ? 'Cancelar' : '+ Nueva tarea'}
      </button>

      {mostrarForm && <TareaForm tareaEditar={tareaEditar} onTareaCreada={handleTareaCreada} />}

      <div className="table-wrap">
        <table>
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
                <td>
                  <span className={`pill ${tarea.estado ? 'pill--done' : 'pill--pending'}`}>
                    {tarea.estado ? 'Hecha' : 'Pendiente'}
                  </span>
                </td>
                <td>
                  <button onClick={() => handleVer(tarea)}>Ver</button>
                  <button onClick={() => handleEditar(tarea)}>Editar</button>
                  <button onClick={() => setTareaAEliminar(tarea)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
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
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Eliminar tarea</h3>
            <p>¿Seguro que quieres eliminar "{tareaAEliminar.titulo}"?</p>
            <div className="modal-actions">
              <button onClick={confirmarEliminar}>Sí, eliminar</button>
              <button onClick={() => setTareaAEliminar(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <TareaDetalle
        tareaId={tareaDetalleId}
        onCerrar={() => setTareaDetalleId(null)}
      />
    </section>
  );
}

export default TareaList;