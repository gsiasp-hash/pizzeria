import React, { useState } from "react";

const initialCart = [
  {
    id: "P001",
    name: "napolitana",
    price: 5950,
    count: 1,
    img: "https://i.pinimg.com/1200x/c9/2d/06/c92d069f0682a44dbae4b15c4090e14a.jpg",
  },
  {
    id: "P002",
    name: "española",
    price: 7250,
    count: 1,
    img: "https://i.pinimg.com/1200x/92/ad/03/92ad03ae1fcbc8bc94c3cc7570e0dbc6.jpg",
  },
  {
    id: "P003",
    name: "salame",
    price: 5990,
    count: 1,
    img: "https://i.pinimg.com/1200x/02/9e/d5/029ed50ded6bf0ef1f7308039359f238.jpg",
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCart);

  const handleIncrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item,
        )
        .filter((item) => item.count > 0),
    );
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );

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
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <span className="fs-5">{item.count}</span>
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => handleIncrement(item.id)}
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
          <button className="btn btn-dark">Pagar</button>
        </div>
      </div>
    </div>
  );
}
