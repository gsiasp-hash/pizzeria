import { createContext, useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          credentials: "include",
        });
        if (res.ok) {
          setUser(await res.json());
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    fetchProfile();
  }, []);

  const request = async (path, body) => {
    const res = await fetch(`${API_BASE}${path}`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
  };

  const login = async (email, password) => {
    const data = await request("/api/auth/login", {
      email: email,
      password: password,
    });
    if (data.email) {
      setUser({ email: data.email });
      setIsLoggedIn(true);
    }
    return data;
  };

  const register = async (email, password) => {
    const data = await request("/api/auth/register", {
      email: email,
      password: password,
    });
    if (data.email) {
      setUser({ email: data.email });
      setIsLoggedIn(true);
    }
    return data;
  };

  const logout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } finally {
      setUser(null);
      setIsLoggedIn(false);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, isCheckingAuth, login, register, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
