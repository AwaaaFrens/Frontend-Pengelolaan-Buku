import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useBookStore } from "../store/bookStore";
import { useAuthStore } from "../store/authStore";

const Books = () => {
  const { books, isLoading, fetchBooks } = useBookStore();
  const { isAdmin } = useAuthStore();
  const [searchTerm, setsearchTerm] = useState("");
  const [selectedGenre, setselectedGenre] = useState("");

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // filter buku
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.authors?.name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "" || book.genre === selectedGenre;
    return matchesGenre && matchesSearch;
  });

  // ambil genre unik
  const genres = [...new set(books.map((book) => book.genre).filter(Boolean))];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daftar Buku</h1>
          <p className="mt-2 text-gray-600">
            {filteredBooks.length} buku ditemukan
          </p>
        </div>
        {isAdmin() && (
          <Link
            to="/admin/books/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Tambah Buku
          </Link>
        )}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cari Buku
            </label>
            <input
              type="text"
              placeholder="Cari berdasarkan judul atau penulis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Semua Genre</option>
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  Penulis: {book.author?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  Genre: {book.genre || "N/A"}
                </p>
                {book.tahun_terbit && (
                  <p className="text-sm text-gray-500 mb-4">
                    Tahun: {book.tahun_terbit}
                  </p>
                )}

                <div className="flex justify-between items-center">
                  <Link
                    to={`/books/${book.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Lihat Detail
                  </Link>
                  {isAdmin() && (
                    <div className="flex space-x-2">
                      <Link
                        to={`/admin/books/${book.id}/edit`}
                        className="text-yellow-600 hover:text-yellow-800 text-sm"
                      >
                        Edit
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada buku ditemukan
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || selectedGenre
              ? "Coba ubah kata kunci pencarian atau filter genre"
              : "Belum ada buku yang tersedia"}
          </p>
          {isAdmin() && (
            <Link
              to="/admin/books/create"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Tambah Buku Pertama
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Books;