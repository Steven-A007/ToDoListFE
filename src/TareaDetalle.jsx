import { useEffect, useState } from 'react';
import { getOne } from './services/tarea.service';

function TareaDetalle({ tareaId, onCerrar }) {
  const [tarea, setTarea] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tareaId) {
      getOne(tareaId)
        .then((data) => setTarea(data))
        .catch((err) => {
          console.error('Error al obtener la tarea:', err);
          setError('No se pudo cargar la tarea');
        });
    }
  }, [tareaId]);

  if (!tareaId) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Detalle de tarea</h3>
        {error && <p className="error-text">{error}</p>}
        {tarea ? (
          <>
            <p><strong>ID:</strong> {tarea.id}</p>
            <p><strong>Título:</strong> {tarea.titulo}</p>
            <p><strong>Descripción:</strong> {tarea.descripcion || '-'}</p>
            <p><strong>Categoría:</strong> {tarea.categoria?.nombre ?? '-'}</p>
            <p><strong>Etiquetas:</strong>{' '}
              {tarea.etiquetas && tarea.etiquetas.length > 0
                ? tarea.etiquetas.map((et) => (typeof et === 'object' ? et.nombre : et)).join(', ')
                : '-'}
            </p>
            <p>
              <strong>Estado:</strong>{' '}
              <span className={`pill ${tarea.estado ? 'pill--done' : 'pill--pending'}`}>
                {tarea.estado ? 'Hecha' : 'Pendiente'}
              </span>
            </p>
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

export default TareaDetalle;