import { useEffect, useState } from 'react';
import { getAll, deleteCategoria } from './services/category.service';
import CategoriaForm from './CategoriaForm';
import CategoriaDetalle from './CategoriaDetalle';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaEditar, setCategoriaEditar] = useState(null);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);
  const [categoriaVerId, setCategoriaVerId] = useState(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 5;

  const cargarCategorias = () => {
    getAll()
      .then((data) => {
        setCategorias(data);
        setPaginaActual(1);
      })
      .catch((error) => console.error('Error al obtener categorías:', error));
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleGuardado = () => {
    setCategoriaEditar(null);
    cargarCategorias();
  };

  const confirmarEliminar = async () => {
    try {
      await deleteCategoria(categoriaAEliminar.id);
      setCategoriaAEliminar(null);
      cargarCategorias();
    } catch (err) {
      console.error('Error al eliminar categoría:', err);
    }
  };

  const totalPaginas = Math.max(1, Math.ceil(categorias.length / itemsPorPagina));
  const inicio = (paginaActual - 1) * itemsPorPagina;
  const categoriasPaginadas = categorias.slice(inicio, inicio + itemsPorPagina);

  return (
    <div>
      <h2>Categorías</h2>
      <CategoriaForm categoriaEditar={categoriaEditar} onGuardado={handleGuardado} />
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categoriasPaginadas.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nombre}</td>
              <td>
                <button onClick={() => setCategoriaVerId(categoria.id)}>Ver</button>
                <button onClick={() => setCategoriaEditar(categoria)}>Editar</button>
                <button onClick={() => setCategoriaAEliminar(categoria)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          disabled={paginaActual === 1}
          onClick={() => setPaginaActual((p) => p - 1)}
        >
          Anterior
        </button>
        <span>Página {paginaActual} de {totalPaginas}</span>
        <button
          disabled={paginaActual === totalPaginas}
          onClick={() => setPaginaActual((p) => p + 1)}
        >
          Siguiente
        </button>
      </div>

      {categoriaAEliminar && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ background: '#222', padding: '20px', borderRadius: '8px' }}>
            <p>¿Seguro que quieres eliminar "{categoriaAEliminar.nombre}"?</p>
            <button onClick={confirmarEliminar}>Sí, eliminar</button>
            <button onClick={() => setCategoriaAEliminar(null)}>Cancelar</button>
          </div>
        </div>
      )}

      <CategoriaDetalle categoriaId={categoriaVerId} onCerrar={() => setCategoriaVerId(null)} />
    </div>
  );
}

export default CategoriaList;