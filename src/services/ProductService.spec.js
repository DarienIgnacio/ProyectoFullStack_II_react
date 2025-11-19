import { ProductService } from './ProductService';
import { PRODUCTOS_BASE } from '../data/products';

describe('ProductService', () => {
    let service;

    beforeEach(() => {
        service = new ProductService();
    });

    it('getAllProducts debe retornar todos los productos', () => {
        const result = service.getAllProducts();

        expect(result.length).toBe(PRODUCTOS_BASE.length);
    });

    it('getProductById debe encontrar un producto por ID', () => {
        const mockId = PRODUCTOS_BASE[0].id;

        const result = service.getProductById(mockId);

        expect(result).toBeDefined();
        expect(result.id).toBe(mockId);
    });

    it('getFeaturedProducts debe retornar N productos', () => {
        const result = service.getFeaturedProducts(3);

        expect(result.length).toBe(3);
    });

    it('getProductsByCategory debe filtrar correctamente', () => {
        const categoria = PRODUCTOS_BASE[0].categoria;

        const result = service.getProductsByCategory(categoria);

        expect(result.every(p => p.categoria === categoria)).toBeTrue();
    });

    it('searchProducts debe buscar por nombre', () => {
        const nombre = PRODUCTOS_BASE[0].nombre.split(' ')[0];

        const result = service.searchProducts(nombre);

        expect(result.length).toBeGreaterThan(0);
    });

        it('getProductById debe retornar null si el producto no existe', () => {
        const result = service.getProductById('id-inexistente');
        expect(result).toBeNull();
    });

    it('getFeaturedProducts debe retornar todos si se pide un número mayor al total', () => {
        const total = PRODUCTOS_BASE.length;
        const result = service.getFeaturedProducts(total + 5);

        expect(result.length).toBe(total);
    });

    it('getProductsByCategory debe retornar arreglo vacío si la categoría no existe', () => {
        const result = service.getProductsByCategory('categoria-que-no-existe');

        expect(result.length).toBe(0);
    });


    it('searchProducts debe retornar arreglo vacío si no hay coincidencias', () => {
        const result = service.searchProducts('zzzzzzzzzzzz');
        expect(result.length).toBe(0);
    });
});
