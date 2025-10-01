
import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const Card: React.FC<CardProps> = ({ children, className, as = 'div' }) => {
  const MotionComponent = motion[as];

  return (
    <MotionComponent
      className={`bg-panel-light backdrop-blur-xl border border-white/10 rounded-xl shadow-lg relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none"></div>
      <div className="relative z-10">{children}</div>
    </MotionComponent>
  );
};

export default Card;
