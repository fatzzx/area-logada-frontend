import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function AnimeForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    synopsis: "",
    genre: "",
    imageUrl: "",
    addToUserList: false,
  });

  const [loading, setLoading] = useState(isEditMode);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Se estiver no modo de edição, buscar dados do anime
    if (isEditMode) {
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
            setFormData({
              title: data.title || "",
              synopsis: data.synopsis || "",
              genre: data.genre || "",
              imageUrl: data.imageUrl || "",
              addToUserList: data.addToUserList || false,
            });
          } else {
            setError("Falha ao carregar dados do anime.");
          }
        } catch {
          setError("Erro na conexão com o servidor.");
        } finally {
          setLoading(false);
        }
      };

      fetchAnime();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const animeData = {
      ...formData,
      genre: formData.genre.split(",").map((g) => g.trim()),
    };

    try {
      const response = await fetch(
        `https://crud-mongo-sepia.vercel.app/anime${id ? `/${id}` : ""}`,
        {
          method: id ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(animeData),
        },
      );

      if (response.ok) {
        if (formData.addToUserList) {
          const addToListResponse = await fetch(
            "https://crud-mongo-sepia.vercel.app/anime/addToList",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({ animeId: id || response.json()._id }),
            },
          );

          if (!addToListResponse.ok) {
            alert("Erro ao adicionar anime à lista. Tente novamente.");
          }
        }
        navigate("/animes");
      } else {
        alert("Erro ao salvar anime. Tente novamente.");
      }
    } catch (error) {
      alert("Erro na conexão com o servidor.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? "Editar Anime" : "Adicionar Novo Anime"}
      </h1>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sinopse</label>
            <textarea
              name="synopsis"
              value={formData.synopsis}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Gênero</label>
            <input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              placeholder="Separe os gêneros por vírgula"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="addToUserList"
                checked={formData.addToUserList}
                onChange={handleChange}
                className="mr-2"
              />
              <span className="text-sm font-medium text-gray-700">Adicionar à minha lista</span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate("/animes")}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              disabled={submitting}
            >
              {submitting ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AnimeForm;
