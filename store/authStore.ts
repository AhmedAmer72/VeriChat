
import { create } from 'zustand';
import { MocaID } from '../types';
import * as airAccount from '../lib/airkit/account';

interface AuthState {
  mocaId: MocaID | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (handle: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  mocaId: null,
  isAuthenticated: false,
  isLoading: false,
  login: async (handle: string) => {
    set({ isLoading: true });
    try {
      const mocaId = await airAccount.login(handle);
      set({ mocaId, isAuthenticated: true });
    } catch (error) {
      console.error("Login failed", error);
    } finally {
      set({ isLoading: false });
    }
  },
  logout: () => {
    airAccount.logout();
    set({ mocaId: null, isAuthenticated: false });
  },
}));
