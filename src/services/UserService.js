// src/services/UserService.js

import api from './api';

export default class UserService {

    async register(user) {
        const res = await api.post('/usuarios/registro', user);
        return res.data;
    }

    async login(email, password) {
        const res = await api.post('/usuarios/login', { email, password });
        return res.data;
    }
}
