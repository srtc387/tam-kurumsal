
import React from 'react';
import Icon from './Icon';

interface HeaderProps {
  onProfileClick: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick, showBackButton, onBackClick }) => {
  const honeycombBg = {
    backgroundColor: '#ffffff',
    backgroundImage: `
      linear-gradient(30deg, #e2e8f0 12%, transparent 12.5%, transparent 87%, #e2e8f0 87.5%, #e2e8f0),
      linear-gradient(150deg, #e2e8f0 12%, transparent 12.5%, transparent 87%, #e2e8f0 87.5%, #e2e8f0),
      linear-gradient(30deg, #e2e8f0 12%, transparent 12.5%, transparent 87%, #e2e8f0 87.5%, #e2e8f0),
      linear-gradient(150deg, #e2e8f0 12%, transparent 12.5%, transparent 87%, #e2e8f0 87.5%, #e2e8f0),
      linear-gradient(60deg, #f1f5f9 25%, transparent 25.5%, transparent 75%, #f1f5f9 75%, #f1f5f9),
      linear-gradient(60deg, #f1f5f9 25%, transparent 25.5%, transparent 75%, #f1f5f9 75%, #f1f5f9)
    `,
    backgroundSize: '80px 140px',
    backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px',
  };

  return (
    <header 
      className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-200 px-4 sm:px-6 lg:px-8"
      style={honeycombBg}
    >
      <div className="flex flex-1 items-center space-x-3">
        {showBackButton && (
          <button onClick={onBackClick} className="mr-2 rounded-full p-2 text-slate-600 hover:bg-slate-100 hover:text-blue-700">
            <Icon name="arrow-left" className="h-6 w-6" />
          </button>
        )}
        <div
          className="flex h-8 w-8 items-center justify-center bg-blue-600 text-white"
          style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
        >
          <span className="text-xl font-bold">T</span>
        </div>
        <span className="text-2xl font-bold text-slate-800">TAM Kurumsal</span>
      </div>
      <div className="flex items-center space-x-4 text-slate-600">
        <button className="p-1 hover:text-blue-600">
          <Icon name="bell" className="h-6 w-6" />
        </button>
        <button onClick={onProfileClick} className="p-1 hover:text-blue-600">
          <Icon name="user" className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
};

export default Header;