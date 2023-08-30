"use client";

interface HeaderProps {
  title: string;
  description: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <div className="text-center py-4">
      <h1 className="font-bold tracking-tight text-3xl py-3">{title}</h1>
      <p>{description}</p>
    </div>
  );
};
