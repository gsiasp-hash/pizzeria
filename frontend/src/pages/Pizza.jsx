import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { ArrowLeft, ShoppingBasket } from "lucide-react";
import { TotalContext } from "../contexts/Cart.context";
import toast from "react-hot-toast";

export default function Pizza() {
  const { id } = useParams();
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(TotalContext);

  useEffect(() => {
    if (!id) return;

    let active = true;
    const fetchPizza = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/pizzas/${id}`,
        );
        if (!response.ok) {
          throw new Error(`No se encontró la pizza: ${response.status}`);
        }
        const data = await response.json();
        if (active) {
          setPizza(data);
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchPizza();
    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-16 text-center text-lg font-bold text-crust-500">
        Cargando pizza...
      </main>
    );
  }

  if (error || !pizza) {
    return (
      <main className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-16 text-center">
        <p className="text-lg font-bold text-tomato-600">
          {error || "No hay información de la pizza."}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full bg-tomato-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-tomato-200 transition-colors hover:bg-tomato-700"
        >
          <ArrowLeft className="size-4" /> Volver al menú
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-12">
      <article className="overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-xl shadow-cheese-100">
        <div className="grid md:grid-cols-2">
          <div className="relative h-64 md:h-full">
            <img
              src={pizza.img}
              alt={pizza.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col gap-5 p-8">
            <h1 className="text-3xl font-extrabold capitalize tracking-tight text-crust-950">
              {pizza.name}
            </h1>

            <p className="text-3xl font-extrabold text-tomato-600">
              ${pizza.price.toLocaleString()}
            </p>

            <p className="leading-relaxed text-crust-500">{pizza.desc}</p>

            <div>
              <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-cheese-600">
                Ingredientes
              </p>
              <ul className="flex flex-wrap gap-1.5">
                {pizza.ingredients?.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="rounded-full bg-cream-100 px-3 py-1 text-xs font-semibold capitalize text-crust-700"
                  >
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-2 rounded-full border border-crust-200 px-5 py-2.5 text-sm font-bold text-crust-800 transition-colors hover:border-cheese-400 hover:bg-cheese-50 hover:text-cheese-700"
              >
                <ArrowLeft className="size-4" /> Volver al menú
              </Link>
              <button
                type="button"
                onClick={() => {
                  toast.success("Pizza añadida al carrito");
                  addToCart(pizza.id);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-tomato-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-tomato-200 transition-colors hover:bg-tomato-700"
              >
                <ShoppingBasket className="size-4" /> Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
