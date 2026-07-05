import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

export default function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    fetch(`http://localhost:5000/api/pizzas/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`No se encontró la pizza: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPizza(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="container py-5">Cargando pizza...</div>;
  }

  if (error) {
    return (
      <div className="container py-5">
        <p className="text-danger">{error}</p>
        <Link to="/" className="btn btn-primary">
          Volver al menú
        </Link>
      </div>
    );
  }

  if (!pizza) {
    return (
      <div className="container py-5">
        <p className="text-center">No hay información de la pizza.</p>
        <Link to="/" className="btn btn-primary">
          Volver al menú
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card mb-4">
            <img
              src={pizza.img}
              className="card-img-top object-fit-cover"
              style={{ height: "360px" }}
              alt={pizza.name}
            />
            <div className="card-body">
              <h2 className="card-title">{pizza.name}</h2>
              <p className="card-text fw-semibold">
                Precio: ${pizza.price.toLocaleString()}
              </p>
              <p className="card-text">{pizza.desc}</p>
              <h5>Ingredientes</h5>
              <ul className="list-group list-group-flush mb-3">
                {pizza.ingredients?.map((ingredient) => (
                  <li className="list-group-item" key={ingredient}>
                    {ingredient}
                  </li>
                ))}
              </ul>
              <Link to="/" className="btn btn-primary me-2">
                Volver al menú
              </Link>
              <Link to="/cart" className="btn btn-dark">
                Ir al carrito
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
