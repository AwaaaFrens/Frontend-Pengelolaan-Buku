import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useBookStore } from '../../store/bookStore';

const EditAuthor = () => {
  const { id } = useParams();
  const { author, fetchAuthor, isLoading } = useBookStore();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (id) {
      fetchAuthor(id);
    }
  }, [id, fetchAuthor]);

  useEffect(() => {
    if (author) {
      reset({
        name: author.name,
        bio: author.bio
      });
    }
  }, [author, reset]);

  const onSubmit = async (data) => {
    // Note: You'll need to add updateAuthor method to bookStore
    console.log('Update author:', data);
    navigate('/admin/authors');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Edit Penulis</h1>
        <p className="text-gray-600">Ubah informasi penulis di bawah</p>
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
            {isLoading ? 'Menyimpan...' : 'Update Penulis'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAuthor;