import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useBookStore } from '../../store/bookStore';

const CreateAuthor = () => {
  const { createAuthor, isLoading } = useBookStore();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const result = await createAuthor(data);
    if (result.success) {
      navigate('/admin/authors');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tambah Penulis Baru</h1>
        <p className="text-gray-600">Isi form di bawah untuk menambahkan penulis baru</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Penulis *
          </label>
          <input
            {...register('name', { required: 'Nama penulis wajib diisi' })}
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan nama penulis"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Biografi
          </label>
          <textarea
            {...register('bio')}
            rows={6}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Masukkan biografi penulis"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/authors')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Penulis'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAuthor;