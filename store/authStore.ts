import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';

type Role = 'student' | 'landlord' | 'admin' | null;

interface AuthState {
  token: string | null;
  role: Role;
  isHydrated: boolean;
  login: (token: string, role: Role) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  role: null,
  isHydrated: false,

  login: async (token, role) => {
    try {
      await SecureStore.setItemAsync('access_token', token);
      if (role) {
        await SecureStore.setItemAsync('role', role);
      }
      set({ token, role });
    } catch (e) {
      console.warn('login: failed to persist credentials', e);
      throw e; // let the caller (login screen) show an error
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync('access_token');
      await SecureStore.deleteItemAsync('role');
    } catch (e) {
      console.warn('logout: failed to clear stored credentials', e);
    } finally {
      set({ token: null, role: null });
    }
  },

  hydrate: async () => {
    try {
      const [token, role] = await Promise.all([
        SecureStore.getItemAsync('access_token'),
        SecureStore.getItemAsync('role'),
      ]);
      set({ token, role: (role as Role) ?? null });
    } catch (e) {
      console.warn('hydrate: failed to read stored credentials', e);
    } finally {
      set({ isHydrated: true });
    }
  },
}));
