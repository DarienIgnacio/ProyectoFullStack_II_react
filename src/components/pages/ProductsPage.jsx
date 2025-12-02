// src/components/pages/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import { ProductService } from '../../services/ProductService';
import { ProductCard } from '../ui/ProductCard';

const productService = new ProductService();

export const ProductsPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (e) {
        console.error('Error cargando productos', e);
      }
    }
    load();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="section-title">Catálogo de Productos</h2>
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p.id}>
            <ProductCard 
              product={p} 
              addToCart={addToCart}   // <-- ✔ AHORA SE ENVÍA
            />
          </div>
        ))}
      </div>
    </div>
  );
};
