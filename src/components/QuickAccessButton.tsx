
import React from 'react';

interface QuickAccessButtonProps {
  title: string;
  emoji: string;
  onClick: () => void;
  variant?: 'emergency' | 'normal';
}

const QuickAccessButton: React.FC<QuickAccessButtonProps> = ({
  title,
  emoji,
  onClick,
  variant = 'normal'
}) => {
  const baseClasses = "w-full p-6 rounded-2xl font-bold text-lg shadow-lg transform transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center space-x-3";
  
  const variantClasses = variant === 'emergency' 
    ? "bg-emergency hover:bg-emergency-600 text-white animate-pulse-glow" 
    : "bg-trust hover:bg-trust-600 text-white";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      <span className="text-2xl">{emoji}</span>
      <span>{title}</span>
    </button>
  );
};

export default QuickAccessButton;
