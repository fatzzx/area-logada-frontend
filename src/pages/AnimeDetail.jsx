import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function AnimeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          setAnime(data);
        } else {
          setError("Falha ao carregar dados do anime.");
        }
      } catch (error) {
        setError("Erro na conexão com o servidor.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Tem certeza que deseja excluir este anime?")) {
      try {
        const response = await fetch(
          `https://crud-mongo-sepia.vercel.app/anime/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.ok) {
          navigate("/animes");
        } else {
          alert("Erro ao excluir anime. Tente novamente.");
        }
      } catch (error) {
        alert("Erro na conexão com o servidor.");
      }
    }
  };

  const handleAddToList = async () => {
    try {
      const response = await fetch(
        "https://crud-mongo-sepia.vercel.app/anime/addToList",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ animeId: id }),
        },
      );

      if (response.ok) {
        alert("Anime adicionado à sua lista!");
      } else {
        alert("Erro ao adicionar anime à lista. Tente novamente.");
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

  if (error || !anime) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
        <p>{error || "Anime não encontrado."}</p>
        <Link
          to="/animes"
          className="text-red-700 font-bold hover:underline mt-2 inline-block"
        >
          Voltar para a lista
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{anime.title}</h1>
        <div>
          <button
            onClick={handleAddToList}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
          >
            Adicionar à Lista
          </button>
          <Link
            to="/animes"
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 mr-2"
          >
            Voltar
          </Link>
          <Link
            to={`/animes/${id}/edit`}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
          >
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Excluir
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Informações</h2>

            <div className="mb-4">
              <p className="text-gray-500 text-sm">Nome</p>
              <p className="font-medium">{anime.title}</p>
            </div>

            <div className="mb-4">
              <p className="text-gray-500 text-sm">Gênero</p>
              <p className="font-medium">{anime.genre}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Sinopse</h2>
            <p className="text-gray-700">
              {anime.synopsis || "Sem sinopse disponível."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimeDetail;
