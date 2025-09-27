"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true); // loading শুরু

      try {
        const res = await fetch("/api/user"); 
        if (res.ok) {
          const data = await res.json();
          setUser(data.user); // fresh user data
        } else {
          setUser(null); // login নাই
        }
      } catch (err) {
        console.error("Auth fetch error:", err);
        setUser(null);
      } finally {
        setLoading(false); // loading শেষ
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
