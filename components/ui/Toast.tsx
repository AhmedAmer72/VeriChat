
import React from 'react';
import { useUiStore } from '../../store/uiStore';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, XCircle, Info } from 'lucide-react';

const icons = {
  success: <CheckCircle className="text-green-400" />,
  error: <XCircle className="text-red-400" />,
  info: <Info className="text-blue-400" />,
};

export const Toaster = () => {
  const { toasts } = useUiStore();

  return (
    <div className="fixed bottom-0 right-0 p-4 space-y-2 z-[100]">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="flex items-center w-full max-w-xs p-4 space-x-4 bg-panel border border-white/10 rounded-lg shadow-lg"
          >
            <div>{icons[toast.type]}</div>
            <p className="text-sm font-medium text-gray-200">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const useToast = () => {
  const addToast = useUiStore((state) => state.addToast);
  return {
    success: (message: string) => addToast(message, 'success'),
    error: (message: string) => addToast(message, 'error'),
    info: (message: string) => addToast(message, 'info'),
  };
};
