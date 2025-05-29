import React, { createContext, useState, useEffect } from 'react';

// ✅ Use PascalCase for exported context name
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

  const login = (token, username) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    setToken(token);
    setUser(username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isLoggedIn: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
