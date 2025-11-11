import React from 'react';
import Icon from './Icon';

interface NavItemData {
  name: string;
  icon: string;
  view: string;
}

const navItemsData: NavItemData[] = [
  { name: 'Ana Sayfa', icon: 'home', view: 'home' },
  { name: 'Teklifler', icon: 'tag', view: 'offers' },
  { name: 'Talep Oluştur', icon: 'plus', view: 'talep' },
  { name: 'Mesajlar', icon: 'chat', view: 'messages' },
  { name: 'Profil', icon: 'user', view: 'profile' },
];

interface BottomNavProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onTalepClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onNavigate, onTalepClick }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 border-t bg-white md:hidden">
      <div className="mx-auto flex h-16 max-w-md justify-around">
        {navItemsData.map((item) => {
          const isActive = item.view === currentView;
          const isTalepButton = item.view === 'talep';

          const content = (
            <>
              <Icon name={item.icon} className="h-6 w-6" />
              <span className="text-xs">{item.name}</span>
            </>
          );

          const className = `flex flex-col items-center justify-center space-y-1 w-full font-medium ${
            isActive ? 'text-blue-600' : 'text-slate-500 hover:text-blue-600'
          }`;
          
          const handleClick = () => {
              if (isTalepButton) {
                  onTalepClick();
              } else {
                  onNavigate(item.view);
              }
          }

          // Render a button for all items for consistent focus handling and semantics
          return (
            <button key={item.name} onClick={handleClick} className={className} aria-current={isActive ? 'page' : undefined}>
              {content}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;