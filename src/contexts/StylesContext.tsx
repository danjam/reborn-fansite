// src/contexts/StylesContext.tsx
import { ReactNode, useMemo } from 'react';
import { createStyles } from '../utils/styles';
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
