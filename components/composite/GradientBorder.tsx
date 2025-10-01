
import React from 'react';

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  borderRadius?: string;
}

const GradientBorder: React.FC<GradientBorderProps> = ({ children, className, borderRadius = 'rounded-xl' }) => {
  return (
    <div className={`relative p-[2px] bg-gradient-to-r from-primary via-secondary to-accent bg-[length:400%_400%] animate-shimmer ${borderRadius} ${className}`}>
      <div className={`bg-panel h-full w-full ${borderRadius}`}>
        {children}
      </div>
    </div>
  );
};

export default GradientBorder;
