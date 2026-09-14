import { useEffect, useState } from 'react';
import { getAll, deleteTag } from './services/tag.service';
import EtiquetaForm from './EtiquetaForm';
import EtiquetaDetalle from './EtiquetaDetalle';

function EtiquetaList() {
  const [etiquetas, setEtiquetas] = useState([]);
  const [etiquetaEditar, setEtiquetaEditar] = useState(null);
  const [etiquetaAEliminar, setEtiquetaAEliminar] = useState(null);
  const [etiquetaVerId, setEtiquetaVerId] = useState(null);

  const cargarEtiquetas = () => {
    getAll()
      .then((data) => setEtiquetas(data))
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

  return (
    <div>
      <h2>Etiquetas</h2>
      <EtiquetaForm etiquetaEditar={etiquetaEditar} onGuardado={handleGuardado} />
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {etiquetas.map((etiqueta) => (
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

      {etiquetaAEliminar && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#222', padding: '20px', borderRadius: '8px' }}>
            <p>¿Seguro que quieres eliminar "{etiquetaAEliminar.nombre}"?</p>
            <button onClick={confirmarEliminar}>Sí, eliminar</button>
            <button onClick={() => setEtiquetaAEliminar(null)}>Cancelar</button>
          </div>
        </div>
      )}

      <EtiquetaDetalle etiquetaId={etiquetaVerId} onCerrar={() => setEtiquetaVerId(null)} />
    </div>
  );
}

export default EtiquetaList;