import React, { useEffect, useState } from "react";
import { ProductService } from "../../services/ProductService";
import { ProductCard } from "../ui/ProductCard";

const productService = new ProductService();

export const HomePage = ({ addToCart }) => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getAllProducts();
        setDestacados(data.slice(0, 3)); // <-- Se reemplaza getFeaturedProducts
      } catch (e) {
        console.error("Error cargando productos", e);
      }
    }
    load();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="section-title">Productos Destacados</h2>
      <div className="row">
        {destacados.map((p) => (
          <div className="col-md-4 mb-3" key={p.id}>
            <ProductCard product={p} addToCart={addToCart} />
          </div>
        ))}
      </div>
    </div>
  );
};
