import { useEffect, useState } from 'react';
import { getAll, deleteTag } from './services/tag.service';
import EtiquetaForm from './EtiquetaForm';
import EtiquetaDetalle from './EtiquetaDetalle';

function EtiquetaList() {
  const [etiquetas, setEtiquetas] = useState([]);
  const [etiquetaEditar, setEtiquetaEditar] = useState(null);
  const [etiquetaAEliminar, setEtiquetaAEliminar] = useState(null);
  const [etiquetaVerId, setEtiquetaVerId] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 5;

  const cargarEtiquetas = () => {
    getAll()
      .then((data) => {
        setEtiquetas(data);
        setPaginaActual(1);
      })
      .catch((error) => console.error('Error al obtener etiquetas:', error));
  };

  useEffect(() => {
    cargarEtiquetas();
  }, []);

  const handleGuardado = () => {
    setEtiquetaEditar(null);
    cargarEtiquetas();
  };

  const confirmarEliminar = async () => {
    try {
      await deleteTag(etiquetaAEliminar.id);
      setEtiquetaAEliminar(null);
      cargarEtiquetas();
    } catch (err) {
      console.error('Error al eliminar etiqueta:', err);
    }
  };

  const totalPaginas = Math.max(1, Math.ceil(etiquetas.length / itemsPorPagina));
  const inicio = (paginaActual - 1) * itemsPorPagina;
  const etiquetasPaginadas = etiquetas.slice(inicio, inicio + itemsPorPagina);

  return (
    <section className="section-card">
      <div className="section-header">
        <h2>Etiquetas</h2>
        <span className="section-count">{etiquetas.length} en total</span>
      </div>
      <EtiquetaForm etiquetaEditar={etiquetaEditar} onGuardado={handleGuardado} />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {etiquetasPaginadas.map((etiqueta) => (
              <tr key={etiqueta.id}>
                <td>{etiqueta.id}</td>
                <td>{etiqueta.nombre}</td>
                <td>
                  <button onClick={() => setEtiquetaVerId(etiqueta.id)}>Ver</button>
                  <button onClick={() => setEtiquetaEditar(etiqueta)}>Editar</button>
                  <button onClick={() => setEtiquetaAEliminar(etiqueta)}>Eliminar</button>
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

      {etiquetaAEliminar && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Eliminar etiqueta</h3>
            <p>¿Seguro que quieres eliminar "{etiquetaAEliminar.nombre}"?</p>
            <div className="modal-actions">
              <button onClick={confirmarEliminar}>Sí, eliminar</button>
              <button onClick={() => setEtiquetaAEliminar(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <EtiquetaDetalle etiquetaId={etiquetaVerId} onCerrar={() => setEtiquetaVerId(null)} />
    </section>
  );
}

export default EtiquetaList;