import React, { createContext, useState, useEffect } from "react";
import { apiFetch } from "..api.js";

export const AuthContext = createContext();

const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const storedUser = localStorage.getItem("username");
      setUser(storedUser || "User");
    } else {
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const data = await apiFetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      setToken(data.token);
      setUser(data.username);
      return { success: true };
    } catch (error) {
      console.error("Login failed:", error.message);
      return { success: false, message: error.message };
    }
  };

  const register = async (username, email, password) => {
    try {
      const data = await apiFetch("/api/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
      });
      return { success: true };
    } catch (error) {
      console.error("Registration failed:", error.message);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isLoggedIn: !!token, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
