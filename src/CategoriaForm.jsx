import { useState, useEffect } from 'react';
import { create, update } from './services/category.service';

function CategoriaForm({ categoriaEditar, onGuardado }) {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (categoriaEditar) {
      setNombre(categoriaEditar.nombre);
    }
  }, [categoriaEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    setError('');

    try {
      if (categoriaEditar) {
        await update(categoriaEditar.id, { nombre });
      } else {
        await create({ nombre });
      }
      setNombre('');
      if (onGuardado) onGuardado();
    } catch (err) {
      console.error('Error al guardar categoría:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{categoriaEditar ? 'Editar Categoría' : 'Nueva Categoría'}</h3>
      <input
        type="text"
        placeholder="Nombre de la categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button type="submit">{categoriaEditar ? 'Actualizar' : 'Crear'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default CategoriaForm;