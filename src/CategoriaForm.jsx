import { useState } from 'react';
import { create } from './services/category.service';

function CategoriaForm({ onCategoriaCreada }) {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    setError('');

    try {
      await create({ nombre });
      setNombre('');
      if (onCategoriaCreada) onCategoriaCreada();
    } catch (err) {
      console.error('Error al crear categoría:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nueva Categoría</h3>
      <input
        type="text"
        placeholder="Nombre de la categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button type="submit">Crear</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default CategoriaForm;