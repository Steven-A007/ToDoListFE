import { API_URL } from './api';

export async function login(usuario, contrasena) {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, contrasena }),
  });

  if (!res.ok) {
    throw new Error('Usuario o contraseña incorrectos');
  }

  const data = await res.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  return data;
}

export function logout() {
  localStorage.removeItem('token');
}

export function getToken() {
  return localStorage.getItem('token');
}

function decodeToken(token) {
  try {
    const payloadBase64 = token.split('.')[1];
    const normalizado = payloadBase64.replace(/-/g, '+').replace(/_/g, '/');
    const payloadJson = atob(normalizado);
    return JSON.parse(payloadJson);
  } catch (error) {
    return null;
  }
}

export function isTokenExpired() {
  const token = getToken();
  if (!token) return true;

  const payload = decodeToken(token);
  if (!payload || !payload.exp) return true;

  const ahoraEnSegundos = Date.now() / 1000;
  return payload.exp < ahoraEnSegundos;
}

export function isAuthenticated() {
  if (isTokenExpired()) {
    logout();
    return false;
  }
  return true;
}