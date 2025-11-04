// src/components/pages/CategoriesPage.spec.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CategoriesPage } from './CategoriesPage'; 

// ----------------------------------------------------
// 1. MOCK DE DEPENDENCIAS Y DATOS
// ----------------------------------------------------
const MOCK_PRODUCTS = [
    { id: 1, nombre: 'Teclado Mecánico', categoria: 'perifericos' },
    { id: 2, nombre: 'Monitor Curvo', categoria: 'monitores' },
    { id: 3, nombre: 'Mouse Óptico', categoria: 'perifericos' },
    { id: 4, nombre: 'CPU Gamer', categoria: 'componentes' },
    // Incluimos una categoría con guion para forzar el caso de prueba de formato
    { id: 5, nombre: 'Tarjeta Grafica', categoria: 'placas-de-video' }, 
];

const mockProductService = jasmine.createSpyObj('ProductService', ['getAllProducts']);
mockProductService.getAllProducts.and.returnValue(MOCK_PRODUCTS);

const EXPECTED_CATEGORIES = ['perifericos', 'monitores', 'componentes', 'placas-de-video'];

// ----------------------------------------------------
// 2. FUNCIÓN DE RENDER AUXILIAR (Wrapper)
// ----------------------------------------------------
const renderCategoriesPage = (mock = mockProductService) => {
    return render(
        <MemoryRouter>
            <CategoriesPage productService={mock} />
        </MemoryRouter>
    );
};

describe('CategoriesPage Component - Pruebas Mínimas', () => {

    // PRUEBA 1: Muestra, Formato y Enlaces (Cubre 3 pruebas anteriores)
    it('debe mostrar el título, todas las categorías únicas con formato correcto y sus enlaces', () => {
        // Aseguramos que el mock devuelve todos los productos
        mockProductService.getAllProducts.and.returnValue(MOCK_PRODUCTS);
        renderCategoriesPage();

        // 1. Verificar el título principal
        expect(screen.getByText('Categorías para Subir de Nivel')).toBeTruthy();
        
        // 2. Verificar cada categoría, su formato y su enlace
        EXPECTED_CATEGORIES.forEach(cat => {
            // El formato esperado (mayúsculas y sin guiones, ej: 'PLACAS DE VIDEO')
            const expectedTitle = cat.toUpperCase().replace('-', ' '); 
            const expectedHref = `/productos?cat=${cat}`; 
            
            // Usamos getAllByText con RegExp flexible y filtramos por el texto EXACTO
            const categoryTextElements = screen.getAllByText(new RegExp(expectedTitle.replace(/ /g, '.*'), 'i')); 
            expect(categoryTextElements.some(el => el.textContent === expectedTitle)).toBeTruthy(`No se encontró el título formateado: ${expectedTitle}`);
            
            // Buscamos el enlace 'Ver Productos' que apunte a la URL correcta
            const allLinks = screen.getAllByRole('link', { name: /Ver Productos/i });
            const categoryLink = allLinks.find(link => link.getAttribute('href') === expectedHref);

            expect(categoryLink).toBeTruthy(`No se encontró el enlace con href: ${expectedHref}`);
        });

        // 3. Verificar el número total de tarjetas
        const cardElements = screen.getAllByText('Ver Productos'); 
        expect(cardElements.length).toEqual(EXPECTED_CATEGORIES.length); 
    });

    // PRUEBA 2: Estado Vacío (Cubre el caso de productos nulos/vacíos)
    it('debe mostrar el título, pero ninguna tarjeta, cuando no hay productos', () => {
        // Mock que retorna un array vacío
        mockProductService.getAllProducts.and.returnValue([]);
        renderCategoriesPage();
        
        // 1. Verificar que el título esté
        expect(screen.getByText('Categorías para Subir de Nivel')).toBeTruthy();
        
        // 2. Verificar que NO hay enlaces "Ver Productos"
        const cardElements = screen.queryAllByText('Ver Productos'); 
        expect(cardElements.length).toEqual(0); 
    });
});