'use client';

import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'semitransparent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Badge({ children, variant = 'primary', size = 'md', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center rounded-xl font-semibold transition-colors whitespace-nowrap';

  const sizeStyles = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-sm',
  };
  
  const variantStyles = {
    primary: 'bg-[#09CAC863] text-white',
    secondary: 'bg-gray-800 text-gray-300',
    success: 'bg-green-600 text-white',
    danger: 'bg-red-600 text-white',
    semitransparent: 'bg-gray-900/60 text-white',
  };

  return (
    <span className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
