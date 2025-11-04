// src/components/pages/LoginPage.spec.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LoginPage } from './LoginPage';

// ----------------------------------------------------
// MOCK y UTILIDADES DE PRUEBA
// ----------------------------------------------------

// 1. Mock de la función global 'alert' para evitar interrupciones en el runner
window.alert = jest.fn();

/**
 * Calcula una fecha de nacimiento (DOB) con 'yearsAgo' años de antigüedad
 * para asegurar que las pruebas de isOver18 sean estables.
 * @param {number} yearsAgo - El número de años de antigüedad que debe tener el usuario.
 * @returns {string} Fecha en formato 'YYYY-MM-DD'.
 */
const getTestDOB = (yearsAgo) => {
    // Usamos una fecha fija (2025-10-21) para la simulación, aunque Date() debería bastar
    // Si la prueba falla cerca del cumpleaños de la fecha 'today', esta simulación la estabiliza
    const today = new Date();
    // Retrocedemos el número de años
    today.setFullYear(today.getFullYear() - yearsAgo);
    
    // Formato YYYY-MM-DD
    return today.toISOString().split('T')[0];
};

// ----------------------------------------------------
// FUNCIÓN DE RENDER
// ----------------------------------------------------
const renderLoginPage = () => {
    return render(<LoginPage />);
};

describe('LoginPage Component - Pruebas de Registro y Validación de Edad', () => {
    // Variables comunes de formulario
    const NOMBRE = 'Neo Gamer';
    const EMAIL = 'neo@gamer.com';
    const PASSWORD = 'password123';
    
    // Función auxiliar para rellenar el formulario de registro
    const fillRegistrationForm = (dob) => {
        // Rellenar Nombre
        fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: NOMBRE } });
        // Rellenar Email
        fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: EMAIL } });
        // Rellenar Contraseña
        fireEvent.change(screen.getByLabelText(/Contraseña/i, { selector: 'input[type="password"]' }), { target: { value: PASSWORD } });
        // Rellenar Fecha de Nacimiento (DOB)
        fireEvent.change(screen.getByLabelText(/Fecha de Nacimiento/i), { target: { value: dob } });
    };

    // ------------------------------------------------
    // PRUEBA 1: Registro Exitoso (Mayor de 18)
    // ------------------------------------------------
    it('debe permitir el registro a mayores de 18, llamar a alert(), limpiar estados y cambiar a pestaña de login', () => {
        renderLoginPage();
        
        // 1. Cambiar a la pestaña de registro
        fireEvent.click(screen.getByText('Registro'));

        // 2. Establecer DOB (19 años de antigüedad = Mayor de 18)
        const DOB_OVER_18 = getTestDOB(19); 
        fillRegistrationForm(DOB_OVER_18);

        // 3. Simular el envío del formulario
        const submitButton = screen.getByRole('button', { name: /Crear Cuenta/i });
        fireEvent.click(submitButton);

        // ASERCIONES
        // A. Verificar que se llamó a la alerta de éxito (simulación de lógica de negocio)
        expect(window.alert).toHaveBeenCalledWith(
            expect.stringContaining(`Registrando nuevo usuario: ${NOMBRE}`)
        );

        // B. Verificar que el error NO se muestra
        expect(screen.queryByRole('alert')).toBeNull();

        // C. Verificar que la pestaña volvió a 'Iniciar Sesión'
        const loginTab = screen.getByRole('tab', { name: /Iniciar Sesión/i });
        expect(loginTab).toHaveAttribute('aria-selected', 'true');
    });

    // ------------------------------------------------
    // PRUEBA 2: Registro Fallido (Menor de 18)
    // ------------------------------------------------
    it('debe bloquear el registro a menores de 18, mostrar el mensaje de error y NO cambiar de pestaña', () => {
        renderLoginPage();
        
        // 1. Cambiar a la pestaña de registro
        fireEvent.click(screen.getByText('Registro'));
        
        // Asegurar que la pestaña actual sea 'Registro'
        const registroTab = screen.getByRole('tab', { name: /Registro/i });
        expect(registroTab).toHaveAttribute('aria-selected', 'true');

        // 2. Establecer DOB (17 años de antigüedad = Menor de 18)
        const DOB_UNDER_18 = getTestDOB(17);
        fillRegistrationForm(DOB_UNDER_18);

        // 3. Simular el envío del formulario
        const submitButton = screen.getByRole('button', { name: /Crear Cuenta/i });
        fireEvent.click(submitButton);

        // ASERCIONES
        // A. Verificar que se muestra el mensaje de error de edad
        const errorMessage = screen.getByRole('alert');
        expect(errorMessage).toHaveTextContent(
            'Debes ser mayor de 18 años para registrarte en Level-Up Gamer.'
        );

        // B. Verificar que NO se llamó a la alerta de registro (lógica de negocio no ejecutada)
        expect(window.alert).not.toHaveBeenCalledWith(
            expect.stringContaining('Registrando nuevo usuario')
        );

        // C. Verificar que la pestaña sigue siendo 'Registro'
        expect(registroTab).toHaveAttribute('aria-selected', 'true');
    });
});