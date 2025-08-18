// src/contexts/ThemeContext.tsx
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ThemeService } from '@/services/ThemeService';
import type { ThemeContextType } from '@/types/theme';
import { createContext, ReactNode, useCallback, useMemo } from 'react';

const ThemeContext = createContext<ThemeContextType | null>(null);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // Get default theme name
  const defaultTheme = ThemeService.getAvailableThemeNames()[0] ?? 'dark';

  // String-based theme system with first available theme as default
  const [storedTheme, setCurrentTheme] = useLocalStorage(
    'currentTheme',
    defaultTheme
  );

  // Ensure currentTheme is never undefined - guarantee it's a string
  const currentTheme: string = storedTheme ?? defaultTheme;

  // Theme selection function
  const setTheme = useCallback(
    (themeName: string) => {
      setCurrentTheme(themeName);
    },
    [setCurrentTheme]
  );

  // Get current theme object using string-based lookup
  const theme = useMemo(() => {
    return ThemeService.getThemeByName(currentTheme);
  }, [currentTheme]);

  // Get available themes array
  const availableThemes = useMemo(() => {
    return ThemeService.getAvailableThemeNames();
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
