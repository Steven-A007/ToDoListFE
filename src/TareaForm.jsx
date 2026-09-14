import { useState, useEffect } from 'react';
import { create } from './services/tarea.service';
import { getAll as getAllCategorias } from './services/category.service';
import { getAll as getAllEtiquetas } from './services/tag.service';

function TareaForm({ onTareaCreada }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllCategorias().then(setCategorias).catch((err) => console.error(err));
    getAllEtiquetas().then(setEtiquetas).catch((err) => console.error(err));
  }, []);

  const handleEtiquetasChange = (e) => {
    const seleccionadas = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setEtiquetasSeleccionadas(seleccionadas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titulo.trim()) {
      setError('El título es obligatorio');
      return;
    }
    if (!categoriaId) {
      setError('Debes seleccionar una categoría');
      return;
    }

    setError('');

    const datos = {
      titulo,
      descripcion,
      categoria_id: categoriaId,
      etiquetas: etiquetasSeleccionadas,
      estado: false,
    };

    try {
      await create(datos);
      setTitulo('');
      setDescripcion('');
      setCategoriaId('');
      setEtiquetasSeleccionadas([]);
      if (onTareaCreada) onTareaCreada();
    } catch (err) {
      console.error('Error al crear tarea:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Nueva Tarea</h3>

      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <select value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)}>
        <option value="">-- Selecciona una categoría --</option>
        {categorias.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.nombre}</option>
        ))}
      </select>

      <select multiple value={etiquetasSeleccionadas} onChange={handleEtiquetasChange}>
        {etiquetas.map((tag) => (
          <option key={tag.id} value={tag.id}>{tag.nombre}</option>
        ))}
      </select>

      <button type="submit">Crear Tarea</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default TareaForm;