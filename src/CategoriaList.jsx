import { useEffect, useState } from 'react';
import { getAll } from './services/category.service';
import CategoriaForm from './CategoriaForm';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaEditar, setCategoriaEditar] = useState(null);

  const cargarCategorias = () => {
    getAll()
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener categorías:', error));
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleGuardado = () => {
    setCategoriaEditar(null);
    cargarCategorias();
  };

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
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nombre}</td>
              <td>
                <button onClick={() => setCategoriaEditar(categoria)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriaList;