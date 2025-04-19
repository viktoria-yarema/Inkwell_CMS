import { create } from "zustand";

type ProfileStore = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
}));
