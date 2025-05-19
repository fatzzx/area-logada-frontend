import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Implementar chamada para atualizar perfil
      // Como exemplo, vamos simular uma chamada bem-sucedida
      setTimeout(() => {
        setMessage("Perfil atualizado com sucesso!");
        setLoading(false);
      }, 1000);

      // Na implementação real, você faria algo como:
      /*
      const response = await fetch("https://crud-mongo-sepia.vercel.app/user/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email
        })
      });

      if (response.ok) {
        setMessage("Perfil atualizado com sucesso!");
      } else {
        const data = await response.json();
        setMessage(data.message || "Erro ao atualizar perfil. Tente novamente.");
      }
      */
    } catch {
      setMessage("Erro ao atualizar perfil. Tente novamente.");
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("As senhas não coincidem.");
      return;
    }

    setLoading(true);

    try {
      // Implementar chamada para alterar senha
      // Como exemplo, vamos simular uma chamada bem-sucedida
      setTimeout(() => {
        setMessage("Senha alterada com sucesso!");
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setLoading(false);
      }, 1000);

      // Na implementação real, você faria algo como:
      /*
      const response = await fetch("https://crud-mongo-sepia.vercel.app/user/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      if (response.ok) {
        setMessage("Senha alterada com sucesso!");
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
      } else {
        const data = await response.json();
        setMessage(data.message || "Erro ao alterar senha. Verifique sua senha atual.");
      }
      */
    } catch {
      setMessage("Erro ao alterar senha. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>

      {message && (
        <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4">
          {message}
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Informações Pessoais</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Nome de Usuário
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar Alterações"}
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Alterar Senha</h2>

        <form onSubmit={handlePasswordChange}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="currentPassword"
            >
              Senha Atual
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="newPassword"
            >
              Nova Senha
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Alterando..." : "Alterar Senha"}
          </button>
        </form>
      </div>

      <div className="mt-8">
        <button
          onClick={logout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Sair da Conta
        </button>
      </div>
    </div>
  );
}

export default Profile;
