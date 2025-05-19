import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAnimes: 0,
    recentAnimes: [],
  });
  const [loading, setLoading] = useState(true);
  const [animes, setAnimes] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Aqui você pode fazer múltiplas chamadas à API
        // Como exemplo, vamos buscar os animes
        const response = await fetch(
          "https://crud-mongo-sepia.vercel.app/anime",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (response.ok) {
          const animes = await response.json();
          setStats({
            totalAnimes: animes.length,
            recentAnimes: animes.slice(0, 5), // 5 mais recentes
          });
        } else {
          console.error("Erro ao buscar animes");
          setStats({
            totalAnimes: 0,
            recentAnimes: [],
          });
        }
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
        setStats({
          totalAnimes: 0,
          recentAnimes: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  useEffect(() => {
    const fetchAnimes = async () => {
      try {
        const response = await fetch("https://crud-mongo-sepia.vercel.app/anime/mylist", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Dados recebidos:", data);
          setAnimes(data);
        } else {
          console.error("Erro ao buscar animes da lista.");
        }
      } catch (error) {
        console.error("Erro ao buscar animes:", error);
      }
    };
    fetchAnimes();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Meus Animes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(animes.animeList) && animes.animeList
          .filter(item => item.anime !== null)
          .map((item) => (
            <div key={item._id} className="border p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold">{item.anime.title}</h2>
              <p className="text-gray-600">{item.anime.synopsis}</p>
              <p className="text-blue-500 font-medium">Status: {item.status}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
