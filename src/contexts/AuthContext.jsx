import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token }); // Simplesmente usa o token como usuário
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Tentando fazer login com:", { email });
      
      const response = await fetch(
        "https://crud-mongo-sepia.vercel.app/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      console.log("Resposta do login:", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setUser({ token: data.token }); // Simplesmente usa o token como usuário
        return { success: true };
      } else {
        return {
          success: false,
          message: data.message || "Credenciais inválidas",
        };
      }
    } catch (error) {
      console.error("Erro detalhado no login:", error);
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

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
