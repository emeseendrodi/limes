import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext';

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('jwtToken');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const login = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem('jwtToken', jwtToken); 
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('jwtToken'); 
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
