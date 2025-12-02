// src/components/pages/CategoriesPage.jsx
import React, { useEffect, useState } from "react";
import { ProductCard } from "../ui/ProductCard";
import { ProductService } from "../../services/ProductService";

const productService = new ProductService();

export const CategoriesPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("all");

  // Cargar productos desde el backend
  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getAllProducts(); // <-- AQUÍ era el error
        setProducts(data);

        // Obtener categorías únicas
        const uniqueCategories = [...new Set(data.map((p) => p.categoria))];
        setCategories(uniqueCategories);
      } catch (e) {
        console.error("Error cargando productos:", e);
      }
    }

    load();
  }, []);

  // Filtrar productos según categoría
  const filteredProducts =
    selected === "all"
      ? products
      : products.filter((p) => p.categoria === selected);

  return (
    <div className="container my-5">
      <h2 className="section-title">Categorías</h2>

      {/* Filtro de categorías */}
      <div className="mb-4">
        <button
          className={`btn me-2 ${selected === "all" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setSelected("all")}
        >
          Todas
        </button>

        {categories.map((cat) => (
          <button
            key={cat}
            className={`btn me-2 ${selected === cat ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setSelected(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Productos filtrados */}
      <div className="row">
        {filteredProducts.map((product) => (
          <div className="col-md-4 mb-3" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
