import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ new

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }

    setLoading(false); // ✅ Done loading after trying
  }, []);

  const login = (token, userData) => {
    console.log("🧠 Debug AuthProvider: login called", { token, userData });
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
    token ? setIsAuthenticated(true) && setUser(userData)  : setIsAuthenticated(false);
    // setIsAuthenticated(true);
    // setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading }}>
      {!loading && children} {/* ✅ render children only after auth status loaded */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
