import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from 'react-toastify';

function AnimeForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    synopsis: "",
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      fetchAnime();
    }
  }, [id]);

  const fetchAnime = async () => {
    try {
      const response = await fetch(
        `https://crud-mongo-sepia.vercel.app/anime/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        let errorMessage = "Erro ao carregar dados do anime.";
        
        if (response.status === 403) {
          errorMessage = "Você não tem permissão para editar animes.";
        } else {
          try {
            const data = await response.json();
            errorMessage = data.message || errorMessage;
          } catch (e) {
            // Se não conseguir ler o JSON, usa a mensagem padrão
          }
        }
        
        toast.error(errorMessage);
        navigate("/animes");
      }
    } catch (error) {
      toast.error("Erro na conexão com o servidor.");
      navigate("/animes");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = id
        ? `https://crud-mongo-sepia.vercel.app/anime/${id}`
        : "https://crud-mongo-sepia.vercel.app/anime";
      const method = id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(id ? "Anime atualizado com sucesso!" : "Anime criado com sucesso!");
        navigate("/animes");
      } else {
        let errorMessage = "Erro ao salvar anime. Tente novamente.";
        
        if (response.status === 403) {
          errorMessage = "Você não tem permissão para criar/editar animes.";
        } else {
          try {
            const data = await response.json();
            errorMessage = data.message || errorMessage;
          } catch (e) {
            // Se não conseguir ler o JSON, usa a mensagem padrão
          }
        }
        
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("Erro na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Editar Anime" : "Novo Anime"}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nome
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Gênero
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="synopsis"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sinopse
          </label>
          <textarea
            id="synopsis"
            name="synopsis"
            value={formData.synopsis}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/animes")}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default AnimeForm;
