import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(
        "https://crud-mongo-sepia.vercel.app/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user || { email }); // fallback se o backend não retorna o usuário
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || "Credenciais inválidas",
        };
      }
    } catch (error) {
      console.error("Erro no login:", error);
      return { success: false, message: "Erro na conexão com o servidor." };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await fetch(
        "https://crud-mongo-sepia.vercel.app/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || "Erro ao registrar usuário",
        };
      }
    } catch (error) {
      console.error("Erro no registro:", error);
      return { success: false, message: "Erro na conexão com o servidor." };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login", { replace: true });
  };

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch("https://crud-mongo-sepia.vercel.app/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Se o token for inválido, faz logout
        logout();
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
