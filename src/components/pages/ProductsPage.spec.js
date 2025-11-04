// src/components/pages/ProductsPage.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProductsPage } from './ProductsPage';

// ----------------------------------------------------
// 1. MOCK DE DEPENDENCIAS Y DATOS
// ----------------------------------------------------
const MOCK_PRODUCTS = [
    { id: 1, nombre: 'Teclado Mecánico', categoria: 'perifericos', precio: 29990, imagen: 'test1.jpg', descripcion: 'Teclado gaming' },
    { id: 2, nombre: 'Monitor Curvo', categoria: 'monitores', precio: 199990, imagen: 'test2.jpg', descripcion: 'Monitor gaming' },
    { id: 3, nombre: 'Mouse Óptico', categoria: 'perifericos', precio: 15990, imagen: 'test3.jpg', descripcion: 'Mouse gaming' },
    { id: 4, nombre: 'CPU Gamer', categoria: 'componentes', precio: 499990, imagen: 'test4.jpg', descripcion: 'PC gaming' },
];

const mockProductService = jasmine.createSpyObj('ProductService', ['getAllProducts', 'getProductsByCategory']);
const mockAddToCart = jasmine.createSpy('addToCart');

// Configuración inicial del mock
mockProductService.getAllProducts.and.returnValue(MOCK_PRODUCTS);
mockProductService.getProductsByCategory.and.callFake((category) => {
    if (category === 'todos') return MOCK_PRODUCTS;
    return MOCK_PRODUCTS.filter(p => p.categoria === category);
});

const EXPECTED_CATEGORIES = ['todos', 'perifericos', 'monitores', 'componentes'];

// ----------------------------------------------------
// 2. FUNCIÓN DE RENDER AUXILIAR
// ----------------------------------------------------
const renderProductsPage = (initialEntries = ['/productos']) => {
    return render(
        <MemoryRouter initialEntries={initialEntries}>
            <ProductsPage addToCart={mockAddToCart} productService={mockProductService} />
        </MemoryRouter>
    );
};

describe('ProductsPage Component', () => {

    beforeEach(() => {
        mockProductService.getAllProducts.calls.reset();
        mockProductService.getProductsByCategory.calls.reset();
        mockAddToCart.calls.reset();
        
        mockProductService.getAllProducts.and.returnValue(MOCK_PRODUCTS);
        mockProductService.getProductsByCategory.and.callFake((category) => {
            if (category === 'todos') return MOCK_PRODUCTS;
            return MOCK_PRODUCTS.filter(p => p.categoria === category);
        });
    });

    // PRUEBA 1: Renderizado inicial
    it('debe mostrar el título, todas las categorías y productos iniciales', () => {
        renderProductsPage();

        expect(screen.getByText('🎮 Catálogo Completo')).toBeTruthy();
        
        EXPECTED_CATEGORIES.forEach(cat => {
            const expectedText = cat.toUpperCase().replace('-', ' ');
            expect(screen.getByText(expectedText)).toBeTruthy();
        });

        expect(screen.getByText('Teclado Mecánico')).toBeTruthy();
        expect(screen.getByText('Monitor Curvo')).toBeTruthy();
        
        expect(mockProductService.getAllProducts).toHaveBeenCalled();
        expect(mockProductService.getProductsByCategory).toHaveBeenCalledWith('todos');
    });

    // PRUEBA 2: Filtrado por categoría
    it('debe filtrar productos cuando se hace clic en una categoría', () => {
        renderProductsPage();

        const perifericosCategory = screen.getByText('PERIFERICOS');
        fireEvent.click(perifericosCategory);

        expect(mockProductService.getProductsByCategory).toHaveBeenCalledWith('perifericos');
    });

    // PRUEBA 3: Estado vacío
    it('debe mostrar mensaje cuando no hay productos en la categoría', () => {
        mockProductService.getProductsByCategory.and.returnValue([]);
        
        renderProductsPage(['/productos?cat=inexistente']);

        expect(screen.getByText('No hay productos en esta categoría.')).toBeTruthy();
    });

    // PRUEBA 4: Categoría desde URL
    it('debe cargar categoría inicial desde los parámetros de URL', () => {
        renderProductsPage(['/productos?cat=monitores']);

        expect(mockProductService.getProductsByCategory).toHaveBeenCalledWith('monitores');
    });

    // PRUEBA 5: Productos filtrados
    it('debe mostrar solo productos de la categoría seleccionada', () => {
        mockProductService.getProductsByCategory.and.returnValue(
            MOCK_PRODUCTS.filter(p => p.categoria === 'perifericos')
        );
        
        renderProductsPage(['/productos?cat=perifericos']);

        expect(screen.getByText('Teclado Mecánico')).toBeTruthy();
        expect(screen.getByText('Mouse Óptico')).toBeTruthy();
        expect(screen.queryByText('Monitor Curvo')).toBeNull();
        expect(screen.queryByText('CPU Gamer')).toBeNull();
    });

    // PRUEBA 6: Categoría activa (CORREGIDA)
    it('debe aplicar la clase active a la categoría seleccionada', () => {
        renderProductsPage(['/productos?cat=monitores']);

        const categoriaActiva = screen.getByText('MONITORES');
        const categoriaInactiva = screen.getByText('PERIFERICOS');
        
        // Verificar que la categoría activa tiene la clase 'active'
        expect(categoriaActiva.className).toContain('active');
        // Verificar que la categoría inactiva NO tiene la clase 'active'
        expect(categoriaInactiva.className).not.toContain('active');
    });

    // PRUEBA 7: Cambio de categoría
    it('debe cambiar la categoría activa al hacer clic en otra categoría', () => {
        renderProductsPage(['/productos?cat=monitores']);

        // Verificar que 'monitores' está activa inicialmente
        const monitoresCategory = screen.getByText('MONITORES');
        expect(monitoresCategory.className).toContain('active');

        // Hacer clic en 'perifericos'
        const perifericosCategory = screen.getByText('PERIFERICOS');
        fireEvent.click(perifericosCategory);

        // Verificar que se llamó al servicio con la nueva categoría
        expect(mockProductService.getProductsByCategory).toHaveBeenCalledWith('perifericos');
    });
});