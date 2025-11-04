// src/services/ProductService.spec.js
import { ProductService } from './ProductService';
import { PRODUCTOS_BASE } from '../data/products';

describe('ProductService', () => {
    let productService;

    beforeEach(() => {
        productService = new ProductService();
    });

    // PRUEBA 1: Obtener todos los productos
    it('debe retornar todos los productos', () => {
        const products = productService.getAllProducts();
        expect(products.length).toBe(PRODUCTOS_BASE.length);
        expect(products).toEqual(PRODUCTOS_BASE);
    });

    // PRUEBA 2: Obtener producto por ID existente
    it('debe retornar producto cuando el ID existe', () => {
        const product = productService.getProductById('1');
        expect(product).toBeTruthy();
        expect(product.id).toBe(1);
        expect(product.nombre).toBe('Audífonos HyperX Cloud II');
    });

    // PRUEBA 3: Retornar null cuando el ID no existe
    it('debe retornar null cuando el ID no existe', () => {
        const product = productService.getProductById('999');
        expect(product).toBeNull();
    });

    // PRUEBA 4: Obtener productos destacados
    it('debe retornar productos destacados', () => {
        const featured = productService.getFeaturedProducts(2);
        expect(featured.length).toBe(2);
        expect(featured[0].id).toBe(1);
        expect(featured[1].id).toBe(2);
    });

    // PRUEBA 5: Obtener productos por categoría
    it('debe filtrar productos por categoría', () => {
        const accesorios = productService.getProductsByCategory('accesorios');
        expect(accesorios.length).toBeGreaterThan(0);
        accesorios.forEach(product => {
            expect(product.categoria).toBe('accesorios');
        });
    });

    // PRUEBA 6: Retornar todos los productos cuando categoría es "todos"
    it('debe retornar todos los productos cuando categoría es "todos"', () => {
        const todos = productService.getProductsByCategory('todos');
        expect(todos.length).toBe(PRODUCTOS_BASE.length);
    });

    // PRUEBA 7: Búsqueda de productos
    it('debe buscar productos por término', () => {
        const resultados = productService.searchProducts('gamer');
        expect(resultados.length).toBeGreaterThan(0);
        resultados.forEach(product => {
            expect(product.nombre.toLowerCase()).toContain('gamer');
        });
    });

    // PRUEBA 8: Retornar todos los productos cuando búsqueda está vacía
    it('debe retornar todos los productos cuando búsqueda está vacía', () => {
        const resultados = productService.searchProducts('');
        expect(resultados.length).toBe(PRODUCTOS_BASE.length);
    });

    // PRUEBA 9: Búsqueda case insensitive
    it('debe realizar búsqueda case insensitive', () => {
        const resultados1 = productService.searchProducts('GAMER');
        const resultados2 = productService.searchProducts('gamer');
        expect(resultados1.length).toBe(resultados2.length);
    });
});