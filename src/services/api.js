export const API_URL = 'http://localhost:8000/api';

function notificarSesionExpirada() {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('auth:sesionExpirada'));
}

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  if (!token) {
    notificarSesionExpirada();
    throw new Error('No hay sesión activa');
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    notificarSesionExpirada();
    throw new Error('Sesión expirada');
  }

  return res;
}