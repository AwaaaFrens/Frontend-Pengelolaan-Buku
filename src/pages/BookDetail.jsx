import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useBookStore } from '../store/bookStore';
import { useAuthStore } from '../store/authStore';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { book, isLoading, fetchBook, deleteBook } = useBookStore();
  const { isAdmin } = useAuthStore();

  useEffect(() => {
    if (id) {
      fetchBook(id);
    }
  }, [id, fetchBook]);

  const handleDelete = async () => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      const result = await deleteBook(id);
      if (result.success) {
        navigate('/books');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Buku tidak ditemukan</h1>
        <Link to="/books" className="text-blue-600 hover:text-blue-800">
          Kembali ke daftar buku
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/books"
          className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
        >
          ← Kembali ke Daftar Buku
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{book.title}</h1>
            <div className="space-y-2 text-gray-600">
              <p><span className="font-medium">Penulis:</span> {book.author?.name || 'N/A'}</p>
              <p><span className="font-medium">Genre:</span> {book.genre || 'N/A'}</p>
              {book.tahun_terbit && (
                <p><span className="font-medium">Tahun Terbit:</span> {book.tahun_terbit}</p>
              )}
              {book.isbn && (
                <p><span className="font-medium">ISBN:</span> {book.isbn}</p>
              )}
              {book.penerbit && (
                <p><span className="font-medium">Penerbit:</span> {book.penerbit}</p>
              )}
            </div>
          </div>
          
          {isAdmin() && (
            <div className="flex space-x-2">
              <Link
                to={`/admin/books/${book.id}/edit`}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          )}
        </div>

        {book.deskripsi && (
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Deskripsi</h2>
            <p className="text-gray-700 leading-relaxed">{book.deskripsi}</p>
          </div>
        )}

        {book.author && (
          <div className="border-t pt-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Tentang Penulis</h2>
            <Link
              to={`/authors/${book.author.id}`}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              {book.author.name}
            </Link>
            {book.author.bio && (
              <p className="text-gray-700 mt-2">{book.author.bio}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetail;