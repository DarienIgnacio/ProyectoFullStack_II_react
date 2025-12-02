// src/components/layout/Header.jsx (Fragmento de la navegación)
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'; // <-- IMPORTANTE

export const Header = ({ cartTotals }) => {
    const rol = localStorage.getItem("rol");
    {rol === "ADMIN" && (
    <li className="nav-item">
        <a className="nav-link" href="/admin/productos">Admin</a>
    </li>
    )}
    
    return (
        <Navbar /* ... */ >
            <Container>
                {/* 1. Logo/Marca (Level-Up Gamer) */}
                <LinkContainer to="/">
                    <Navbar.Brand><h1>LEVEL-UP GAMER</h1></Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto main-nav-links">
                        {/* 2. Enlaces Principales */}
                        <LinkContainer to="/"><Nav.Link>Inicio</Nav.Link></LinkContainer>
                        <LinkContainer to="/productos"><Nav.Link>Productos</Nav.Link></LinkContainer>
                        <LinkContainer to="/categorias"><Nav.Link>Categorías</Nav.Link></LinkContainer>
                        {/* Si tienes Blog, Eventos, etc., también deben ser LinkContainer */}
                        
                    </Nav>
                    <Nav className="ml-auto header-icons">
                        {/* 3. Icono de Usuario */}
                        <LinkContainer to="/login">
                            <Nav.Link><i className="fas fa-user"></i></Nav.Link>
                        </LinkContainer>
                        {/* 4. Icono de Carrito */}
                        <LinkContainer to="/carrito">
                            <Nav.Link>
                                <i className="fas fa-shopping-cart"></i> 
                                <span className="cart-count">{cartTotals.rawTotalItems}</span> 
                            </Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};