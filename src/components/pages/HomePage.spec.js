// src/components/pages/HomePage.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';

// ----------------------------------------------------
// 1. MOCK DE DEPENDENCIAS Y DATOS
// ----------------------------------------------------
const MOCK_FEATURED_PRODUCTS = [
    { id: 1, nombre: 'PlayStation 5', precio: 549990, categoria: 'consolas', imagen: 'ps5.jpg', descripcion: 'Consola next-gen' },
    { id: 2, nombre: 'Xbox Series X', precio: 499990, categoria: 'consolas', imagen: 'xbox.jpg', descripcion: 'Consola Microsoft' },
    { id: 3, nombre: 'Nintendo Switch', precio: 299990, categoria: 'consolas', imagen: 'switch.jpg', descripcion: 'Consola híbrida' },
    { id: 4, nombre: 'PC Gamer', precio: 899990, categoria: 'pc-gamer', imagen: 'pc.jpg', descripcion: 'PC gaming' },
];

const mockProductService = jasmine.createSpyObj('ProductService', ['getFeaturedProducts']);
const mockAddToCart = jasmine.createSpy('addToCart');

mockProductService.getFeaturedProducts.and.returnValue(MOCK_FEATURED_PRODUCTS);

// ----------------------------------------------------
// 2. FUNCIÓN DE RENDER AUXILIAR
// ----------------------------------------------------
const renderHomePage = () => {
    return render(
        <MemoryRouter>
            <HomePage addToCart={mockAddToCart} productService={mockProductService} />
        </MemoryRouter>
    );
};

describe('HomePage Component', () => {

    beforeEach(() => {
        mockProductService.getFeaturedProducts.calls.reset();
        mockAddToCart.calls.reset();
        mockProductService.getFeaturedProducts.and.returnValue(MOCK_FEATURED_PRODUCTS);
    });

    // PRUEBA 1: Renderizado completo
    it('debe mostrar todas las secciones principales', () => {
        renderHomePage();

        expect(screen.getByText('Sube de Nivel tu Setup Ahora')).toBeTruthy();
        expect(screen.getByText('Explorar Catálogo')).toBeTruthy();
        expect(screen.getByText('Envío Gratis')).toBeTruthy();
        expect(screen.getByText('Soporte 24/7')).toBeTruthy();
        expect(screen.getByText('Garantía Level-Up')).toBeTruthy();
        expect(screen.getByText('🔥 Productos Destacados')).toBeTruthy();
        expect(screen.getByText('Ver Catálogo Completo')).toBeTruthy();

        expect(mockProductService.getFeaturedProducts).toHaveBeenCalledWith(4);
    });

    // PRUEBA 2: Productos destacados
    it('debe mostrar los productos destacados correctamente', () => {
        renderHomePage();

        MOCK_FEATURED_PRODUCTS.forEach(product => {
            expect(screen.getByText(product.nombre)).toBeTruthy();
        });
    });

    // PRUEBA 3: Estado vacío de productos destacados
    it('debe manejar cuando no hay productos destacados', () => {
        mockProductService.getFeaturedProducts.and.returnValue([]);
        
        renderHomePage();

        expect(screen.getByText('Sube de Nivel tu Setup Ahora')).toBeTruthy();
        expect(screen.getByText('Envío Gratis')).toBeTruthy();
        expect(screen.getByText('🔥 Productos Destacados')).toBeTruthy();
    });
});