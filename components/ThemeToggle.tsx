import React, { useContext } from 'react';
import { ThemeContext } from '../App';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2 rounded-full overflow-hidden transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 group ${className}`}
      aria-label="Toggle Dark Mode"
    >
      <div className={`relative z-10 text-neutral-800 dark:text-neutral-200 transition-transform duration-500 ${theme === 'dark' ? 'rotate-180' : 'rotate-0'}`}>
        <span className="material-symbols-outlined text-[24px]">
          {theme === 'dark' ? 'light_mode' : 'dark_mode'}
        </span>
      </div>
    </button>
  );
};

export default ThemeToggle;