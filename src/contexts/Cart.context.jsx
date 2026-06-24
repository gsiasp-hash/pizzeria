import React, { useState, createContext, useMemo } from "react";
import { PizzasContext } from "./Pizzas.context";

const TotalContext = createContext();

function TotalProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { pizzas } = React.useContext(PizzasContext);
  const addToCart = (pizzaId) => {
    const pizza = pizzas.find((p) => p.id === pizzaId);
    if (pizza) {
      setCartItems((prev) => {
        const existingItem = prev.find((item) => item.id === pizzaId);
        if (existingItem) {
          return prev.map((item) =>
            item.id === pizzaId ? { ...item, count: item.count + 1 } : item,
          );
        } else {
          return [
            ...prev,
            {
              ...pizza,
              id: pizza.id,
              name: pizza.name,
              price: pizza.price,
              img: pizza.img,
              count: 1,
            },
          ];
        }
      });
    }
  };

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.count, 0),
    [cartItems],
  );

  return (
    <TotalContext.Provider
      value={{ total, cartItems, setCartItems, addToCart }}
    >
      {children}
    </TotalContext.Provider>
  );
}

export { TotalContext, TotalProvider };
