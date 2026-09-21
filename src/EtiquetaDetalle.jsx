import { useEffect, useState } from 'react';
import { getOne } from './services/tag.service';

function EtiquetaDetalle({ etiquetaId, onCerrar }) {
  const [etiqueta, setEtiqueta] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (etiquetaId) {
      getOne(etiquetaId)
        .then((data) => setEtiqueta(data))
        .catch((err) => {
          console.error('Error al obtener la etiqueta:', err);
          setError('No se pudo cargar la etiqueta');
        });
    }
  }, [etiquetaId]);

  if (!etiquetaId) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Detalle de etiqueta</h3>
        {error && <p className="error-text">{error}</p>}
        {etiqueta ? (
          <>
            <p><strong>ID:</strong> {etiqueta.id}</p>
            <p><strong>Nombre:</strong> {etiqueta.nombre}</p>
          </>
        ) : (
          !error && <p>Cargando...</p>
        )}
        <div className="modal-actions">
          <button onClick={onCerrar}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default EtiquetaDetalle;