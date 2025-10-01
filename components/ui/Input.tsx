
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, icon, ...props }, ref) => {
  return (
    <div className="relative">
      {icon && <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">{icon}</div>}
      <input
        className={`w-full bg-surface border border-white/20 rounded-md py-2 px-4 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors ${icon ? 'pl-10' : ''} ${className}`}
        ref={ref}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
