import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/ContextProvider';

const Navbar = ({ searchTerm, setSearchTerm }) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex flex-col md:flex-row md:items-center justify-between shadow-md">
      
      {/* Left: Logo */}
      <div className="text-2xl font-bold text-blue-400">
        <Link to="/">NoteApp</Link>
      </div>

      {/* Center: Search bar */}
      <div className="mt-3 md:mt-0 md:flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Search Notes..."
          value={searchTerm}               // controlled input value
          onChange={(e) => setSearchTerm(e.target.value)}  // update parent state
          className="w-60 px-3 py-2 bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Right: Username + Buttons */}
      <div className="mt-3 md:mt-0 flex items-center space-x-4">
        {isLoggedIn ? (
          <>
            <span className="text-sm font-semibold text-gray-300">{user}</span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white border border-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white border border-blue-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white border border-green-700"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
