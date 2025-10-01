
import { create } from 'zustand';
import { Credential, CredentialSchema } from '../types';
import * as airCredentials from '../lib/airkit/credentials';
import { CREDENTIAL_SCHEMAS } from '../constants';

interface CredentialState {
  credentials: Credential[];
  schemas: CredentialSchema[];
  isLoading: boolean;
  fetchCredentials: (mocaId: string) => Promise<void>;
  issueCredential: (mocaId: string, schemaId: string, claims: Record<string, unknown>) => Promise<void>;
}

export const useCredentialStore = create<CredentialState>((set, get) => ({
  credentials: [],
  schemas: CREDENTIAL_SCHEMAS,
  isLoading: false,
  fetchCredentials: async (mocaId: string) => {
    set({ isLoading: true });
    try {
      const credentials = await airCredentials.listCredentials(mocaId);
      set({ credentials });
    } catch (error) {
      console.error("Failed to fetch credentials", error);
    } finally {
      set({ isLoading: false });
    }
  },
  issueCredential: async (mocaId: string, schemaId: string, claims: Record<string, unknown>) => {
    set({ isLoading: true });
    try {
      const newCredential = await airCredentials.issueCredential(mocaId, schemaId, claims);
      set((state) => ({ credentials: [...state.credentials, newCredential] }));
    } catch (error) {
      console.error("Failed to issue credential", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
