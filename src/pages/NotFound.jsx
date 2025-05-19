import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">Página não encontrada</p>
      <Link
        to="/dashboard"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Voltar para o Dashboard
      </Link>
    </div>
  );
}

export default NotFound;
