import { createContext, useState } from "react";

const fetchLogin = async (username, password) => {
  const response = await fetch("http://localhost:3000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

const fetchRegister = async (username, password) => {
  const response = await fetch("http://localhost:3000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  return response.json();
};

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = async (username, password) => {
    const userData = await fetchLogin(username, password);
    setIsLoggedIn(true);
  };

  const register = async (username, password) => {
    const userData = await fetchRegister(username, password);
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
