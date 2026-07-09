import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
import { useContext } from "react";
import { PizzasContext } from "../contexts/Pizzas.context";

export default function Home() {

  const { pizzas, loading, error} = useContext(PizzasContext);

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
              id={pizza.id}
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
