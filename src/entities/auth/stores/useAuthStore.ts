import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({
          isAuthenticated,
        }),
      refreshToken: null,
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),
      accessToken: null,
      setAccessToken: (accessToken: string) => set({ accessToken }),
      logout: () =>
        set({ isAuthenticated: false, refreshToken: null, accessToken: null }),
    }),

    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
