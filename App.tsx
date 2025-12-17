import React, { useState, useEffect, createContext } from 'react';
import LandingPage from './components/LandingPage';
import DropPage from './components/DropPage';
import Dashboard from './components/Dashboard';
import { ViewState, ThemeContextType } from './types';

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

export interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentView, setCurrentView] = useState<ViewState>('landing');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [lastAddedId, setLastAddedId] = useState<number | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
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

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.size === product.size);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.size === product.size) 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setLastAddedId(product.id);
    setTimeout(() => setLastAddedId(null), 2000);
  };

  const updateQuantity = (id: number, size: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.size === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.size === size)));
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'drop':
        return <DropPage onNavigate={setCurrentView} onAddToCart={addToCart} cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)} />;
      case 'dashboard':
        return (
          <Dashboard 
            onNavigate={setCurrentView} 
            cartItems={cartItems} 
            updateQuantity={updateQuantity} 
            removeItem={removeItem}
            setCartItems={setCartItems}
          />
        );
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="font-display min-h-screen bg-background-light dark:bg-background-dark text-neutral-900 dark:text-white transition-colors duration-300">
        
        {/* Navigation Indicator Overlay for Add to Cart */}
        {lastAddedId && (
          <div className="fixed top-24 right-4 z-[100] animate-bounce">
            <div className="bg-primary text-black px-4 py-2 rounded-full font-bold shadow-xl flex items-center gap-2">
              <span className="material-symbols-outlined">check_circle</span>
              Added to Bag!
            </div>
          </div>
        )}

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
            Dash {cartItems.length > 0 && <span className="ml-1 px-1.5 py-0.5 bg-black text-primary dark:bg-primary dark:text-black rounded-full text-[10px]">{cartItems.reduce((acc, i) => acc + i.quantity, 0)}</span>}
          </button>
        </div>

        {renderView()}

      </div>
    </ThemeContext.Provider>
  );
};

export default App;