// src/components/ui/CartItem.jsx
import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

// Este componente recibe el item, updateQuantity, y removeFromCart por props
export const CartItem = ({ item, updateQuantity, removeFromCart }) => { 
    
    // Calcula el total del ítem y lo formatea
    const itemTotal = `CLP $${(item.precio * item.cantidad).toLocaleString('es-CL')}`;

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        updateQuantity(item.id, newQuantity);
    };

    return (
        <div className="cart-item mb-3 p-3" style={{backgroundColor: 'var(--color-card-bg)', borderRadius: '8px'}}>
            <Row className="align-items-center w-100">
                
                {/* 1. IMAGEN Y NOMBRE DEL PRODUCTO */}
                <Col xs={12} md={5} className="d-flex align-items-center item-info">
                    <img src={item.imagen} alt={item.nombre} style={{width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px'}} />
                    <div>
                        {/* 🛑 CRÍTICO: Aseguramos que el nombre y precio sean visibles 🛑 */}
                        <h4 style={{fontSize: '1.1rem', margin: 0}}>{item.nombre}</h4>
                        <p style={{margin: '5px 0 0 0', color: 'var(--color-text-secondary)'}}>Precio Unitario: CLP ${item.precio.toLocaleString('es-CL')}</p>
                    </div>
                </Col>

                {/* 2. CANTIDAD (Input) */}
                <Col xs={6} md={2} className="d-flex justify-content-center item-quantity">
                    <Form.Control 
                        type="number" 
                        value={item.cantidad} 
                        onChange={handleQuantityChange}
                        min="1"
                        // Estilos para visibilidad en tema oscuro
                        style={{width: '70px', backgroundColor: 'var(--color-primary)', color: 'white'}}
                    />
                </Col>

                {/* 3. SUB-TOTAL POR ÍTEM */}
                <Col xs={6} md={3} className="text-end">
                    <strong style={{color: 'var(--color-accent)'}}>{itemTotal}</strong>
                </Col>

                {/* 4. BOTÓN ELIMINAR (TARRO DE BASURA) */}
                <Col xs={12} md={2} className="text-end">
                    <Button 
                        variant="danger" // Usamos variant="danger" de Bootstrap para el fondo rojo
                        className="btn-remove" 
                        onClick={() => removeFromCart(item.id)} 
                        // Aplicamos el color de texto blanco para que el ícono sea visible
                        style={{color: 'var(--color-text-light)'}} 
                    >
                        {/* 🛑 CRÍTICO: Ícono de basurero 🛑 */}
                        <i className="fas fa-trash"></i>
                    </Button>
                </Col>
            </Row>
        </div>
    );
};