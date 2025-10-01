
import { Message } from '../../types';
import { ITransport } from './MockLocalTransport';

// STUB: This is a placeholder for a real Waku transport implementation.
// See Waku documentation for details: https://js.waku.org/

export class WakuTransport implements ITransport {
  constructor() {
    console.warn("WakuTransport is a stub and not implemented.");
  }

  sendMessage(message: Message): void {
    // TODO: Implement sending a message over Waku Relay.
    // 1. Connect to a Waku node.
    // 2. Create a Waku message with the payload.
    // 3. Publish the message to a content topic corresponding to the channel ID.
    throw new Error('WakuTransport.sendMessage not implemented.');
  }

  onMessage(callback: (message: Message) => void): void {
    // TODO: Implement subscribing to messages from a Waku content topic.
    // 1. Connect to a Waku node.
    // 2. Subscribe to the relevant content topics.
    // 3. Decode incoming Waku messages and pass them to the callback.
    throw new Error('WakuTransport.onMessage not implemented.');
  }

  disconnect(): void {
    // TODO: Implement disconnecting from the Waku node.
    throw new Error('WakuTransport.disconnect not implemented.');
  }
}
