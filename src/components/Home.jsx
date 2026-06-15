import React, { useEffect, useState } from "react";
import Header from "./Header";
import CardPizza from "./CardPizza";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/pizzas")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al cargar pizzas: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPizzas(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <div className="d-flex flex-wrap justify-content-center gap-4 my-5">
        {loading ? (
          <p className="fs-5 text-center w-100">Cargando pizzas...</p>
        ) : error ? (
          <p className="fs-5 text-center text-danger w-100">{error}</p>
        ) : pizzas.length === 0 ? (
          <p className="fs-5 text-center w-100">No se encontraron pizzas.</p>
        ) : (
          pizzas.map((pizza) => (
            <CardPizza
              key={pizza.id}
              name={pizza.name}
              price={pizza.price}
              ingredients={pizza.ingredients}
              img={pizza.img}
              desc={pizza.desc}
            />
          ))
        )}
      </div>
    </>
  );
}
