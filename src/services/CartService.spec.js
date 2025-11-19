import { CartService } from './CartService';

describe('CartService', () => {
    let service;

    beforeEach(() => {
        service = new CartService();

        spyOn(localStorage, 'getItem').and.returnValue(null);
        spyOn(localStorage, 'setItem');
        spyOn(localStorage, 'removeItem');
    });

    it('loadCart debe retornar [] si localStorage está vacío', () => {
        const result = service.loadCart();
        expect(result).toEqual([]);
    });

    it('saveCart debe guardar items en localStorage', () => {
        service.saveCart([{ id: 1 }]);

        expect(localStorage.setItem).toHaveBeenCalled();
    });

    it('calculateSubtotal debe sumar correctamente', () => {
        const subtotal = service.calculateSubtotal([
            { precio: 1000, cantidad: 2 }, // 2000
            { precio: 500, cantidad: 3 }   // 1500
        ]);

        expect(subtotal).toBe(3500);
    });

    it('addItem debe agregar nuevo item si no existe', () => {
        const cart = [];

        const updated = service.addItem(cart, { id: 1, precio: 100 }, 2);

        expect(updated.length).toBe(1);
        expect(updated[0].cantidad).toBe(2);
    });

    it('addItem debe incrementar cantidad si ya existe', () => {
        const cart = [{ id: 1, precio: 100, cantidad: 1 }];

        const updated = service.addItem(cart, { id: 1, precio: 100 }, 3);

        expect(updated[0].cantidad).toBe(4);
    });

    it('clearCart debe llamar removeItem', () => {
        service.clearCart();
        expect(localStorage.removeItem).toHaveBeenCalled();
    });

    it('calculateTotals debe aplicar envío gratis cuando subtotal supera el umbral', () => {
    const result = service.calculateTotals([
        { precio: 200000, cantidad: 2 }  // subtotal 400.000
    ]);

    expect(result.shipping).toBe('Gratis');
    });
});
