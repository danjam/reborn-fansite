// src/hooks/useStyles.ts
import {
  StylesContext,
  StylesContextType,
} from '@/contexts/stylesContextDefinition';
import { useContext } from 'react';

export const useStyles = (): StylesContextType => {
  const context = useContext(StylesContext);
  if (!context) {
    throw new Error('useStyles must be used within a StylesProvider');
  }
  return context;
};
