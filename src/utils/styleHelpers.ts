// src/utils/styleHelpers.ts
import { darkModeStyles, lightModeStyles } from '@/constants/styles';
import type { Styles } from '@/types/styles';

export const createStyles = (darkMode: boolean): Styles =>
  darkMode ? darkModeStyles : lightModeStyles;
