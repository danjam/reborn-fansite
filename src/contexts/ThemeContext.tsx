// src/contexts/ThemeContext.tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getTheme, type ThemeName } from '@/themes';
import type { ThemeContextType } from '@/types/theme';
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', true);

  // Apply dark class to document element for Tailwind dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, [setDarkMode]);

  // Memoize theme selection to prevent unnecessary re-renders
  const theme = useMemo(() => {
    const themeName: ThemeName = darkMode ? 'dark' : 'light';
    return getTheme(themeName);
  }, [darkMode]);

  const contextValue = useMemo(
    () => ({
      theme,
      darkMode,
      toggleDarkMode,
    }),
    [theme, darkMode, toggleDarkMode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
