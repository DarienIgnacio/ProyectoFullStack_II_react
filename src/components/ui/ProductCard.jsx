// src/components/ui/ProductCard.jsx

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product, addToCart }) => { 
    const formattedPrice = `CLP $${product.precio.toLocaleString('es-CL')}`;

    return (
        <Card className="product-card h-100" style={{ backgroundColor: 'var(--color-card-bg)' }}>
            
            {/* 🛑 COMPONENTE CRÍTICO QUE FALTABA 🛑 */}
            <Card.Img 
                variant="top" 
                src={product.imagen} // Usa la URL del producto
                alt={product.nombre} 
                className="product-card-image"
                // Estilos inline de respaldo para forzar visibilidad (200px)
                style={{ 
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover'
                }}
            />
            {/* ------------------------------------- */}

            <Card.Body className="d-flex flex-column">
                <Link to={`/producto/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h5 className="card-title text-truncate">{product.nombre}</h5>
                </Link>
                <div className="product-price mt-auto">{formattedPrice}</div>
                <Button 
                    variant="primary" 
                    className="btn-add-cart w-100 mt-2" 
                    onClick={() => addToCart(product.id)}
                >
                    <i className="fas fa-shopping-cart"></i> Agregar
                </Button>
            </Card.Body>
        </Card>
    );
};