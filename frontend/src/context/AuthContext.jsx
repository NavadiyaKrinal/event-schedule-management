import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import axios from "axios";

const AuthContext = createContext();

const API_URL = "http://localhost:5000/api/auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [loading, setLoading] = useState(true);

  // Get current logged-in user
  const getCurrentUser = useCallback(async () => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${savedToken}`,
        },
      });

      setUser(response.data.data);
      setToken(savedToken);
    } catch (error) {
      console.error("Failed to get current user:", error);

      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCurrentUser();
  }, [getCurrentUser]);

  // Login
  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      const { token, data } = response.data;

      localStorage.setItem("token", token);

      setToken(token);
      setUser(data);

      return data;
    } catch (error) {
      console.error("Login failed:", error);

      throw error;
    }
  }, []);

  // Register
  const register = useCallback(async (userData) => {
    try {
      const response = await axios.post(
        `${API_URL}/register`,
        userData
      );

      return response.data.data;
    } catch (error) {
      console.error("Registration failed:", error);

      throw error;
    }
  }, []);

  // Logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");

    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        getCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}