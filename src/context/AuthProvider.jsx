import React, { useState, useEffect } from 'react';
import AuthContext from './AuthContext'; 

export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }
  }, []);

  const login = (email) => {
    setUserEmail(email);
    localStorage.setItem('userEmail', email); 
  };

  const logout = () => {
    setUserEmail(null);
    localStorage.removeItem('userEmail'); 
  };

  return (
    <AuthContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
