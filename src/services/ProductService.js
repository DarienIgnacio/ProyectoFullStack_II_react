// src/services/ProductService.js
import { apiGet, apiPost, apiPut, apiDelete } from "../Api/api";

export class ProductService {
  // LISTAR TODOS
  getAllProducts() {
    return apiGet("/productos");
  }

  // OBTENER UNO POR ID
  getProductById(id) {
    return apiGet(`/productos/${id}`);
  }

  // CREAR
  createProduct(data) {
    return apiPost("/productos", data);
  }

  // ACTUALIZAR
  updateProduct(id, data) {
    return apiPut(`/productos/${id}`, data);
  }

  // ELIMINAR
  deleteProduct(id) {
    return apiDelete(`/productos/${id}`);
  }
}

// (opcional) export default
export default ProductService;
