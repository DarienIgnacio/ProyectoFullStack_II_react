// src/components/pages/ProductFormPage.jsx
import React, { useEffect, useState } from "react";
import { ProductService } from "../../services/ProductService";
import { useNavigate, useParams } from "react-router-dom";

const productService = new ProductService();

export const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editing = Boolean(id);

  const [product, setProduct] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    imagen: "",
  });

  useEffect(() => {
    if (editing) {
      async function loadProduct() {
        const data = await productService.getProductById(id);
        setProduct(data);
      }
      loadProduct();
    }
  }, [id, editing]);

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (editing) {
      await productService.updateProduct(id, product);
    } else {
      await productService.createProduct(product);
    }

    navigate("/admin/productos");
  }

  return (
    <div className="container my-5">
      <h2>{editing ? "Editar Producto" : "Crear Producto"}</h2>

      <form onSubmit={handleSubmit} className="mt-4">

        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={product.nombre}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <label>Categoría</label>
        <input
          type="text"
          name="categoria"
          value={product.categoria}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <label>Precio</label>
        <input
          type="number"
          name="precio"
          value={product.precio}
          onChange={handleChange}
          className="form-control mb-3"
          required
        />

        <label>URL de Imagen</label>
        <input
          type="text"
          name="imagen"
          value={product.imagen}
          onChange={handleChange}
          className="form-control mb-3"
        />

        <button className="btn btn-primary mt-3">
          {editing ? "Guardar Cambios" : "Crear Producto"}
        </button>
      </form>
    </div>
  );
};
