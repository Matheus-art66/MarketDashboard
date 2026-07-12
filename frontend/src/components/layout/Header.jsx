import React from "react";

const IconMenu = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

// ============================================
// HEADER COMPONENT
// ============================================

const Header = ({ title, onMenuClick }) => {
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white border-b border-gray-200 px-6 md:px-8 py-5 flex justify-between items-center shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <IconMenu />
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-text-dark">{title}</h1>
      </div>
      <div className="text-xs md:text-sm text-gray-500 font-medium">{currentDate}</div>
    </header>
  );
};
export default Header