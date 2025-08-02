import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useBookStore } from "../store/bookStore";

const Dashboard = () => {
  const { user, isAdmin } = useAuthStore();
  const {
    books,
    authors,
    genreStats,
    fetchBooks,
    fetchAuthors,
    fetchGenreStats,
  } = useBookStore();

  useEffect(() => {
    fetchBooks(), fetchAuthors(), fetchGenreStats();
  }, [fetchBooks, fetchAuthors, fetchGenreStats]);

  const stats = [
    {
      title: "Total Buku",
      value: books.length,
      icon: "📚",
      color: "bg-blue-500",
    },
    {
      title: "Total Penulis",
      value: authors.length,
      icon: "✍️",
      color: "bg-green-500",
    },
    {
      title: "Genre",
      value: genreStats.length,
      icon: "🏷️",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Selamat datang, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Dashboard perpustakaan digital Anda
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Aksi Cepat</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/books"
              className="bg-blue-50 hover:bg-blue-100 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">📖</div>
              <div className="font-medium text-blue-900">Lihat Semua Buku</div>
            </Link>
            <Link
              to="/authors"
              className="bg-green-50 hover:bg-green-100 rounded-lg p-4 text-center transition-colors"
            >
              <div className="text-2xl mb-2">👨‍💼</div>
              <div className="font-medium text-green-900">Lihat Semua Penulis</div>
            </Link>
            {isAdmin() && (
              <>
                <Link
                  to="/admin/books/create"
                  className="bg-purple-50 hover:bg-purple-100 rounded-lg p-4 text-center transition-colors"
                >
                  <div className="text-2xl mb-2">➕</div>
                  <div className="font-medium text-purple-900">Tambah Buku</div>
                </Link>
                <Link
                  to="/admin"
                  className="bg-red-50 hover:bg-red-100 rounded-lg p-4 text-center transition-colors"
                >
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="font-medium text-red-900">Admin Panel</div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Recent Books */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Buku Terbaru</h2>
            <Link
              to="/books"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Lihat Semua
            </Link>
          </div>
        </div>
        <div className="p-6">
          {books.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.slice(0, 6).map((book) => (
                <Link
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    Penulis: {book.author?.name || 'N/A'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Genre: {book.genre || 'N/A'}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📚</div>
              <p className="text-gray-500">Belum ada buku tersedia</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;