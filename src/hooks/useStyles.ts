// src/hooks/useStyles.ts
import { useContext } from 'react';
import {
  StylesContext,
  StylesContextType,
} from '../contexts/stylesContextDefinition';

export const useStyles = (): StylesContextType => {
  const context = useContext(StylesContext);
  if (!context) {
    throw new Error('useStyles must be used within a StylesProvider');
  }
  return context;
};
