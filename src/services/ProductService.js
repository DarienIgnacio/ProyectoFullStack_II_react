// src/services/ProductService.js
import { apiGet, apiPost, apiPut, apiDelete } from "../Api/api";

export class ProductService {
  // GET /api/productos
  async getAllProducts() {
    return apiGet("/productos");
  }

  // GET /api/productos/{id}
  async getProductById(id) {
    try {
      return await apiGet(`/productos/${id}`);
    } catch (e) {
      console.error("Error obteniendo producto", e);
      return null;
    }
  }

  // Ejemplo de destacados: primeros N productos
  async getFeaturedProducts(count = 4) {
    const all = await this.getAllProducts();
    return all.slice(0, count);
  }

  // Filtrado por categoría (lo hacemos en el front porque el backend devuelve todos)
  async getProductsByCategory(category) {
    const all = await this.getAllProducts();
    if (!category) return all;
    return all.filter(
      (p) =>
        p.categoria &&
        p.categoria.toLowerCase() === category.toLowerCase()
    );
  }

  // Búsqueda por nombre (también en el front)
  async searchProducts(searchTerm) {
    const all = await this.getAllProducts();
    if (!searchTerm) return all;
    const term = searchTerm.toLowerCase();
    return all.filter(
      (p) => p.nombre && p.nombre.toLowerCase().includes(term)
    );
  }

  // Crear producto (si en algún momento tienes un admin)
  async createProduct(product) {
    return apiPost("/productos", product);
  }

  // Actualizar producto
  async updateProduct(id, product) {
    return apiPut(`/productos/${id}`, product);
  }

  // Eliminar producto
  async deleteProduct(id) {
    return apiDelete(`/productos/${id}`);
  }
}
