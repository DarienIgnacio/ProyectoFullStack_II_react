// src/components/pages/ProductDetail.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ProductDetail } from './ProductDetail';

const MOCK_PRODUCT = {
    id: 1,
    nombre: 'Teclado Mecánico RGB',
    precio: 79990,
    categoria: 'perifericos',
    imagen: 'teclado.jpg',
    descripcion: 'Teclado mecánico con iluminación RGB para gaming'
};

const mockProductService = jasmine.createSpyObj('ProductService', ['getProductById']);
const mockAddToCart = jasmine.createSpy('addToCart');

const renderProductDetail = (productId = '1') => {
    return render(
        <MemoryRouter initialEntries={[`/producto/${productId}`]}>
            <Routes>
                <Route path="/producto/:id" element={<ProductDetail addToCart={mockAddToCart} productService={mockProductService} />} />
            </Routes>
        </MemoryRouter>
    );
};

describe('ProductDetail Component', () => {
    beforeEach(() => {
        mockProductService.getProductById.calls.reset();
        mockAddToCart.calls.reset();
    });

    it('debe mostrar producto y permitir agregar al carrito', () => {
        mockProductService.getProductById.and.returnValue(MOCK_PRODUCT);
        renderProductDetail();

        expect(screen.getByText('Teclado Mecánico RGB')).toBeTruthy();
        expect(screen.getByText('Agregar al Carrito')).toBeTruthy();
        expect(mockProductService.getProductById).toHaveBeenCalledWith('1');
        
        fireEvent.click(screen.getByText('Agregar al Carrito'));
        expect(mockAddToCart).toHaveBeenCalledWith(1, 1);
    });

    it('debe mostrar error cuando producto no existe', () => {
        mockProductService.getProductById.and.returnValue(null);
        renderProductDetail('999');
        expect(screen.getByText('Producto No Encontrado ❌')).toBeTruthy();
    });
});