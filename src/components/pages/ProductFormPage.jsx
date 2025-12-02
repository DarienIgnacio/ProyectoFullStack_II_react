// src/components/pages/ProductFormPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Card, Form, Button } from "react-bootstrap";
import { ProductService } from "../../services/ProductService";

export const ProductFormPage = () => {
  const { id } = useParams(); // si existe -> modo edición
  const isEdit = !!id;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    categoria: "",
    precio: "",
    imagen: "",
  });

  useEffect(() => {
    if (isEdit) {
      // cargar datos desde el backend
      ProductService.getById(id)
        .then((data) => {
          setFormData({
            nombre: data.nombre || "",
            categoria: data.categoria || "",
            precio: data.precio ?? "",
            imagen: data.imagen || "",
          });
        })
        .catch((err) => {
          console.error("Error cargando producto", err);
          alert("No se pudo cargar el producto.");
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "precio" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await ProductService.update(id, formData);
        alert("Producto actualizado correctamente.");
      } else {
        await ProductService.create(formData);
        alert("Producto creado correctamente.");
      }
      navigate("/admin/productos");
    } catch (err) {
      console.error("Error guardando producto", err);
      alert("No se pudo guardar el producto.");
    }
  };

  return (
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <Card style={{ backgroundColor: "var(--color-card-bg)", padding: 20 }}>
        <Card.Body>
          <h2 className="section-title text-center mb-4">
            {isEdit ? "Editar Producto" : "Nuevo Producto"}
          </h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formNombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCategoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPrecio">
              <Form.Label>Precio (CLP)</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formImagen">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
              />
            </Form.Group>

            <div className="d-flex justify-content-between mt-4">
              <Button variant="secondary" onClick={() => navigate("/admin/productos")}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ minWidth: 140 }}
              >
                {isEdit ? "Guardar cambios" : "Crear producto"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
