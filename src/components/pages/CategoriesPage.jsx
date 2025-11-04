// src/components/pages/CategoriesPage.jsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// Ya no importamos ProductService aquí

// Función de componente que recibe props
export const CategoriesPage = ({ productService }) => {
    
    // Obtenemos las categorías usando el servicio de las props
    const categories = [...new Set(productService.getAllProducts().map(p => p.categoria))];

    const getCardInfo = (cat) => ({
        title: cat.toUpperCase().replace('-', ' '),
        description: `Explora todos los artículos en la categoría de ${cat.replace('-', ' ')}.`,
        link: `/productos?cat=${cat}` // Enlace a la ProductsPage con filtro
    });

    return (
        <Container className="my-5">
            <h2 className="section-title text-center">Categorías para Subir de Nivel</h2>
            <Row>
                {categories.map(cat => {
                    const info = getCardInfo(cat);
                    return (
                        <Col key={cat} xs={12} md={4} className="mb-4">
                            <Card className="category-card text-center h-100" style={{ backgroundColor: 'var(--color-card-bg)' }}>
                                <Card.Body>
                                    <Card.Title className="orbitron-font" style={{ color: 'var(--color-accent)' }}>{info.title}</Card.Title>
                                    <Card.Text>{info.description}</Card.Text>
                                    <Link to={info.link} className="btn btn-secondary">Ver Productos</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};