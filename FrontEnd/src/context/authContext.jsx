import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const UserContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [loading, setLoading] = useState(true);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return; // If no token, no need to verify
        }

        const response = await axios.get("http://localhost:5000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setUser(response.data.user);
        } else {
          logout();
        }
      } catch (error) {
        console.error("Verification failed:", error.response?.data?.error || "Server Error");
        logout(); // Clear user data if verification fails
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);

export default AuthContext;
