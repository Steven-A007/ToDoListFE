import { useState, useEffect } from 'react';
import { create, update } from './services/tarea.service';
import { getAll as getAllCategorias } from './services/category.service';
import { getAll as getAllEtiquetas } from './services/tag.service';

function TareaForm({ tareaEditar, onTareaCreada }) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);
  const [estado, setEstado] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [etiquetas, setEtiquetas] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllCategorias().then(setCategorias).catch((err) => console.error(err));
    getAllEtiquetas().then(setEtiquetas).catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (tareaEditar) {
      setTitulo(tareaEditar.titulo);
      setDescripcion(tareaEditar.descripcion || '');
      setCategoriaId(tareaEditar.categoria_id ?? tareaEditar.categoria?.id ?? '');
      setEtiquetasSeleccionadas(
        (tareaEditar.etiquetas || []).map((et) => (typeof et === 'object' ? et.id : et))
      );
      setEstado(!!tareaEditar.estado);
    } else {
      setTitulo('');
      setDescripcion('');
      setCategoriaId('');
      setEtiquetasSeleccionadas([]);
      setEstado(false);
    }
  }, [tareaEditar]);

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
      estado,
    };

    try {
      if (tareaEditar) {
        await update(tareaEditar.id, datos);
      } else {
        await create(datos);
      }
      setTitulo('');
      setDescripcion('');
      setCategoriaId('');
      setEtiquetasSeleccionadas([]);
      setEstado(false);
      if (onTareaCreada) onTareaCreada();
    } catch (err) {
      console.error('Error al guardar tarea:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{tareaEditar ? 'Editar Tarea' : 'Nueva Tarea'}</h3>

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

      <label>
        <input
          type="checkbox"
          checked={estado}
          onChange={(e) => setEstado(e.target.checked)}
        />
        Completada
      </label>

      <button type="submit">{tareaEditar ? 'Actualizar' : 'Crear Tarea'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default TareaForm;