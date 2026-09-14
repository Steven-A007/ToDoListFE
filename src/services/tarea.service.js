import { apiFetch } from './api';

export async function getAll() {
  const res = await apiFetch('/tareas');
  return res.json();
}

export async function getOne(id) {
  const res = await apiFetch(`/tareas/${id}`);
  return res.json();
}

export async function create(datos) {
  const res = await apiFetch('/tareas', {
    method: 'POST',
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function update(id, datos) {
  const res = await apiFetch(`/tareas/${id}`, {
    method: 'PUT',
    body: JSON.stringify(datos),
  });
  return res.json();
}

export async function deleteTask(id) {
  const res = await apiFetch(`/tareas/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}