// src/components/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Card, Tab, Tabs, Alert } from 'react-bootstrap';
import { UserService } from '../../services/UserService';

const userService = new UserService();

// Función de utilidad para validar la edad
const isOver18 = (dob) => {
    if (!dob) return false;
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    // Ajuste de edad si aún no ha cumplido años este mes
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
};

export const LoginPage = () => {
    const [key, setKey] = useState('login'); 
    
    // Estados para los formularios de Login (sin cambios)
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    
    // Estados para los formularios de Registro (NUEVO CAMPO DE FECHA)
    const [regNombre, setRegNombre] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [regDOB, setRegDOB] = useState(''); // Estado para Date of Birth (Fecha de Nacimiento)
    
    const [error, setError] = useState(null); // Estado para mostrar mensajes de error

    // Lógica de inicio de sesión (sin cambios importantes)
const handleLoginSubmit = async (e) => {
e.preventDefault();
setError(null);

    try {
        const result = await userService.login(loginEmail, loginPassword);

        // Si backend retorna objeto Usuario
        if (result && result.id) {
            alert(`Bienvenido, ${result.nombre}!`);
        } else {
            // Si backend retorna string de error
            setError(typeof result === 'string' ? result : 'Credenciales inválidas');
        }
    } catch (err) {
            console.error(err);
            setError('Error al intentar iniciar sesión.');
    }
};

    
const handleRegisterSubmit = async (e) => {
e.preventDefault();
setError(null);
    
    // 1. Validar edad
    if (!isOver18(regDOB)) {
        setError('Debes ser mayor de 18 años para registrarte en Level-Up Gamer.');
        return;
    }

    try {
        const result = await userService.register({
            nombre: regNombre,
            email: regEmail,
            password: regPassword,
            fechaNacimiento: regDOB
        });

        if (result && result.id) {
            alert('Usuario registrado correctamente. Ahora puedes iniciar sesión.');
            // limpiar formularios y volver a login
            setKey('login');
            setRegNombre('');
            setRegEmail('');
            setRegPassword('');
            setRegDOB('');
        } else {
            setError(typeof result === 'string' ? result : 'No se pudo registrar el usuario.');
        }
    } catch (err) {
        console.error(err);
        setError('Error al registrar usuario.');
    }
};



    return (
        <Container className="my-5" style={{ maxWidth: '500px' }}>
            <Card style={{ backgroundColor: 'var(--color-card-bg)', padding: '20px' }}>
                <Card.Body>
                    <h2 className="section-title text-center mb-4">Acceso Gamer</h2>

                    {/* Mostrar error si existe */}
                    {error && <Alert variant="danger" className="text-center">{error}</Alert>}

                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key} 
                        onSelect={(k) => { setKey(k); setError(null); }} // Limpiar error al cambiar de pestaña
                        className="mb-3 justify-content-center"
                        style={{ borderBottom: '1px solid var(--color-text-secondary)' }}
                    >
                        {/* PESTAÑA 1: INICIAR SESIÓN (Sin cambios de campos) */}
                        <Tab eventKey="login" title="Iniciar Sesión">
                            <Form onSubmit={handleLoginSubmit} className="mt-3">
                                {/* ... Campos de Login ... (Sin cambios) */}
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control type="email" placeholder="Ingresa tu email gamer" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Contraseña secreta" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-3">Entrar</Button>
                                <div className="text-center mt-3"><a href="#" style={{ color: 'var(--color-accent)' }}>¿Olvidaste tu contraseña?</a></div>
                            </Form>
                        </Tab>

                        {/* PESTAÑA 2: REGISTRARSE (CON CAMPO DE FECHA) */}
                        <Tab eventKey="registro" title="Registro">
                            <Form onSubmit={handleRegisterSubmit} className="mt-3">
                                
                                <Form.Group className="mb-3" controlId="formRegNombre">
                                    <Form.Label>Nombre Completo</Form.Label>
                                    <Form.Control type="text" placeholder="Tu nombre de invocador" value={regNombre} onChange={(e) => setRegNombre(e.target.value)} required />
                                </Form.Group>
                                
                                {/* 🛑 CAMPO NUEVO: FECHA DE NACIMIENTO 🛑 */}
                                <Form.Group className="mb-3" controlId="formRegDOB">
                                    <Form.Label>Fecha de Nacimiento</Form.Label>
                                    <Form.Control 
                                        type="date" 
                                        value={regDOB}
                                        onChange={(e) => setRegDOB(e.target.value)}
                                        required
                                        // Establecer un límite superior de fecha (hoy) para evitar fechas futuras
                                        max={new Date().toISOString().split('T')[0]} 
                                        // Estilo para asegurar que el selector se vea en el tema oscuro
                                        style={{ backgroundColor: 'var(--color-primary)', color: 'white', borderColor: '#333' }}
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-3" controlId="formRegEmail">
                                    <Form.Label>Correo Electrónico</Form.Label>
                                    <Form.Control type="email" placeholder="Correo de registro" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formRegPassword">
                                    <Form.Label>Contraseña</Form.Label>
                                    <Form.Control type="password" placeholder="Crea una contraseña segura" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
                                </Form.Group>
                                
                                <Button 
                                    variant="accent" 
                                    type="submit" 
                                    className="w-100 mt-3" 
                                    style={{ backgroundColor: 'var(--color-accent)', border: 'none', color: 'black' }}
                                >
                                    Crear Cuenta
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
        </Container>
    );
};