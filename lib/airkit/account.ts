
import type { MocaID } from '../../types';
import { MOCA_ID_SUFFIX } from '../../constants';
import * as crypto from '../crypto';

const MOCA_ID_STORAGE_KEY = 'moca-connect-moca-id';

// MOCK: Simulates AIR Account Services for identity management.

export const login = async (handle: string): Promise<MocaID> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));

  const id = `${handle.toLowerCase().replace(/\s/g, '-')}${MOCA_ID_SUFFIX}`;
  const keyPair = crypto.generateKeyPair();
  
  const mocaId: MocaID = {
    id,
    displayName: handle,
    keyPair: {
      publicKey: keyPair.publicKey,
      secretKey: keyPair.secretKey,
    },
    avatarUrl: `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${id}`
  };

  // Persist to local storage for demo purposes
  localStorage.setItem(MOCA_ID_STORAGE_KEY, JSON.stringify({
      ...mocaId,
      keyPair: {
          publicKey: Array.from(mocaId.keyPair.publicKey),
          secretKey: Array.from(mocaId.keyPair.secretKey),
      }
  }));

  return mocaId;
};

export const logout = (): void => {
  localStorage.removeItem(MOCA_ID_STORAGE_KEY);
};

export const getSession = (): MocaID | null => {
  const stored = localStorage.getItem(MOCA_ID_STORAGE_KEY);
  if (!stored) return null;
  
  const parsed = JSON.parse(stored);
  return {
      ...parsed,
      keyPair: {
          publicKey: new Uint8Array(parsed.keyPair.publicKey),
          secretKey: new Uint8Array(parsed.keyPair.secretKey),
      }
  }
};
