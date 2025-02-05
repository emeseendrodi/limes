import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContext from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      const isExpired = checkTokenExpiration(storedToken);
      if (!isExpired) {
        setToken(storedToken);
        scheduleLogout(storedToken);
      } else {
        logout();
      }
    }
  }, []);

  const checkTokenExpiration = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000;
    } catch (error) {
      return true;
    }
  };

  const scheduleLogout = (token) => {
    try {
      const { exp } = jwtDecode(token);
      const timeUntilExpiry = exp * 1000 - Date.now();
      if (timeUntilExpiry > 0) {
        setTimeout(() => {
          logout();
          alert("❌ A munkamenet lejárt! Kérlek jelentkezz be újra.");  
        }, timeUntilExpiry);
      }
    } catch (error) {
      logout();
    }
  };

  const login = (jwtToken) => {
    if (checkTokenExpiration(jwtToken)) {
      logout();
      return;
    }
    setToken(jwtToken);
    localStorage.setItem("jwtToken", jwtToken);
    scheduleLogout(jwtToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem("jwtToken");
    window.location.href = "/"; 
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
