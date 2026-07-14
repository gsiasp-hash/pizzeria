import { createContext, useState } from "react";

const fetchLogin = async (email, password) => {
  const response = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  return response.json();
};

const fetchRegister = async (email, password) => {
  const response = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  return response.json();
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = async (email, password) => {
    const userData = await fetchLogin(email, password);
    setIsLoggedIn(true);
  };

  const register = async (email, password) => {
    const userData = await fetchRegister(email, password);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
