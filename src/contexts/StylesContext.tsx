// src/contexts/StylesContext.tsx
import { StylesContext } from '@/contexts/stylesContextDefinition';
import { createStyles } from '@/utils/styleHelpers';
import { ReactNode, useMemo } from 'react';

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
