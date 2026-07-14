import { createContext, useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("token");
    if (saved) {
      setToken(saved);
      setIsLoggedIn(true);
    }
  }, []);

  const request = async (path, body) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
  };

  const login = async (email, password) => {
    const data = await request("/auth/login", { email: email, password: password });
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsLoggedIn(true);
    }
    return data;
  };

  const register = async (email, password) => {
    const data = await request("/auth/register", { email: email, password: password });
    if (data.token) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsLoggedIn(true);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider value={{ token, isLoggedIn,setIsLoggedIn, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
