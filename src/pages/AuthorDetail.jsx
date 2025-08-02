import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBookStore } from '../store/bookStore';

const AuthorDetail = () => {
  const { id } = useParams();
  const { author, books, isLoading, fetchAuthor, fetchBooks } = useBookStore();

  useEffect(() => {
    if (id) {
      fetchAuthor(id);
      fetchBooks(); // To get books by this author
    }
  }, [id, fetchAuthor, fetchBooks]);

  const authorBooks = books.filter(book => book.author?.id === parseInt(id));

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Penulis tidak ditemukan</h1>
        <Link to="/authors" className="text-blue-600 hover:text-blue-800">
          Kembali ke daftar penulis
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/authors" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Kembali ke Daftar Penulis
      </Link>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{author.name}</h1>
        
        {author.bio && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Biografi</h2>
            <p className="text-gray-700 leading-relaxed">{author.bio}</p>
          </div>
        )}

        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Buku oleh {author.name} ({authorBooks.length})
          </h2>
          {authorBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {authorBooks.map((book) => (
                <Link
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-500">Genre: {book.genre || 'N/A'}</p>
                  {book.tahun_terbit && (
                    <p className="text-sm text-gray-500">Tahun: {book.tahun_terbit}</p>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Belum ada buku dari penulis ini.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;