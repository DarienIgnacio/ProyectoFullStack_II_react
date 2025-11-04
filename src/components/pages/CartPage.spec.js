// src/components/pages/CartPage.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CartPage } from './CartPage';

describe('CartPage', () => {
  const mockProps = {
    cartItems: [
      { 
        id: 1, 
        nombre: 'Audífonos Gamer', 
        precio: 79990, 
        cantidad: 1,
        categoria: 'perifericos'
      }
    ],
    cartTotals: { 
      subtotal: 'CLP $79.990', 
      shipping: 'CLP $5.000', 
      total: 'CLP $84.990'
    },
    updateQuantity: jasmine.createSpy('updateQuantity'),
    removeFromCart: jasmine.createSpy('removeFromCart'),
    checkout: jasmine.createSpy('checkout')
  };

  beforeEach(() => {
    // Resetear los spies antes de cada test
    mockProps.updateQuantity.calls?.reset();
    mockProps.removeFromCart.calls?.reset();
    mockProps.checkout.calls?.reset();
  });

  it('debe renderizar el carrito con productos', () => {
    render(
      <BrowserRouter>
        <CartPage {...mockProps} />
      </BrowserRouter>
    );
    
    // Verificar el título principal
    expect(screen.getByText('🛒 Carrito de Compras')).toBeTruthy();
    
    // Verificar el botón de pago
    expect(screen.getByRole('button', { name: /Pagar Ahora/i })).toBeTruthy();
    
    // Buscar los totales en el contenido del documento
    const allText = document.body.textContent || '';
    expect(allText).toContain('79.990');
    expect(allText).toContain('84.990');
  });

  it('debe mostrar carrito vacío cuando no hay items', () => {
    const emptyProps = {
      ...mockProps,
      cartItems: [],
      cartTotals: { 
        subtotal: 'CLP $0', 
        shipping: 'CLP $0', 
        total: 'CLP $0' 
      }
    };

    render(
      <BrowserRouter>
        <CartPage {...emptyProps} />
      </BrowserRouter>
    );
    
    // Verificar el mensaje de carrito vacío
    expect(screen.getByText('Tu Carrito Está Vacío 😔')).toBeTruthy();
    expect(screen.getByText('Agrega productos para subir de nivel tu equipo.')).toBeTruthy();
    
    const irAProductosButton = screen.getByRole('button', { name: /Ir a Productos/i });
    expect(irAProductosButton).toBeTruthy();
    expect(irAProductosButton.getAttribute('href')).toBe('/productos');
  });

  it('debe llamar a checkout cuando se hace clic en Pagar Ahora', () => {
    render(
      <BrowserRouter>
        <CartPage {...mockProps} />
      </BrowserRouter>
    );

    const payButton = screen.getByRole('button', { name: /Pagar Ahora/i });
    fireEvent.click(payButton);

    expect(mockProps.checkout).toHaveBeenCalled();
    expect(mockProps.checkout).toHaveBeenCalledTimes(1);
  });

  it('debe mostrar los textos del resumen correctamente', () => {
    render(
      <BrowserRouter>
        <CartPage {...mockProps} />
      </BrowserRouter>
    );

    // Verificar que los textos del resumen están presentes
    expect(screen.getByText('Resumen del Pedido')).toBeTruthy();
    expect(screen.getByText('Subtotal:')).toBeTruthy();
    expect(screen.getByText('Envío:')).toBeTruthy();
    
    // Buscar "Total a Pagar" en el contenido
    const allText = document.body.textContent || '';
    expect(allText).toContain('Total a Pagar');
  });

  it('debe renderizar múltiples items del carrito', () => {
    const multipleItemsProps = {
      ...mockProps,
      cartItems: [
        { 
          id: 1, 
          nombre: 'Audífonos Gamer', 
          precio: 79990, 
          cantidad: 1,
          categoria: 'accesorios'
        },
        { 
          id: 2, 
          nombre: 'Teclado Mecánico', 
          precio: 59990, 
          cantidad: 2,
          categoria: 'perifericos'
        }
      ],
      cartTotals: { 
        subtotal: 'CLP $199.970', 
        shipping: 'Gratis', 
        total: 'CLP $199.970' 
      }
    };

    render(
      <BrowserRouter>
        <CartPage {...multipleItemsProps} />
      </BrowserRouter>
    );

    // Verificar que se muestran los totales correctos para múltiples items
    const allText = document.body.textContent || '';
    expect(allText).toContain('199.970');
    expect(allText).toContain('Gratis');
  });
});