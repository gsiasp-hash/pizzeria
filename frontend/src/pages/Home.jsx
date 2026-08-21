import { useContext } from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
import { PizzasContext } from "../contexts/Pizzas.context";

export default function Home() {
  const { pizzas, loading, error } = useContext(PizzasContext);

  return (
    <>
      <Header />
      <main className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <p className="col-span-full text-center text-lg font-bold text-crust-500">
            Cargando pizzas...
          </p>
        ) : error ? (
          <p className="col-span-full text-center text-lg font-bold text-tomato-600">
            {error}
          </p>
        ) : pizzas.length === 0 ? (
          <p className="col-span-full text-center text-lg font-bold text-crust-500">
            No se encontraron pizzas.
          </p>
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
      </main>
    </>
  );
}
