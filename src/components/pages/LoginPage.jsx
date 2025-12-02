import React, { useState } from 'react';
import { Container, Form, Button, Card, Tab, Tabs, Alert } from 'react-bootstrap';
import { userService } from '../../services/UserService';

// Verificar si es mayor de 18
function isOver18(dateString) {
  const today = new Date();
  const birthDate = new Date(dateString);

  let age = today.getFullYear() - birthDate.getFullYear();

  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18;
}

export const LoginPage = () => {
  const [key, setKey] = useState('login');

  // LOGIN
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // REGISTRO
  const [regNombre, setRegNombre] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regDOB, setRegDOB] = useState('');

  // Mensajes
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);

  // ------------------------
  // LOGIN SUBMIT
  // ------------------------
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    try {
      const user = await userService.login(loginEmail, loginPassword);
      setInfo(`Bienvenido ${user.nombre}`);

      // Redirigir si quieres:
      // window.location.href = "/";
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };

  // ------------------------
  // REGISTRO SUBMIT
  // ------------------------
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!isOver18(regDOB)) {
      setError("Debes ser mayor de 18 años para registrarte.");
      return;
    }

    try {
      const usuario = await userService.register({
        nombre: regNombre,
        email: regEmail,
        password: regPassword,
        fechaNacimiento: regDOB,
      });

      setInfo(`Usuario ${usuario.nombre} registrado exitosamente`);
      setKey("login");

      // limpiar campos
      setRegNombre("");
      setRegEmail("");
      setRegPassword("");
      setRegDOB("");
    } catch (err) {
      setError("No se pudo registrar. ¿El correo ya existe?");
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Cuenta Level-Up Gamer</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {info && <Alert variant="success">{info}</Alert>}

          <Tabs
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
            justify
          >
            {/* -----------------------
                LOGIN TAB
            ----------------------- */}
            <Tab eventKey="login" title="Iniciar Sesión">
              <Form onSubmit={handleLoginSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="w-100" variant="success">
                  Iniciar Sesión
                </Button>
              </Form>
            </Tab>

            {/* -----------------------
                REGISTER TAB
            ----------------------- */}
            <Tab eventKey="register" title="Registrarse">
              <Form onSubmit={handleRegisterSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre completo</Form.Label>
                  <Form.Control
                    type="text"
                    value={regNombre}
                    onChange={(e) => setRegNombre(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Fecha de nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    value={regDOB}
                    onChange={(e) => setRegDOB(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button type="submit" className="w-100" variant="primary">
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
