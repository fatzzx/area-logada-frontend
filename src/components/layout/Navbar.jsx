import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Logo</h1>
        <ul className="flex space-x-4">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/profile">Perfil</a></li>
          <li><a href="/animes">Animes</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
