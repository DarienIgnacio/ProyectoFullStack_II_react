// src/components/pages/HomePage.jsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProductCard } from '../ui/ProductCard';

// Componente principal que recibe props desde App.jsx
export const HomePage = ({ addToCart, productService }) => {
    
    // Obtenemos los 4 productos destacados usando el servicio de las props
    const featuredProducts = productService.getFeaturedProducts(4);

    return (
        <>
            {/* 1. SECCIÓN HERO / BANNER PRINCIPAL */}
            {/* Usamos un div con estilo para simular un gran banner,
                apoyándonos en la clase 'hero-section' que corregimos en styles.css */}
            <div 
                className="hero-section text-center py-5 mb-5"
                style={{ 
                    padding: '80px 0',
                    // Nota: Si tienes una imagen de fondo grande para el hero, debes
                    // incluirla aquí o en tu styles.css para la clase .hero-section
                    backgroundColor: 'var(--color-card-bg)',
                    borderBottom: '2px solid var(--color-accent)'
                }}
            >
                <Container>
                    <h2 className="orbitron-font display-4 mb-3">Sube de Nivel tu Setup Ahora</h2>
                    <p className="lead mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                        El mejor equipo gamer: consolas, PCs y accesorios de alto rendimiento.
                    </p>
                    <Button variant="primary" as={Link} to="/productos" className="btn-primary btn-lg">
                        Explorar Catálogo <i className="fas fa-arrow-right ms-2"></i>
                    </Button>
                </Container>
            </div>

            {/* 2. SECCIÓN BENEFICIOS / PROMOCIONES */}
            <Container className="section-spacing mb-5">
                <Row className="text-center">
                    <Col md={4} className="mb-4">
                        <i className="fas fa-truck fa-3x mb-3" style={{ color: 'var(--color-accent)' }}></i>
                        <h4 className="orbitron-font">Envío Gratis</h4>
                        <p style={{ color: 'var(--color-text-secondary)' }}>En pedidos superiores a CLP $200.000.</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <i className="fas fa-headset fa-3x mb-3" style={{ color: 'var(--color-accent)' }}></i>
                        <h4 className="orbitron-font">Soporte 24/7</h4>
                        <p style={{ color: 'var(--color-text-secondary)' }}>Asistencia técnica inmediata vía WhatsApp.</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <i className="fas fa-shield-alt fa-3x mb-3" style={{ color: 'var(--color-accent)' }}></i>
                        <h4 className="orbitron-font">Garantía Level-Up</h4>
                        <p style={{ color: 'var(--color-text-secondary)' }}>30 días de devolución sin problemas.</p>
                    </Col>
                </Row>
            </Container>

            {/* 3. SECCIÓN PRODUCTOS DESTACADOS */}
            <Container className="section-spacing my-5">
                <h2 className="section-title text-center mb-4">🔥 Productos Destacados</h2>
                <Row>
                    {featuredProducts.map(product => (
                        <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            {/* Pasamos product y addToCart como props */}
                            <ProductCard product={product} addToCart={addToCart} />
                        </Col>
                    ))}
                </Row>
                <div className="text-center mt-4">
                    <Button variant="secondary" as={Link} to="/productos">
                        Ver Catálogo Completo
                    </Button>
                </div>
            </Container>
        </>
    );
};