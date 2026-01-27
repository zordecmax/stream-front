'use client';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'danger';
  className?: string;
}

export default function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const baseStyles = 'inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold transition-colors';
  
  const variantStyles = {
    primary: 'bg-[#09CAC863] text-white',
    secondary: 'bg-gray-800 text-gray-300',
    success: 'bg-green-600 text-white',
    danger: 'bg-red-600 text-white',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  );
}
