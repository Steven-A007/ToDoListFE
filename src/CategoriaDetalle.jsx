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
    <div className="modal-overlay">
      <div className="modal-card">
        <h3>Detalle de categoría</h3>
        {error && <p className="error-text">{error}</p>}
        {categoria ? (
          <>
            <p><strong>ID:</strong> {categoria.id}</p>
            <p><strong>Nombre:</strong> {categoria.nombre}</p>
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

export default CategoriaDetalle;