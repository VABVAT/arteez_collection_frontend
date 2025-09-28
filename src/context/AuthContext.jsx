import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (res.ok) {
            const userData = await res.json();
            setUser(userData);
          }
        } catch (error) {
          console.error("Failed to fetch user", error);
        } finally {
            setAuthLoading(false);
        }
      } else {
        setAuthLoading(false);
      }
    };

    fetchUser();
    localStorage.setItem('token', token);

    if (!token) {
        localStorage.removeItem('token');
    }
  }, [token]);

  const login = async (newToken) => {
    setAuthLoading(true);
    setToken(newToken);
    if (newToken) {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/me`, {
          headers: { Authorization: `Bearer ${newToken}` },
        });
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          return userData;
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setAuthLoading(false);
      }
    }
    setAuthLoading(false);
    return null;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    token,
    user,
    isAuthenticated: !!token,
    login,
    logout,
    authLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
