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
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#222', padding: '20px', borderRadius: '8px', minWidth: '250px' }}>
        <h3>Detalle de Etiqueta</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {etiqueta ? (
          <>
            <p><strong>ID:</strong> {etiqueta.id}</p>
            <p><strong>Nombre:</strong> {etiqueta.nombre}</p>
          </>
        ) : (
          !error && <p>Cargando...</p>
        )}
        <button onClick={onCerrar}>Cerrar</button>
      </div>
    </div>
  );
}

export default EtiquetaDetalle;