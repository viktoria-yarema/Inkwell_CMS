import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: () => void;
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string) => void;
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      setIsAuthenticated: () =>
        set({
          isAuthenticated:
            get().refreshToken !== null && get().accessToken !== null,
        }),
      refreshToken: null,
      setRefreshToken: (refreshToken: string) => set({ refreshToken }),
      accessToken: null,
      setAccessToken: (accessToken: string) => set({ accessToken }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
