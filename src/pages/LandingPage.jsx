import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {import.meta.env.VITE_APP_NAME || 'Perpustakaan Digital'}
          </h1>
          <p className="text-gray-600">
            Sistem manajemen perpustakaan modern
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/login"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium block"
          >
            Masuk ke Akun
          </Link>
          
          <Link
            to="/register"
            className="w-full bg-white text-blue-600 py-3 px-4 rounded-md border-2 border-blue-600 hover:bg-blue-50 transition-colors font-medium block"
          >
            Daftar Akun Baru
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Kelola koleksi buku digital Anda dengan mudah</p>
        </div>
      </div>
    </div>
  );
};

export default Landing;