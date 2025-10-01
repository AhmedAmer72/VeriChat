
import type { Credential, CredentialSchema } from '../../types';
import * as crypto from '../crypto';
import { CREDENTIAL_SCHEMAS } from '../../constants';

const CREDENTIAL_STORAGE_KEY_PREFIX = 'moca-connect-credentials-';

// MOCK: Simulates AIR Credential Services for issuing and managing credentials.

const getStorageKey = (mocaId: string) => `${CREDENTIAL_STORAGE_KEY_PREFIX}${mocaId}`;

export const issueCredential = async (mocaId: string, schemaId: string, claims: Record<string, unknown>): Promise<Credential> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 500));
  
  const schema = CREDENTIAL_SCHEMAS.find(s => s.id === schemaId);
  if (!schema) {
    throw new Error(`Schema with id ${schemaId} not found.`);
  }

  const newCredential: Credential = {
    id: crypto.generateUUID(),
    schemaId,
    subjectMocaId: mocaId,
    issuer: schema.issuer,
    issuedAt: Math.floor(Date.now() / 1000),
    claims,
    signature: 'mock-signature-' + Math.random(), // In a real system, this would be a cryptographic signature
  };

  const existingCredentials = await listCredentials(mocaId);
  const updatedCredentials = [...existingCredentials, newCredential];
  localStorage.setItem(getStorageKey(mocaId), JSON.stringify(updatedCredentials));

  return newCredential;
};

export const listCredentials = async (mocaId: string): Promise<Credential[]> => {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 300));

  const stored = localStorage.getItem(getStorageKey(mocaId));
  return stored ? JSON.parse(stored) : [];
};
