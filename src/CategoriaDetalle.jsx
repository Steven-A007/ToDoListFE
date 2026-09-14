import { useEffect, useState } from 'react';
import { getOne } from './services/category.service';

function CategoriaDetalle({ categoriaId, onCerrar }) {
  const [categoria, setCategoria] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (categoriaId) {
      getOne(categoriaId)
        .then((data) => setCategoria(data))
        .catch((err) => {
          console.error('Error al obtener la categoría:', err);
          setError('No se pudo cargar la categoría');
        });
    }
  }, [categoriaId]);

  if (!categoriaId) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{ background: '#222', padding: '20px', borderRadius: '8px', minWidth: '250px' }}>
        <h3>Detalle de Categoría</h3>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {categoria ? (
          <>
            <p><strong>ID:</strong> {categoria.id}</p>
            <p><strong>Nombre:</strong> {categoria.nombre}</p>
          </>
        ) : (
          !error && <p>Cargando...</p>
        )}
        <button onClick={onCerrar}>Cerrar</button>
      </div>
    </div>
  );
}

export default CategoriaDetalle;