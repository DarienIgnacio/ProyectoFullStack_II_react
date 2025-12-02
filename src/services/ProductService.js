import api from "./api";

export class ProductService {

    async getAllProducts() {
        const response = await api.get("/productos");
        return response.data; // <--- Importante!
    }

    async getById(id) {
        const response = await api.get(`/productos/${id}`);
        return response.data;
    }

    async createProduct(producto) {
        const response = await api.post("/productos", producto);
        return response.data;
    }

    async updateProduct(id, producto) {
        const response = await api.put(`/productos/${id}`, producto);
        return response.data;
    }

    async deleteProduct(id) {
        await api.delete(`/productos/${id}`);
    }
}
