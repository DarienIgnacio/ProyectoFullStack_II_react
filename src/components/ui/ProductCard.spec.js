// src/components/ui/ProductCard.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';

// ----------------------------------------------------
// 1. MOCK DE DATOS
// ----------------------------------------------------
const MOCK_PRODUCT = {
    id: 1,
    nombre: 'Audífonos Gamer Pro',
    precio: 59990,
    categoria: 'accesorios',
    imagen: 'audifonos.jpg',
    descripcion: 'Audífonos profesionales para gaming'
};

const mockAddToCart = jasmine.createSpy('addToCart');

// ----------------------------------------------------
// 2. FUNCIÓN DE RENDER AUXILIAR
// ----------------------------------------------------
const renderProductCard = () => {
    return render(
        <MemoryRouter>
            <ProductCard product={MOCK_PRODUCT} addToCart={mockAddToCart} />
        </MemoryRouter>
    );
};

describe('ProductCard Component', () => {

    beforeEach(() => {
        mockAddToCart.calls.reset();
    });

    // PRUEBA 1: Renderizado básico
    it('debe mostrar la información del producto correctamente', () => {
        renderProductCard();

        expect(screen.getByText('Audífonos Gamer Pro')).toBeTruthy();
        expect(screen.getByText('CLP $59.990')).toBeTruthy();
        expect(screen.getByText('Agregar')).toBeTruthy();
    });

    // PRUEBA 2: Enlace al detalle del producto
    it('debe tener enlace a la página de detalle del producto', () => {
        renderProductCard();

        const productLink = screen.getByText('Audífonos Gamer Pro').closest('a');
        expect(productLink.getAttribute('href')).toBe('/producto/1');
    });

    // PRUEBA 3: Agregar al carrito
    it('debe llamar a addToCart cuando se hace clic en el botón', () => {
        renderProductCard();

        const addButton = screen.getByText('Agregar');
        fireEvent.click(addButton);

        expect(mockAddToCart).toHaveBeenCalledWith(1);
        expect(mockAddToCart).toHaveBeenCalledTimes(1);
    });

    // PRUEBA 4: Imagen del producto
    it('debe mostrar la imagen del producto', () => {
        renderProductCard();

        const image = screen.getByAltText('Audífonos Gamer Pro');
        expect(image).toBeTruthy();
        expect(image.getAttribute('src')).toBe('audifonos.jpg');
    });
});