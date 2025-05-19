import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import MainLayout from "./components/layout/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import AnimeList from "./pages/AnimeList";
import AnimeForm from "./pages/AnimeForm";
import AnimeDetail from "./pages/AnimeDetail";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular um carregamento inicial
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/animes" element={<AnimeList />} />
          <Route path="/animes/:id" element={<AnimeDetail />} />
          <Route path="/animes/new" element={<AnimeForm />} />
          <Route path="/animes/:id/edit" element={<AnimeForm />} />
        </Route>

        {/* Redirecionamentos e rota 404 */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
