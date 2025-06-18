import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get("http://localhost:3000/api/user", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } catch (error) {
          console.error("Failed to fetch user from token:", error);
          localStorage.removeItem("token");
          axios.defaults.headers.common["Authorization"] = null;
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUserFromToken();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return { success: true, user };
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      return {
        success: false,
        error: error.response?.data?.message || "Login failed.",
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      return { success: true, message: response.data.message };
    } catch (error) {
      console.error(
        "Registration failed:",
        error.response?.data?.message || error.message
      );
      return {
        success: false,
        error: error.response?.data?.message || "Registration failed.",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common["Authorization"] = null;
    setUser(null);
  };

  const authContextValue = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const PrivateRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg text-gray-700">Checking authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
