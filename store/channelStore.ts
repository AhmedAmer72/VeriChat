
import { create } from 'zustand';
import { Channel, Message, DecryptedMessage, GatePolicy } from '../types';
import { CHANNELS, GATE_POLICIES } from '../constants';
import { ITransport, MockLocalTransport } from '../lib/transport/MockLocalTransport';
import * as crypto from '../lib/crypto';
import { useAuthStore } from './authStore';

interface ChannelState {
  channels: Channel[];
  policies: GatePolicy[];
  messages: Record<string, DecryptedMessage[]>;
  activeChannelId: string | null;
  transport: ITransport | null;
  initTransport: () => void;
  setActiveChannelId: (channelId: string | null) => void;
  joinChannel: (channelId: string) => void;
  sendMessage: (channelId: string, text: string) => Promise<void>;
  receiveMessage: (message: Message) => void;
}

export const useChannelStore = create<ChannelState>((set, get) => ({
  channels: CHANNELS,
  policies: GATE_POLICIES,
  messages: {},
  activeChannelId: null,
  transport: null,

  initTransport: () => {
    const transport = new MockLocalTransport();
    transport.onMessage((message) => get().receiveMessage(message));
    set({ transport });
  },

  setActiveChannelId: (channelId: string | null) => {
    set({ activeChannelId: channelId });
  },

  joinChannel: (channelId: string) => {
    const { mocaId } = useAuthStore.getState();
    if (!mocaId) return;

    set((state) => {
      const channel = state.channels.find((c) => c.id === channelId);
      if (channel && !channel.members.includes(mocaId.id)) {
        return {
          channels: state.channels.map((c) =>
            c.id === channelId ? { ...c, members: [...c.members, mocaId.id] } : c
          ),
        };
      }
      return state;
    });
    get().setActiveChannelId(channelId);
  },

  sendMessage: async (channelId: string, text: string) => {
    const { mocaId } = useAuthStore.getState();
    const { transport, channels } = get();
    const channel = channels.find((c) => c.id === channelId);
    if (!mocaId || !transport || !channel) return;

    // In a real app, a shared conversation key would be derived/exchanged.
    // Here we use a static key for simplicity.
    const conversationKey = await crypto.getSharedSecret(); 
    const { ciphertext, nonce } = crypto.encryptMessage(text, conversationKey);
    
    const message: Message = {
      id: crypto.generateUUID(),
      channelId,
      senderMocaId: mocaId.id,
      ciphertext,
      nonce,
      timestamp: Date.now(),
    };
    
    transport.sendMessage(message);
  },
  
  receiveMessage: async (message: Message) => {
    const { channels } = get();
    const channel = channels.find(c => c.id === message.channelId);
    if (!channel) return;

    const conversationKey = await crypto.getSharedSecret();
    const text = crypto.decryptMessage(message.ciphertext, message.nonce, conversationKey);

    if (text === null) {
        console.error("Failed to decrypt message:", message.id);
        return;
    }

    const decryptedMessage: DecryptedMessage = {
        ...message,
        text,
    };

    set((state) => ({
        messages: {
            ...state.messages,
            [message.channelId]: [...(state.messages[message.channelId] || []), decryptedMessage],
        },
    }));
  }
}));
