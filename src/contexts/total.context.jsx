import React, { useState, createContext, useMemo } from "react";

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

const TotalContext = createContext();

function TotalProvider({ children }) {
  const [cartItems, setCartItems] = useState(initialCart);

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.count, 0),
    [cartItems],
  );

  return (
    <TotalContext.Provider value={{ total, cartItems, setCartItems }}>
      {children}
    </TotalContext.Provider>
  );
}

export { TotalContext, TotalProvider };