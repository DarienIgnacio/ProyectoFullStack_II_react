// src/services/CartService.js

const STORAGE_KEY = 'cartItems';
const SHIPPING_COST = 5000;
const SHIPPING_FREE_THRESHOLD = 200000;

// Helper para formato CLP (CLP $59.990)
const formatCLP = (amount) => `CLP $${amount.toLocaleString('es-CL')}`;

export class CartService {
    // 🛑 MÉTODO AGREGADO PARA LA PRUEBA 1 🛑
    calculateSubtotal(cartItems) {
        if (!cartItems || cartItems.length === 0) return 0;
        return cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    }

    loadCart() {
        const storedCart = localStorage.getItem(STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    }

    saveCart(items) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }

    calculateTotals(cartItems) {
        // 🛑 AHORA USA EL MÉTODO calculateSubtotal 🛑
        const subtotalRaw = this.calculateSubtotal(cartItems);
        
        const shippingRaw = subtotalRaw > SHIPPING_FREE_THRESHOLD ? 0 : SHIPPING_COST;
        const totalPagarRaw = subtotalRaw + shippingRaw;

        return {
            subtotal: formatCLP(subtotalRaw),
            shipping: shippingRaw === 0 ? 'Gratis' : formatCLP(shippingRaw),
            total: formatCLP(totalPagarRaw),
            rawTotalItems: cartItems.reduce((sum, item) => sum + item.cantidad, 0) 
        };
    }

    // 🛑 MÉTODO AGREGADO PARA LA PRUEBA 2 🛑
    addItem(currentCart, newItem, quantity) {
        const existingItemIndex = currentCart.findIndex(item => item.id === newItem.id);

        if (existingItemIndex > -1) {
            // Producto existe: incrementa la cantidad (importante: evitar mutación directa)
            const newCart = [...currentCart];
            newCart[existingItemIndex] = { 
                ...newCart[existingItemIndex], 
                cantidad: newCart[existingItemIndex].cantidad + quantity 
            };
            return newCart;
        } else {
            // Producto nuevo: agrega al carrito
            return [...currentCart, { ...newItem, cantidad: quantity }];
        }
    }

    clearCart() {
        localStorage.removeItem(STORAGE_KEY);
    }
}