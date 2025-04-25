// authStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

interface AuthStore {
  user: any;
  access_token: string | null;
  refresh_token: string | null;
  setAuth: (user: any, access_token: string, refresh_token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getUserRoute: () => string;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      access_token: null,
      refresh_token: null,

      setAuth: (user, access_token, refresh_token) => {
        Cookies.set('access_token', access_token, { secure: true, sameSite: 'Strict' });
        Cookies.set('refresh_token', refresh_token, { secure: true, sameSite: 'Strict' });

        set({
          user,
          access_token,
          refresh_token,
        });
      },

      logout: () => {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        set({
          user: null,
          access_token: null,
          refresh_token: null,
        });
      },

      isAuthenticated: () => {
        const { access_token } = get();
        return !!access_token;
      },

      getUserRoute: () => {
        const user = get().user;
        return user?.is_vendor ? '/admin' : '/user';
      },
    }),
    { name: 'auth-storage' }
  )
);