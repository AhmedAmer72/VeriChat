
import React from 'react';

interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

const Avatar: React.FC<AvatarProps> = ({ src, alt, size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]}`}>
      <img
        className="h-full w-full rounded-full object-cover"
        src={src || `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${alt}`}
        alt={alt}
      />
      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-surface" />
    </div>
  );
};

export default Avatar;
