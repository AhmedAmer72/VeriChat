
import { Message } from '../../types';

export interface ITransport {
  sendMessage(message: Message): void;
  onMessage(callback: (message: Message) => void): void;
  disconnect(): void;
}

export class MockLocalTransport implements ITransport {
  private channel: BroadcastChannel;
  private messageCallback?: (message: Message) => void;

  constructor(channelName: string = 'moca-connect-demo') {
    this.channel = new BroadcastChannel(channelName);
    this.channel.onmessage = this.handleMessage.bind(this);
  }

  private handleMessage(event: MessageEvent) {
    if (this.messageCallback) {
      // The event.data is the Message object
      const message = event.data as Message;
      // We need to reconstruct the Uint8Arrays
      message.ciphertext = new Uint8Array(Object.values(message.ciphertext));
      message.nonce = new Uint8Array(Object.values(message.nonce));

      this.messageCallback(message);
    }
  }

  sendMessage(message: Message): void {
    // BroadcastChannel can't serialize Uint8Array directly in all browsers consistently
    // A simple workaround is to convert them to array-like objects
    const serializableMessage = {
      ...message,
      ciphertext: { ...message.ciphertext },
      nonce: { ...message.nonce },
    };
    this.channel.postMessage(serializableMessage);
  }

  onMessage(callback: (message: Message) => void): void {
    this.messageCallback = callback;
  }

  disconnect(): void {
    this.channel.close();
  }
}
