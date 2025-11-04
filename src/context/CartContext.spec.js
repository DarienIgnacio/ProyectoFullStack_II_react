// src/context/CartContext.spec.js

import React from 'react';
// ¡CORRECCIÓN AQUÍ! Se añade fireEvent al import.
import { render, screen, act, fireEvent } from '@testing-library/react'; 
import { CartProvider, useCart } from './CartContext'; 
import { ProductService } from '../services/ProductService';
import { CartService } from '../services/CartService';
import '@testing-library/jest-dom'; 

// ------------------------------------------------
// 1. Mocks de Servicios (Jest Mock)
// ------------------------------------------------
jest.mock('../services/ProductService');
jest.mock('../services/CartService');

// --- Datos y Spies ---
const mockProduct = { id: 1, name: 'Mouse', price: 50 };
const mockInitialCart = [{ id: 99, name: 'KeyBoard', price: 100, cantidad: 2 }];
const mockTotals = { subtotal: 200, shipping: 10, total: 210 };
const alertSpy = jasmine.createSpy('alert');

global.alert = alertSpy; 

// Spies de las funciones del servicio
const mockLoadCart = jasmine.createSpy('loadCart').and.returnValue([]);
const mockSaveCart = jasmine.createSpy('saveCart');
const mockClearCart = jasmine.createSpy('clearCart');
const mockCalculateTotals = jasmine.createSpy('calculateTotals').and.returnValue(mockTotals);
const mockGetProductById = jasmine.createSpy('getProductById').and.returnValue(mockProduct);

// Re-implementación de los mocks de clases para controlar sus métodos
CartService.mockImplementation(() => {
    return {
        loadCart: mockLoadCart,
        saveCart: mockSaveCart,
        clearCart: mockClearCart,
        calculateTotals: mockCalculateTotals,
    };
});
ProductService.mockImplementation(() => {
    return {
        getProductById: mockGetProductById,
    };
});

// ------------------------------------------------
// 2. Componente de Prueba (Consumer)
// ------------------------------------------------
const TestComponent = () => {
    const context = useCart();
    
    return (
        <div data-testid="cart-test">
            <span data-testid="item-count">{context.cartItems.length}</span>
            <span data-testid="total-sub">{context.cartTotals.subtotal}</span>
            <button data-testid="add-new-btn" onClick={() => context.addToCart(1, 1)}></button>
            <button data-testid="add-existing-btn" onClick={() => context.addToCart(1, 2)}></button>
            <button data-testid="add-fail-btn" onClick={() => context.addToCart(999, 1)}></button>
            <button data-testid="remove-btn" onClick={() => context.removeFromCart(1)}></button>
            <button data-testid="update-btn" onClick={() => context.updateQuantity(1, 5)}></button>
            <button data-testid="update-remove-btn" onClick={() => context.updateQuantity(1, 0)}></button>
            <button data-testid="checkout-btn" onClick={context.checkout}></button>
        </div>
    );
};

