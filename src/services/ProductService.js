// src/services/ProductService.js
import { PRODUCTOS_BASE } from '../data/products';

export class ProductService {

    async getAllProducts() {
        const res = await fetch("http://localhost:8080/api/productos");
        return res.json();
    }

    async getProductById(id) {
        const res = await fetch(`http://localhost:8080/api/productos/${id}`);
        return res.json();
    }

    async searchProducts(texto) {
        const res = await this.getAllProducts();
        return res.filter(p => 
            p.nombre.toLowerCase().includes(texto.toLowerCase())
        );
    }
}
