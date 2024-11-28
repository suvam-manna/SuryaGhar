import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-orange-700 shadow-md py-4 px-8 flex justify-between items-center fixed top-0 w-full z-10">
      <div className="text-2xl font-bold text-yellow-100">SuryaGhar</div>

      <nav className="flex space-x-6">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            isActive ? "text-yellow-300 font-semibold" : "text-yellow-100 hover:text-yellow-300 font-semibold"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            isActive ? "text-yellow-300 font-semibold" : "text-yellow-100 hover:text-yellow-300 font-semibold"
          }
        >
          Map
        </NavLink>
        <NavLink
          to="/tutorial"
          className={({ isActive }) =>
            isActive ? "text-yellow-300 font-semibold" : "text-yellow-100 hover:text-yellow-300 font-semibold"
          }
        >
          Tutorial
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
