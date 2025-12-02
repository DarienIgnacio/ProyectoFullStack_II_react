// src/api/api.js
const API_URL = "http://localhost:8080/api";

const defaultHeaders = {
  "Content-Type": "application/json",
};

export const apiGet = async (path) => {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`GET ${path} → ${res.status}`);
  }
  return res.json();
};

export const apiPost = async (path, body) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  const data = await res.text();
  try {
    return JSON.parse(data);
  } catch {
    return data; // por si backend retorna un string plano (ej: mensaje de error)
  }
};

export const apiPut = async (path, body) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: defaultHeaders,
    body: JSON.stringify(body),
  });
  return res.json();
};

export const apiDelete = async (path) => {
  const res = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`DELETE ${path} → ${res.status}`);
  }
  return true;
};
