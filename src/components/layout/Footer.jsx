// src/components/layout/Footer.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // <-- IMPORTANTE

export const Footer = () => {
    return (
        <footer className="footer-section py-5" style={{ backgroundColor: 'var(--color-card-bg)' }}>
            <Container>
                <Row className="mb-4">
                    {/* ... (Sección LEVEL-UP GAMER y Contacto) ... */}

                    <Col md={2} className="footer-section">
                        <h4 className="mb-3">Enlaces Rápidos</h4>
                        <ul className="list-unstyled">
                            {/* Usar <Link> en lugar de <a> */}
                            <li><Link to="/sobre-nosotros" className="footer-link">Sobre Nosotros</Link></li>
                            <li><Link to="/faq" className="footer-link">Preguntas Frecuentes</Link></li>
                            <li><Link to="/terminos" className="footer-link">Términos y Condiciones</Link></li>
                            <li><Link to="/privacidad" className="footer-link">Política de Privacidad</Link></li>
                        </ul>
                    </Col>
                    
                    <Col md={3} className="footer-section">
                        <h4 className="mb-3">Categorías</h4>
                        <ul className="list-unstyled">
                            {/* Los enlaces de categoría usan el filtro de la página de productos */}
                            <li><Link to="/productos?cat=consolas" className="footer-link">Consolas</Link></li>
                            <li><Link to="/productos?cat=pc-gamer" className="footer-link">Computadores Gamers</Link></li>
                            <li><Link to="/productos?cat=accesorios" className="footer-link">Accesorios</Link></li>
                            <li><Link to="/productos?cat=sillas" className="footer-link">Sillas Gamers</Link></li>
                        </ul>
                    </Col>
                    
                    {/* ... (Resto de la sección de contacto) ... */}

                </Row>
                <div className="footer-bottom text-center pt-3 border-top" style={{borderColor: '#333 !important'}}>
                    <p className="mb-0">&copy; 2023 Level-Up Gamer. Todos los derechos reservados.</p>
                </div>
            </Container>
        </footer>
    );
};