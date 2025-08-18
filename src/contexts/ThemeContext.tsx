// src/contexts/ThemeContext.tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { getAvailableThemeNames, getThemeByName } from '@/themes';
import type { ThemeContextType } from '@/types/theme';
import { createContext, ReactNode, useCallback, useMemo } from 'react';

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // String-based theme system with 'dark' as default
  const [currentTheme, setCurrentTheme] = useLocalStorage(
    'currentTheme',
    'dark'
  );

  // Theme selection function
  const setTheme = useCallback(
    (themeName: string) => {
      setCurrentTheme(themeName);
    },
    [setCurrentTheme]
  );

  // Get current theme object using string-based lookup
  const theme = useMemo(() => {
    return getThemeByName(currentTheme);
  }, [currentTheme]);

  // Get available themes array
  const availableThemes = useMemo(() => {
    return getAvailableThemeNames();
  }, []);

  const contextValue = useMemo(
    () => ({
      theme,
      currentTheme,
      setTheme,
      availableThemes,
    }),
    [theme, currentTheme, setTheme, availableThemes]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
