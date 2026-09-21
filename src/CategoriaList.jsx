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
    <section className="section-card">
      <div className="section-header">
        <h2>Categorías</h2>
        <span className="section-count">{categorias.length} en total</span>
      </div>
      <CategoriaForm categoriaEditar={categoriaEditar} onGuardado={handleGuardado} />
      <div className="table-wrap">
        <table>
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
      </div>

      <div className="pagination">
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
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>Eliminar categoría</h3>
            <p>¿Seguro que quieres eliminar "{categoriaAEliminar.nombre}"?</p>
            <div className="modal-actions">
              <button onClick={confirmarEliminar}>Sí, eliminar</button>
              <button onClick={() => setCategoriaAEliminar(null)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <CategoriaDetalle categoriaId={categoriaVerId} onCerrar={() => setCategoriaVerId(null)} />
    </section>
  );
}

export default CategoriaList;