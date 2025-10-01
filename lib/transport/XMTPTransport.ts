
import { Message } from '../../types';
import { ITransport } from './MockLocalTransport';

// STUB: This is a placeholder for a real XMTP transport implementation.
// See XMTP documentation for details: https://xmtp.org/docs/

export class XMTPTransport implements ITransport {
  constructor() {
    console.warn("XMTPTransport is a stub and not implemented.");
  }

  sendMessage(message: Message): void {
    // TODO: Implement sending a message over XMTP.
    // 1. Initialize the XMTP client with a user's wallet.
    // 2. Find or create a conversation for the channel.
    // 3. Send the message to the conversation.
    throw new Error('XMTPTransport.sendMessage not implemented.');
  }

  onMessage(callback: (message: Message) => void): void {
    // TODO: Implement subscribing to messages from an XMTP conversation.
    // 1. Initialize the XMTP client.
    // 2. Stream messages from the relevant conversations.
    // 3. Adapt XMTP message format to the Moca Connect Message format and pass to callback.
    throw new Error('XMTPTransport.onMessage not implemented.');
  }

  disconnect(): void {
    // TODO: Disconnecting is typically handled by the XMTP client lifecycle.
    throw new Error('XMTPTransport.disconnect not implemented.');
  }
}
