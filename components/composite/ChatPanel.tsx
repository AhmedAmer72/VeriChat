
import React, { useState, useEffect, useRef } from 'react';
import { useChannelStore } from '../../store/channelStore';
import { useAuthStore } from '../../store/authStore';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Avatar from '../ui/Avatar';
import { AnimatePresence, motion } from 'framer-motion';
import { ShieldCheck, Send } from 'lucide-react';

const ChatPanel: React.FC = () => {
  const { activeChannelId, channels, messages, sendMessage } = useChannelStore();
  const { mocaId } = useAuthStore();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChannel = channels.find(c => c.id === activeChannelId);
  const channelMessages = messages[activeChannelId || ''] || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [channelMessages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && activeChannelId) {
      sendMessage(activeChannelId, newMessage.trim());
      setNewMessage('');
    }
  };

  if (!activeChannel || !mocaId) {
    return (
      <div className="flex-grow flex items-center justify-center bg-panel rounded-r-xl">
        <p className="text-gray-500">Select a channel to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-grow flex flex-col bg-panel rounded-r-xl border-l border-white/10">
      <header className="p-4 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-lg font-bold text-white font-display">{activeChannel.name}</h2>
        <div className="flex items-center space-x-2 text-sm text-secondary animate-pulse">
            <ShieldCheck size={16} />
            <span>Verified by ZK-style Proof</span>
        </div>
      </header>

      <div className="flex-grow p-4 overflow-y-auto space-y-4">
        <AnimatePresence>
            {channelMessages.map((msg) => {
                const isSender = msg.senderMocaId === mocaId.id;
                return (
                <motion.div
                    key={msg.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-end gap-2 ${isSender ? 'justify-end' : 'justify-start'}`}
                >
                    {!isSender && <Avatar alt={msg.senderMocaId} size="sm" />}
                    <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${isSender ? 'bg-primary text-white rounded-br-none' : 'bg-surface text-gray-200 rounded-bl-none'}`}>
                        <p className="text-sm">{msg.text}</p>
                    </div>
                </motion.div>
                );
            })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <footer className="p-4 border-t border-white/10">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your encrypted message..."
            className="flex-grow"
          />
          <Button type="submit" size="md" variant="primary" disabled={!newMessage.trim()}>
            <Send size={18} />
          </Button>
        </form>
      </footer>
    </div>
  );
};

export default ChatPanel;
