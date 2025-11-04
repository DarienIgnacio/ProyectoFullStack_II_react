// src/services/CartService.spec.js
import { CartService } from './CartService';

describe('CartService', () => {
    let cartService;

    beforeEach(() => {
        cartService = new CartService();
        // Limpiar localStorage antes de cada test
        localStorage.clear();
    });

    // PRUEBA 1: Cálculo del subtotal
    it('debe calcular el subtotal correctamente para múltiples ítems', () => {
        const items = [
            { id: 1, cantidad: 2, precio: 50000 },
            { id: 2, cantidad: 1, precio: 30000 }
        ];
        const subtotal = cartService.calculateSubtotal(items);
        expect(subtotal).toBe(130000);
    });

    // PRUEBA 2: Subtotal con carrito vacío
    it('debe retornar 0 cuando el carrito está vacío', () => {
        const subtotal = cartService.calculateSubtotal([]);
        expect(subtotal).toBe(0);
    });

    // PRUEBA 3: Agregar item al carrito
    it('debe incrementar la cantidad del ítem existente si se añade de nuevo', () => {
        const initialCart = [{ id: 1, cantidad: 2, precio: 50000 }];
        const existingItem = { id: 1, precio: 50000 };
        
        const updatedCart = cartService.addItem(initialCart, existingItem, 1);
        
        expect(updatedCart.length).toBe(1);
        expect(updatedCart[0].cantidad).toBe(3);
    });

    // PRUEBA 4: Agregar nuevo item al carrito
    it('debe agregar nuevo item cuando no existe', () => {
        const initialCart = [{ id: 1, cantidad: 1, precio: 50000 }];
        const newItem = { id: 2, precio: 30000 };
        
        const updatedCart = cartService.addItem(initialCart, newItem, 2);
        
        expect(updatedCart.length).toBe(2);
        expect(updatedCart[1].id).toBe(2);
        expect(updatedCart[1].cantidad).toBe(2);
    });

    // PRUEBA 5: Cálculo de totales con envío gratis
    it('debe calcular envío gratis cuando subtotal supera el umbral', () => {
        const items = [{ id: 1, cantidad: 1, precio: 250000 }];
        const totals = cartService.calculateTotals(items);
        
        expect(totals.shipping).toBe('Gratis');
        expect(totals.total).toBe('CLP $250.000');
    });

    // PRUEBA 6: Cálculo de totales con envío normal
    it('debe calcular envío normal cuando subtotal no supera el umbral', () => {
        const items = [{ id: 1, cantidad: 1, precio: 50000 }];
        const totals = cartService.calculateTotals(items);
        
        expect(totals.shipping).toBe('CLP $5.000');
        expect(totals.total).toBe('CLP $55.000');
    });

    // PRUEBA 7: Guardar y cargar carrito
    it('debe guardar y cargar el carrito del localStorage', () => {
        const testCart = [{ id: 1, cantidad: 1, precio: 50000 }];
        
        cartService.saveCart(testCart);
        const loadedCart = cartService.loadCart();
        
        expect(loadedCart).toEqual(testCart);
    });

    // PRUEBA 8: Cargar carrito vacío cuando no hay datos
    it('debe retornar array vacío cuando no hay carrito guardado', () => {
        const loadedCart = cartService.loadCart();
        expect(loadedCart).toEqual([]);
    });

    // PRUEBA 9: Limpiar carrito
    it('debe limpiar el carrito del localStorage', () => {
        const testCart = [{ id: 1, cantidad: 1, precio: 50000 }];
        cartService.saveCart(testCart);
        
        cartService.clearCart();
        const loadedCart = cartService.loadCart();
        
        expect(loadedCart).toEqual([]);
    });
});