// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { ProductService } from '../services/ProductService';
import { CartService } from '../services/CartService';

const CartContext = createContext();
const cartService = new CartService();
const productService = new ProductService();

// Hook personalizado para consumir el contexto
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(cartService.loadCart());

    // Sincronizar estado a localStorage después de cada cambio
    useEffect(() => {
        cartService.saveCart(cartItems);
    }, [cartItems]);

    const addToCart = (productId, cantidad = 1) => {
        const product = productService.getProductById(productId);
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
                return [...prevItems, { ...product, cantidad: cantidad }];
            }
        });
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

    const cartTotals = cartService.calculateTotals(cartItems);

    return (
        <CartContext.Provider value={{
            cartItems,
            cartTotals,
            addToCart,
            removeFromCart,
            updateQuantity,
            checkout,
        }}>
            {children}
        </CartContext.Provider>
    );
};