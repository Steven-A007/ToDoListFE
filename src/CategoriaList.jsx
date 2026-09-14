import { useEffect, useState } from 'react';
import { getAll } from './services/category.service';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getAll()
      .then((data) => setCategorias(data))
      .catch((error) => console.error('Error al obtener categorías:', error));
  }, []);

  return (
    <div>
      <h2>Categorías</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((categoria) => (
            <tr key={categoria.id}>
              <td>{categoria.id}</td>
              <td>{categoria.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CategoriaList;