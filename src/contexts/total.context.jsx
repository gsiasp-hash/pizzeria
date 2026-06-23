import { createContext } from "react";

const total = createContext(0);

function TotalProvider(props) {
  const total = 0; // Aquí puedes calcular el total de tu carrito o cualquier otro valor que desees compartir

  return (
    <total.Provider value={total}>
      {props.children}
    </total.Provider>
  );
}

export { total, TotalProvider };