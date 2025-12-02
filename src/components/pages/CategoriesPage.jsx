// src/components/pages/CategoriesPage.jsx
import React, { useEffect, useState } from 'react';
import { ProductService } from '../../services/ProductService';
import { ProductCard } from '../ui/ProductCard';

const productService = new ProductService();

export const CategoriesPage = ({ addToCart }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await productService.getAllProducts();
        setCategories(data);
      } catch (error) {
        console.error('Error cargando categorías', error);
      }
    }
    load();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="section-title">Categorías</h2>

      <div className="row">
        {categories.map((cat) => (
          <div className="col-md-4" key={cat.id}>
            <ProductCard 
              product={cat}
              addToCart={addToCart}    // <-- ⚠️ IMPORTANTE
            />
          </div>
        ))}
      </div>
    </div>
  );
};
