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
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#222', padding: '20px', borderRadius: '8px', minWidth: '300px' }}>
        <h3>Detalle de Tarea</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
            <p><strong>Estado:</strong> {tarea.estado ? 'Hecha' : 'Pendiente'}</p>
          </>
        ) : (
          !error && <p>Cargando...</p>
        )}
        <button onClick={onCerrar}>Cerrar</button>
      </div>
    </div>
  );
}

export default TareaDetalle;