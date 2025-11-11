import React from 'react';
import Icon from './Icon';

interface FloatingActionButtonProps {
  onClick: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute bottom-20 right-6 z-20 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:hidden"
      aria-label="Yeni talep oluştur"
    >
      <Icon name="plus" className="h-8 w-8" />
    </button>
  );
};

export default FloatingActionButton;