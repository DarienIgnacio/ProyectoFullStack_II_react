// src/components/ui/CartItem.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartItem } from './CartItem';

// ----------------------------------------------------
// 1. MOCK DE DATOS
// ----------------------------------------------------
const MOCK_ITEM = {
    id: 1,
    nombre: 'Teclado Mecánico',
    precio: 79990,
    cantidad: 2,
    imagen: 'teclado.jpg',
    categoria: 'perifericos'
};

const mockUpdateQuantity = jasmine.createSpy('updateQuantity');
const mockRemoveFromCart = jasmine.createSpy('removeFromCart');

// ----------------------------------------------------
// 2. FUNCIÓN DE RENDER AUXILIAR
// ----------------------------------------------------
const renderCartItem = () => {
    return render(
        <CartItem 
            item={MOCK_ITEM} 
            updateQuantity={mockUpdateQuantity}
            removeFromCart={mockRemoveFromCart}
        />
    );
};

describe('CartItem Component', () => {

    beforeEach(() => {
        mockUpdateQuantity.calls.reset();
        mockRemoveFromCart.calls.reset();
    });

    // PRUEBA 1: Renderizado básico
    it('debe mostrar la información del item correctamente', () => {
        renderCartItem();

        expect(screen.getByText('Teclado Mecánico')).toBeTruthy();
        expect(screen.getByText('Precio Unitario: CLP $79.990')).toBeTruthy();
        expect(screen.getByDisplayValue('2')).toBeTruthy();
        expect(screen.getByText('CLP $159.980')).toBeTruthy();
    });

    // PRUEBA 2: Actualizar cantidad
    it('debe llamar a updateQuantity cuando se cambia la cantidad', () => {
        renderCartItem();

        const quantityInput = screen.getByDisplayValue('2');
        fireEvent.change(quantityInput, { target: { value: '3' } });

        expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);
    });

    // PRUEBA 3: Eliminar item
    it('debe llamar a removeFromCart cuando se hace clic en eliminar', () => {
        renderCartItem();

        const removeButton = screen.getByRole('button');
        fireEvent.click(removeButton);

        expect(mockRemoveFromCart).toHaveBeenCalledWith(1);
    });

    // PRUEBA 4: Imagen del producto
    it('debe mostrar la imagen del producto', () => {
        renderCartItem();

        const image = screen.getByAltText('Teclado Mecánico');
        expect(image).toBeTruthy();
        expect(image.getAttribute('src')).toBe('teclado.jpg');
    });
});