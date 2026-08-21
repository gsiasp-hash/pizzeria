import { useContext } from "react";
import { Link } from "react-router";
import { Eye, Plus } from "lucide-react";
import { TotalContext } from "../contexts/Cart.context";
import toast from "react-hot-toast";

export default function CardPizza({ name, price, ingredients, img, desc, id }) {
  const { addToCart } = useContext(TotalContext);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-cream-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-cheese-200/60">
      <div className="relative h-48 overflow-hidden">
        <img
          src={img}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-extrabold text-tomato-700 shadow-sm backdrop-blur">
          ${price.toLocaleString()}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="text-center text-xl font-extrabold capitalize tracking-tight text-crust-950">
          {name}
        </h3>

        <div className="text-center">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-widest text-cheese-600">
            Ingredientes
          </p>
          <ul className="flex flex-wrap justify-center gap-1.5">
            {ingredients.map((ingredient) => (
              <li
                key={ingredient}
                className="rounded-full bg-cream-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-crust-700"
              >
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        <p className="line-clamp-3 text-center text-sm leading-relaxed text-crust-500">
          {desc}
        </p>

        <div className="mt-auto flex items-center justify-center gap-3 pt-2">
          <Link
            to={`/pizza/${id}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-crust-200 bg-white px-4 py-2 text-sm font-bold text-crust-800 transition-colors hover:border-cheese-400 hover:bg-cheese-50 hover:text-cheese-700"
          >
            Ver más <Eye className="size-4" />
          </Link>
          <button
            type="button"
            onClick={() => {
              addToCart(id);
              toast.success("Pizza añadida al carrito");
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-tomato-600 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-tomato-200 transition-colors hover:bg-tomato-700"
          >
            Añadir <Plus className="size-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
