import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Iniciando login...");
    try {
      const response = await fetch(
        "https://crud-mongo-sepia.vercel.app/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        },
      );
      console.log("Resposta recebida:", response);
      const data = await response.json();
      console.log("Dados recebidos:", data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setMessage("Login realizado!");
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setMessage(data.message || "Credenciais inválidas.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Erro na chamada:", error);
      setMessage("Erro na conexão com o servidor.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full mb-4 p-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          Entrar
        </button>

        {message && (
          <p className={`text-center mt-4 text-sm ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        <p className="text-center mt-4 text-sm text-gray-600">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">
            Registre-se
          </Link>
        </p>
      </form>
    </div>
  );
}
