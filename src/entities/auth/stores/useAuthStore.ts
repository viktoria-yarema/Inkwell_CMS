import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
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
      accessToken: null,
      setAccessToken: (accessToken: string) => set({ accessToken }),
      logout: () => set({ isAuthenticated: false, accessToken: null }),
    }),

    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAuthStore;
