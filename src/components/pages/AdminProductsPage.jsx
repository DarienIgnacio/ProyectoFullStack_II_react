// src/components/pages/AdminProductsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Button } from "react-bootstrap";
import { ProductService } from "../../services/ProductService";

export const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      const data = await ProductService.getAll();
      setProducts(data);
    } catch (err) {
      console.error("Error cargando productos", err);
      alert("No se pudieron cargar los productos.");
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este producto?")) return;

    try {
      await ProductService.delete(id);
      await loadProducts();
    } catch (err) {
      console.error("Error eliminando producto", err);
      alert("No se pudo eliminar el producto.");
    }
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title">Administrar Productos</h2>
        <Button variant="success" onClick={() => navigate("/admin/productos/nuevo")}>
          + Nuevo Producto
        </Button>
      </div>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Imagen (URL)</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center">
                No hay productos registrados.
              </td>
            </tr>
          )}

          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.categoria}</td>
              <td>{p.precio}</td>
              <td>{p.imagen}</td>
              <td>
                <Button
                  size="sm"
                  variant="primary"
                  className="me-2"
                  onClick={() => navigate(`/admin/productos/${p.id}/editar`)}
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(p.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};
