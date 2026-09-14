import { API_URL } from './api';

export async function getAll() {
  const res = await fetch(`${API_URL}/categorias`);
  return res.json();
}