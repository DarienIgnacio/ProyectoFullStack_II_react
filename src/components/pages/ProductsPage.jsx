// src/components/pages/ProductsPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../ui/ProductCard';

// Ya no importamos ProductService aquí, lo recibimos por props

// Función de componente que recibe props
export const ProductsPage = ({ addToCart, productService }) => {
    
    // Obtiene todas las categorías únicas del servicio
    const allCategories = ['todos', ...new Set(productService.getAllProducts().map(p => p.categoria))];

    const [searchParams, setSearchParams] = useSearchParams();
    // Lee la categoría inicial de la URL o usa 'todos'
    const initialCategory = searchParams.get('cat') || 'todos';

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    // Filtra los productos usando el servicio que recibimos por props
    useEffect(() => {
        setFilteredProducts(productService.getProductsByCategory(selectedCategory));
        
        // Sincroniza la URL con el estado local
        if (selectedCategory !== 'todos') {
             setSearchParams({ cat: selectedCategory }, { replace: true });
        } else {
             setSearchParams({}, { replace: true });
        }
    }, [selectedCategory, setSearchParams, productService]); // Incluimos productService en dependencias

    const handleCategoryClick = (cat) => {
        setSelectedCategory(cat);
    };

    return (
        <Container className="my-5">
            <h2 className="section-title text-center">🎮 Catálogo Completo</h2>
            
            <div className="category-nav mb-4 text-center">
                {allCategories.map(cat => (
                    <span 
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className={`category-item me-3 ${selectedCategory === cat ? 'active' : ''}`}
                        style={{ cursor: 'pointer', color: selectedCategory === cat ? 'var(--color-accent)' : 'var(--color-text-secondary)' }}
                    >
                        {cat.toUpperCase().replace('-', ' ')}
                    </span>
                ))}
            </div>

            <Row>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            {/* Pasamos la función addToCart al ProductCard */}
                            <ProductCard product={product} addToCart={addToCart} />
                        </Col>
                    ))
                ) : (
                    <Col><p className="text-center">No hay productos en esta categoría.</p></Col>
                )}
            </Row>
        </Container>
    );
};