import { apiFetch } from './api';

export async function getAll() {
  const res = await apiFetch('/categorias');
  return res.json();
}

export async function getOne(id) {
  const res = await apiFetch(`/categorias/${id}`);
  return res.json();
}

export async function create(datos) {
  const res = await apiFetch('/categorias', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function update(id, datos) {
  const res = await apiFetch(`/categorias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function deleteCategoria(id) {
  const res = await apiFetch(`/categorias/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}