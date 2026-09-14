import { useState, useEffect } from 'react';
import { create, update } from './services/tag.service';

function EtiquetaForm({ etiquetaEditar, onGuardado }) {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (etiquetaEditar) {
      setNombre(etiquetaEditar.nombre);
    }
  }, [etiquetaEditar]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    setError('');

    try {
      if (etiquetaEditar) {
        await update(etiquetaEditar.id, { nombre });
      } else {
        await create({ nombre });
      }
      setNombre('');
      if (onGuardado) onGuardado();
    } catch (err) {
      console.error('Error al guardar etiqueta:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{etiquetaEditar ? 'Editar Etiqueta' : 'Nueva Etiqueta'}</h3>
      <input
        type="text"
        placeholder="Nombre de la etiqueta"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button type="submit">{etiquetaEditar ? 'Actualizar' : 'Crear'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default EtiquetaForm;