// src/contexts/stylesContext.ts
import type { Styles } from '@/utils/styles';
import { createContext } from 'react';

export interface StylesContextType {
  styles: Styles;
  darkMode: boolean;
}

export const StylesContext = createContext<StylesContextType | null>(null);
