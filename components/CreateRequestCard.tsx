import React from 'react';
import Icon from './Icon';

interface CreateRequestCardProps {
  onCreateClick: () => void;
}

const CreateRequestCard: React.FC<CreateRequestCardProps> = ({ onCreateClick }) => {
    const honeycombBg = {
    backgroundColor: '#1e3a8a', // dark blue
    backgroundImage: `
      linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6),
      linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6),
      linear-gradient(30deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6),
      linear-gradient(150deg, #3b82f6 12%, transparent 12.5%, transparent 87%, #3b82f6 87.5%, #3b82f6),
      linear-gradient(60deg, #2563eb 25%, transparent 25.5%, transparent 75%, #2563eb 75%, #2563eb),
      linear-gradient(60deg, #2563eb 25%, transparent 25.5%, transparent 75%, #2563eb 75%, #2563eb)
    `,
    backgroundSize: '80px 140px',
    backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
  };


  return (
    <div 
      className="overflow-hidden rounded-xl bg-gradient-to-br from-blue-700 to-blue-800 p-6 text-white shadow-lg"
      style={honeycombBg}
    >
      <div className="relative z-10">
        <h1 className="text-2xl font-bold">Kurumsal Tedarik Talebi Oluşturun</h1>
        <p className="mt-1 mb-4 text-blue-200">
          İhtiyaçlarınız için en iyi tedarikçilerden teklifler alın.
        </p>
        <button 
          onClick={onCreateClick}
          className="flex w-full items-center justify-center space-x-2 rounded-lg bg-white py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
        >
          <Icon name="plus" className="h-5 w-5" />
          <span>Talep Oluştur</span>
        </button>
      </div>
    </div>
  );
};

export default CreateRequestCard;