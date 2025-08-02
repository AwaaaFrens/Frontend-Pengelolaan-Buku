import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";
import toast from "react-hot-toast";

export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isLoading: false,

            // login
            login: async (creadentials) => {
                try {
                    set({ isLoading: true });
                    const response = await api.post('auth/login', creadentials);
                    const { user, token } = response.data;

                    localStorage.setItem('token', token);
                    set({ user, token, isLoading: false });
                    toast.success('Login Berhasil!');
                    return { success: true};
                } catch (error) {
                    set({ isLoading: false });
                    const message = error.response?.data?.message || 'Login Gagal!';
                    toast.error(message);
                    return { success: false, message };
                }
            },

            // register
            register: async (userData) => {
                try {
                    set({ isLoading: true });
                    const response = await api.post('auth/register', userData);
                    set({ isLoading: false });
                    toast.success('Registrasi berhasil! Silahkan Login');
                    return { success: true }
                } catch (error) {
                    set({ isLoading: false });
                    const message = error.response?.data?.message || 'Register Gagal!';
                    toast.error(message);
                    return { success: false, message };
                }
            },

            // logout
            logout: async () => {
                try {
                    await api.post('auth/logout');
                } catch (error) {
                    console.error('Logout error:', error);
                } finally {
                    localStorage.removeItem('token');
                    set({ user: null, token: null });
                    toast.success('Logout Berhasil!');
                }
            },

            // cek admin
            isAdmin: () => {
                const { token } = get();
                return !!token;
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                user: state.user,
                token: state.token
            }),
        }
    )
);