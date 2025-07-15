import { ReactNode } from 'react';

interface DashboardHeaderProps {
  title: string;
  children?: ReactNode;
}

export const DashboardHeader = ({ title, children }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        {title}
      </h1>
      {children}
    </div>
  );
};