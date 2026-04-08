import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// ✅ Axios global config
axios.defaults.baseURL = "http://localhost:3000/api";
axios.defaults.withCredentials = true; // 🔥 IMPORTANT (for cookies)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch user (from cookie session)
  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/me");
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
      console.log("Error", error);
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });

      setUser(res.data.user); // cookie already set by backend
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  // ✅ Register
  const register = async (data) => {
    try {
      const res = await axios.post("/auth/register", data);

      // optional: auto-login after register
      await login(data.email, data.password);
    } catch (error) {
      console.error("Register failed:", error);
      throw error;
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await axios.post("/auth/logout"); // you should create this API
    } catch (err) {
      console.error(err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        role: user?.role || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}