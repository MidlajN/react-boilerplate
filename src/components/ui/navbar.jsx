import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full flex justify-between items-center py-6 px-4 md:px-8 sticky top-0 bg-white/80 backdrop-blur-md z-50 shadow-md">
      {/* Logo / Brand */}
      <Link to="/" className="text-2xl font-bold text-indigo-600 hover:scale-105 transition-transform">
        Django + React Boilerplate
      </Link>

      {/* Navigation Links */}
      <nav className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-sm text-gray-700">Hello, <span className="font-semibold">{user.first_name || user.email}</span></span>
            <button
              onClick={logout}
              className="text-sm px-3 py-2 rounded bg-red-100 text-red-600 hover:bg-red-200 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm px-3 py-2 rounded hover:bg-indigo-50 hover:text-indigo-600 transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-sm px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-500 transition"
            >
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
