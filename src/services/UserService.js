import { apiPost } from "../api/api";

export const UserService = {
  register: (data) => apiPost("/usuarios/registro", data),
  login: (data) => apiPost("/usuarios/login", data),
};
