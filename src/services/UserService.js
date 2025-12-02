// src/services/UserService.js
import { apiPost } from "../api/api";

export class UserService {
  // POST /api/usuarios/registro
  async register(user) {
    return apiPost("/usuarios/registro", user);
  }

  // POST /api/usuarios/login
  async login(email, password) {
    return apiPost("/usuarios/login", { email, password });
  }
}
