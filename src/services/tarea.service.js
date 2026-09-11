import { API_URL } from './api';

export async function getAll() {
  const res = await fetch(`${API_URL}/tareas`);
  return res.json();
}

export async function create(datos) {
  const res = await fetch(`${API_URL}/tareas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function update(id, datos) {
  const res = await fetch(`${API_URL}/tareas/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${API_URL}/tareas/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}