// ------------------------------------------------
// 3. Suite de Pruebas
// ------------------------------------------------
describe('CartProvider and useCart', () => {

    beforeEach(() => {
        // Resetear mocks y spies antes de cada prueba
        jest.clearAllMocks();
        alertSpy.calls.reset();
        
        // Re-establecer el estado inicial y los retornos por defecto
        mockLoadCart.and.returnValue([]); 
        mockGetProductById.and.returnValue(mockProduct);
        mockCalculateTotals.and.returnValue(mockTotals);
    });

    // --- Inicialización y Side Effects ---
    it('debe inicializar el estado llamando a loadCart y calcular los totales', () => {
        mockLoadCart.and.returnValue(mockInitialCart); 
        
        render(<CartProvider><TestComponent /></CartProvider>);
        
        expect(mockLoadCart).toHaveBeenCalledTimes(1); 
        expect(screen.getByTestId('item-count').textContent).toBe(mockInitialCart.length.toString()); 
        
        expect(mockCalculateTotals).toHaveBeenCalledTimes(1); 
        expect(screen.getByTestId('total-sub').textContent).toBe(mockTotals.subtotal.toString());
    });

    it('debe llamar a cartService.saveCart cuando el estado cambia (cubre useEffect)', () => {
        render(<CartProvider><TestComponent /></CartProvider>);

        // 1. saveCart se llama inicialmente (por la carga de useState)
        expect(mockSaveCart).toHaveBeenCalledTimes(1); 
        
        // 2. Simular una acción que cambie el estado
        act(() => {
            fireEvent.click(screen.getByTestId('add-new-btn'));
        });

        // 3. saveCart debe llamarse de nuevo después del cambio de estado 
        expect(mockSaveCart).toHaveBeenCalledTimes(2); 
        expect(mockSaveCart).toHaveBeenCalledWith(expect.arrayContaining([
            expect.objectContaining({ id: 1, cantidad: 1 })
        ]));
    });

    // --- Función: addToCart (Cubre todas las ramas) ---
    describe('addToCart', () => {
        it('debe agregar un nuevo producto si no existe (cubre la rama else)', () => {
            render(<CartProvider><TestComponent /></CartProvider>);

            act(() => {
                fireEvent.click(screen.getByTestId('add-new-btn'));
            });

            expect(screen.getByTestId('item-count').textContent).toBe('1');
        });

        it('debe incrementar la cantidad si el producto ya existe (cubre la rama if (itemExists))', () => {
            mockLoadCart.and.returnValue([{ id: 1, name: 'Mouse', price: 50, cantidad: 1 }]); 
            render(<CartProvider><TestComponent /></CartProvider>);
            
            act(() => {
                fireEvent.click(screen.getByTestId('add-existing-btn')); 
            });

            expect(screen.getByTestId('item-count').textContent).toBe('1');
            
            expect(mockSaveCart).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ id: 1, cantidad: 3 }) // 1 + 2 = 3
            ]));
        });

        it('no debe modificar el carrito si el producto no existe (cubre la rama if (!product) return)', () => {
            mockGetProductById.and.returnValue(undefined); // Producto no encontrado
            render(<CartProvider><TestComponent /></CartProvider>);
            
            act(() => {
                fireEvent.click(screen.getByTestId('add-fail-btn')); // Intenta añadir 999
            });
            
            expect(screen.getByTestId('item-count').textContent).toBe('0');
            expect(mockSaveCart).toHaveBeenCalledTimes(1); // Solo la llamada inicial
        });
    });

    // --- Función: removeFromCart ---
    it('debe remover un producto del carrito (cubre la función removeFromCart)', () => {
        mockLoadCart.and.returnValue([{ id: 1, name: 'Mouse', cantidad: 1 }, { id: 2, name: 'Pad', cantidad: 1 }]); 
        render(<CartProvider><TestComponent /></CartProvider>);
        
        expect(screen.getByTestId('item-count').textContent).toBe('2');
        
        act(() => {
            fireEvent.click(screen.getByTestId('remove-btn')); // Remueve item con id: 1
        });
        
        expect(screen.getByTestId('item-count').textContent).toBe('1');
    });

    // --- Función: updateQuantity (Cubre ambas ramas) ---
    describe('updateQuantity', () => {
        beforeEach(() => {
            mockLoadCart.and.returnValue([{ id: 1, name: 'Mouse', cantidad: 1 }]); 
            render(<CartProvider><TestComponent /></CartProvider>);
        });

        it('debe actualizar la cantidad a un nuevo valor (cubre la rama else)', () => {
            act(() => {
                fireEvent.click(screen.getByTestId('update-btn')); // Actualiza a 5
            });

            expect(mockSaveCart).toHaveBeenCalledWith(expect.arrayContaining([
                expect.objectContaining({ id: 1, cantidad: 5 })
            ]));
            expect(screen.getByTestId('item-count').textContent).toBe('1');
        });

        it('debe llamar a removeFromCart si la nueva cantidad es 0 o menor (cubre la rama if (quantity <= 0) return)', () => {
            act(() => {
                fireEvent.click(screen.getByTestId('update-remove-btn')); // Actualiza a 0
            });
            
            expect(screen.getByTestId('item-count').textContent).toBe('0');
            expect(mockSaveCart).toHaveBeenCalledWith([]); 
        });
    });

    // --- Función: checkout ---
    it('debe simular pago, limpiar estado y llamar a cartService.clearCart (cubre checkout)', () => {
        mockLoadCart.and.returnValue(mockInitialCart); 
        render(<CartProvider><TestComponent /></CartProvider>);
        
        act(() => {
            fireEvent.click(screen.getByTestId('checkout-btn'));
        });
        
        expect(alertSpy).toHaveBeenCalledWith('Simulación de Pago exitosa. ¡Gracias por Level-Up Gamer! 🥳');
        
        expect(screen.getByTestId('item-count').textContent).toBe('0');
        
        expect(mockClearCart).toHaveBeenCalledTimes(1);
    });
});