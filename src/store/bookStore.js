import { create } from "zustand";
import api from "../api/axios";
import toast from "react-hot-toast";

export const useBookStore = create((set, get) => ({
    books: [],
    book: null,
    authors: [],
    author: null,
    genreStats: [],
    isLoading: false,

    // fetching data semua buku :>
    fetchBook: async () => {
        try {
            set({ isLoading: true });
            const response = await api.get('/buku');
            set({ books: response.data.data || response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            toast.error('Gagal memuat daftar Buku');
        }
    },

    // fetch book dari Id
    fetchBook: async (id) => {
        try {
            set({ isLoading: true });
            const response = await api.get(`/buku/${id}`);
            set({ book: response.data.data || response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            toast.error('Gagal memuat Buku');
        }
    },

    // fetch book dari slug
    fetchBook: async (slug) => {
        try {
            set({ isLoading: true });
            const response = await api.get(`/buku/slug/${slug}`);
            set({ book: response.data.data || response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            toast.error('Gagal memuat Buku');
        }
    },

    // create Book (hanya admin)
    createBook: async (bookData) => {
        try {
            set({ isLoading: true });
            const response = await api.post('/buku', bookData);
            const newBook = response.data.data || response.data;
            set(state => ({
                books: [...state.books, newBook],
                isLoading: false
            }));
            toast.success('Berhasil menambahkan Buku');
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            const message = error.response?.data?.message || 'Gagal menambahkan Buku';
            toast.error(message);
            return { success: false, message };
        }
    },

    // update buku
    updateBook: async (id, bookData) => {
        try {
            set({ isLoading: true });
            const response = await api.put(`/buku/${id}`, bookData);
            const updateBook = response.data.data || response.data;
            set(state => ({
                books: state.books.map(book => 
                    book.id === id ? updateBook : book
                ),
                book: updateBook,
                isLoading: false
            }));
            toast.success('Berhasil memperbarui Buku');
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            const message = error.response?.data?.message || 'Gagal memperbarui Buku';
            toast.error(message);
            return { success: false, message };
        }
    },

    // hapus buku
    deleteBook: async (id) => {
        try {
            const response = await api.delete(`/buku/${id}`);
            set(state => ({
                books: state.books.filter(book => book.id !== id)
            }));
            toast.success('Buku berhasil dihapus');
            return { success: true };
        } catch (error) {
            const message = error.response?.data?.message || 'Gagal menghapus Buku';
            toast.error(message);
            return { success: false, message };
        }
    },

    // fetching author
    fetchAuthor: async () => {
        try {
            set({ isLoading: true });
            const response = await api.get('/author');
            set({ authors: response.data.data || response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            toast.error('Gagal memuat data');
        }
    },

    // fetch author by id
    fetchAuthor: async (id) => {
        try {
            set({ isLoading: true });
            const response = await api.get(`/author/${id}`);
            set({ authors: response.data.data || response.data, isLoading: false });
        } catch (error) {
            set({ isLoading: false });
            toast.error('Gagal memuat data')
        }
    },

    // membuat data author
    createAuthor: async (authorData) => {
        try {
            set({ isLoading: true });
            const response = await api.post('/author', authorData);
            const newAuthor = response.data.data || response.data;
            set(state => ({
                authors: [...state.authors, newAuthor],
                isLoading: false
            }));
            toast.success('Berhasil menambahkan data author');
            return { success: true };
        } catch (error) {
            set({ isLoading: false });
            const message = error.response?.data?.message || 'Gagal menambahkan data';
            toast.error(message);
            return { success: false, message };
        }
    },

    // fetching genre statistik
    fetchGenreStats: async () => {
        try {
            const response = await api.get('/buku/statistik/genre');
            set({ stats: response.data.data || response.data, isLoading: false });
        } catch (error) {
            toast.error('Gagal memuat data');
        }
    }
}));