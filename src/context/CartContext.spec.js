// Test de CartContext con Jasmine + RTL SIN Jest

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';
import { CartService } from '../services/CartService';
import { ProductService } from '../services/ProductService';

// ---- MOCKS ----
let mockCartService;
let mockProductService;

// ---- Componente auxiliar para pruebas ----
const TestComponent = () => {
    const { cartItems, addToCart, removeFromCart, updateQuantity, checkout } = useCart();

    return (
        <div>
            <button onClick={() => addToCart(1)}>add</button>
            <button onClick={() => removeFromCart(1)}>remove</button>
            <button onClick={() => updateQuantity(1, 5)}>setQty</button>
            <button onClick={() => checkout()}>checkout</button>

            <div data-testid="count">{cartItems.length}</div>
        </div>
    );
};

describe('CartContext', () => {

    beforeEach(() => {

        // ---- CREAR MOCKS EN CADA TEST ----
        mockCartService = jasmine.createSpyObj('CartService', [
            'loadCart',
            'saveCart',
            'calculateTotals',
            'clearCart'
        ]);

        mockCartService.loadCart.and.returnValue([]);
        mockCartService.calculateTotals.and.returnValue({
            subtotal: 'CLP $0',
            shipping: 'CLP $0',
            total: 'CLP $0',
            rawTotalItems: 0
        });

        mockProductService = jasmine.createSpyObj('ProductService', [
            'getProductById'
        ]);

        mockProductService.getProductById.and.callFake(id => ({
            id,
            nombre: 'Producto Test',
            precio: 10000
        }));

        // ---- MOCKEO DE LOS MÉTODOS REALES ----
        spyOn(CartService.prototype, 'loadCart')
            .and.callFake(() => mockCartService.loadCart());

        spyOn(CartService.prototype, 'saveCart')
            .and.callFake(items => mockCartService.saveCart(items));

        spyOn(CartService.prototype, 'calculateTotals')
            .and.callFake(items => mockCartService.calculateTotals(items));

        spyOn(CartService.prototype, 'clearCart')
            .and.callFake(() => mockCartService.clearCart());

        spyOn(ProductService.prototype, 'getProductById')
            .and.callFake(id => mockProductService.getProductById(id));

        // ---- ALERT DENTRO DEL BEFOREEACH ----
        spyOn(window, 'alert');
    });

    // ---- TESTS ----

    it('debe agregar productos al carrito', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('add'));

        expect(screen.getByTestId('count').textContent).toBe('1');
    });

    it('debe eliminar productos del carrito', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('add'));
        fireEvent.click(screen.getByText('remove'));

        expect(screen.getByTestId('count').textContent).toBe('0');
    });

    it('debe actualizar la cantidad', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('add')); // cantidad = 1
        fireEvent.click(screen.getByText('setQty')); // cantidad = 5

        expect(screen.getByTestId('count').textContent).toBe('1');
    });

    it('checkout debe limpiar el carrito y llamar alert', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        fireEvent.click(screen.getByText('add'));
        fireEvent.click(screen.getByText('checkout'));

        expect(mockCartService.clearCart).toHaveBeenCalled();
        expect(window.alert).toHaveBeenCalled();
        expect(screen.getByTestId('count').textContent).toBe('0');
    });

    it('no debe agregar nada si el producto no existe', () => {
    mockProductService.getProductById.and.returnValue(null);

    render(
        <CartProvider>
            <TestComponent />
        </CartProvider>
    );

    fireEvent.click(screen.getByText('add'));

    expect(screen.getByTestId('count').textContent).toBe('0');
    });

});
