// src/themes/index.ts
import type { Theme } from '@/types/theme';
import { darkTheme } from './dark';
import { lightTheme } from './light';

export const themes = {
  dark: darkTheme,
  light: lightTheme,
} as const;

export type ThemeName = keyof typeof themes;

export const getTheme = (name: ThemeName): Theme => themes[name];

export { darkTheme, lightTheme };
