import { useContext } from "react";
import { useNavigate } from "react-router";
import { LogIn, Minus, Plus, ShoppingBasket } from "lucide-react";
import { TotalContext } from "../contexts/Cart.context";
import toast from "react-hot-toast";
import UserContext from "../contexts/User.context";

export default function Cart() {
  const { cartItems, setCartItems, total } = useContext(TotalContext);
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/checkouts`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: cartItems }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error en el servidor");
      }

      toast.success("Pago realizado con éxito");
      setCartItems([]);
    } catch (err) {
      toast.error(err.message || "Error al procesar el pago");
    }
  };

  const handlePay = () => {
    if (cartItems.length === 0) {
      toast.error("Tu carrito está vacío, agrega pizzas para poder pagar");
      return;
    }
    if (!isLoggedIn) {
      toast.custom(
        (t) => (
          <div className="flex items-center gap-3 rounded-2xl border border-cream-200 bg-white p-4 shadow-xl shadow-crust-950/10">
            <LogIn className="size-5 shrink-0 text-tomato-600" />
            <p className="text-sm font-bold text-crust-950">
              Inicia sesión para continuar con el pago
            </p>
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t.id);
                navigate("/login");
              }}
              className="cursor-pointer ml-auto shrink-0 rounded-full bg-tomato-600 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-tomato-700"
            >
              Iniciar sesión
            </button>
          </div>
        ),
        { duration: 6000 },
      );
      return;
    }
    handleCheckout();
  };

  const handleIncrement = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item,
        )
        .filter((item) => item.count > 0),
    );
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-12">
      <h2 className="text-2xl font-extrabold tracking-tight text-crust-950">
        Detalles del pedido:
      </h2>

      {cartItems.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-crust-300 bg-white/60 p-10 text-center">
          <ShoppingBasket className="mx-auto mb-3 size-10 text-cheese-400" />
          <p className="font-bold text-crust-500">El carrito está vacío.</p>
        </div>
      ) : (
        <ul className="flex flex-col gap-3">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-cream-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.img}
                  alt={item.name}
                  className="size-16 rounded-xl object-cover"
                />
                <div>
                  <p className="font-extrabold capitalize text-crust-950">
                    {item.name}
                  </p>
                  <p className="text-sm font-semibold text-tomato-600">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Quitar una unidad"
                  onClick={() => {
                    toast.error("Pizza eliminada del carrito");
                    handleDecrement(item.id);
                  }}
                  className="grid size-9 place-items-center rounded-full border border-tomato-200 text-tomato-600 transition-colors hover:bg-tomato-50"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-6 text-center text-lg font-extrabold">
                  {item.count}
                </span>
                <button
                  type="button"
                  aria-label="Agregar una unidad"
                  onClick={() => {
                    toast.success("Pizza añadida al carrito");
                    handleIncrement(item.id);
                  }}
                  className="grid size-9 place-items-center rounded-full border border-basil-300 text-basil-700 transition-colors hover:bg-basil-50"
                >
                  <Plus className="size-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col items-end gap-3 rounded-2xl bg-cream-200/70 p-5">
        <p className="text-2xl font-extrabold text-crust-950">
          Total:{" "}
          <span className="text-tomato-600">${total.toLocaleString()}</span>
        </p>
        <button
          type="button"
          onClick={handlePay}
          className={`inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold text-white shadow-md transition-colors ${
            isLoggedIn
              ? "bg-tomato-600 shadow-tomato-200 hover:bg-tomato-700"
              : "cursor-pointer bg-crust-400 opacity-70 hover:opacity-100"
          }`}
        >
          Pagar
        </button>
      </div>
    </main>
  );
}
