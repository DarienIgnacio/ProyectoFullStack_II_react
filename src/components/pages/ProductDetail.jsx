import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductService } from "../../services/ProductService";

const productService = new ProductService();

export const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getProductById(id);
        setProducto(data);
      } catch (err) {
        console.error("Error cargando producto:", err);
      }
    }
    load();
  }, [id]);

  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="container my-5">
      <h2 className="section-title">{producto.nombre}</h2>

      <div className="row">
        <div className="col-md-6">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="img-fluid"
          />
        </div>

        <div className="col-md-6">
          <p className="mt-3">Categoría: {producto.categoria}</p>
          <p className="mt-3">Precio: CLP ${producto.precio}</p>

          <button
            className="btn btn-primary mt-3"
            onClick={() => addToCart(producto.id)}
          >
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
