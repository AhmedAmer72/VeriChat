
import React, { useState, createContext, useContext } from 'react';
import { motion } from 'framer-motion';

interface TabsContextProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextProps | undefined>(undefined);

export const Tabs: React.FC<{ defaultValue: string; children: React.ReactNode }> = ({ defaultValue, children }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>;
};

export const TabsList: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => {
  return <div className={`flex space-x-1 border-b border-white/10 p-1 ${className}`}>{children}</div>;
};

export const TabsTrigger: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsTrigger must be used within a Tabs component');
  
  const isActive = context.activeTab === value;

  return (
    <button
      onClick={() => context.setActiveTab(value)}
      className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none ${
        isActive ? 'text-white' : 'text-gray-400 hover:text-white'
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          layoutId="active-tab-indicator"
          className="absolute inset-x-0 bottom-[-5px] h-[2px] bg-primary"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
};

export const TabsContent: React.FC<{ value: string; children: React.ReactNode }> = ({ value, children }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabsContent must be used within a Tabs component');
  
  return context.activeTab === value ? <div className="mt-4">{children}</div> : null;
};
