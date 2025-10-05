import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

// interface AuthStore {
//   user: any;
//   access_token: any | null;
//   refresh_token: any | null;
//   hydrated: boolean;
//   setAuth: (user: any, access_token: string, refresh_token: string) => void;
//   logout: () => void;
//   isAuthenticated: () => boolean;
//   getUserRoute: () => string;
// }

// let storeSet: (fn: Partial<AuthStore> | ((state: AuthStore) => Partial<AuthStore>)) => void;

// export const useAuthStore = create<AuthStore>()(
//   persist(
//     (set, get) => {
//       storeSet = set; // capture set function for later use

//       return {
//         user: null,
//         access_token: null,
//         refresh_token: null,
//         hydrated: false,

//         setAuth: (user, access_token, refresh_token) => {
//           Cookies.set('access_token', access_token, { secure: true, sameSite: 'Strict' });
//           Cookies.set('refresh_token', refresh_token, { secure: true, sameSite: 'Strict' });

//           set({
//             user,
//             access_token,
//             refresh_token,
//           });
//         },

//         logout: () => {
//           Cookies.remove('access_token');
//           Cookies.remove('refresh_token');
//           set({
//             user: null,
//             access_token: null,
//             refresh_token: null,
//           });
//         },

//         isAuthenticated: () => {
//           const { access_token } = get();
//           const cookieToken = Cookies.get('access_token');
//           return !!access_token || !!cookieToken;
//         },

//         getUserRoute: () => {
//           const user = get().user;
//           return user?.is_vendor ? '/admin' : '/user';
//         },
//       };
//     },
//     {
//       name: 'auth-storage',
//       onRehydrateStorage: () => {
//         return () => {
//           // safely call the captured `set` function
//           storeSet({ hydrated: true });
//         };
//       },
//     }
//   )
// );

interface AuthStore {
  user: any;
  access_token: string | null;
  refresh_token: string | null;
  token_expiry: number | null; // store timestamp in ms
  hydrated: boolean;
  setAuth: (user: any, access_token: string, refresh_token: string, expiresIn?: number) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getUserRoute: () => string;
}

let storeSet: ReturnType<typeof create<AuthStore>> extends { setState: infer S } ? S : never;


export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => {
      let logoutTimer: NodeJS.Timeout;

      return {
        user: null,
        access_token: null,
        refresh_token: null,
        token_expiry: null,
        hydrated: false,

        setAuth: (user, access_token, refresh_token, expiresIn = 3600) => {
          const expiryTime = Date.now() + expiresIn * 1000; // seconds → ms

          Cookies.set('access_token', access_token, { secure: true, sameSite: 'Strict' });
          Cookies.set('refresh_token', refresh_token, { secure: true, sameSite: 'Strict' });

          set({
            user,
            access_token,
            refresh_token,
            token_expiry: expiryTime,
          });

          if (logoutTimer) clearTimeout(logoutTimer);
          logoutTimer = setTimeout(() => {
            get().logout();
          }, expiresIn * 1000);
        },

        logout: () => {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          set({
            user: null,
            access_token: null,
            refresh_token: null,
            token_expiry: null,
          });
        },

        isAuthenticated: () => {
          const { access_token, token_expiry } = get();
          const cookieToken = Cookies.get('access_token');
          if (!access_token && !cookieToken) return false;
          if (token_expiry && Date.now() > token_expiry) {
            get().logout();
            return false;
          }
          return true;
        },

        getUserRoute: () => {
          const user = get().user;
          return user?.is_vendor ? '/admin' : '/user';
        },
      };
    },
    {
      name: 'auth-storage',
      onRehydrateStorage: () => {
        return (state) => {
          if (!state) return;
          state.hydrated = true;
          // Restart logout timer on reload
          if (state.token_expiry && Date.now() < state.token_expiry) {
            const remaining = state.token_expiry - Date.now();
            setTimeout(() => {
              state.logout();
            }, remaining);
          }
        };
      },
    }
  )
);