import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../contexts/AuthContext";
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await register(username, email, password);
      
      if (result.success) {
        toast.success("Usuário registrado com sucesso!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(result.message || "Erro ao registrar usuário.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro na conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Registrar</h1>

        <input
          type="text"
          placeholder="Usuário"
          className="w-full mb-4 p-2 border rounded-lg"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 p-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:bg-green-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrar"}
        </button>

        <p className="text-center mt-4 text-sm text-gray-600">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Faça login
          </Link>
        </p>
      </form>
    </div>
  );
}
