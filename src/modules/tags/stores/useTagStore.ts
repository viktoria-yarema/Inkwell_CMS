import { create } from "zustand";
import { InkwellIcon } from "@/entities/tags/type";

type TagStore = {
  tagName: string;
  setTagName: (tagName: string) => void;
  selectedIcon: InkwellIcon | undefined;
  setSelectedIcon: (icon: InkwellIcon | undefined) => void;
  openCreateTagModal: boolean;
  setOpenCreateTagModal: (open: boolean) => void;
  selectedTagId: string | null;
  setSelectedTagId: (selectedTagId: string | null) => void;
  openDeleteTagModal: boolean;
  setOpenDeleteTagModal: (open: boolean) => void;
  openUpdateTagModal: boolean;
  setOpenUpdateTagModal: (open: boolean) => void;
};

const useTagStore = create<TagStore>((set) => ({
  tagName: "",
  setTagName: (tagName) => set({ tagName }),
  selectedIcon: undefined,
  setSelectedIcon: (selectedIcon) => set({ selectedIcon }),
  openCreateTagModal: false,
  setOpenCreateTagModal: (open) => set({ openCreateTagModal: open }),
  selectedTagId: null,
  setSelectedTagId: (selectedTagId) => set({ selectedTagId }),
  openDeleteTagModal: false,
  setOpenDeleteTagModal: (open) => set({ openDeleteTagModal: open }),
  openUpdateTagModal: false,
  setOpenUpdateTagModal: (open) => set({ openUpdateTagModal: open }),
}));

export default useTagStore;
