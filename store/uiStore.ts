
import { create } from 'zustand';
import { ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

interface UiState {
  isProofModalOpen: boolean;
  proofModalChannelId: string | null;
  openProofModal: (channelId: string) => void;
  closeProofModal: () => void;
  
  toasts: ToastMessage[];
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: number) => void;
}

let toastId = 0;

export const useUiStore = create<UiState>((set, get) => ({
  isProofModalOpen: false,
  proofModalChannelId: null,
  openProofModal: (channelId) => set({ isProofModalOpen: true, proofModalChannelId: channelId }),
  closeProofModal: () => set({ isProofModalOpen: false, proofModalChannelId: null }),

  toasts: [],
  addToast: (message, type) => {
    const id = toastId++;
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => get().removeToast(id), 5000);
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));
