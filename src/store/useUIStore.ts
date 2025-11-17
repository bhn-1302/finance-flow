import { create } from "zustand";

interface UIState {
  addModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  addModalOpen: false,
  openAddModal: () => set({ addModalOpen: true }),
  closeAddModal: () => set({ addModalOpen: false }),
}));
