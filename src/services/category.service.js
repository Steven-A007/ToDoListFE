import { API_URL } from './api';

export async function getAll() {
  const res = await fetch(`${API_URL}/categorias`);
  return res.json();
}

export async function create(datos) {
  const res = await fetch(`${API_URL}/categorias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function update(id, datos) {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function deleteCategoria(id) {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}

export async function getOne(id) {
  const res = await fetch(`${API_URL}/categorias/${id}`);
  return res.json();
}