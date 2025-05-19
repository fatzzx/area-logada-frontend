import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: "/dashboard", name: "Dashboard", icon: "home" },
    { path: "/animes", name: "Animes", icon: "film" },
    { path: "/profile", name: "Meu Perfil", icon: "user" },
  ];

  // Função para renderizar ícones SVG
  const renderIcon = (icon) => {
    switch (icon) {
      case "home":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
        );
      case "film":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "user":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0 hidden md:block">
      <div className="p-4">
        <h2 className="text-2xl font-bold">Anime App</h2>
      </div>

      <nav className="mt-8">
        <div className="px-4 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 text-sm rounded-md ${
                isActive(item.path)
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <span className="mr-3">{renderIcon(item.icon)}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
