
import React from 'react';

interface EmergencyCardProps {
  title: string;
  emoji: string;
  description: string;
  urgency: 'high' | 'medium' | 'low';
  onClick: () => void;
}

const EmergencyCard: React.FC<EmergencyCardProps> = ({
  title,
  emoji,
  description,
  urgency,
  onClick
}) => {
  const getUrgencyStyles = () => {
    switch (urgency) {
      case 'high':
        return 'border-emergency-500 bg-emergency-50 hover:bg-emergency-100';
      case 'medium':
        return 'border-orange-400 bg-orange-50 hover:bg-orange-100';
      case 'low':
        return 'border-success-500 bg-success-50 hover:bg-success-100';
      default:
        return 'border-gray-200 bg-gray-50 hover:bg-gray-100';
    }
  };

  const getUrgencyBadge = () => {
    switch (urgency) {
      case 'high':
        return '🚨 URGENTE';
      case 'medium':
        return '⚠️ MODERADO';
      case 'low':
        return '✅ BAIXO';
      default:
        return '';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`card-hover p-6 rounded-2xl border-2 ${getUrgencyStyles()} cursor-pointer relative`}
    >
      <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded-full bg-white/80">
        {getUrgencyBadge()}
      </div>
      
      <div className="text-4xl mb-3">{emoji}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      
      <div className="mt-4 flex items-center text-trust font-semibold text-sm">
        <span>Ver instruções</span>
        <span className="ml-2">→</span>
      </div>
    </div>
  );
};

export default EmergencyCard;
