import {createContext, useState, useEffect} from 'react';
const API_URL = import.meta.env.VITE_API_URL;

export const PizzasContext = createContext();

export function PizzasProvider({children}) {
      const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/pizzas`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al cargar pizzas: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPizzas(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
 return (
    <PizzasContext.Provider value={{ pizzas, loading, error }}>
      {children}
    </PizzasContext.Provider>
  );
}
