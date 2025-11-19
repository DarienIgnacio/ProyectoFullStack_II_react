import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CartPage } from './CartPage';

describe('CartPage', () => {

    const mockUpdateQuantity = jasmine.createSpy('updateQuantity');
    const mockRemoveFromCart = jasmine.createSpy('removeFromCart');
    const mockCheckout = jasmine.createSpy('checkout');

    const mockTotals = {
        subtotal: 'CLP $20.000',
        shipping: 'CLP $5.000',
        total:   'CLP $25.000'
    };

    const mockItems = [
        { id: 1, nombre: 'Producto Test', precio: 10000, cantidad: 2 }
    ];

    it('debe mostrar mensaje de carrito vacío', () => {
        render(
            <MemoryRouter>
                <CartPage
                    cartItems={[]} 
                    cartTotals={mockTotals}
                    updateQuantity={mockUpdateQuantity}
                    removeFromCart={mockRemoveFromCart}
                    checkout={mockCheckout}
                />
            </MemoryRouter>
        );

        expect(screen.getByText('Tu Carrito Está Vacío 😔')).toBeTruthy();
    });

    it('debe renderizar productos cuando el carrito NO está vacío', () => {
        render(
            <MemoryRouter>
                <CartPage
                    cartItems={mockItems}
                    cartTotals={mockTotals}
                    updateQuantity={mockUpdateQuantity}
                    removeFromCart={mockRemoveFromCart}
                    checkout={mockCheckout}
                />
            </MemoryRouter>
        );

        expect(screen.getByText('🛒 Carrito de Compras')).toBeTruthy();
    });

    it('debe mostrar totales del resumen', () => {
        render(
            <MemoryRouter>
                <CartPage
                    cartItems={mockItems}
                    cartTotals={mockTotals}
                    updateQuantity={mockUpdateQuantity}
                    removeFromCart={mockRemoveFromCart}
                    checkout={mockCheckout}
                />
            </MemoryRouter>
        );

        const cells = screen.getAllByRole('cell');


        expect(cells[1].textContent).toContain('CLP $20.000');
        expect(cells[3].textContent).toContain('CLP $5.000');
        expect(cells[5].textContent).toContain('CLP $25.000');
    });

    it('debe llamar a checkout al presionar "Pagar Ahora"', () => {
        render(
            <MemoryRouter>
                <CartPage
                    cartItems={mockItems}
                    cartTotals={mockTotals}
                    updateQuantity={mockUpdateQuantity}
                    removeFromCart={mockRemoveFromCart}
                    checkout={mockCheckout}
                />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Pagar Ahora'));

        expect(mockCheckout).toHaveBeenCalled();
    });

    it('debe renderizar al menos 1 CartItem', () => {
        render(
            <MemoryRouter>
                <CartPage
                    cartItems={mockItems}
                    cartTotals={mockTotals}
                    updateQuantity={mockUpdateQuantity}
                    removeFromCart={mockRemoveFromCart}
                    checkout={mockCheckout}
                />
            </MemoryRouter>
        );

        expect(screen.getByText('Producto Test')).toBeTruthy();
    });
});
