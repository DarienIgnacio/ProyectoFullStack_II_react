import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';

// 1. Estilos de Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
// 2. Iconos de Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';
// 3. Tus estilos custom
import './styles.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

