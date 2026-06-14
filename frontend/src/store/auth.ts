import { create } from 'zustand';
import { api } from '../utils/api';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  initialized: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,
  error: null,

  clearError: () => set({ error: null }),

  checkAuth: async () => {
    set({ loading: true, error: null });
    try {
      const response = await api.get('/auth/me');
      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
        initialized: true
      });
    } catch (error: any) {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        initialized: true
      });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/login', { email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
        initialized: true
      });
      return true;
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Login failed';
      set({
        error: errorMsg,
        loading: false
      });
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await api.post('/auth/register', { name, email, password });
      set({
        user: response.data.user,
        isAuthenticated: true,
        loading: false,
        initialized: true
      });
      return true;
    } catch (error: any) {
      const errorMsg = error.response?.data?.error || 'Registration failed';
      set({
        error: errorMsg,
        loading: false
      });
      return false;
    }
  },

  logout: async () => {
    set({ loading: true });
    try {
      await api.post('/auth/logout');
    } catch (e) {
      // Ignore errors on logout
    } finally {
      set({
        user: null,
        isAuthenticated: false,
        loading: false,
        initialized: true
      });
    }
  }
}));
