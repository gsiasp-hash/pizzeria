import React from "react";
import { NavLink } from "react-router";

export default function NotFound() {
  return (
    <div className="container py-5 d-flex flex-column align-items-center justify-content-center text-center">
      <h1 className="display-4 mb-3">404</h1>
      <p className="fs-5 mb-4">La página que buscas no existe.</p>
      <p className="text-muted">
        Vuelve a la página de inicio y explora nuestras deliciosas pizzas.
      </p>
      <NavLink className="btn btn-primary mt-4" to="/">
        Volver al inicio
      </NavLink>
    </div>
  );
}
