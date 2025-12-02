// src/components/ui/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="card h-100 text-center shadow-sm" style={{ backgroundColor: 'var(--color-card-bg)' }}>
      <img
        src={product.imagen}
        className="card-img-top p-3"
        alt={product.nombre}
        style={{ height: "200px", objectFit: "contain" }}
      />

      <div className="card-body">
        <h5 className="card-title">{product.nombre}</h5>
        <p className="card-text text-success fw-bold">CLP ${product.precio}</p>

        <Link to={`/producto/${product.id}`} className="btn btn-outline-light w-100 mb-2">
          Ver Detalles
        </Link>

        <button
          className="btn btn-accent w-100"
          onClick={() => addToCart(product.id, 1)}
        >
          Agregar al Carrito 🛒
        </button>
      </div>
    </div>
  );
};
