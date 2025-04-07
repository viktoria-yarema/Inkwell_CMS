import { create } from "zustand";

type TagStore = {
  tagName: string;
  setTagName: (tagName: string) => void;
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
