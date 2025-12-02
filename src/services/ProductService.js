// src/services/ProductService.js
import api from "../Api/api";

export class ProductService {

    async getAllProducts() {
        const res = await api.get("/productos");
        return res.data;
    }

    async getProductById(id) {
        const res = await api.get(`/productos/${id}`);
        return res.data;
    }

    async createProduct(product) {
        const res = await api.post("/productos", product);
        return res.data;
    }

    async updateProduct(id, product) {
        const res = await api.put(`/productos/${id}`, product);
        return res.data;
    }

    async deleteProduct(id) {
        const res = await api.delete(`/productos/${id}`);
        return res.data;
    }
}
