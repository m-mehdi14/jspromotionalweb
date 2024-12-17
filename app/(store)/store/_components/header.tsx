import React from "react";

interface DashboardHeaderProps {
  title: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title }) => {
  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-sm text-gray-400">Welcome to your store dashboard!</p>
    </header>
  );
};

export default DashboardHeader;
