// src/components/pages/ProductDetail.jsx
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

// Recibe props: addToCart y productService
export const ProductDetail = ({ addToCart, productService }) => {
    useEffect(() => {
        const service = new ProductService();
        service.getProductById(id).then(data => setProducto(data));
    }, [id]);

    const { id } = useParams();
    const product = productService.getProductById(id);

    if (!product) {
        return (
            <Container className="my-5 text-center">
                <h2 className="orbitron-font">Producto No Encontrado ❌</h2>
            </Container>
        );
    }
    
    const formattedPrice = `CLP $${product.precio.toLocaleString('es-CL')}`;

    return (
        <Container className="my-5 product-detail-container">
            <h2 className="section-title text-center">{product.nombre}</h2>
            <div className="d-flex flex-wrap flex-md-nowrap gap-5">
                <div className="product-image">
                    <img src={product.imagen} alt={product.nombre} style={{maxWidth: '100%', borderRadius: '10px'}} />
                </div>
                <div className="product-info flex-grow-1">
                    <p className="price-text" style={{fontSize: '1.8em', color: 'var(--color-accent)'}}>{formattedPrice}</p>
                    <p>Categoría: {product.categoria.toUpperCase()}</p>
                    <p>{product.descripcion}</p>
                    
                    <Button 
                        variant="primary" 
                        className="btn-add-cart mt-3" 
                        onClick={() => addToCart(product.id, 1)}
                    >
                        <i className="fas fa-shopping-cart"></i> Agregar al Carrito
                    </Button>
                </div>
            </div>
        </Container>
    );
};