// src/services/ProductService.js
import { PRODUCTOS_BASE } from '../data/products';

export class ProductService {
    // FIX: Inicializa this.products en el constructor para que los métodos lo puedan usar.
    constructor() {
        this.products = PRODUCTOS_BASE;
    }

    getAllProducts() {
        return this.products;
    }

    getProductById(id) {
        const numericId = parseInt(id);
        return this.products.find(p => p.id === numericId) || null;
    }

    getFeaturedProducts(count = 4) {
        return this.products.slice(0, count);
    }
    
    // Ahora usa this.products correctamente.
    getProductsByCategory(category) {
    if (category.toUpperCase() === 'TODOS') {
        return this.products;
    }
    return this.products.filter(p => 
        p.categoria.toLowerCase() === category.toLowerCase()
    );
}

    // Ahora usa this.products correctamente.
    searchProducts(searchTerm) {
        if (!searchTerm) {
            return this.products; // Retorna todos si la búsqueda está vacía
        }
        const term = searchTerm.toLowerCase();
        return this.products.filter(p => 
            p.nombre.toLowerCase().includes(term)
        );
    }
}