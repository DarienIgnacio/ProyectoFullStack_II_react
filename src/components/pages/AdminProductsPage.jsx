// src/components/pages/AdminProductsPage.jsx
import React, { useEffect, useState } from "react";
import { ProductService } from "../../services/ProductService";
import { Link } from "react-router-dom";

const productService = new ProductService();

export const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);

  async function loadProducts() {
    const data = await productService.getAllProducts();
    setProducts(data);
  }

  async function deleteProduct(id) {
    if (!window.confirm("¿Eliminar producto?")) return;
    await productService.deleteProduct(id);
    loadProducts();
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="container my-5">
      <h2>Administrar Productos</h2>

      <Link to="/admin/productos/nuevo" className="btn btn-success my-3">
        + Crear Producto
      </Link>

      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>CLP ${p.precio}</td>

              <td>
                <Link
                  to={`/admin/productos/${p.id}/editar`}
                  className="btn btn-warning btn-sm me-2"
                >
                  Editar
                </Link>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
