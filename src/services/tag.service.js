import { API_URL } from './api';

export async function getAll() {
  const res = await fetch(`${API_URL}/etiquetas`);
  return res.json();
}

export async function getOne(id) {
  const res = await fetch(`${API_URL}/etiquetas/${id}`);
  return res.json();
}

export async function create(datos) {
  const res = await fetch(`${API_URL}/etiquetas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function update(id, datos) {
  const res = await fetch(`${API_URL}/etiquetas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function deleteTag(id) {
  const res = await fetch(`${API_URL}/etiquetas/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}