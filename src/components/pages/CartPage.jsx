// src/components/pages/CartPage.jsx
import React from 'react';
import { Container, Row, Col, Button, Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartItem } from '../ui/CartItem'; 

// Función de componente que recibe props
export const CartPage = ({ cartItems, cartTotals, updateQuantity, removeFromCart, checkout }) => {

    if (cartItems.length === 0) {
        return (
            <Container className="my-5 text-center">
                <h2 className="orbitron-font">Tu Carrito Está Vacío 😔</h2>
                <p>Agrega productos para subir de nivel tu equipo.</p>
                <Button variant="primary" as={Link} to="/productos">Ir a Productos</Button>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <h2 className="section-title">🛒 Carrito de Compras</h2>
            <Row>
                <Col md={8}>
                    {cartItems.map(item => (
                        <CartItem 
                            key={item.id} 
                            item={item} 
                            // Pasamos las funciones del App.jsx al CartItem
                            updateQuantity={updateQuantity}
                            removeFromCart={removeFromCart}
                        />
                    ))}
                </Col>

                <Col md={4}>
                    <Card className="cart-summary" style={{ backgroundColor: 'var(--color-card-bg)' }}>
                        <Card.Body>
                            <Card.Title className="orbitron-font">Resumen del Pedido</Card.Title>
                            <Table borderless responsive className="summary-table">
                                <tbody>
                                    {/* Usamos las props para mostrar los totales */}
                                    <tr><td>Subtotal:</td><td className="text-end">{cartTotals.subtotal}</td></tr>
                                    <tr><td>Envío:</td><td className="text-end">{cartTotals.shipping}</td></tr>
                                    <tr className="total-row"><td>**Total a Pagar:**</td><td className="text-end">**{cartTotals.total}**</td></tr>
                                </tbody>
                            </Table>
                            <Button 
                                variant="primary" 
                                className="w-100 btn-checkout" 
                                onClick={checkout} // Usamos la función checkout de las props
                            >
                                Pagar Ahora
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};