// src/api/api.js
const API_URL = "http://localhost:8080/api";

export async function apiGet(path) {
  const response = await fetch(`${API_URL}${path}`);
  if (!response.ok) throw new Error(`Error GET ${path}`);
  return response.json();
}

export async function apiPost(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Error POST ${path}`);
  return response.json();
}

export async function apiPut(path, body) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Error PUT ${path}`);
  return response.json();
}

export async function apiDelete(path) {
  const response = await fetch(`${API_URL}${path}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Error DELETE ${path}`);
  return response.text();
}
