// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Servicios
import { ProductService } from './services/ProductService';
import { CartService } from './services/CartService';

// Layout y Páginas
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/pages/HomePage';
import { ProductsPage } from './components/pages/ProductsPage'; 
import { CartPage } from './components/pages/CartPage'; 
import { CategoriesPage } from './components/pages/CategoriesPage'; 
import { LoginPage } from './components/pages/LoginPage'; 
import { ProductDetail } from './components/pages/ProductDetail'; 
import { AdminProductsPage } from "./components/pages/AdminProductsPage";
import { ProductFormPage } from "./components/pages/ProductFormPage";


const productService = new ProductService();
const cartService = new CartService();

function App() {
    const [cartItems, setCartItems] = useState(cartService.loadCart());

    // Sincronizar estado a localStorage
    useEffect(() => {
        cartService.saveCart(cartItems);
    }, [cartItems]);

    // LÓGICA DE CARRITO (Pasada como props)
    const addToCart = async (productId, cantidad = 1) => {
    try {
        const product = await productService.getProductById(productId);
        if (!product) return;

        setCartItems(prevItems => {
            const itemExists = prevItems.find(item => item.id === productId);
            if (itemExists) {
                return prevItems.map(item =>
                    item.id === productId
                        ? { ...item, cantidad: item.cantidad + cantidad }
                        : item
                );
            } else {
                return [...prevItems, { ...product, cantidad }];
            }
        });
    } catch (e) {
        console.error("Error al agregar al carrito", e);
        alert("No se pudo agregar el producto al carrito.");
    }
};

    
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId, newQuantity) => {
        const quantity = parseInt(newQuantity);
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        setCartItems(prevItems => prevItems.map(item => 
            item.id === productId ? { ...item, cantidad: quantity } : item
        ));
    };

    const checkout = () => {
        alert('Simulación de Pago exitosa. ¡Gracias por Level-Up Gamer! 🥳');
        setCartItems([]);
        cartService.clearCart();
    };

    // CÁLCULOS
    const cartTotals = cartService.calculateTotals(cartItems);

    return (
        <Router>
            {/* 1. Pasamos los totales al Header */}
            <Header cartTotals={cartTotals} /> 
            <main className="main-content">
                <Routes>
                    {/* 2. Pasamos servicios y funciones como PROPS a las páginas */}
                    <Route 
                        path="/" 
                        element={<HomePage addToCart={addToCart} productService={productService} />} 
                    />
                    <Route 
                        path="/productos" 
                        element={<ProductsPage addToCart={addToCart} productService={productService} />} 
                    />
                    <Route 
                        path="/carrito" 
                        element={
                            <CartPage 
                                cartItems={cartItems}
                                cartTotals={cartTotals}
                                updateQuantity={updateQuantity}
                                removeFromCart={removeFromCart}
                                checkout={checkout}
                            />
                        } 
                    />
                    <Route path="/categorias" element={<CategoriesPage productService={productService} />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route 
                        path="/producto/:id" 
                        element={<ProductDetail addToCart={addToCart} productService={productService} />} 
                    /> 
                    <Route path="/admin/productos" element={<AdminProductsPage />} />
                    <Route path="/admin/productos/nuevo" element={<ProductFormPage />} />
                    <Route path="/admin/productos/:id/editar" element={<ProductFormPage />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}

export default App;