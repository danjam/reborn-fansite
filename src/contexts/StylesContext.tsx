// src/contexts/StylesContext.tsx
import { createStyles } from '@/utils/styleHelpers';
import { ReactNode, useMemo } from 'react';
import { StylesContext } from './stylesContextDefinition';

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
