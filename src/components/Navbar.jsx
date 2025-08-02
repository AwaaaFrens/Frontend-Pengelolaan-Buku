import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

const Navbar = () => {
  const { user, logout, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-xl font-bold text-gray-800">
              {import.meta.env.VITE_APP_NAME || "Perpustakaan"}
            </Link>

            <div className="hidden md:flex space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/books"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Buku
              </Link>
              <Link
                to="/authors"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Penulis
              </Link>
              {isAdmin() && (
                <Link
                  to="/admin"
                  className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600">
              Halo, <span className="font-medium">{user?.name}</span>
            </span>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {user?.role}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
