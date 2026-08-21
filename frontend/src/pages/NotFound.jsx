import { NavLink } from "react-router";
import { Pizza } from "lucide-react";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
      <span className="mb-6 grid size-20 place-items-center rounded-full bg-cheese-100 text-cheese-600">
        <Pizza className="size-10" />
      </span>
      <h1 className="text-6xl font-extrabold tracking-tight text-tomato-600">
        404
      </h1>
      <p className="mt-3 text-xl font-bold text-crust-950">
        La página que buscas no existe.
      </p>
      <p className="mt-2 font-semibold text-crust-500">
        Vuelve a la página de inicio y explora nuestras deliciosas pizzas.
      </p>
      <NavLink
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-tomato-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-tomato-200 transition-colors hover:bg-tomato-700"
      >
        Volver al inicio
      </NavLink>
    </main>
  );
}
