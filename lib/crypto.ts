import nacl from 'tweetnacl';
import { Buffer } from 'buffer';

// This is needed for tweetnacl to work in some browser environments
// FIX: Augment the global Window interface to inform TypeScript that 'Buffer' is a valid property.
declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}
window.Buffer = Buffer;

// SIMULATION: In a real app, never expose or store secret keys like this.
// They should be managed securely in a wallet.

export const generateKeyPair = () => {
  return nacl.box.keyPair();
};

export const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};


// SIMULATION: This is a static, shared key for the demo. In a real E2E
// encrypted system, you'd use a key agreement protocol like Diffie-Hellman
// (or nacl.box.before) to establish a shared secret for each conversation.
const DEMO_SHARED_SECRET = new Uint8Array(32).fill(1);
export const getSharedSecret = async () => {
    return DEMO_SHARED_SECRET;
}

export const encryptMessage = (message: string, sharedKey: Uint8Array) => {
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const messageUint8 = new TextEncoder().encode(message);
  
  const ciphertext = nacl.secretbox(messageUint8, nonce, sharedKey);
  
  return { ciphertext, nonce };
};

export const decryptMessage = (ciphertext: Uint8Array, nonce: Uint8Array, sharedKey: Uint8Array): string | null => {
  const decryptedMessageUint8 = nacl.secretbox.open(ciphertext, nonce, sharedKey);

  if (!decryptedMessageUint8) {
    return null;
  }
  
  return new TextDecoder().decode(decryptedMessageUint8);
};