// src/App.spec.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mock de alert
const alertSpy = jasmine.createSpy('alert');

describe('App Component', () => {

  beforeEach(() => {
    spyOn(window, 'alert').and.callFake(alertSpy);
    alertSpy.calls.reset();
    localStorage.clear();
  });

  const renderApp = () => render(<App />);

  // 🧪 PRUEBA 1: Render inicial
  it('debe renderizar correctamente el título principal', () => {
    renderApp();
    expect(screen.getByText('LEVEL-UP GAMER')).toBeTruthy();
  });

  // 🧪 PRUEBA 2: Navegación a productos
  it('debe navegar a la página de productos', async () => {
    renderApp();
    fireEvent.click(screen.getByRole('link', { name: 'Productos' }));

    await waitFor(() => {
      expect(screen.getByText(/Catálogo Completo|🎮/i)).toBeTruthy();
    });
  });

  // 🧪 PRUEBA 3: Navegación a categorías
  it('debe navegar correctamente a la página de categorías', async () => {
    renderApp();

    // Toma el primer link "Categorías" del navbar
    const links = screen.getAllByText('Categorías');
    fireEvent.click(links[0]);

    await waitFor(() => {
      // Busca específicamente el h2 del contenido
      const headers = screen.getAllByRole('heading', { name: /Categorías para Subir de Nivel/i });
      expect(headers.length).toBeGreaterThan(0);
    });
  });

  // 🧪 PRUEBA 4: Agregar producto al carrito
  it('debe agregar producto al carrito desde la página de inicio', async () => {
    renderApp();

    // Ir a productos primero (ya que el home no los muestra)
    fireEvent.click(screen.getByRole('link', { name: 'Productos' }));

    // Esperar a que se muestren los botones
    const addButtons = await screen.findAllByRole('button', { name: /Agregar/i });
    fireEvent.click(addButtons[0]);

    // Verificar que el contador del carrito cambió a "1"
    await waitFor(() => {
      expect(screen.getByText('1')).toBeTruthy();
    });
  });

  // 🧪 PRUEBA 5: Carrito vacío inicialmente
  it('debe mostrar carrito vacío inicialmente', async () => {
    renderApp();

    // Selecciona el enlace del carrito por su href
    const carritoLink = document.querySelector('a[href="/carrito"]');
    expect(carritoLink).toBeTruthy();

    fireEvent.click(carritoLink);

    await waitFor(() => {
      expect(screen.getByText(/Tu Carrito Está Vacío/i)).toBeTruthy();
    });
  });
});
