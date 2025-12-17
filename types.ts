export type ViewState = 'landing' | 'drop' | 'dashboard';

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface NavigationProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}