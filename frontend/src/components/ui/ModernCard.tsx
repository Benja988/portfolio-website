import { ReactNode } from 'react';

interface ModernCardProps {
  children: ReactNode;
  className?: string;
}

export const ModernCard = ({ children, className = '' }: ModernCardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${className}`}>
      {children}
    </div>
  );
};