import React, { useState, useEffect, createContext } from 'react';
import LandingPage from './components/LandingPage';
import DropPage from './components/DropPage';
import Dashboard from './components/Dashboard';
import { ViewState, ThemeContextType } from './types';

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  useEffect(() => {
    // Check local storage or system preference on mount
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    // Update DOM and local storage when theme changes
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'drop':
        return <DropPage onNavigate={setCurrentView} />;
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} />;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="font-display min-h-screen bg-background-light dark:bg-background-dark text-neutral-900 dark:text-white transition-colors duration-300">
        
        {/* Development Navigation Switcher - Fixed at bottom center for easy testing */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-white/90 dark:bg-black/80 backdrop-blur-md px-2 py-2 rounded-full shadow-2xl border border-gray-200 dark:border-gray-800 flex gap-1">
          <button 
            onClick={() => setCurrentView('landing')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${currentView === 'landing' ? 'bg-primary text-black' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentView('drop')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${currentView === 'drop' ? 'bg-primary text-black' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
          >
            Drop
          </button>
          <button 
            onClick={() => setCurrentView('dashboard')}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${currentView === 'dashboard' ? 'bg-primary text-black' : 'text-gray-500 hover:text-black dark:hover:text-white'}`}
          >
            Dash
          </button>
        </div>

        {renderView()}

      </div>
    </ThemeContext.Provider>
  );
};

export default App;