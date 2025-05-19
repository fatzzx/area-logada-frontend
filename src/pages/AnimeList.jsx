import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from 'react-toastify';

function AnimeList() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await fetch(
          "https://crud-mongo-sepia.vercel.app/anime",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setAnimes(data);
        } else {
          let errorMessage = "Falha ao carregar animes. Tente novamente mais tarde.";
          
          if (response.status === 403) {
            errorMessage = "Você não tem permissão para acessar esta funcionalidade.";
          } else {
            try {
              const data = await response.json();
              errorMessage = data.message || errorMessage;
            } catch (e) {
              // Se não conseguir ler o JSON, usa a mensagem padrão
            }
          }
          
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } catch (error) {
        const errorMessage = "Erro na conexão com o servidor.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimes();
  }, []);

  const handleDelete = async (id) => {
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
          setAnimes(animes.filter((anime) => anime._id !== id));
          toast.success("Anime excluído com sucesso!");
        } else {
          let errorMessage = "Erro ao excluir anime. Tente novamente.";
          
          if (response.status === 403) {
            errorMessage = "Você não tem permissão para excluir animes.";
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
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Lista de Animes</h1>
        <Link
          to="/animes/new"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Adicionar Novo
        </Link>
      </div>

      {animes.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <p className="text-gray-500 mb-4">
            Nenhum anime cadastrado. Comece adicionando um novo!
          </p>
          <Link to="/animes/new" className="text-blue-500 hover:text-blue-700">
            Adicionar novo anime
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gênero
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {animes.map((anime) => (
                <tr key={anime._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{anime.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{anime.genre}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Link
                      to={`/animes/${anime._id}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Ver
                    </Link>
                    <Link
                      to={`/animes/${anime._id}/edit`}
                      className="text-green-600 hover:text-green-900 ml-2"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(anime._id)}
                      className="text-red-600 hover:text-red-900 ml-2"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AnimeList;
