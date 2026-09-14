import { apiFetch } from './api';

export async function getAll() {
  const res = await apiFetch('/etiquetas');
  return res.json();
}

export async function getOne(id) {
  const res = await apiFetch(`/etiquetas/${id}`);
  return res.json();
}

export async function create(datos) {
  const res = await apiFetch('/etiquetas', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function update(id, datos) {
  const res = await apiFetch(`/etiquetas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function deleteTag(id) {
  const res = await apiFetch(`/etiquetas/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}