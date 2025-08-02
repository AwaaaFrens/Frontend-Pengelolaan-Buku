import { Routes, Route, Link, useLocation } from 'react-router-dom';
import CreateBook from '../components/admin/CreateBook';
import EditBook from '../components/admin/EditBook';
import CreateAuthor from '../components/admin/CreateAuthor';
import EditAuthor from '../components/admin/EditAuthor';

const AdminPanel = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: '🏠' },
    { name: 'Kelola Buku', href: '/admin/books', icon: '📚' },
    { name: 'Kelola Penulis', href: '/admin/authors', icon: '✍️' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Panel</h2>
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.href
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/books" element={<AdminBooks />} />
            <Route path="/books/create" element={<CreateBook />} />
            <Route path="/books/:id/edit" element={<EditBook />} />
            <Route path="/authors" element={<AdminAuthors />} />
            <Route path="/authors/create" element={<CreateAuthor />} />
            <Route path="/authors/:id/edit" element={<EditAuthor />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
    <p className="text-gray-600">Selamat datang di panel admin perpustakaan.</p>
  </div>
);

const AdminBooks = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold text-gray-900">Kelola Buku</h1>
      <Link
        to="/admin/books/create"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Tambah Buku
      </Link>
    </div>
    <p className="text-gray-600">Kelola semua buku di perpustakaan dari sini.</p>
  </div>
);

const AdminAuthors = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold text-gray-900">Kelola Penulis</h1>
      <Link
        to="/admin/authors/create"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Tambah Penulis
      </Link>
    </div>
    <p className="text-gray-600">Kelola semua penulis di perpustakaan dari sini.</p>
  </div>
);

export default AdminPanel;