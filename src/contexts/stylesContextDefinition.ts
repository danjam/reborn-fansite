// src/contexts/stylesContextDefinition.ts
import type { StylesContextType } from '@/types/contexts';
import { createContext } from 'react';

export const StylesContext = createContext<StylesContextType | null>(null);
