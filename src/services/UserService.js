import api from "../Api/api";

class UserService {
  async register(data) {
    const res = await api.post("/usuarios/registro", data);
    // guarda el token y usuario
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.usuario));
    return res.data.usuario;
  }

  async login(email, password) {
    const res = await api.post("/usuarios/login", { email, password });
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.usuario));
    return res.data.usuario;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    const json = localStorage.getItem("user");
    return json ? JSON.parse(json) : null;
  }

  isLoggedIn() {
    return !!localStorage.getItem("token");
  }
}

export const userService = new UserService();
