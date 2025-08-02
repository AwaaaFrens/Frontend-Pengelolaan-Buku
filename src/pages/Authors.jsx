import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookStore } from '../store/bookStore';
import { useAuthStore } from '../store/authStore';

const Authors = () => {
  const { authors, isLoading, fetchAuthors } = useBookStore();
  const { isAdmin } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Daftar Penulis</h1>
          <p className="mt-2 text-gray-600">{filteredAuthors.length} penulis ditemukan</p>
        </div>
        {isAdmin() && (
          <Link
            to="/admin/authors/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Tambah Penulis
          </Link>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <input
          type="text"
          placeholder="Cari penulis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {filteredAuthors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuthors.map((author) => (
            <div key={author.id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{author.name}</h3>
              {author.bio && (
                <p className="text-gray-600 mb-4 line-clamp-3">{author.bio}</p>
              )}
              <div className="flex justify-between items-center">
                <Link
                  to={`/authors/${author.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Lihat Detail
                </Link>
                {isAdmin() && (
                  <Link
                    to={`/admin/authors/${author.id}/edit`}
                    className="text-yellow-600 hover:text-yellow-800 text-sm"
                  >
                    Edit
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada penulis ditemukan</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm ? 'Coba ubah kata kunci pencarian' : 'Belum ada penulis yang tersedia'}
          </p>
        </div>
      )}
    </div>
  );
};

export default Authors;