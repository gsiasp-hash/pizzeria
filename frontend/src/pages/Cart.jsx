import { useState, useContext } from "react";
import { TotalContext } from "../contexts/Cart.context";
import toast from "react-hot-toast";
import UserContext from "../contexts/User.context";

export default function Cart() {
  const { cartItems, setCartItems, total } = useContext(TotalContext);
  const { isLoggedIn, token } = useContext(UserContext);

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      toast.error("Necesitas iniciar sesión para pagar");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/checkouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    <div className="py-5 w-75 mx-auto d-flex flex-column gap-4">
      <h2 className="fs-4">Detalles del pedido:</h2>
      <div>
        {cartItems.length === 0 ? (
          <p className="text-center fw-bold">El carrito está vacío.</p>
        ) : (
          <ul className="list-group list-group-flush d-flex flex-column gap-3 py-3">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="d-flex align-items-center justify-content-between gap-3 p-3 border rounded"
              >
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="rounded"
                    style={{
                      width: "4rem",
                      height: "4rem",
                      objectFit: "cover",
                    }}
                  />
                  <div>
                    <p className="mb-1 fw-bold text-capitalize">{item.name}</p>
                    <p className="mb-0 text-muted">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      toast.error("Pizza eliminada del carrito");
                      handleDecrement(item.id);
                    }}
                  >
                    -
                  </button>
                  <span className="fs-5">{item.count}</span>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      toast.success("Pizza añadida al carrito");
                      handleIncrement(item.id);
                    }}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <div className="d-flex flex-column align-items-end gap-3 mt-4">
          <h3>Total: ${total.toLocaleString()}</h3>
          {!isLoggedIn && (
            <button className="btn btn-dark disabled">Pagar</button>
          )}
          {isLoggedIn && (
            <button className="btn btn-dark" onClick={handleCheckout}>
              Pagar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
