// src/contexts/StylesContext.tsx
import { createStyles, type Styles } from '@/utils/styles';
import { createContext, ReactNode, useContext, useMemo } from 'react';

interface StylesContextType {
  styles: Styles;
  darkMode: boolean;
}

const StylesContext = createContext<StylesContextType | null>(null);

interface StylesProviderProps {
  children: ReactNode;
  darkMode: boolean;
}

export const StylesProvider = ({ children, darkMode }: StylesProviderProps) => {
  const styles = useMemo(() => createStyles(darkMode), [darkMode]);

  const contextValue = useMemo(
    () => ({
      styles,
      darkMode,
    }),
    [styles, darkMode]
  );

  return (
    <StylesContext.Provider value={contextValue}>
      {children}
    </StylesContext.Provider>
  );
};

export const useStyles = (): StylesContextType => {
  const context = useContext(StylesContext);
  if (!context) {
    throw new Error('useStyles must be used within a StylesProvider');
  }
  return context;
};
